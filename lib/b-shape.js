'use strict';

var MODULE_NAME = 'bons.bShape';

var angular = require('angular');

var bCircle = require('./shapes/b-circle');

angular .module(MODULE_NAME, [])
        .directive('bShape',[
          function()
          {

            return {
              restrict: "A",
              transclude: true,
              controller: function()
              {
                var self = this;

                self.createCircle = function(canvas, args)
                {
                  self.shape = new bCircle(canvas, args);
                };
              },
              link: function(scope, elem, attr, ctrl, trans)
              {
                //avoid using this directive in another element than a canvas
                if(elem[0].tagName.toLowerCase() !== 'canvas')
                {
                  console.error("Directive bShape must be used in a canvas");
                  return;
                }

                switch(attr.type)
                {
                  default:
                    ctrl.createCircle(elem, {
                      percent: attr.percent,
                      radius: attr.radius,
                      stroke: attr.stroke,
                      gradientStart: attr.gradientStart,
                      gradientMiddle: attr.gradientMiddle,
                      gradientEnd: attr.gradientEnd,
                    });
                    break;
                }

                if(attr.autoload)
                {
                  ctrl.shape.drawWithAnimation();
                }

                scope.$on("bShape.drawWithAnimation", function()
                {
                  ctrl.shape.drawWithAnimation();
                });
                scope.$on("bShape.draw", function()
                {
                  ctrl.shape.draw();
                });
                // manually transclusion appending this scope
                trans(scope, function(clone)
                {
                  elem.append(clone);
                });
              }
            };
          }
        ]);

module.exports = MODULE_NAME;
