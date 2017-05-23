# cubx-grunt-prepare-webpackage-release

[![Build Status](https://travis-ci.org/cubbles/cubx-grunt-prepare-webpackage-release.svg?branch=master)](https://travis-ci.org/cubbles/cubx-grunt-prepare-webpackage-release)

Grunt plugin for preparing and finishing the release of a webpackage

## Usage:

### Default

Install the grunt plugin 

```
npm install cubx-grunt-prepare-webpackage-release --save-dev
```

Gruntfile

* Load the grunt plugin
    
```    
grunt.loadNpmTasks(cubx-grunt-prepare-webpackage-release)
```
        
* Set config (path to webpackage to convert 
    
```        
grunt.initConfig({
   webpackagepath: ...
});
```

 
### integrate in devtools: 
* Just install grunt plugin
  
```
npm install cubx-grunt-prepare-webpackage-release --save
```
