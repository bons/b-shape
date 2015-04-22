//Animation frame compatibility
var AnimationFrame = require('../helpers/request-animation-frame');
var _ = require('underscore');

function bCircle(canvas, args)
{
  var self = this,
      animationFrame = new AnimationFrame();
  var rawCanvas = canvas[0];
  var options = {
    start: 0,
    end: 2,
    percent : 100,
    totalPercent : 100,
    gradientStart: '#000'
  };

  _.extend(options, args);

  // later options setup
  if(typeof options.gradientMiddle === "undefined")
  {
    options.gradientMiddle = options.gradientStart;
  }

  if(typeof options.gradientEnd === "undefined")
  {
    options.gradientEnd = options.gradientStart;
  }

  if(typeof options.radius === "undefined")
  {
    options.radius =  (rawCanvas.width - options.stroke)/2;
  }

  var prepareAnimateCircle = function(args)
  {
    /*
		* Calulate the final position
		*/
		var realEnd = 2 * (args.percent * args.totalPercent / 100) / 100;
		var startPos = 0;

		/*
		* Usamos esa diferencia para saber cuanto tenemos que pintar
		*/
		var context = canvas[0].getContext("2d");
		context.clearRect(0, 0, rawCanvas.width, rawCanvas.height);

		if(typeof args.background !== "undefined")
    {
      context.drawImage(args.background,0,0);
    }

		var increase = (args.diff * (realEnd) / args.duration);
		if(increase > realEnd)
    {
      increase = realEnd;
    }

		args.end = startPos + increase;

		self.draw(args);
  };

  self.draw = function(args)
  {
    args = args || options;

    var context = rawCanvas.getContext("2d");

		var x = (rawCanvas.width / 2);
		var y = (rawCanvas.height / 2);
		var radius = args.radius;
		var startAngle = (args.start - 0.5) * Math.PI;
		var endAngle = (args.end - 0.5) * Math.PI;
		var counterClockwise = false;

		context.lineWidth = args.stroke;

		// create the gradient
		var firstGrad = context.createLinearGradient(0,0,0,rawCanvas.height);
		firstGrad.addColorStop(0, args.gradientStart);
		firstGrad.addColorStop(1, args.gradientMiddle);


		var secondGrad = context.createLinearGradient(0,0,0,rawCanvas.height);
		secondGrad.addColorStop(0, args.gradientEnd);
		secondGrad.addColorStop(1, args.gradientMiddle);


		context.save();
		context.beginPath();
		context.rect(0, 0, rawCanvas.width/2, rawCanvas.height);
		context.clip();

		// draw the circle
		context.beginPath();
		context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		context.strokeStyle = firstGrad;
		context.stroke();

		context.restore();

		context.save();
		context.beginPath();
		context.rect(rawCanvas.width/2, 0, rawCanvas.width/2, rawCanvas.height);
		context.clip();

		// Then we draw the right half
		context.strokeStyle = secondGrad;
		context.beginPath();
		context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		context.stroke();

		context.restore();
  };

  self.drawWithAnimation = function()
  {
    var startTime;
    options.duration = options.duration || 1000;

    var loop = function(timestamp)
    {
      if(!startTime)
      {
				startTime = timestamp;
      }

      var drawNow = (timestamp || Date.now());
      args.diff = drawNow - startTime;

      prepareAnimateCircle(options);

      if(args.diff > args.duration)
      {
        animationFrame.cancel();
      }
      else
      {
        animationFrame.next();
      }
    };

    animationFrame.cancel();

    animationFrame.draw(loop);
  };

  return self;
}


module.exports = bCircle;
