module.exports = validate = {
    string(target, name, values, empty = true) {
        if (typeof target !== 'string') throw TypeError(`${name} with value ${target} is not a string`);
        if (empty && !target.trim()) throw new Error(`${name} is empty or blank`);
        if (values && !values.includes(target))
            throw new Error(
                `${name} with value ${target} does not match one of the expected values: ${values.join(', ')}`
            );
    },
    number(target, name) {
        if (typeof target === 'string' && !target.trim()) throw new Error(`${name} is empty or blank`);
        if (typeof target !== 'number') throw TypeError(`${name} with value ${target} is not a number`);
    },
    boolean(target, name) {
        if (typeof target === 'string' && !target.trim()) throw new Error(`${name} is empty or blank`);
        if (typeof target !== 'boolean') throw TypeError(`${name} with value ${target} is not a boolean`);
    },
    function(target, name) {
        if (typeof target !== 'function') throw TypeError(`${name} with value ${target} is not a function`);
    },
    object(target, name) {
        if (typeof target !== 'object') throw TypeError(`${name} ${target} is not an object`);
        if (!Object.keys(target).length) throw new Error(`${name} is empty`);
    },
    array(target, name) {
        if (!Array.isArray(target)) throw TypeError(`${name} ${target} is not an array`);
    },

};
