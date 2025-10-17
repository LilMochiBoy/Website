// Rookie Boss animation helper
(function(global){
  function preload(src, cb) {
    const img = new Image();
    img.src = src;
    img.onload = () => cb && cb(null, img);
    img.onerror = () => cb && cb(new Error('Failed to load ' + src));
  }

  function seqPaths(folder, prefix, count) {
    const arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(`../../assets/images/Rookie Boss/${folder}/${prefix}_${i}.png`);
    }
    return arr;
  }

  function BossSprite(imgId) {
    this.img = document.getElementById(imgId);
    if (!this.img) {
      console.warn('Boss sprite img not found:', imgId);
      return;
    }
    // frame sets
    this.idleFrames = seqPaths('idle', 'idle', 6);
    this.atkFrames = seqPaths('1_atk', '1_atk', 14);
    this.hitFrames = seqPaths('take_hit', 'take_hit', 7);
    this.deathFrames = seqPaths('death', 'death', 16);

    this._timer = null;
    this._playing = false;
    this._idleInterval = 180; // ms per frame for idle
    this._frameIndex = 0;
    this._currentSeq = null;
  }

  BossSprite.prototype._play = function(frames, interval, loop, onComplete) {
    if (!this.img) return;
    this._stop();
    this._playing = true;
    this._currentSeq = { frames, index: 0, loop, onComplete };
    // preload first frame quickly then run
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
    // show first frame now
    if (frames.length) this.img.src = frames[0];
    this._timer = setInterval(step, interval);
  };

  BossSprite.prototype._stop = function() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this._playing = false;
    this._currentSeq = null;
  };

  BossSprite.prototype.idleStart = function() {
    if (!this.img) return;
    if (this._playing) return; // don't interrupt
    this._play(this.idleFrames, this._idleInterval, true);
  };

  BossSprite.prototype.idleStop = function() {
    this._stop();
  };

  BossSprite.prototype.attack = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.atkFrames, 80, false, function(){ self.idleStart(); });
  };

  BossSprite.prototype.takeHit = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.hitFrames, 100, false, function(){ self.idleStart(); });
  };

  BossSprite.prototype.die = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.deathFrames, 90, false, function(){ /* dead - keep last frame */ });
  };

  global.RookieBossSprite = BossSprite;
})(window);
