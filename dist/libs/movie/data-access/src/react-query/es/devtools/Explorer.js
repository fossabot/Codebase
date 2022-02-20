"use strict";
exports.default = Explorer;
exports.Expander = exports.Info = exports.SubEntries = exports.Value = exports.Label = exports.Entry = void 0;
var _extends = require("@babel/runtime/helpers/esm/extends");
var _objectWithoutPropertiesLoose = require("@babel/runtime/helpers/esm/objectWithoutPropertiesLoose");
var _react = require("react");
var _utils = require("./utils");
function Explorer(_ref3) {
    var value1 = _ref3.value, defaultExpanded = _ref3.defaultExpanded, _ref3$renderer = _ref3.renderer, renderer = _ref3$renderer === void 0 ? DefaultRenderer : _ref3$renderer, _ref3$pageSize = _ref3.pageSize, pageSize = _ref3$pageSize === void 0 ? 100 : _ref3$pageSize, _ref3$depth = _ref3.depth, depth = _ref3$depth === void 0 ? 0 : _ref3$depth, rest = (0, _objectWithoutPropertiesLoose).default(_ref3, [
        "value",
        "defaultExpanded",
        "renderer",
        "pageSize",
        "depth"
    ]);
    var _React$useState2 = _react.default.useState(defaultExpanded), expanded = _React$useState2[0], setExpanded = _React$useState2[1];
    var toggle = function toggle(set) {
        setExpanded(function(old) {
            return typeof set !== 'undefined' ? set : !old;
        });
    };
    var path = [];
    var type = typeof value1;
    var subEntries;
    var subEntryPages = [];
    var makeProperty = function makeProperty(sub) {
        var _ref4;
        var newPath = path.concat(sub.label);
        var subDefaultExpanded = defaultExpanded === true ? (_ref4 = {}, _ref4[sub.label] = true, _ref4) : defaultExpanded == null ? void 0 : defaultExpanded[sub.label];
        return (0, _extends).default({}, sub, {
            path: newPath,
            depth: depth + 1,
            defaultExpanded: subDefaultExpanded
        });
    };
    if (Array.isArray(value1)) {
        type = 'array';
        subEntries = value1.map(function(d, i) {
            return makeProperty({
                label: i,
                value: d
            });
        });
    } else if (value1 !== null && typeof value1 === 'object' && typeof value1[Symbol.iterator] === 'function') {
        type = 'Iterable';
        subEntries = Array.from(value1, function(val, i) {
            return makeProperty({
                label: i,
                value: val
            });
        });
    } else if (typeof value1 === 'object' && value1 !== null) {
        type = 'object'; // eslint-disable-next-line no-shadow
        subEntries = Object.entries(value1).map(function(_ref5) {
            var label = _ref5[0], value = _ref5[1];
            return makeProperty({
                label: label,
                value: value
            });
        });
    }
    if (subEntries) {
        var i1 = 0;
        while(i1 < subEntries.length){
            subEntryPages.push(subEntries.slice(i1, i1 + pageSize));
            i1 = i1 + pageSize;
        }
    }
    return renderer((0, _extends).default({
        handleEntry: function handleEntry(entry) {
            return(/*#__PURE__*/ _react.default.createElement(Explorer, (0, _extends).default({
                key: entry.label,
                renderer: renderer
            }, rest, entry)));
        },
        type: type,
        subEntries: subEntries,
        subEntryPages: subEntryPages,
        depth: depth,
        value: value1,
        path: path,
        expanded: expanded,
        toggle: toggle,
        pageSize: pageSize
    }, rest));
}
var Entry = (0, _utils).styled('div', {
    fontFamily: 'Menlo, monospace',
    fontSize: '1em',
    lineHeight: '1.7',
    outline: 'none',
    wordBreak: 'break-word'
});
exports.Entry = Entry;
var Label = (0, _utils).styled('span', {
    cursor: 'pointer',
    color: 'white'
});
exports.Label = Label;
var Value = (0, _utils).styled('span', function(props, theme) {
    return {
        color: theme.danger
    };
});
exports.Value = Value;
var SubEntries = (0, _utils).styled('div', {
    marginLeft: '.1em',
    paddingLeft: '1em',
    borderLeft: '2px solid rgba(0,0,0,.15)'
});
exports.SubEntries = SubEntries;
var Info = (0, _utils).styled('span', {
    color: 'grey',
    fontSize: '.7em'
});
exports.Info = Info;
var Expander = function Expander(_ref) {
    var expanded = _ref.expanded, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, rest = (0, _objectWithoutPropertiesLoose).default(_ref, [
        "expanded",
        "style"
    ]);
    return(/*#__PURE__*/ _react.default.createElement("span", {
        style: (0, _extends).default({
            display: 'inline-block',
            transition: 'all .1s ease',
            transform: "rotate(" + (expanded ? 90 : 0) + "deg) " + (style.transform || '')
        }, style)
    }, "\u25B6"));
};
exports.Expander = Expander;
var DefaultRenderer = function DefaultRenderer(_ref2) {
    var handleEntry = _ref2.handleEntry, label = _ref2.label, value = _ref2.value, subEntries = _ref2.subEntries, subEntryPages = _ref2.subEntryPages, type = _ref2.type, expanded = _ref2.expanded, toggle = _ref2.toggle, pageSize = _ref2.pageSize;
    var _React$useState = _react.default.useState([]), expandedPages = _React$useState[0], setExpandedPages = _React$useState[1];
    return(/*#__PURE__*/ _react.default.createElement(Entry, {
        key: label
    }, (subEntryPages == null ? void 0 : subEntryPages.length) ? /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(Label, {
        onClick: function onClick() {
            return toggle();
        }
    }, /*#__PURE__*/ _react.default.createElement(Expander, {
        expanded: expanded
    }), " ", label, ' ', /*#__PURE__*/ _react.default.createElement(Info, null, String(type).toLowerCase() === 'iterable' ? '(Iterable) ' : '', subEntries.length, " ", subEntries.length > 1 ? "items" : "item")), expanded ? subEntryPages.length === 1 ? /*#__PURE__*/ _react.default.createElement(SubEntries, null, subEntries.map(function(entry) {
        return handleEntry(entry);
    })) : /*#__PURE__*/ _react.default.createElement(SubEntries, null, subEntryPages.map(function(entries, index) {
        return(/*#__PURE__*/ _react.default.createElement("div", {
            key: index
        }, /*#__PURE__*/ _react.default.createElement(Entry, null, /*#__PURE__*/ _react.default.createElement(Label, {
            onClick: function onClick() {
                return setExpandedPages(function(old) {
                    return old.includes(index) ? old.filter(function(d) {
                        return d !== index;
                    }) : [].concat(old, [
                        index
                    ]);
                });
            }
        }, /*#__PURE__*/ _react.default.createElement(Expander, {
            expanded: expanded
        }), " [", index * pageSize, " ...", ' ', index * pageSize + pageSize - 1, "]"), expandedPages.includes(index) ? /*#__PURE__*/ _react.default.createElement(SubEntries, null, entries.map(function(entry) {
            return handleEntry(entry);
        })) : null)));
    })) : null) : /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(Label, null, label, ":"), ' ', /*#__PURE__*/ _react.default.createElement(Value, null, JSON.stringify(value, Object.getOwnPropertyNames(Object(value)))))));
};

//# sourceMappingURL=Explorer.js.map