module.exports = function parseStringAsArray(string) {
    return string.split(',').map(str => str.trim());
};
