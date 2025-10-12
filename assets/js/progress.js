(function(window){
    // Lightweight progress helper for marking/reading completed levels in localStorage.
    // Exposed API:
    // - Zendo_getCompletedLevels() -> array of numbers
    // - Zendo_markLevelComplete(levelNumber) -> boolean (true if newly added)
    // - Zendo_unmarkLevel(levelNumber)
    // - Zendo_setCompletedLevels(array)
    // - Zendo_onChange(callback) -> returns unsubscribe

    function readRaw() {
        try {
            var raw = localStorage.getItem('completedLevels');
            if (!raw) return [];
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed.map(Number).filter(n=>!isNaN(n));
            if (typeof parsed === 'object' && parsed !== null) return Object.keys(parsed).filter(k=>parsed[k]).map(Number);
            return [];
        } catch(e){ console.warn('Zendo progress read error', e); return []; }
    }

    function saveArray(arr) {
        try {
            // normalize unique sorted
            var uniq = Array.from(new Set(arr.map(Number).filter(n=>!isNaN(n)))).sort((a,b)=>a-b);
            localStorage.setItem('completedLevels', JSON.stringify(uniq));
            // emit event by writing a timestamped key (some pages may not listen to the key change itself)
            try { localStorage.setItem('lastCompletedLevelsUpdate', String(Date.now())); } catch(e){}
            notifyListeners(uniq);
            return uniq;
        } catch(e){ console.warn('Zendo progress save error', e); return null; }
    }

    function Zendo_getCompletedLevels(){ return readRaw(); }

    function Zendo_setCompletedLevels(arr){ return saveArray(arr); }

    function Zendo_markLevelComplete(level){
        if (level == null) return false;
        var n = Number(level);
        if (isNaN(n)) return false;
        var arr = readRaw();
        if (arr.includes(n)) return false;
        arr.push(n);
        saveArray(arr);
        // refresh UI hooks if available
        if (window && typeof window.Zendo_refreshCount === 'function') window.Zendo_refreshCount();
        if (window && typeof window.Zendo_refreshAchievementsPanel === 'function') window.Zendo_refreshAchievementsPanel();
        return true;
    }

    function Zendo_unmarkLevel(level){
        var n = Number(level);
        if (isNaN(n)) return false;
        var arr = readRaw().filter(x=>x!==n);
        saveArray(arr);
        if (window && typeof window.Zendo_refreshCount === 'function') window.Zendo_refreshCount();
        if (window && typeof window.Zendo_refreshAchievementsPanel === 'function') window.Zendo_refreshAchievementsPanel();
        return true;
    }

    // simple observer
    var listeners = [];
    function notifyListeners(arr){ listeners.forEach(fn=>{ try{ fn(arr); }catch(e){} }); }
    function Zendo_onChange(fn){ if (typeof fn!=='function') return function(){}; listeners.push(fn); return function(){ listeners = listeners.filter(x=>x!==fn); }; }

    // auto-bind: any element with [data-level-id] and class .zendo-mark-complete will call mark when clicked
    function autoBind() {
        try {
            var els = document.querySelectorAll('[data-level-id].zendo-mark-complete');
            els.forEach(el => {
                if (el.__zendoBound) return; // idempotent
                el.addEventListener('click', function(e){
                    var lid = el.getAttribute('data-level-id');
                    if (!lid) return;
                    var n = Number(lid);
                    if (isNaN(n)) return;
                    Zendo_markLevelComplete(n);
                    // small visual feedback
                    el.classList.add('zendo-marked');
                    setTimeout(()=>el.classList.remove('zendo-marked'), 1200);
                });
                el.__zendoBound = true;
            });
        } catch(e){ /* ignore */ }
    }

    // init on DOM ready
    if (document && document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoBind);
    else setTimeout(autoBind, 0);

    // On load, try to infer completed levels from any unlockedLevel keys that may already exist
    try {
        ['rookieUnlockedLevel','challengerUnlockedLevel','masterUnlockedLevel','unlockedLevel'].forEach(k=>{
            var v = localStorage.getItem(k);
            if (v) tryInferFromUnlocked(k, v);
        });
    } catch(e){}

    // watch for storage updates from other tabs and notify listeners
    window.addEventListener('storage', function(e){
        if (!e.key) return;
        if (e.key === 'completedLevels' || e.key === 'lastCompletedLevelsUpdate') {
            notifyListeners(readRaw());
        }
    });

    // Also observe unlockedLevel keys so that when a quiz page sets unlockedLevel (e.g. rookieUnlockedLevel)
    // we infer the completed level as (unlockedLevel - 1) and mark it completed locally. This avoids editing
    // every quiz file — most quizzes call setUnlockedLevel after finishing.
    function tryInferFromUnlocked(key, value) {
        try {
            var n = parseInt(value, 10);
            if (!isFinite(n) || n <= 0) return;
            var inferred = n - 1;
            if (inferred >= 1) {
                // mark inferred level
                Zendo_markLevelComplete(inferred);
            }
        } catch (e) { }
    }

    window.addEventListener('storage', function(e){
        if (!e.key) return;
        var keys = ['rookieUnlockedLevel','challengerUnlockedLevel','masterUnlockedLevel','unlockedLevel'];
        if (keys.includes(e.key)) tryInferFromUnlocked(e.key, e.newValue || localStorage.getItem(e.key));
    });

    // expose API
    window.Zendo_getCompletedLevels = Zendo_getCompletedLevels;
    window.Zendo_setCompletedLevels = Zendo_setCompletedLevels;
    window.Zendo_markLevelComplete = Zendo_markLevelComplete;
    window.Zendo_unmarkLevel = Zendo_unmarkLevel;
    window.Zendo_onChange = Zendo_onChange;

    // automatically export as module if supported
    if (typeof module !== 'undefined' && module.exports) module.exports = {
        get: Zendo_getCompletedLevels,
        set: Zendo_setCompletedLevels,
        mark: Zendo_markLevelComplete,
        unmark: Zendo_unmarkLevel
    };

})(window);
