const path = require("path");

module.exports = {
  mode: "development",
  entry: { main: "./src/app.js" },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 이미지 파일 처리
        type: "asset", // 자동으로 `resource` 또는 `inline` 선택
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 2KB 이하 이미지는 Base64 (2 * 1024 = 2048 바이트)
          },
        },
      },
    ],
  },
};
