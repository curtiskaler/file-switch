

import fs from 'fs';
import logger from './logger.js';

export default {
  copyFile: (sourcePath, destinationPath) => {
    if (!fs.existsSync(sourcePath)) {
      logger.error(`ERROR: file does not exist. [${sourcePath}] `);
      process.exit(1);
    }

    fs.copyFile(sourcePath, destinationPath, (err) => {
      logger.error(err);
    });
  }
};
