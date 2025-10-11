// Master Boss animation helper
(function(global){
  function seqPaths(folder, prefix, count) {
    const arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(`../../assets/images/Master Boss/${folder}/${prefix}_${i}.png`);
    }
    return arr;
  }

  function MasterBossSprite(imgId) {
    this.img = document.getElementById(imgId);
    if (!this.img) {
      console.warn('Master Boss sprite img not found:', imgId);
      return;
    }
    // frame sets (approx counts based on provided assets)
    this.idleFrames = seqPaths('01_demon_idle', 'demon_idle', 6);
    this.atkFrames = seqPaths('03_demon_cleave', 'demon_cleave', 15); // cleave / attack
    this.hitFrames = seqPaths('04_demon_take_hit', 'demon_take_hit', 5);
    this.deathFrames = seqPaths('05_demon_death', 'demon_death', 22);

    this._timer = null;
    this._playing = false;
    this._idleInterval = 160; // ms per frame for idle
    this._currentSeq = null;
  }

  MasterBossSprite.prototype._play = function(frames, interval, loop, onComplete) {
    if (!this.img) return;
    this._stop();
    this._playing = true;
    this._currentSeq = { frames, index: 0, loop, onComplete };
    const self = this;
    function step() {
      const f = frames[self._currentSeq.index];
      if (f) self.img.src = f;
      self._currentSeq.index++;
      if (self._currentSeq.index >= frames.length) {
        if (self._currentSeq.loop) {
          self._currentSeq.index = 0;
        } else {
          clearInterval(self._timer);
          self._timer = null;
          self._playing = false;
          const cb = self._currentSeq.onComplete;
          self._currentSeq = null;
          if (cb) cb();
          return;
        }
      }
    }
    if (frames.length) this.img.src = frames[0];
    this._timer = setInterval(step, interval);
  };

  MasterBossSprite.prototype._stop = function() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this._playing = false;
    this._currentSeq = null;
  };

  MasterBossSprite.prototype.idleStart = function() {
    if (!this.img) return;
    if (this._playing) return; // don't interrupt
    this._play(this.idleFrames, this._idleInterval, true);
  };

  MasterBossSprite.prototype.idleStop = function() {
    this._stop();
  };

  // Primary attack uses cleave sequence, then returns to idle
  MasterBossSprite.prototype.attack = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.atkFrames, 70, false, function(){ try { self.idleStart(); } catch(e){} });
  };

  MasterBossSprite.prototype.takeHit = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.hitFrames, 120, false, function(){ try { self.idleStart(); } catch(e){} });
  };

  MasterBossSprite.prototype.die = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.deathFrames, 90, false, function(){ /* keep last frame */ });
  };

  global.MasterBossSprite = MasterBossSprite;
})(window);
