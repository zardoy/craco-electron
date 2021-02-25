# CRACO Electron

I personally think it's the best tool for developing every Electron application.
It's some sort a replacement for `electron-forge` for starting both main and renderer process.

> `react-scripts` already included in dependencies. You don't need to install it.
> peer dependencies (they must be installed): `electron`, `typescript`

- [CRACO Electron](#craco-electron)
  - [Usage](#usage)
    - [New projects](#new-projects)
    - [Existing projects](#existing-projects)
  - [Why this?](#why-this)
  - [Defaults](#defaults)
  - [Runtime usage](#runtime-usage)
  - [Things to note](#things-to-note)
  - [TODO](#todo)

## Usage

### New projects

To be done

### Existing projects

1. Install it: `npm i craco-electron` or `yarn add craco-electron`

2. In your `package.json` add (or replace) scripts for `main` and `renderer` sides:

```diff
{
    ...
    "scripts": {
+       "start:main": "craco-electron start-main",
-       "start": "react-scripts start",
+       "start:renderer": "craco-electron start",
-       "build": "react-scripts start",
+       "build:renderer": "craco-electron build"
    }
    ...
}
```

## Why this?

- Dead simple electron main process development -- just save the file and you'll see changes instantly.
You don't need to write `rs` every time in console anymore.

- Dead simple configuration: new config files at all.

- Graceful pages if renderer side (webpack-server) is starting or not available

## Defaults

This library brings some reasonable defaults (of course you still could override them).

Default `react-scripts` environment variables:

- `PORT=3500`
- `BROWSER=none`
- `PUBLIC_URL=./`

Electron (main process part):

- Entrypoint automatically selected from tsconfig.json: `

## Runtime usage

This library brings not only cli. You can use these helpers in runtime:

- `getFileFromPublic`
- `getMainPageUrl`

For api see `src/`.

## Things to note

- jsconfig.json is just ignored
- I don't better lib that this one

## TODO

- Doesn't work with dynamic port (if you choose yes on unavailable port)
- Script `start-main` for starting Electron process
- Change default `src/` to `src/react/`
