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

    // ------------------- XP tracking (non-invasive fallback) -------------------
    // xpByLevel stored as JSON in localStorage.xpByLevel
    function readXPMap(){
        try{
            var raw = localStorage.getItem('xpByLevel');
            if (!raw) return {};
            var parsed = JSON.parse(raw);
            if (typeof parsed === 'object' && parsed !== null) return parsed;
            return {};
        }catch(e){ return {}; }
    }
    function saveXPMap(map){
        try{
            localStorage.setItem('xpByLevel', JSON.stringify(map || {}));
            var total = Object.keys(map || {}).reduce((s,k)=> s + (Number(map[k])||0), 0);
            localStorage.setItem('totalXP', String(total));
            notifyXPListeners(total, map);
            return true;
        }catch(e){ return false; }
    }

    var xpListeners = [];
    function notifyXPListeners(total, map){ xpListeners.forEach(fn=>{ try{ fn(total, map); }catch(e){} }); }
    function Zendo_onXPChange(fn){ if (typeof fn!=='function') return function(){}; xpListeners.push(fn); return function(){ xpListeners = xpListeners.filter(x=>x!==fn); }; }

    function Zendo_getTotalXP(){
        try{ return Number(localStorage.getItem('totalXP')) || Object.keys(readXPMap()).reduce((s,k)=> s + (Number(readXPMap()[k])||0), 0); }catch(e){ return 0; }
    }
    function Zendo_getXPForLevel(level){ var map = readXPMap(); return Number(map && map[String(level)] ) || 0; }

    function clamp(n, lo, hi){ return Math.max(lo, Math.min(hi, n)); }
    function computeXPFromScore(score, max){
        if (!isFinite(score) || !isFinite(max) || max <= 0) return 0;
        return clamp(Math.round(150 * (Number(score) / Number(max))), 0, 150);
    }

    // Award XP for a level. By default we keep the best-per-level (only update if new xp > existing)
    function awardXPForLevel(level, xp, opts){
        try{
            level = Number(level);
            if (!isFinite(level) || level <= 0) return false;
            xp = Number(xp) || 0;
            var map = readXPMap();
            var key = String(level);
            var prev = Number(map[key]||0);
            var policy = (opts && opts.policy) || 'best'; // 'best'|'overwrite'|'sum'
            var changed = false;
            if (policy === 'best'){
                if (xp > prev){ map[key] = xp; changed = true; }
            } else if (policy === 'overwrite'){
                map[key] = xp; changed = true;
            } else if (policy === 'sum'){
                map[key] = prev + xp; changed = true;
            }
            if (changed) {
                saveXPMap(map);
                // emit a DOM event so UI can animate a +XP
                try{
                    var ev = new CustomEvent('zendo-xp-awarded', { detail: { level: level, xp: xp, previous: prev } });
                    window.dispatchEvent(ev);
                }catch(e){}
            }
            return changed;
        }catch(e){ return false; }
    }

    // Recompute XP from existing unlocked keys (useful when profile opens after finishing a quiz in same tab)
    function Zendo_recomputeXPFromUnlocked(){
        try{
            var keys = ['rookieUnlockedLevel','challengerUnlockedLevel','masterUnlockedLevel','unlockedLevel'];
            keys.forEach(k=>{
                var v = localStorage.getItem(k);
                if (!v) return;
                var n = parseInt(v,10);
                if (!isFinite(n) || n <= 0) return;
                var inferred = n - 1;
                if (inferred >= 1){
                    // If there's a lastQuizResult that matches, use it; else award default if none exists
                    try{
                        var lastRaw = localStorage.getItem('lastQuizResult');
                        if (lastRaw){
                            var parsed = JSON.parse(lastRaw);
                            if (parsed && Number(parsed.level) === Number(inferred) && parsed.score != null && parsed.max != null){
                                Zendo_awardXPForResult(parsed);
                                Zendo_markLevelComplete(inferred);
                                return;
                            }
                        }
                    }catch(e){}
                    // fallback default
                    if (Zendo_getXPForLevel(inferred) === 0){ awardXPForLevel(inferred, 100, { policy: 'best' }); }
                    Zendo_markLevelComplete(inferred);
                }
            });
            return true;
        }catch(e){ return false; }
    }

    // Public helper to accept a quiz result object (level, score, max). This can be called by quizzes
    // if they ever choose to write a 'lastQuizResult' or call this API. It will compute XP and store it.
    function Zendo_awardXPForResult(res){
        try{
            if (!res) return false;
            var level = Number(res.level);
            var score = Number(res.score);
            var max = Number(res.max);
            if (isFinite(score) && isFinite(max) && max > 0){
                var xp = computeXPFromScore(score, max);
                var changed = awardXPForLevel(level, xp, { policy: 'best' });
                if (changed && typeof window.Zendo_refreshAchievementsPanel === 'function') window.Zendo_refreshAchievementsPanel();
                if (changed && typeof window.Zendo_refreshCount === 'function') window.Zendo_refreshCount();
                return changed;
            }
            return false;
        }catch(e){ return false; }
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

    // Monkey-patch localStorage.setItem so same-tab writes (from quizzes) are also observed here.
    // This allows awarding XP immediately when a quiz calls setUnlockedLevel() or writes lastQuizResult
    (function(){
        try{
            var _origSet = localStorage.setItem.bind(localStorage);
            localStorage.setItem = function(k, v){
                _origSet(k, v);
                try{
                    // If a quiz writes unlocked keys, attempt to infer immediately
                    var keys = ['rookieUnlockedLevel','challengerUnlockedLevel','masterUnlockedLevel','unlockedLevel'];
                    if (keys.indexOf(k) !== -1){
                        tryInferFromUnlocked(k, v);
                    }
                    // If a quiz writes a structured result, handle it
                    if (k === 'lastQuizResult' || k === 'quizResult' || k === 'lastQuizScore'){
                        try{ var parsed = JSON.parse(v); if (parsed && parsed.level) Zendo_awardXPForResult(parsed); }catch(e){}
                    }
                    // Notify listeners for completedLevels special triggers
                    if (k === 'completedLevels' || k === 'lastCompletedLevelsUpdate') notifyListeners(readRaw());
                }catch(e){}
            };
        }catch(e){}
    })();

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
