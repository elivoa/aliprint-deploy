/*!
 * init dialog, and content loading.
 */
Tapestry.Initializer.dialog = function(params) {

	var dialog = jQuery('#' + params.dialogId);
	if (!dialog) {
		return;
	}

	// detach dialog and append to body
	dialog.detach();
	jQuery('body').append(dialog);

	params.options.show = false;
	dialog.modal(params.options);

	var autoHeightTimer = undefined;

	// start auto-height timer.
	var startTimer = function() {
		try {
			autoHeightTimer = new PeriodicalExecuter(function(e) {
				// TODO Here, not finished. Auto Resize Dialog
			}, 1);
		} catch (e) {
			if (console) {
				console.log('Exception when start timer: ' + e);
			}
		}
	};

	var stopTimer = function() {
		try {
			if (autoHeightTimer != undefined) {
				autoHeightTimer.stop();
			}
		} catch (e) {
			if (console) {
				console.log('Exception when stop timer: ' + e);
			}
		}
	};

	dialog.on('shown', function() {
		var mgr = new Tapestry.ZoneManager({
			element : params.zone
		});
		dialog.css({
			'width' : params.width + 'px',
			'margin-left' : (-280 - (params.width - 600) / 2)
		});

		if (console) {
			console.log('Exception when stop timer: ' + params.width);
		}

		// refresh zone
		mgr.updateFromURL.bind(mgr).defer(params.url);
		startTimer();
	});

	dialog.on('hidden', function() {
		jQuery('#' + params.zone).html(
				'<div class="modal-header"></div>'
						+ '<div class="modal-body t-zone">Loading...</div><div class="modal-footer"></div>');
		stopTimer();
	});

};

/** support: dialogAction mixins */
Tapestry.Initializer.dialogAction = function(params) {

	if ('cancel' == params.action) {
		jQuery('#' + params.element).bind('click', function(event) {
			event.preventDefault();
			// use new method to close a dialog.
			var dialog = jQuery(event.target).parents('.modal');
			if(dialog && dialog.length>0){
				dialog.modal('hide');
			}
			/* 
			// this is the old method.
			var dialog = jQuery('#' + params.dialog);
			if (dialog.length > 0) {
				console.log('cancel dialog... ' + params.dialog);
				dialog.modal('hide');
			}
			*/
		});
	} else if ('close' == params.action) {
		// the same with cancel;
		// TODO add progress bar. Add call back.
		jQuery('#' + params.element).bind('click', function(event) {
			// event.preventDefault();
			// use new method to close a dialog.
			var dialog = jQuery(event.target).parents('.modal');
			if(dialog && dialog.length>0){
				dialog.modal('hide');
			}
			/*
			var dialog = jQuery('#' + params.dialog);
			if (dialog.length > 0) {
				dialog.modal('hide');
				console.log('hide modal dialog!');
			}
			*/
		});
	}

};
