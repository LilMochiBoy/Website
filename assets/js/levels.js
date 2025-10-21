/**
 * Zendo Levels - Centralized Level Unlock System
 * Manages progression for Rookie, Challenger, and Master levels
 */

(function() {
    'use strict';

    window.ZendoLevels = {
        /**
         * Get the currently unlocked level for a difficulty tier
         * @param {string} tier - 'rookie', 'challenger', or 'master'
         * @returns {number} The highest unlocked level (default: 1)
         */
        getUnlockedLevel: function(tier) {
            const key = tier + 'UnlockedLevel';
            const stored = localStorage.getItem(key);
            
            // Default to 1 (only first level unlocked)
            if (!stored) {
                return 1;
            }
            
            const level = parseInt(stored, 10);
            return isNaN(level) ? 1 : level;
        },

        /**
         * Set the unlocked level for a difficulty tier
         * @param {string} tier - 'rookie', 'challenger', or 'master'
         * @param {number} level - The level to unlock up to
         */
        setUnlockedLevel: function(tier, level) {
            const key = tier + 'UnlockedLevel';
            const currentUnlocked = this.getUnlockedLevel(tier);
            
            // Only update if the new level is higher
            if (level > currentUnlocked) {
                localStorage.setItem(key, String(level));
                
                // If logged in, sync with backend
                const username = localStorage.getItem(tier + 'UserId');
                if (username) {
                    this.syncWithBackend(username, tier, level);
                }
            }
        },

        /**
         * Sync progress with backend server
         * @param {string} username - User's username
         * @param {string} tier - 'rookie', 'challenger', or 'master'
         * @param {number} level - The unlocked level
         */
        syncWithBackend: function(username, tier, level) {
            fetch('http://localhost:3000/api/updateProgress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: username, 
                    tier: tier,
                    unlockedLevel: level 
                })
            }).catch(err => {
                console.warn('Failed to sync progress with server:', err);
            });
        },

        /**
         * Reset progress for a specific tier
         * @param {string} tier - 'rookie', 'challenger', or 'master'
         */
        resetProgress: function(tier) {
            const key = tier + 'UnlockedLevel';
            localStorage.setItem(key, '1');
            
            const username = localStorage.getItem(tier + 'UserId');
            if (username) {
                this.syncWithBackend(username, tier, 1);
            }
        },

        /**
         * Check if a specific level is unlocked
         * @param {string} tier - 'rookie', 'challenger', or 'master'
         * @param {number} level - The level to check
         * @returns {boolean} True if the level is unlocked
         */
        isLevelUnlocked: function(tier, level) {
            return level <= this.getUnlockedLevel(tier);
        }
    };

    // Make it available globally
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = window.ZendoLevels;
    }
})();
