module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@components': 'components/index',
          '@configs': 'configs/index',
          '@services': 'services/index',
          "@styles":"styles/index",
          "@contexts":"context/index"
          // Resto
        },
      },
    ],
  ],
};
