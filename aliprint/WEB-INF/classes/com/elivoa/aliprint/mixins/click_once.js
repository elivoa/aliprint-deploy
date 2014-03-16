/*! A class that ignores clicks after the first one.*/
ClickOnce = Class.create({

	initialize : function(elementId, zone) {
		this.elementId = elementId;
		this.alreadyClicked = false;
		this.zone = zone;
		Event.observe($(elementId), 'click', jQuery.proxy(this.doClickOnce.bindAsEventListener(this), this));
	},

	doClickOnce : function(e) {
		if (this.alreadyClicked) {
			console.log('prevent double click.');
			e.stop();
			return;
		}
		this.alreadyClicked = true;

		if (this.zone) {
			var mask = jQuery('<div class="mask" />');
			var zoneArea = jQuery('#' + this.zone);
			zoneArea.append(mask);
			mask.height(zoneArea.height());
			mask.width(zoneArea.width());
			var position = zoneArea.position();
			mask.css('border', "none");
			mask.css('top', position.top);
			mask.css('left', position.left);
			mask.css('position', "absolute");
			// mask.css('background-color', "black");
			// mask.css('opacity', 0.7);
			zoneArea.animate({
				opacity : 0.75
			}, 80, function() {
				// jQuery('#' + this.elementId).attr('disabled', 'disabled');
				setTimeout(function() {
					var box = jQuery('<div class="shadow" />');
					box.css('height', "16px");
					box.css('width', "120px");
					var top = (zoneArea.height() - 16) / 2;
					if (top >= 200) {
						top = 200;
					}
					box.css('margin-top', top + "px");
					box.css('margin-left', (zoneArea.width() - 120) / 2 + "px");
					// box.append('<img
					// src="/res/images/common/loading/horizental-80x12.gif"
					// />');
					mask.append(box);
					mask.css('background',
							"url(/res/images/common/loading/horizental-80x12.gif) no-repeat center center");
				}, 250);
			});
			zoneArea.change(function() {
				// empty
			});
		}

	}

});

// Extend the Tapestry.Initializer with a static method that instantiates a
// ClickOnce.
Tapestry.Initializer.clickOnce = function(spec) {
	new ClickOnce(spec.elementId, spec.zone);
};
