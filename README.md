Layout extension for the HTML Webpack Plugin
========================================

Enhances [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin), fork from [html-webpack-layout-plugin](https://github.com/Justinidlerz/html-webpack-layout-plugin).
functionality by adding the `{layout: 'layoutPath', replace : {'tag':html_content}}` option.

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) - a plugin that simplifies the creation of HTML files to serve your webpack bundles.

Installation
------------
You must be running webpack on node 0.12.x or higher

Install the plugin with npm:
```shell
$ npm install --save-dev html-webpack-layout-more-plugin
```

Basic Usage
-----------
Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackLayoutMorePlugin()
]
```
The above configuration will actually do nothing due to the configuration defaults.

As soon as you now set `layout` to a path the generated output of the HtmlWebpackPlugin will
always add a layout. 
```javascript
plugins: [
  new HtmlWebpackPlugin({
		layout: path.join(__dirname, 'layout.html'),
        replace: {
            'page_siderbar': path.join(__dirname, 'src/layouts/page-siderbar.html'),
            'page_footer': path.join(__dirname, 'src/layouts/page-footer.html'),
        }
	}),
  new HtmlWebpackLayoutMorePlugin()
]  
```

layout.html   
```html
<html>
	<head></head>
	<body>
        {{page_siderbar}}
		{{content}}
        {{page_footer}}
	</body>
</html>

```

Even if you generate multiple files make sure that you add the HtmlWebpackLayoutPlugin **only once**:

```javascript
plugins: [
  new HtmlWebpackPlugin({
		layout: path.join(__dirname, 'layout.html')
	}),
  new HtmlWebpackPlugin({
		layout: path.join(__dirname, 'layout.html'),
		filename: 'demo.html'
	}),
  new HtmlWebpackPlugin({
		layout: path.join(__dirname, 'layout.html'),
		filename: 'test.html'
	}),
  new HtmlWebpackLayoutMorePlugin()
]  
```
