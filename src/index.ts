import electronIsDev from "electron-is-dev";
import path from "path";
import pkgDir from "pkg-dir";
import fs from "fs";
import { cracoElectronLaunchFile } from "./shared";

// these vars are for external configuration
export let compiledAssetsPath = `../build`;
// could be changed to 404.html for example
export let mainPageFile = "index.html";

// todo make typed
/**
 * Get path to asset, which you should keep in public/ directory
 * 
 * @param pathToFile relative path to file from public/
 */
export const getFileFromPublic = (pathToFile: string): string => {
    if (electronIsDev) {
        const rootProjectDir = pkgDir.sync();
        if (!rootProjectDir) throw new Error("Unable to determine the root of project. Check cwd, probably there is no package.json file");
        return path.join(rootProjectDir, "public", pathToFile);
    } else {
        // todo explain
        return path.join(__dirname, compiledAssetsPath, pathToFile);
    }
};

export const getMainPageUrl = () => {
    if (electronIsDev) {
        if (!fs.existsSync(cracoElectronLaunchFile)) {
            return path.join(__dirname, "assets/server-not-started.html");
        } else {
            const launchConfig = JSON.parse(fs.readFileSync(cracoElectronLaunchFile, "utf-8"));
            if (!("starting" in launchConfig)) throw new Error("Incorrect launch config. Rerun `craco-electron start` command");
            let { HOST = "localhost", PORT } = launchConfig.reactScripts;
            if (!HOST.startsWith("http")) HOST = `http://${HOST}`;
            const url = `${HOST}:${PORT}`;
            if (launchConfig.starting) {
                return path.join(__dirname, "assets/server-not-started.html");
            } else {
                return url;
            }
        }
    } else {
        return `file://${getFileFromPublic(mainPageFile)}`;
    }
};
