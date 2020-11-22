module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
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