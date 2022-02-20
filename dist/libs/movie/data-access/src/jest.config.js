"use strict";
module.exports = {
    displayName: 'movie-data-access',
    preset: '../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': '@swc/jest'
    },
    moduleFileExtensions: [
        'ts',
        'js',
        'html'
    ],
    coverageDirectory: '../../../coverage/libs/movie/data-access'
};

//# sourceMappingURL=jest.config.js.map