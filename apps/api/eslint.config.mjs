import {config} from "@workspace/eslint-config/base"

export default [
  ...config,
  {
    files: ["**/*.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]