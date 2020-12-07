module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        //auto update
        publish: ['github'],

        // target 32 and 64 bit
        win: {
          target: [
            {
              target: "nsis",
              arch: [
                "x64",
                "ia32"
              ]
            }
          ]
        },
      
        // options placed here will be merged with default configuration and passed to electron-builder
        files: [
          "**/*"
        ],
        extraFiles: [
        {
          "from":"Raport",
          "to":"Raport",
          "filter": ["**/*"]
        },
        {
          "from":"Templates",
          "to":"Templates",
          "filter": ["**/*"]
        },
        {
          "from": "src/assets/templates",
          "to": "src/assets/bin",
          "filter": ["**/*"]
        }
        ]
      }
    }
  }
}