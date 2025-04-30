const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.resolve(__dirname, "src/assets/icon"),
  },
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: {
        icon: path.resolve(__dirname, "src/assets/icon.icns"),
      },
    },
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: {
        setupIcon: path.resolve(__dirname, "src/assets/icon.ico"),
      },
    },
  ],
};
