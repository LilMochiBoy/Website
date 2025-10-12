// Simple friends helper (local-only)
(function(){
    const DEFAULT_FRIENDS = ['Richard','Reynard','Timmy','Veve','Valentino','Vanessa'];
    const LS_FRIENDS_KEY = 'friends'; // stored as array of names
    const LS_SENT_INVITES = 'sentInvites'; // stored as array of objects {to,when}

    function readFriends(){
        try { return JSON.parse(localStorage.getItem(LS_FRIENDS_KEY)||'[]'); } catch(e){ return []; }
    }
    function writeFriends(arr){
        try { localStorage.setItem(LS_FRIENDS_KEY, JSON.stringify(arr)); window.dispatchEvent(new StorageEvent('storage',{key:LS_FRIENDS_KEY, newValue: JSON.stringify(arr)})); } catch(e) { console.warn('Failed to write friends',e); }
    }
    function readInvites(){
        try { return JSON.parse(localStorage.getItem(LS_SENT_INVITES)||'[]'); } catch(e){ return []; }
    }
    function writeInvites(arr){
        try { localStorage.setItem(LS_SENT_INVITES, JSON.stringify(arr)); window.dispatchEvent(new StorageEvent('storage',{key:LS_SENT_INVITES, newValue: JSON.stringify(arr)})); } catch(e) { console.warn('Failed to write invites',e); }
    }

    function ensureUniqueName(name){
        return (name || '').toString().trim();
    }

    function initUI(){
        const findBtn = document.getElementById('findFriendsBtn');
        const inviteBtn = document.getElementById('inviteFriendsBtn');
        const findModal = document.getElementById('findFriendsModal');
        const inviteModal = document.getElementById('inviteFriendsModal');
        const searchInput = document.getElementById('friendSearchInput');
        const results = document.getElementById('friendResults');
        const inviteInput = document.getElementById('inviteInput');
        const sendInviteBtn = document.getElementById('sendInviteBtn');
        const inviteFeedback = document.getElementById('inviteFeedback');

        if (findBtn && findModal) {
            findBtn.addEventListener('click', function(){
                renderFriendResults('');
                findModal.style.display = 'flex';
                if (searchInput) searchInput.focus();
            });
        }
        if (inviteBtn && inviteModal) {
            inviteBtn.addEventListener('click', function(){
                inviteModal.style.display = 'flex';
                if (inviteInput) inviteInput.focus();
                if (inviteFeedback) inviteFeedback.textContent = '';
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', function(e){ renderFriendResults(e.target.value); });
            searchInput.addEventListener('keydown', function(e){ if (e.key === 'Escape') { findModal.style.display='none'; } });
        }

        if (sendInviteBtn) {
            sendInviteBtn.addEventListener('click', function(){
                const v = inviteInput && inviteInput.value ? inviteInput.value.trim() : '';
                if (!v) { if (inviteFeedback) inviteFeedback.textContent = 'Please enter a name or email.'; return; }
                const invites = readInvites();
                invites.push({ to: v, when: Date.now() });
                writeInvites(invites);
                if (inviteFeedback) inviteFeedback.textContent = 'Invite sent to ' + v + '!';
                // simple visual timeout
                setTimeout(()=>{ if (inviteModal) inviteModal.style.display='none'; }, 900);
            });
        }

        // click handler for add/unfollow buttons inside results
        results && results.addEventListener('click', function(e){
            const entry = e.target.closest && e.target.closest('.friend-entry');
            if (!entry) return;
            const name = entry.getAttribute('data-name');
            if (!name) return;
            // check if click was on a friend-action button
            const actionBtn = e.target.closest && e.target.closest('.friend-action-btn');
            if (actionBtn) {
                const action = actionBtn.getAttribute('data-action');
                if (action === 'add') addFriend(name);
                else if (action === 'unfollow') removeFriend(name);
                renderFriendResults(searchInput ? searchInput.value : '');
            }
        });

        // update following count when storage changes
        window.addEventListener('storage', function(e){ if (!e.key || e.key === LS_FRIENDS_KEY) updateFollowingCount(); });
        // initial
        updateFollowingCount();
    }

    function renderFriendResults(filter){
        const results = document.getElementById('friendResults');
        if (!results) return;
        const q = (filter||'').toString().trim().toLowerCase();
        const friends = readFriends();
        const addedSet = new Set(friends.map(f=>f.toLowerCase()));
        const pool = DEFAULT_FRIENDS.slice();
        // also include any names user typed earlier in invites as suggestions
        try {
            const invites = JSON.parse(localStorage.getItem('sentInvites')||'[]');
            invites.forEach(i=>{ if (i && i.to) pool.push(i.to); });
        } catch(e){}
        // de-dup preserve first occurrence
        const seen = new Set();
        const choices = pool.filter(n => { const t = n.toLowerCase(); if (seen.has(t)) return false; seen.add(t); return true; });
        const filtered = choices.filter(n => !q || n.toLowerCase().includes(q));
        if (!filtered.length) {
            results.innerHTML = '<div style="color:#9fb7ff;padding:8px 6px;">No friends found.</div>';
            return;
        }
        results.innerHTML = filtered.map(n => {
            const lower = n.toLowerCase();
            const isAdded = addedSet.has(lower);
            return `<div class="friend-entry" data-name="${escapeHtml(n)}" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:8px;background:#0f1418;border:1px solid #20262b;color:#e6eefc;margin-bottom:6px;">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:40px;height:40px;border-radius:50%;background:#1b2430;display:flex;align-items:center;justify-content:center;font-weight:700;color:#9fb7ff;">${escapeHtml(n.charAt(0) || '?')}</div>
                    <div style="display:flex;flex-direction:column;"><div style="font-weight:700;color:#e6eefc;">${escapeHtml(n)}</div><div style="font-size:0.85rem;color:#9fb7ff;">${isAdded? 'Following':'Not following'}</div></div>
                </div>
                <div>
                    ${isAdded ? '<button class="main-btn friend-action-btn" data-action="unfollow" style="background:#2b3948;border:none;padding:6px 10px;border-radius:8px;color:#9fb7ff;">Following</button>' : '<button class="main-btn friend-action-btn" data-action="add" style="background:#3ea6ff;border:none;padding:6px 10px;border-radius:8px;color:#fff;">Add</button>'}
                </div>
            </div>`;
        }).join('');
    }

    function removeFriend(name){
        const n = ensureUniqueName(name);
        if (!n) return false;
        const friends = readFriends();
        const remaining = friends.filter(f => f.toLowerCase() !== n.toLowerCase());
        if (remaining.length === friends.length) return false;
        writeFriends(remaining);
        updateFollowingCount();
        return true;
    }

    function addFriend(name){
        const n = ensureUniqueName(name);
        if (!n) return false;
        const friends = readFriends();
        if (friends.map(f=>f.toLowerCase()).includes(n.toLowerCase())) return false;
        friends.push(n);
        writeFriends(friends);
        updateFollowingCount();
        return true;
    }

    function updateFollowingCount(){
        const friends = readFriends();
        // update the small stats area (first block with '0 Following' )
        try {
            // find the element that contains the Following text (search by innerText)
            const nodes = document.querySelectorAll('.profile-container div');
            // simpler: directly find the element with exact text "0 Following" and replace
            const els = Array.from(document.querySelectorAll('div')).filter(d=>d && d.textContent && d.textContent.trim().endsWith('Following'));
            // fallback target: the specific span with the following count (exists earlier) -- we'll search by content
            let updated = false;
            els.forEach(el=>{
                // el text example: "0 Following"
                try {
                    const parts = el.textContent.trim().split('\n');
                    // find the numeric part and update
                    const num = readFriends().length;
                    // Replace digits at start with num
                    el.innerHTML = `<span style=\"color:#6fa3ff; font-weight:600;\">${num} Following</span>`;
                    updated = true;
                } catch(e){}
            });
            // best-effort: also try to update any exact element we know in the profile card
            const profileContainer = document.querySelector('.profile-container');
            if (profileContainer) {
                const spanCandidates = profileContainer.querySelectorAll('span');
                spanCandidates.forEach(s => {
                    if (s.textContent && s.textContent.trim().endsWith('Following')) {
                        s.textContent = readFriends().length + ' Following';
                        updated = true;
                    }
                });
            }
            // If failed to update via heuristics, set that small display in the profile panel explicitly if present
            const topStat = document.querySelector('#profilePanel');
            if (topStat && !updated) {
                // find the span that previously had '0 Following' by matching the child nodes
                const sp = topStat.querySelector('div[style*="0 Following"]');
                // ignore if not found
            }
        } catch(e){ console.warn('updateFollowingCount failed', e); }
    }

    function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }

    // expose API
    window.Zendo_friends = {
        list: readFriends,
        add: addFriend,
        defaults: function(){ const cur = readFriends(); if (!cur.length) { writeFriends(DEFAULT_FRIENDS.slice(0,2)); } },
        sendInvite: function(to){ const invites = readInvites(); invites.push({to: to, when: Date.now()}); writeInvites(invites); }
    };

    // init on DOM ready (also run immediately if already parsed)
    document.addEventListener('DOMContentLoaded', initUI);
    if (document.readyState !== 'loading') {
        try { console.debug && console.debug('Zendo_friends: document already ready, initializing.'); } catch(e){}
        initUI();
    }
})();
