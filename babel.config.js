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
          '@service': 'services/index',
          "@screen": 'screens/index',
          // Resto
        },
      },
    ],
  ],
};
