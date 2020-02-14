# Udemy - Webpack 2020

## Integrating Webpack

Generate a package.json file

```
npm init
```

Install Webpack and Webpack CLI

```
npm install webpack webpack-cli --save-dev
```

The --save-dev flag will save the package to the local project directory.
This is useful incase other developers download or use the application. Since all of the dependencies will be locally saved, and listed, they can install all the dependencies needed to run the application.

Using

```
npm install
```

The configuration for webpack is generally stored in a _webpack.config.js_ file.

Inside the _module.exports_ Object, you can store many different configurations. Generally the first is the _entry_ point.

This is where webpack starts when running the build process, and looks for all dependencies related to this file.

Next option is the _output_ point. Here is where you can specify the name of the file, and a path to the directory where this file should be generated. Typically in a _dist_ folder.

_Webpack will automatically create the directory if it doesn't yet exist._

The last mandatory option is _mode:_
By default, this is set to production.

Inside the _package.json_ file there is a _"scripts"_. The _test_ script does not do anything and is put there by default.

Here you can create scripts that can run in the terminal.

```
"build": "webpack"
```

Here we are creating a script called _build_ that just runs webpack. To run this script, or other scripts like it, just call it with npm

```
npm run build
```

Using webpack allows you to use imports and exports to link your javascript files and their dependencies.

Doing this removes the need of maintaining multiple script tags in your index.html file. You can simply link a single JavaScript file, and use webpack to manage all of the depencies of that file.

The syntax is _ES6 Modules_. Webpack supports _ES6 Modules by Default_.

Inside the _index.html_ remember to link to the **bundled** js file.

In your webpack config, make sure to specify the output to an _absolute path_ There is a node package that helps you create absolute paths. You must _require_ it inside of your webpack config.

Keep in mind, you are using _commonjs_ and not ES6 modules, because _modules_ are not supported inside of the _webpack.config_ file.

```
const path = require('path');
```

The _path.resolve_ function converts a sequence of path segments to an absolute path.

The first argument (generally **dirname**) is the _current directory_ while the second argument is the _related directory_ generally _./dist_

## Loaders

At it's core, _webpack_ is a _Bundler_ but bundling is not all webpack can do. You can use **loaders** to import other features such as compiling SASS, as well as importing all our images.

Remember, everything is being imported into 1 main JavaScript file, and that JavaScript file is being ran through webpack to bundle all of it's dependencies.

Under the mode, is generally a _module_ property. This property takes another property, _rules_ which then takes an _array_ of _objects_

Each object should contain at least 2 properties.

1. A _test_ property
1. A _use_ property

The _property_ uses a regular expression and checks for specific files or file extensions.

The _use_ property takes an _array_ of any _loaders_ needed for the specific test cases.

With this, everytime you try to import one of the specified file or extension, webpack will check if it has a rule for it. If it doesn't find a suitable rule, it will give an error.

However, if it does find a rule for that file, it will _import_ that file according to that _rule_

Webpack, does come with the ability to already know how to import certain files without any rules, for example, _JavaScript_ files.

### Images with Webpack

There are many _loaders_ that can be used for many different files, you just need to know and understand which ones you want or need, and install them.

Commonly, _file-loader_ tells webpack to copy the required file, into the output folder.

File-loader, once adding a copy of the specified files, gives them a _MD5_ hash, but doesn't point it in the direction of our file.

You will need to add a _publicPath_ property to the _output_ property of the webpack.config, to tell webpack where all the generated files will be located.

Let's assume for a moment, this is a website deployed on a server somewhere, with a registered domain name...

```
http://the-best-website.com/
```

You will need to _change_ the _publicPath_ to this domain if you want these files, and commonly, images, to load correctly.

### Handling CSS with Webpack

The reason importing CSS into your JavaScript has become so important, is because many popular libraries and frameworks have made it a best practice to seperate your web application into individual components, with their own logic and styling.

This makes it much easier to debug and maintain certain components with isolated logic and styling related to each individual component. Along with making components reuseable.

Webpack doesn't automatically know how to handle CSS files. For this, you must create new rules for these files.

For CSS, you use _style-loader_ and _css-loader_

**css-loader** will read our CSS from the file,
**style-loader** will create style tags inside the HTML page and put the CSS into it.

## Handling SASS files

Configuring webpack to use _SASS_ is almost the same as CSS files, except for 1 additional loader, _sass-loader_

It is crucial to order your rule loaders correctly.

```
use: [
    'style-loader',
    'css-loader',
    'sass-loader'
]
```

Webpack reads these rules from bottom to top.

First, it will use the _sass-loader_ to compile the sass to css.

Second, it will use _css-loader_ taking that now compiled CSS, and turn it into JavaScript.

and Finally, it will use _style-loader_ to turn that JavaScript back into CSS and injecting it into style tags, at the top of the HTML document.

## Using Babel 7 to compile ES6+ to ES5

One example of why using _Babel_ is helpful and important is because inside of _Classes_ we can only use methods currently, as properties are not yet fully supported, but using Babel, you can use properties, to create for example class variables, and add them dynamically inside of hardcoded.

#### Without Babel

```js
class button {
  render() {
    const button = document.createElement('button');
    button.classList.add('hello-world-button');
  }
}
```

#### With Babel

```js
class button {
  buttonCssClass = 'hello-world-button';

  render() {
    button.classList.add(this.buttonCssClass);
  }
}
```

To be able to use these features, you must install and use

- @babel/core,
- babel-loader,
- @babel/preset-env
- babel-plugin-transform-class-properties

Creating a new ruleset for _js\$_ files.

You can exclude the **node_modules** folder as you don't want to run it through babel everytime you build or compile your project.

You can use the _preset_ property, to _@babel/env_

_env_ includes all of the features from the _latest_ ECMAScript specification, and helps us compile our ES6+ down to ES5.

There are many features that are unsupported still. If you need to use another modern feature of JavaScript, you can search for another plugin for it and add it to the list of plugins. You can use as many plugins as you like.

Now, using Babel, Webpack will use _babel-loader_ for the JavaScript files, and if any of them use any newer JavaScript features that are not yet supported or in the official specification yet, Webpack will convert it to older JavaScript, which is understood by all browsers and NodeJs.

## Plugins

- Plugins are additional JavaScript libraries that do everything that loaders cannot do.

- _Loaders_ more specifically handle other types of files. (CSS, SASS, Image, JS, XML, ect.)

- Plugins can also modify how the bundles themselves are created. _For example,_ **uglifyJSPlugin** takes the bundle.js and minimizes the contents to decrease the bundle size.

```
plugins: [
    new PluginName()
]
```

## Minify the Bundle

Minifying can reduce the size of the resulting bundle. Which can lead to better performance, and less network traffic.

In this example we used _Terser Plugin_ to minify our bundle. This is a relatively _new_ way to minify your bundle. Earlier, Webpack was using _UglifyJS Plugin_ for the same purposes.

You can still use _uglify_ however, _Terser_ is the _recommended_ way now.

## Extracting CSS into a Seperate Bundle

Earlier we learned how to import our CSS files into our JavaScript files. We accomplished this using _css-loader_ and _style-loader._ Which results in all of our styles being injected into a style tag in the HTML document, or DOM.

Even though this is fine for _Development_ purposes, this is not good for _Production._

All of our styles are bundled together with our JavaScript in a single _bundle.js_ file, which are then Dynamically added to the DOM by JavaScript during runtime.

The biggest problem with this approach is that the _bundle_ file can become much bigger over time. Big files require more time to load.

An easy solution to this problem is to seperate our CSS into a separate file that will be generated alongside our JavaScript bundle.

This way we can have two bundles instead of one big one. It will decrease the overall size of the JavaScript Bundle making it much faster to download. Also, this allows us to load several files in parallel, making the overall experience better.

The name of the plugin used to achieve this is _mini-css-extract-plugin_

Once added to the plugins, you can pass an object as an argument, with some properties. Like a _filename_ property, to specify a name for the bundled css file.

Don't forget to update the rules for _css_ and _scss_ files. Simply replace _style-loader_ with **MiniCssExtractPlugin.loader**

## Browser Caching

Each time a user reloads the page, the browser must re-download all the assets (javascript, css, images, ect.) to be displayed again.

This can become an issue, especially for mobile devices on slower connections.

Fortunately you can aleviate some of this with _Browser Caching_

If the page, or a part of the page didn't change, between reloads, the browser will _save_ it, or _cache_ it.

That way the user will only need to download any assets or code that was changed from the previous page load. Saving them from downloading uneccessary files.

_However_ if the browser is always taking the file from _cache_ the user will never get the newer version if there is one. Therefore you need a mechanism for updating the cache.

One of the most popular approaches is creating a new file with a new name each time you make a change. Browsers remember files by name. Therefore if the name changes, browsers will download the new version.

One of the best practices is to add a _MD5 Hash_ to the name of the file.

For example, say you changed some styles in your CSS file. Webpack would generate a new name for the CSS file but still use the same JavaScript files with their original name stored in the _cache_

For this to work, you simply add **[contenthash]** to the _filename_, of the _output_, in _webpack.config_.

```
module-exports = {
    entry: './src/index.js',
    output{
        filename: 'bundle.[contenthash].js',
    }
}
```

Don't forget to also add the _contenthash_ to your CSS files as well.

Keep in mind that each time you save and build your application, you will create a new file with a new _MD5 Hash_

## Cleaning Dist Folder

Now we will need to implement a way to clean out those old files, before generating new bundles. Otherwise the _/dist_ folder will fill up with each older version.

Fortunately, Webpack has a plugin for this aswell! It is called _CleanWebpackPlugin_

This plugin will remove all the files in the dist folder each time you run webpack, before generating new ones.

_REMEMBER_ Your HTML file/files will break! You need to change references of your JavaScript and CSS files with their new MD5 Hashes.

## Generating HTML Files Automatically

You can also install and use _HTMLWebpackPlugin_ to update your HTML files automatically.

When webpack builds your application with the _HTMLWebpackPlugin_ installed, it will generate a new html file in the output, or _dist_ folder. You will notice that the references are prefixed with _dist/_ still. This is no longer needed as the HTML file now resides inside the same folder as the JavaScript and CSS files.

Simply change the _publicPath_ option in the webpack.config to empty.

Typically you may at this point have a HTML file inside of the root directory. Because webpack is now generating the HTML file in the dist folder, the root copy is no longer needed and may be removed.

## Customizing Generated HTML Files

Inside the HTML plugin, you can specify _options_ inside an Object. Some of these options can include,

- Custom Filename
- Title
- Meta data / Description

You can find a full list of options on the plugins Github page.

## Integrating "Handlebars"

You can use a _template engine_ to create templates for generating HTML files. Some of the engines include,

- pug
- ejs
- underscore
- handlebars
- html-loader

For this course particular workspace, we are using _Handlebars_

_Handlebars_ is a _template engine_ that allows you to separate the _business logic_ from the _presentation_

If/when you find yourself generating HTML inside of your JavaScript, then you probably need some kind of _Template Engine_

With a templating engine, you can use the variables in webpack to assign values inside of your HTML template.

With handlebars, you create your HTML files with an _".hbs"_ file extension.

Inside your HTML plugin, you need to specify the path to the new _template_ html file you plan to use.

Also you must create a new _rule_ to inform webpack how to _handle_ the new file extension. For handlebars, you use _handlebars-loader_

Once _handlebars_ is installed and setup, you will notice it will take your _.hbs_ file, and spit out an _index.html_ file after the build process in the dist folder.

Note: When trying to use the webpack.config variables setup inside your HtmlWebpackPlugin, they must be inserted inside of double curly braces ( {{ insert.variable.here }} )

You also must use dot notation to access these properties since they are written inside of Object literals inside the webpack configuration.

#### More Plugins

You can find a full list of additional plugins on the official Webpack page.

## Production vs Development Builds

Usually _production_ builds require a different setup than _development_ builds.

In _production,_ you generally want your website or application to be as _fast as possible_ aswell as your bundles to be as _small as possible_

In _development,_ you generally want to see additional information inside your JavaScript. For example, _source maps_

## Mode

_production_ mode comes with a long list of plugins added by default. Plugins like _Terser_

When running your code in the browser, and look inside the sources tab. You will see your files are minified. This can make it hard to read and debug, as you build out your application.

In _development_ mode, webpack won't minify the code. Therefore you can debug and edit your code, faster and much easier.

The reason for this is called _source maps._

## Managing Webpack Config for Prod/Dev use cases

In this module we created 2 different npm scripts for a _Development_ build process and a _Production_ build process.
We completely removed _Terser_ from webpack because in neither case would we need it. In production, the production mode includes this by default. In development, it's better to not have your code minified while you develop your application.

In the _Development_ config file, we also removed CSS minification also, to help us while we build out our applications.

## Webpack Dev Server
