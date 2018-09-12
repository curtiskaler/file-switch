const path = require('path');
const fs = require('fs');

module.exports = function(config) {
    const module = {};

    function getSourcePath(keyToUse) {
        try {
            // read config
            let rootPath = config.root;
            let sourceFolder = config.source.folder;
            let sourceFile = config.source.files.find(file => file.key.toLowerCase() === keyToUse.toLowerCase());
            
            let sourceFileName = sourceFile.fileName;
            let displayName = sourceFile.displayName;

            if (config.debug) {
                console.log(' ');
                console.log('***************************************************************************************');
                console.log(`Root:        [${rootPath}]`);
                console.log(`Source`);
                console.log(`     folder: [${sourceFolder}]`);
                console.log(`     file:   [${sourceFileName}]`);
                console.log(`displayName: [${displayName}]`);
                console.log(' ');
            }

            // normalize paths
            let result = resolvePath(__dirname, rootPath, sourceFolder, sourceFileName);

            return [result, displayName];

        } catch (exception) {
            console.error('Could not identify source file.');
            console.error(exception);
            return null;
        }
    }

    function getDestinationPath() {
        try {
            // read config
            let rootPath = config.root;
            let destinationFolder = config.destination.folder;
            let destinationFileName = config.destination.fileName;

            if (config.debug) {
                console.log(' ');
                console.log('***************************************************************************************');
                console.log(`Root:        [${rootPath}]`);
                console.log(`Destination`);
                console.log(`     folder: [${destinationFolder}]`);
                console.log(`     file:   [${destinationFileName}]`);
                console.log(' ');
            }

            // normalize paths
            let result = path.resolve(__dirname, rootPath, destinationFolder, destinationFileName);

            if (config.debug) {
                console.log(`   resolved: [${result}]`);
                console.log(' ');
            }

            return result;

        } catch (exception) {
            console.error('Could not identify destination file.');
            console.error(exception);
            return null;
        }
    }

    function showArguments(keyToUse) {
        try {
            if (config.debug) {
                console.log(' ');
                console.log('***************************************************************************************');
                console.log('Arguments:');
                console.log('config:');
                console.log(config);
                console.log(' ');
                console.log(`Key to use:  ['${keyToUse}']`);
                console.log(' ');
            }
        } catch (exception) {
            console.error('Could not display config file.');
            console.error(exception);
        }
    }

    function copyFile(srcPath, destPath) {
        if (!fs.existsSync(srcPath)) {
            console.error(`ERROR: file does not exist. [${srcPath}] `);
            process.exit(1);
        }

        fs.copyFile(srcPath, destPath, (err) => {
            console.error(err)
        });
    }

    function resolvePath(...args) {
        let result = path.resolve(...args);

        if (config.debug) {
            console.log(`   resolved: [${result}]`);
            console.log(' ');
        }

        return result;
    }

    module.useFile = function(keyToUse) {

        if (config.debug) {
            showArguments(keyToUse);
        }

        let [src, displayName] = getSourcePath(keyToUse);
        let dest = getDestinationPath();

        if (config.debug) {
            console.log(' ');
            console.log('***************************************************************************************');
            console.log(`Resolved`);
            console.log(`     source: [${src}]`);
            console.log(`destination: [${dest}]`);
            console.log(' ');
        }

        // copy the file
        copyFile(src, dest);

        console.log(`Using file: ${displayName}        [${src}]`);
        console.log(' ');

        return src;
    };

    return module;
};
