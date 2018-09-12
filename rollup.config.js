// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
// import commonjs from 'rollup-plugin-commonjs';

function wat(key, value) {
  console.log(`${key}: ${value}`);
  return value;
}

export default {
  input: './src/main.js',
  output: {
    file: 'index.js',
    format: wat('format', 'cjs')
  },
  plugins: [
    // commonjs({
    //   include: 'node_modules/**'
    // }),
    globals(),
    builtins(),

    resolve({
      // use "module" field for ES6 module if possible
      // module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      // jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      // main: true,  // Default: true

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      // browser: false,  // Default: false

      // not all files you want to resolve are .js files
      // extensions: ['.mjs', '.js', '.jsx', '.json'],  // Default: [ '.mjs', '.js', '.json', '.node' ]

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      // preferBuiltins: true,  // Default: true

      // Set to an array of strings and/or regexps to lock the module search
      // to modules that match at least one entry. Modules not matching any
      // entry will be marked as external
      // only: ['some_module', /^@some_scope\/.*$/], // Default: null

      // If true, inspect resolved files to check that they are
      // ES2015 modules
      // modulesOnly: false, // Default: false

      // Any additional options that should be passed through
      // to node-resolve
      // customResolveOptions: {
      //   moduleDirectory: 'js_modules'
      // }
    })
  ]
};