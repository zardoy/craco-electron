#!/usr/bin/env node

import execa from "execa";
import fs from "fs/promises";
import path from "path";

// assumed that the command executed from the NPM script from app root

(async () => {
    ((envDefaults) => {
        Object.entries(envDefaults).forEach(([envVar, defaultValue]) => {
            if (!process.env[envVar]) process.env[envVar] = defaultValue.toString();
        });
        fs.writeFile(
            path.join(__dirname, "./launchConfig.json"),
        )
    })({
        PORT: 3500,
        BROWSER: "none",
        PUBLIC_URL: "./"
    });
})();

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
