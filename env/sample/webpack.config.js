const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin"); 배너 플러그인 만들어본 것
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

// console.log(
//   'childProcess.execSync("git rev-parse --short HEAD")',
//   childProcess.execSync("git rev-parse --short HEAD").toString().trim()
// );

module.exports = {
  mode: "development",
  entry: { main: "./app.js" },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
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
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
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
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
