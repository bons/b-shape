// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+''] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
{
  window.requestAnimationFrame = function( callback )
  {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };
}


if (!window.cancelAnimationFrame)
{
  window.cancelAnimationFrame = function( id ) {
      clearTimeout(id);
  };
}

function AnimationFrame()
{
  var self = this,
      loop = function(){},
      animationFrameId;

  self.draw = function(callback)
  {
    loop = callback;
    self.next();
  };

  self.cancel = function()
  {
    if (animationFrameId)
    {
      window.cancelAnimationFrame(animationFrameId);
    }
  };

  self.next = function()
  {
    animationFrameId = window.requestAnimationFrame(function(timestamp){ loop(timestamp); });
  };

  return self;
}


module.exports = AnimationFrame;
