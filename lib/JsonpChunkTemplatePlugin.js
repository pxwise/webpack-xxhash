/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ConcatSource = require("webpack-sources").ConcatSource;
var Template = require("./Template");

function JsonpChunkTemplatePlugin() {}
module.exports = JsonpChunkTemplatePlugin;

JsonpChunkTemplatePlugin.prototype.apply = function(chunkTemplate) {
	chunkTemplate.plugin("render", function(modules, chunk) {
		var jsonpFunction = this.outputOptions.jsonpFunction;
		var source = new ConcatSource();
		source.add(jsonpFunction + "(" + JSON.stringify(chunk.ids) + ",");
		source.add(modules);
		var entries = [chunk.entryModule].filter(Boolean).map(function(m) {
			return m.id;
		});
		if(entries.length > 0) {
			source.add("," + JSON.stringify(entries));
		}
		source.add(")");
		return source;
	});
	chunkTemplate.plugin("hash", function(hash) {
		hash.update(new Buffer("JsonpChunkTemplatePlugin"));
		hash.update(new Buffer("3"));
		hash.update(new Buffer(this.outputOptions.jsonpFunction + ""));
		hash.update(new Buffer(this.outputOptions.library + ""));
	});
};
