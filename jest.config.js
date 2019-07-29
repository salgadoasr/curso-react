/* eslint-disable import/no-commonjs */
module.exports = {
  // Ficheros a testear
  testRegex: "src/.*.test\\.jsx?$",

  // Rutas de búsqueda de código
  modulePaths: ["<rootDir>/src/"],

  // Ficheros de setup adicional para los tests
  setupFiles: ["<rootDir>/src/test.setup.js"],

  // Serializadores
  snapshotSerializers: [
    // Prettificar la serialización de shallow, mount y render de enzyme
    "enzyme-to-json/serializer",
  ],

  // No generar cobertura por defecto. Usar --coverage en el CLI Para forzar
  collectCoverage: false,

  // Generar los informes de cobertura en la carpeta coverage
  coverageDirectory: "coverage",

  // Paths del proyecto cuya cobertura será analizada.
  collectCoverageFrom: ["src/**/*.js", "src/**/*.jsx"],

  // Generar cobertura en formato texto, html, lcov y clover
  coverageReporters: ["text", "html", "lcov", "clover"],
};
