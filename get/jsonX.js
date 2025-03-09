(function (ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    function validateJSON(json) { 
        if (typeof json !== "string") return false;
        json = json.trim();
    
        try {
            JSON.parse(json);
            return true;
        } catch {
            return false;
        }
    };  

    ext.jsonValid = function(type, json) {
        if (!validateJSON(json)) return false;
    
        const parsed = JSON.parse(json);
        switch (type) {
            case "JSON":
                return true;
            case "object":
                return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
            case "array":
                return Array.isArray(parsed);
            default:
                return false;
        }
    };

    ext.jsonType = function(json) { 
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        if (Array.isArray(parsed)) return "array";
        if (typeof parsed === "object" && parsed !== null) return "object";
        return null;
    };

    ext.jsonLength = function(json) {
        if (!validateJSON(json)) return 0;

        const parsed = JSON.parse(json);
        return Object.keys(parsed).length;
    };

    ext.getKey = function(key, json) {
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        return Object.hasOwn(parsed, key) ? JSON.stringify(parsed[key]) : null;
    };

    ext.setKey = function(key, value, json) {
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        parsed[key] = value;
        return JSON.stringify(parsed);
    };

    ext.removeKey = function(key, json) {
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        if (!Object.hasOwn(parsed, key)) return JSON.stringify(parsed);

        delete parsed[key];
        return JSON.stringify(parsed);
    };

    ext.keyExists = function(key, json) {
        if (!validateJSON(json)) return false;

        const parsed = JSON.parse(json);
        return Object.hasOwn(parsed, key);
    };

    ext.addItem = function(item, json) {
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) return null;

        parsed.push(item);
        return JSON.stringify(parsed);
    };

    ext.removeItem = function(index, json) {
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed) || index < 0 || index >= parsed.length) return null;

        parsed.splice(index, 1);
        return JSON.stringify(parsed);
    };

    ext.getItem = function(index, json) {
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed) || index < 0 || index >= parsed.length) return null;

        return parsed[index];
    };

    ext.insertItem = function(index, item, json) {
        if (!validateJSON(json)) return null;

        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed) || index < 0 || index > parsed.length) return null;

        parsed.splice(index, 0, item);
        return JSON.stringify(parsed);
    };

    ext.indexOfItem = function(item, json) {
        if (!validateJSON(json)) return -1;

        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed)) return -1;

        return parsed.indexOf(item);
    };

    var blocks = [
        ['b', 'is %m.json %s valid?', 'jsonValid', 'JSON', '[{}]'],
        ['r', 'type of JSON %s', 'jsonType', '{"key":"value"}'],
        ['r', 'size of JSON %s', 'jsonLength', '{"key":"value"}'],
        [' '],
        ['r', 'get %s from %s', 'getKey', 'key', '{"key":"value"}'],
        ['r', 'set %s to %s in %s', 'setKey', 'key', 'value', '{}'],
        ['r', 'remove %s from %s', 'removeKey', 'key', '{"key":"value"}'],
        ['b', 'does %s exist in %s?', 'keyExists', 'key', '{"key":"value"}'],
        [' '],
        ['r', 'add %s to %s', 'addItem', 'item', '[]'],
        ['r', 'remove item %n of %s', 'removeItem', 0, '[]'],
        ['r', 'item %n of %s', 'getItem', 0, '[]'],
        ['r', 'insert %s at %n of %s', 'insertItem', 'item', 0, '[]'],
        ['r', 'item %s of %s', 'indexOfItem', 'item', '[]'],
        [' '],
    ];

    var menus = {
        json: ['JSON', 'object', 'array']
    };

    var colors = null;

    var descriptor = {
        blocks,
        menus,
        colors,
    };

    ScratchExtensions.register('JSON', descriptor, ext);
})({});
