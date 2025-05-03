const path = require("path");

module.exports = {
  productName: "mimimemo",
  appId: "com.mimimemo.app",
  directories: {
    output: "dist/build",
  },
  files: [
    "dist/main/**",
    "dist/renderer/**",
    "node_modules/**",
    "package.json",
  ],
  extraMetadata: {
    main: "dist/main/main.js",
  },
  mac: {
    target: ["dmg"],
    icon: "src/assets/icon.icns",
  },
  win: {
    target: ["nsis"],
    icon: "src/assets/icon.ico",
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    installerIcon: "assets/icon.ico",
    uninstallerIcon: "assets/icon.ico",
    installerHeaderIcon: "assets/icon.ico",
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "MimiMemo",
  },
  dmg: {
    background: "src/assets/dmg-background.png",
    icon: "src/assets/icon.icns",
    iconSize: 120,
    contents: [
      {
        x: 140,
        y: 230,
        type: "file",
      },
      {
        x: 430,
        y: 230,
        type: "link",
        path: "/Applications",
      },
    ],
    window: {
      width: 570,
      height: 390,
    },
  },
};
