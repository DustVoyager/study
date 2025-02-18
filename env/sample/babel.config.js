module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          // 여기다가 브라우저
          chrome: "79",
          ie: "11",
        },
        useBuiltIns: "usage",
        corejs: {
          version: 3,
        },
      },
    ],
  ],
};
