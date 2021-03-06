# Todo App

  The top level goal is to design a weather application that consumes an external api.

  The main focus is to demonstrate developer's ability to 
  - Organize a JavaScript code base 
  - Use and understand JavaScript patterns such as constructor, factory and module
  - Use vanilla Javascript to achieve the above tasks
  - Use a modern bundler such as `Webpack` to manage static assets (css/js/images)
  - Understand new JavaScript language features `(ECMAScript 6 and beyond)`
  - Use `Async/Await` Patterns and/or `Promises`
  - Use `Linters` to follow coding styles (both on local machines and on GitHub)

## Getting Started

Clone this repository on your machine, build the project using webpack, then navigate to the directory named `dist` which has all built files. 

Open the index page within it using a browser.

### Prerequisites

The software does not have any prerequisites, but in case you need to modify it then the following software can should be present on you machine

* [NPM](https://nodejs.org/en/) node package manage
* [Visual Studio Code](https://code.visualstudio.com/) or any other modern IDE of your choice as long as it supports editing `HTML/CSS/JS` files

### Installing

For installation of the above listed software please visit their official websites for a quick start, since no custom settings are required. 

To begin customizing the software from an IDE follow these steps:

First Run in the project root folder
```shell
npm run  dev

```

Then check the index page generated under the dist folder, open the page in the browser to view the application. 
For a more optimized build with webpack use the script tagged with production in the `package.json` file

```shell
npm run production
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](github.com/igakigongo/js-weather-app/tags). 

## Authors

* [**Edward Iga Kigongo**](github.com/igakigongo)

## License

The project and all associated source code are free for redistribution and modification.