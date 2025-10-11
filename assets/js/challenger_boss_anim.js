// Challenger Boss animation helper
(function(global){
  function seqPaths(folder, prefix, count) {
    const arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(`../../assets/images/Challenger Boss/${folder}/${prefix}_${i}.png`);
    }
    return arr;
  }

  function BossSprite(imgId) {
    this.img = document.getElementById(imgId);
    if (!this.img) {
      console.warn('Challenger Boss sprite img not found:', imgId);
      return;
    }
    // frame sets (counts chosen to match files in repo)
    this.idleFrames = seqPaths('idle', 'idle', 15);
    this.atkFrames = seqPaths('1atk', '1atk', 7); // primary attack sequence (user requested)
    this.atk2Frames = seqPaths('2atk', '2atk', 9);
    this.hitFrames = seqPaths('hurt', 'hurt', 5);
    this.deathFrames = seqPaths('death', 'death', 11);

    this._timer = null;
    this._playing = false;
    this._idleInterval = 140; // ms per frame for idle
    this._frameIndex = 0;
    this._currentSeq = null;
  }

  BossSprite.prototype._play = function(frames, interval, loop, onComplete) {
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

  // primary attack uses 1atk sequence (cycles through frames)
  BossSprite.prototype.attack = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    // play the 1atk frames once then return to idle
    this._play(this.atkFrames, 80, false, function(){ try { self.idleStart(); } catch(e){} });
  };

  BossSprite.prototype.attack2 = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.atk2Frames, 70, false, function(){ try { self.idleStart(); } catch(e){} });
  };

  BossSprite.prototype.takeHit = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    // play hurt sequence then return to idle
    this._play(this.hitFrames, 110, false, function(){ try { self.idleStart(); } catch(e){} });
  };

  BossSprite.prototype.die = function() {
    const self = this;
    if (!this.img) return;
    this._stop();
    this._play(this.deathFrames, 100, false, function(){ /* keep last frame - dead */ });
  };

  global.ChallengerBossSprite = BossSprite;
})(window);
