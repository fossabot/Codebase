"use strict";
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
exports.defaultTheme = void 0;
var _extends = require("@babel/runtime/helpers/esm/extends");
var _objectWithoutPropertiesLoose = require("@babel/runtime/helpers/esm/objectWithoutPropertiesLoose");
var _react = require("react");
var defaultTheme = {
    background: '#0b1521',
    backgroundAlt: '#132337',
    foreground: 'white',
    gray: '#3f4e60',
    grayAlt: '#222e3e',
    inputBackgroundColor: '#fff',
    inputTextColor: '#000',
    success: '#00ab52',
    danger: '#ff0085',
    active: '#006bff',
    warning: '#ffb200'
};
exports.defaultTheme = defaultTheme;
var ThemeContext = /*#__PURE__*/ _react.default.createContext(defaultTheme);
function ThemeProvider(_ref) {
    var theme = _ref.theme, rest = (0, _objectWithoutPropertiesLoose).default(_ref, [
        "theme"
    ]);
    return(/*#__PURE__*/ _react.default.createElement(ThemeContext.Provider, (0, _extends).default({
        value: theme
    }, rest)));
}
function useTheme() {
    return _react.default.useContext(ThemeContext);
}

//# sourceMappingURL=theme.js.map