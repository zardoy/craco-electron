#!/usr/bin/env node

import execa from "execa";
import fs from "fs";
import waitOn from "wait-on";

import { cracoElectronDir, cracoElectronLaunchFile } from "./shared";

// IMPORTANT: assumed that the command executed from the NPM script from app root

const scriptName = process.argv[2];
const launchConfig = {
    starting: true,
    reactScripts: {} as Record<string, string>
};

if (scriptName === "start") {
    (async () => {
        const startEnvDefaults = {
            PORT: 3500,
            BROWSER: "none",
            PUBLIC_URL: "./"
        };

        for (const [envVar, defaultValue] of Object.entries(startEnvDefaults)) {
            if (!process.env[envVar]) process.env[envVar] = defaultValue.toString();
            launchConfig.reactScripts[envVar] = process.env[envVar] || "";
        }

        if (!fs.existsSync(cracoElectronDir)) fs.mkdirSync(cracoElectronDir);
        await fs.promises.writeFile(
            cracoElectronLaunchFile,
            JSON.stringify(launchConfig)
        );
    })().catch(err => { throw err; });
}

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
        if (fs.existsSync(cracoElectronLaunchFile)) fs.unlinkSync(cracoElectronLaunchFile);
        process.exit(process.exitCode);
    });

if (scriptName === "start") {
    (async () => {
        let url = (process.env.HOST || "localhost") + ":" + (process.env.PORT);
        if (!url.startsWith("http")) url = "http://" + url;
        await waitOn({
            resources: [url]
        });
        launchConfig.starting = false;
        await fs.promises.writeFile(
            cracoElectronLaunchFile,
            JSON.stringify(launchConfig)
        );
    })().catch(err => { throw err; });
}
