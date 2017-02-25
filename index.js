'use strict';

var fs = require('fs');
var path = require('path');

function HtmlWebpackLayoutPlugin (options) {}

HtmlWebpackLayoutPlugin.prototype.apply = function (compiler) {
  var that = this;
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      htmlPluginData.html = that.handleLayout( htmlPluginData.html , htmlPluginData.plugin.options);
      callback(null, htmlPluginData);
    });
  });
};


HtmlWebpackLayoutPlugin.prototype.handleLayout = function ( html, options ){

  if(options.layout){
      var replace = options.replace;
      var layout = fs.readFileSync(options.layout, 'utf-8');
      var reg = new RegExp('{{content}}');
      html = layout.replace(reg, html);

      if(typeof replace === 'object'){
        var tag_content = '';
        for(var tag in replace){
            reg = new RegExp('{{' + tag + '}}');
            tag_content = fs.readFileSync(replace[tag], 'utf-8');
            html = html.replace(reg, tag_content);
        }
      }
  }

  return html;
}


module.exports = HtmlWebpackLayoutPlugin;
