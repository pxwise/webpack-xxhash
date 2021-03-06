/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ContextDependency = require("./ContextDependency");
var CriticalDependencyWarning = require("./CriticalDependencyWarning");

function CommonJsRequireContextDependency(request, recursive, regExp, range, valueRange) {
	ContextDependency.call(this, request, recursive, regExp);
	this.range = range;
	this.valueRange = valueRange;
}
module.exports = CommonJsRequireContextDependency;

CommonJsRequireContextDependency.prototype = Object.create(ContextDependency.prototype);
CommonJsRequireContextDependency.prototype.constructor = CommonJsRequireContextDependency;
CommonJsRequireContextDependency.prototype.type = "cjs require context";

CommonJsRequireContextDependency.prototype.getWarnings = function() {
	if(this.critical) {
		return [
			new CriticalDependencyWarning(this.critical)
		];
	}
};

CommonJsRequireContextDependency.Template = require("./ContextDependencyTemplateAsRequireCall");
