/* eslint-disable import/no-commonjs, global-require */
module.exports = {
  // Usar babel-eslint para hacer linting de ficheros con
  // sintáxis ES2015^
  parser: "babel-eslint",

  parserOptions: {
    // Sintáxis ES2018
    ecmaVersion: 2018,

    // Módulos ES2015
    sourceType: "module",

    ecmaFeatures: {
      jsx: true,
    },
  },

  // Entorno: browser + node + ES2105^
  env: {
    es6: true,
    browser: true,
    node: true,
  },

  // Conjunto de reglas de linting
  plugins: ["react", "prettier", "jest"],
  extends: ["unobtrusive", "unobtrusive/react", "unobtrusive/import", "prettier", "prettier/react"],

  // Configuración de plugins
  settings: {
    // Detectar la versión de React
    react: {
      version: "detect",
    },

    "import/resolver": {
      // Usar la misma configuración de resolución que webpack.config.js
      node: {
        paths: ["./src/"],
        extensions: [".js", ".jsx", ".json"],
      },
    },
  },

  // Ajuste de las reglas básicas
  rules: {
    // Fallar si el fichero no está pretificado.
    // https://github.com/prettier/eslint-plugin-prettier
    "prettier/prettier": ["error", require("./prettier.config")],

    // Permitimos las sentencias console.log
    // https://eslint.org/docs/rules/no-console
    "no-console": "off",

    // Las sentencias debugger generan un error
    // https://eslint.org/docs/rules/no-debugger
    "no-debugger": "error",

    // Requires fuere del scope global generan warnings
    // https://eslint.org/docs/rules/global-require
    "global-require": "error",

    // Los usos de require y module.exports generan un error
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
    "import/no-commonjs": "error",

    // Permitir el uso de variables no usadas en algunos casos
    "no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: "_",
        argsIgnorePattern: "_",
      },
    ],
  },

  overrides: [
    {
      // Reglas solo aplicables a ficheros de ejemplos del playground
      files: ["*.raw.jsx"],

      // Permitir métodos de render del playground
      globals: {
        render: "readonly",
        PropTypes: "readonly",
        React: "readonly",
      },

      rules: {
        "react/react-in-jsx-scope": "off",
      },
    },
    {
      // Reglas solo aplicables a ficheros de test
      files: ["*.test.jsx", "*.test.js"],

      env: {
        jest: true,
      },

      // Permitir métodos de enzyme como variables globales
      globals: {
        shallow: "readonly",
        mount: "readonly",
        render: "readonly",
      },

      // Reglas para tests con jest
      // https://github.com/jest-community/eslint-plugin-jest
      //
      // * No permitir test desactivados
      // * No permiter test con foco
      // * No repetir nombres de casos de test
      // * No importar "jest"
      // * Preferir toBeNull, toBeUndefined y toHaveLength a toBe(xxx)
      // * No permitir callbacks inválidos en "describe"
      // * No permitir expects malformados
      //
      rules: {
        "jest/no-disabled-tests": "error",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/no-jest-import": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-to-be-null": "warn",
        "jest/prefer-to-be-undefined": "warn",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-describe": "error",
        "jest/valid-expect": "error",
      },
    },
  ],
};
