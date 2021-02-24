# CRACO Electron

A simple [CRACO](https://www.npmjs.com/package/@craco/craco) configuration for [Electron](http://electronjs.org/) apps.

> `react-scripts` already included in dependencies. You don't need to install it.
<!-- You can treat this package as a react-scripts which modifies webpack config: `target: "electron-renderer"`, so your IPC *will* work. -->

- [CRACO Electron](#craco-electron)
  - [TL;DR](#tldr)
  - [Default Presets](#default-presets)
  - [Runtime usage](#runtime-usage)
  - [Start-electron](#start-electron)
  - [TODO](#todo)

## TL;DR

1. Install it: `npm` or `yarn add craco-electron`

2. In your `package.json`:

```diff
{
    ...
    "scripts": {
-       "start": "react-scripts start",
+       "start-renderer": "craco-electron start",
-       "build": "react-scripts start",
+       "build-renderer": "craco-electron build"
    }
    ...
}
```

## Default Presets

- `PORT=3500`
- `BROWSER=none`
- `PUBLIC_URL=./`

> Note: you can still override this variables.

## Runtime usage

This library brings not only cli. You can use these helpers in runtime:

- `getFileFromPublic`
- `getMainPageUrl`

For api see `src/`.

## Start-electron

I highly recommend to use this script `start-electron` for starting electron in dev (instead of *electron-forge* for example).

Why:

- It automatically launches in `tsc` in watch mode, it means that you don't need to rerun your script when you change file
- Less boilerplates:
  - Entrypoint file: `
  - 

## TODO

- Script `start-main` for starting Electron process
- Change default `src/` to `src/react/`
