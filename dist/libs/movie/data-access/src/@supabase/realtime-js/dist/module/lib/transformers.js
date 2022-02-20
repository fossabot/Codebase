"use strict";
exports.toTimestampString = exports.toArray = exports.toJson = exports.toNumber = exports.toBoolean = exports.convertCell = exports.convertColumn = exports.convertChangeData = exports.PostgresTypes = void 0;
var PostgresTypes;
exports.PostgresTypes = PostgresTypes;
(function(PostgresTypes1) {
    PostgresTypes1["abstime"] = "abstime";
    PostgresTypes1["bool"] = "bool";
    PostgresTypes1["date"] = "date";
    PostgresTypes1["daterange"] = "daterange";
    PostgresTypes1["float4"] = "float4";
    PostgresTypes1["float8"] = "float8";
    PostgresTypes1["int2"] = "int2";
    PostgresTypes1["int4"] = "int4";
    PostgresTypes1["int4range"] = "int4range";
    PostgresTypes1["int8"] = "int8";
    PostgresTypes1["int8range"] = "int8range";
    PostgresTypes1["json"] = "json";
    PostgresTypes1["jsonb"] = "jsonb";
    PostgresTypes1["money"] = "money";
    PostgresTypes1["numeric"] = "numeric";
    PostgresTypes1["oid"] = "oid";
    PostgresTypes1["reltime"] = "reltime";
    PostgresTypes1["text"] = "text";
    PostgresTypes1["time"] = "time";
    PostgresTypes1["timestamp"] = "timestamp";
    PostgresTypes1["timestamptz"] = "timestamptz";
    PostgresTypes1["timetz"] = "timetz";
    PostgresTypes1["tsrange"] = "tsrange";
    PostgresTypes1["tstzrange"] = "tstzrange";
})(PostgresTypes || (exports.PostgresTypes = PostgresTypes = {}));
const convertChangeData = (columns, record, options = {})=>{
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    return Object.keys(record).reduce((acc, rec_key)=>{
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
    }, {});
};
exports.convertChangeData = convertChangeData;
const convertColumn = (columnName, columns, record, skipTypes)=>{
    const column = columns.find((x)=>x.name === columnName
    );
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
    }
    return noop(value);
};
exports.convertColumn = convertColumn;
const convertCell = (type, value)=>{
    // if data type is an array
    if (type.charAt(0) === '_') {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
    }
    // If not null, convert to correct type.
    switch(type){
        case PostgresTypes.bool:
            return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
            return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
            return toJson(value);
        case PostgresTypes.timestamp:
            return toTimestampString(value); // Format to be consistent with PostgREST
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
            return noop(value);
        default:
            // Return the value for remaining types
            return noop(value);
    }
};
exports.convertCell = convertCell;
const noop = (value)=>{
    return value;
};
const toBoolean = (value)=>{
    switch(value){
        case 't':
            return true;
        case 'f':
            return false;
        default:
            return value;
    }
};
exports.toBoolean = toBoolean;
const toNumber = (value)=>{
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
            return parsedValue;
        }
    }
    return value;
};
exports.toNumber = toNumber;
const toJson = (value)=>{
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch (error) {
            console.log(`JSON parse error: ${error}`);
            return value;
        }
    }
    return value;
};
exports.toJson = toJson;
const toArray = (value, type)=>{
    if (typeof value !== 'string') {
        return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    // Confirm value is a Postgres array by checking curly brackets
    if (openBrace === '{' && closeBrace === '}') {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        // TODO: find a better solution to separate Postgres array data
        try {
            arr = JSON.parse('[' + valTrim + ']');
        } catch (_) {
            // WARNING: splitting on comma does not cover all edge cases
            arr = valTrim ? valTrim.split(',') : [];
        }
        return arr.map((val)=>convertCell(type, val)
        );
    }
    return value;
};
exports.toArray = toArray;
const toTimestampString = (value)=>{
    if (typeof value === 'string') {
        return value.replace(' ', 'T');
    }
    return value;
}; //# sourceMappingURL=transformers.js.map
exports.toTimestampString = toTimestampString;

//# sourceMappingURL=transformers.js.map