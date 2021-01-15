# CRACO Electron

A simple [CRACO](https://www.npmjs.com/package/@craco/craco) configuration for [Electron](http://electronjs.org/) apps.

<!-- You can treat this package as a react-scripts which modifies webpack config: `target: "electron-renderer"`, so your IPC *will* work. -->

- [CRACO Electron](#craco-electron)
  - [TL;DR](#tldr)
  - [Default Presets](#default-presets)
  - [TODO](#todo)

## TL;DR

1. Install this package

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

> Note: you could still override this variables.

## TODO

- Script `start-main` for starting Electron process
