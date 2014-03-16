/**
 * 
 */
ProductList = Class.create({

	initialize : function() {
		this.actionClass = "A-alias";
		jQuery("." + this.actionClass + " .alias").each(jQuery.proxy(function(index, input) {
			jQuery(input).keyup(jQuery.proxy(this.onKeyup(input), this));
		}, this));
	},

	onKeyup : function(input) {
		this.olddata = jQuery(input, ".alias").val()
		return function(e) {
			// change button label;
			console.log(input);
			v = jQuery(e.target).val();
			btn = jQuery(input).find("+.button");
			if (btn.length > 0) {
				if (v === this.olddata) {
					btn.html("");
				} else {
					btn.html("保存");
					// setup button;
					btn.one('click', {}, jQuery.proxy(this.onSaveClick(input), this));
				}
			}
		}
	},

	onSaveClick : function(input) {
		return function(e) {
			console.log("value vas submitted into server!! ");
			aliasInput = jQuery(input, ".alias");
			newValue = aliasInput.val();
			productId = aliasInput.attr("productId");
			jQuery.ajax({
				type : "POST",
				url : "/aliprint/product/ajax:saveAlias/", // + productId + "/"
				// + newValue,
				data : {
					"id" : productId,
					"alias" : newValue
				},
				dataType : "JSON",
				success : function(data) {
					// success! change button label;
					btn = jQuery(input).find("+.button");
					if (data != undefined && data.success == "true") {
						btn.html("保存成功！")
					} else if (data.success == "false") {
						btn.html("错误！")
					}
				}
			});

		}
	},

	doClearHint : function(e) {
		if (this.textbox.value == this.hintText) {
			this.textbox.value = "";
		}
		this.textbox.setStyle({
			color : this.normalColor
		});
	},

	doCheckHint : function(e) {

		// If field is empty, put the hintText in it and set its color to
		// hintColor

		if (this.textbox.value.length == 0) {
			this.textbox.value = this.hintText;
			this.textbox.setStyle({
				color : this.hintColor
			});
		}

		// Else if field contains hintText, set its color to hintColor

		else if (this.textbox.value == this.hintText) {
			this.textbox.setStyle({
				color : this.hintColor
			});
		}

		// Else, set the field's color to its normal color

		else {
			this.textbox.setStyle({
				color : this.normalColor
			});
		}

	}

})

// Extend the Tapestry.Initializer with a function that instantiates a
// TextboxHint.

Tapestry.Initializer.ProductList = function() {
	new ProductList();
}