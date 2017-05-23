# cubx-grunt-set-webpackage-version

[![Build Status](https://travis-ci.org/cubbles/cubx-grunt-set-webpackage-version.svg?branch=master)](https://travis-ci.org/cubbles/cubx-grunt-set-webpackage-version)

Grunt plugin for setting the version of a webpackage

## Usage:

### default

install the grunt plugin 

```
npm install cubx-grunt-set-webpackage-version --save-dev
```

Gruntfile

* load the grunt plugin
    
```    
grunt.loadNpmTasks(cubx-grunt-set-webpackage-version)
```
        
* set config (path to webpackage to convert 
    
```        
grunt.initConfig({
   webpackagepath: ...
});
```

 
### integrate in devtools: 
* Just install grunt plugin
  
```
npm install -set-webpackage-version --save
```
