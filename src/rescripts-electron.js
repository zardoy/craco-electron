#!/usr/bin/env node

const execa = require("execa");
const path = require("path");
const mockRequire = require("mock-require");
// assumed that the command executed from the NPM script in root package.json
const projectRoot = process.cwd();

// copied from https://github.com/elv1n/cra-workspaces/tree/master/scripts/utils/mockOverrides.js

const rescriptsrcFile = ".rescriptsrc.js";
// with this function we're pretending that .rescriptsrc.js in the project root
mockRequire(path.join(projectRoot, rescriptsrcFile), rescriptsrcFile);

const rescriptsProcess = execa("rescripts", process.argv.slice(2), {
    preferLocal: true
});
rescriptsProcess.stdout.pipe(process.stdout);
rescriptsProcess.stderr.pipe(process.stderr);

rescriptsProcess
    .finally(() => {
        process.exit(process.exitCode);
    })
