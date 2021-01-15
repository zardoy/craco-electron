#!/usr/bin/env node

const execa = require("execa");
// assumed that the command executed from the NPM script in root package.json

if (!process.env.PORT) process.env.PORT = 3500;
if (!process.env.BROWSER) process.env.BROWSER = "none";

const scriptName = process.argv[2];

const cracoProcess = execa(
    "craco",
    [scriptName, "--config", require.resolve("./craco.config.js")],
    { preferLocal: true }
);
cracoProcess.stdout.pipe(process.stdout);
cracoProcess.stderr.pipe(process.stderr);

cracoProcess
    .finally(() => {
        process.exit(process.exitCode);
    })
