sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Input",
	"sap/m/Label",
	"sap/m/Button"
	], function (Control, Input, Label, Button) {
	"use strict";
	return Control.extend("com.Zcustom_control.control.NewFile", {
		metadata : {
			properties:{
				value:{type: "string", defaultValue: 0}
			},
			aggregations:{
				_input:{type:"sap.m.Input", multiple:false, visibility: "hidden"},
				_label:{type:"sap.m.Label", multiple:false, visibility: "hidden"},
				_button:{type:"sap.m.Button", multiple:false, visibility: "hidden"}
			},
			events:{
				change:{
					parameters : {
						value : {type : "string"}
					}
				}
				
			}
			
		},
		init : function () {
				this.setAggregation("_input", new Input({
				//value: this.getValue(),
				width: "35%",
				//iconSize: "2rem",
				//visualMode: "Half",
				liveChange: this._onRate.bind(this)
			}));
			this.setAggregation("_label", new Label({
				text: "{i18n>productRatingLabelInitial}"
			}).addStyleClass("sapUiSmallMargin"));
			this.setAggregation("_button", new Button({
				text: "{i18n>productRatingButton}",
				press: this._onSubmit.bind(this)
			}).addStyleClass("sapUiTinyMarginTopBottom"));
		},
			setValue: function (fValue) {
			this.setProperty("value", fValue, true);
			this.getAggregation("_input").setValue(fValue);
		},
		reset: function () {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();

			this.setValue(0);
			this.getAggregation("_label").setDesign("Standard");
			this.getAggregation("_input").setEnabled(true);
			this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
			this.getAggregation("_button").setEnabled(true);
		},
		_onRate : function (oEvent) {
			var oRessourceBundle = this.getModel("i18n").getResourceBundle();
			var fValue = oEvent.getParameter("value");

			this.setProperty("value", fValue, true);

		//	this.getAggregation("_label").setText(oRessourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
			this.getAggregation("_label").setDesign("Bold");
		},
		_onSubmit : function (oEvent) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();
			this.getAggregation("_input").setEnabled(false);
		var a=	this.getAggregation("_input").getValue();
			this.getAggregation("_label").setText(a);                           //setText(oResourceBundle.getText("productRatingLabelFinal"));
			this.getAggregation("_button").setEnabled(false);
			this.fireEvent("change", {
				value: this.getValue()
			});
		},
		renderer : function (oRm, oControl) {
			oRm.openStart("div", oControl);
			oRm.class("myAppDemoWTProductRating");
			oRm.openEnd();
			oRm.renderControl(oControl.getAggregation("_input"));
			oRm.renderControl(oControl.getAggregation("_label"));
			oRm.renderControl(oControl.getAggregation("_button"));
			oRm.close("div");
		}
	});
});