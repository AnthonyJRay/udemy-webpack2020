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
