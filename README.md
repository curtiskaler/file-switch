# file-switch
Switches files based on a given key.


[![Build Status](https://travis-ci.org/curtiskaler/file-switch.svg?branch=master)](https://travis-ci.org/curtiskaler/file-switch)
[![Coverage Status](https://coveralls.io/repos/curtiskaler/file-switch/badge.svg?branch=master&service=github)](https://coveralls.io/github/curtiskaler/file-switch?branch=master)
[![npm](https://img.shields.io/npm/v/file-switch.svg)](https://www.npmjs.com/package/file-switch) 


## <a name="purpose"></a>Purpose

Suppose your final, bundled application uses variables in `environment.ts`, but those variables might change depending on whether the environment you're working on is development or production. 

So you want to keep a few different files around (e.g., `environment-dev.ts` and `environment-prod.ts`) and swap them in and out depending on whether you're running in `dev` or `prod`.  

You might have a folder structure like this:
```
project
│   package.json
│   ...  
│
├───src
│   │
│   ├───app
│   │   │
│   │   └───configuration
│   │          environment.ts
│   │
│   └───environments
│           environment-dev.ts
│           environment-prod.ts
```

In this case, you want to copy the appropriate `environment-***.ts` file into the `src/app/config` folder, and name it `environment.ts`.


## Install
```
npm install file-switch --save-dev
```


## <a name="usage"></a>Usage

In your build script (or `webpack.config.js`), you might use the following:

```js
const switchFile = require('switch-file');

const isProd = (process.env.NODE_ENV === 'production');

const options = {
    sources: [
        { key: 'dev',  path: 'src/environments/environment-dev.ts'  },
        { key: 'prod', path: 'src/environments/environment-prod.ts' }
    ],
    destination: {
		path: 'src/app/configuration/environment.ts'
    }
};

new switchFile(options).useFile(isProd ? 'prod' : 'dev');

```

## <a name="api"></a>API

### `useFile(key)` → `path`
Copies the source file with the given key to the destination path specified in the `options`, and returns the absolute path of the source file.


## <a name="config"></a>Configuration Options

```js
const options = {
	// (optional) - the absolute or relative location of the root folder of the project
	root: '../../..',
	
	// (optional) - determines whether to show additional console logging statements about source, destination, and result.
	debug: false,

	// options related to the source files
	sources: [
	    { 
			// the key to use for this file
			key: 'dev',  
			
			// (optional) - the display name to use in the console output 
			displayName: 'DEVELOPMENT', 

			// the path where this file resides
			path: 'src/environments/environment-dev.ts'  
		},
	    { key: 'prod', displayName: 'PRODUCTION',  path: 'src/environments/environment-prod.ts' }
	],
	
	// options related to the destination file
	destination: {

		// the full path where you want the source file copied, including the destination filename.
		path: 'src/app/configuration/environment.ts'
    }
}
```



## <a name="license"></a>License

MIT © [Curtis Kaler](https://github.com/curtiskaler)
