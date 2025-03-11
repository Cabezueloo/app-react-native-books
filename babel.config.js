module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': 'components/index',
          '@config': 'config/index',
          '@service': 'services/index',
          "@screen": 'screens/index',
          // Añade aquí el resto de tus alias
        },
      },
    ],
  ],
};
