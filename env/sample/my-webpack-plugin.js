class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("MyWebpackPlugin", (compilation, callback) => {
      const assetName = "main.js";
      const asset = compilation.getAsset(assetName);

      if (asset) {
        const source = asset.source.source();

        const banner = [
          "/**",
          " * 이것은 BannerPlugin이 처리한 결과입니다.",
          " * Build Date: 2025-02-14",
          " */",
          "",
        ].join("\n");

        // Webpack 5에서는 updateAsset 사용
        compilation.updateAsset(
          assetName,
          new compiler.webpack.sources.RawSource(banner + "\n" + source)
        );

        console.log(`✅ ${assetName}에 배너 추가 완료!`);
      } else {
        console.log(`❌ ${assetName} 파일을 찾을 수 없습니다.`);
      }

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
