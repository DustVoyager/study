const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin"); 배너 플러그인 만들어본 것
const webpack = require("webpack");
const childProcess = require("child_process");

const getGitCommit = () => {
  try {
    return childProcess
      .execFileSync("git", ["rev-parse", "--short", "HEAD"])
      .toString()
      .trim();
  } catch (error) {
    console.warn("⚠️ Git commit 정보를 가져올 수 없습니다.");
    return "N/A";
  }
};

const getGitUser = () => {
  try {
    return childProcess.execFileSync("git", ["config", "user.name"]).toString().trim();
  } catch (error) {
    console.warn("⚠️ Git 사용자 정보를 가져올 수 없습니다.");
    return "Unknown";
  }
};
console.log(
  'childProcess.execSync("git rev-parse --short HEAD")',
  childProcess.execSync("git rev-parse --short HEAD").toString().trim()
);

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
  // plugins: [new MyWebpackPlugin()], banner plugin 만든 것
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Build Date: ${new Date().toLocaleString()}
      Commit Version: ${getGitCommit()}
      Author: ${getGitUser()}
      `,
    }),
  ],
};
