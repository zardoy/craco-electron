#!/usr/bin/env node

const execa = require("execa");
// assumed that the command executed from the NPM script in root package.json

((envDefaults) => {
    Object.entries(envDefaults).forEach(([envVar, defaultValue]) => {
        if (!process.env[envVar]) process.env[envVar] = defaultValue;
    })
})({
    PORT: 3500,
    BROWSER: "none"
})

const scriptName = process.argv[2];

const cracoProcess = execa(
    "craco",
    [scriptName, "--config", require.resolve("./craco.config.js")],
    {
        preferLocal: true,
        stdio: "inherit"
    }
);

cracoProcess
    .finally(() => {
        process.exit(process.exitCode);
    })
