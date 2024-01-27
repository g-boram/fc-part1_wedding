const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        sorce: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
}
