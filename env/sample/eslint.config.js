import js from "@eslint/js";

export default [
  js.configs.recommended, // 기본 JS 린트 설정 적용
  {
    rules: {
      "no-unexpected-multiline": "error",
    },
  },
];
