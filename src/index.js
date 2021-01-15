#!/usr/bin/env node

const execa = require("execa");
// assumed that the command executed from the NPM script in root package.json

const cracoProcess = execa(
    "craco",
    [process.env[2], "--config", require.resolve("./craco.config.js")],
    { preferLocal: true }
);
cracoProcess.stdout.pipe(process.stdout);
cracoProcess.stderr.pipe(process.stderr);

cracoProcess
    .finally(() => {
        process.exit(process.exitCode);
    })
