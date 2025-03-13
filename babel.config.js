module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
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
