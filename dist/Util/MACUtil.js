"use strict";
//https://blog.xaymar.com/2020/12/08/fastest-uint8array-to-hex-string-conversion-in-javascript/
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiMac = exports.isMac = exports.standardizeMac = exports.mac2buf = exports.buf2mac = void 0;
const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
const LUT_HEX_4b = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
// End Pre-Init
const LUT_HEX_8b = new Array(0x100);
for (let n = 0; n < 0x100; n++) {
    LUT_HEX_8b[n] = `${LUT_HEX_4b[(n >>> 4) & 0xF]}${LUT_HEX_4b[n & 0xF]}`;
}
function buf2mac(buffer) {
    let out = '';
    for (let idx = 0, edx = buffer.length; idx < edx; idx++) {
        out += LUT_HEX_8b[buffer[idx]];
        if (idx < edx - 1)
            out += ':';
    }
    return out;
}
exports.buf2mac = buf2mac;
const MAC_LEN = 6;
// Modified from https://stackoverflow.com/questions/68342525/javascript-what-is-the-fastest-hexadecimal-string-to-arraybuffer-algorithm
function mac2buf(string) {
    if (string.length !== 17)
        throw new Error(`Expected MAC in standard form "XX:XX:XX:XX:XX:XX", got >${string}<`);
    string = string.toUpperCase();
    const bytes = new Uint8Array(MAC_LEN);
    for (let i = 0; i < MAC_LEN; i++) {
        const c1 = string.charCodeAt(i * 3);
        const c2 = string.charCodeAt(i * 3 + 1);
        const n1 = c1 - (c1 < 58 ? 48 : 55);
        const n2 = c2 - (c2 < 58 ? 48 : 55);
        bytes[i] = n1 * 16 + n2;
    }
    return bytes;
}
exports.mac2buf = mac2buf;
/**
 * Checks and standardizes a passed MAC address.
 * @param mac
 */
function standardizeMac(mac) {
    if (mac == null)
        throw new Error("Passed MAC is undefined!");
    if (mac.length <= 0)
        throw new Error(`Passed MAC length is 0!`);
    mac = mac.toUpperCase();
    if (!/^[ABCDEF\d:\-.]+$/.test(mac)) //Test for invalid characters
        throw new Error(`Invalid characters encountered in MAC >${mac}<. Allowed chars are 0-9, ABCDEF`);
    const raw = mac
        .toUpperCase()
        .replace(/[\W_]+/g, ''); //Replace delimiters
    if (raw.length !== 12)
        throw new Error(`Incorrect MAC length. Expected 12 alphanumeric chars, got >${raw.length}<`);
    const parts = raw.match(/(.{2})/g); //Split into two-char parts.
    if (!parts)
        throw new Error(`Couldn't generate formatted MAC from >${mac}<`);
    return parts.join(":");
}
exports.standardizeMac = standardizeMac;
function isMac(mac) {
    return typeof mac === "string" && macRegex.test(mac);
}
exports.isMac = isMac;
function joiMac(value, helpers) {
    return standardizeMac(value);
}
exports.joiMac = joiMac;
//# sourceMappingURL=MACUtil.js.map