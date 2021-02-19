#!/usr/bin/env node

import execa from "execa";

// assumed that the command executed from the NPM script from app root

((envDefaults) => {
    Object.entries(envDefaults).forEach(([envVar, defaultValue]) => {
        if (!process.env[envVar]) process.env[envVar] = defaultValue.toString();
    });
})({
    PORT: 3500,
    BROWSER: "none",
    PUBLIC_URL: "./"
});

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
    });
