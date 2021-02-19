import electronIsDev from "electron-is-dev";
import path from "path";
import pkgDir from "pkg-dir";

// for external configuration
export let compiledAssetsPath = `../${process.env.BUILD || "build"}`;
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
    let host = process.env.HOST || "localhost";
    if (!host.startsWith("http")) host = `http://${host}`;
    return electronIsDev ? `${host}:${process.env.PORT}` : `file://${getFileFromPublic(mainPageFile)}`;
};
