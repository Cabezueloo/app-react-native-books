module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@components': 'components/index',
          '@config': 'configs/index',
          '@services': 'services/index',
          "@screen": 'screens/index',
          "@style":"styles/index",
          "@context":"context/index"
          // Resto
        },
      },
    ],
  ],
};
