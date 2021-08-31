const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

if (
  !process.env.F_apiKey ||
  !process.env.F_authDomain ||
  !process.env.F_databaseURL ||
  !process.env.F_projectId ||
  !process.env.F_storageBucket ||
  !process.env.F_messagingSenderId
) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1);
}

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   firebase: {
    apiKey: "${process.env.F_apiKey}",
    authDomain: "${process.env.F_authDomain}",
    databaseURL: "${process.env.F_databaseURL}",
    projectId: "${process.env.F_projectId}",
    storageBucket: "${process.env.F_storageBucket}",
    messagingSenderId: "${process.env.F_messagingSenderId}"
  }
};`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
