const path = require('path');

module.exports = {
    // Tests live in test/, but the code under test lives one level up in build/.
    rootDir: path.resolve(__dirname, '..'),
    roots: ['<rootDir>/test'],
    // Resolved from this package so the build package's node_modules isn't needed.
    testEnvironment: require.resolve('jest-environment-jsdom'),
    // build/ sources and the shipped bundle are AMD modules; run them as CommonJS.
    transform: {
        '/build/[^/]+\\.js$': '<rootDir>/test/support/amdTransform.js',
        '/visualization\\.js$': '<rootDir>/test/support/amdTransform.js'
    },
    moduleNameMapper: {
        '^api/SplunkVisualizationBase$': '<rootDir>/test/mocks/SplunkVisualizationBase.js',
        '^api/SplunkVisualizationUtils$': '<rootDir>/test/mocks/SplunkVisualizationUtils.js',
        '^jquery$': '<rootDir>/test/node_modules/jquery/dist/jquery.js',
        '^underscore$': '<rootDir>/test/node_modules/underscore/underscore-umd.js',
        // Mirrors webpack's resolve.root: bare AMD dependency names map to build/.
        '^(enterpriseAttack|icsAttack|mobileAttack|d3fend|heatmapLogic)$': '<rootDir>/build/$1.js'
    },
    collectCoverageFrom: ['build/visualization_source.js', 'build/heatmapLogic.js'],
    coverageDirectory: '<rootDir>/test/coverage'
};
