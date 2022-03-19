"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashCode = exports.bindThis = exports.checkDuplicates = exports.isDirEmptySync = exports.isDirEmpty = void 0;
const fs_extra_1 = require("fs-extra");
async function isDirEmpty(dir) {
    return (await fs_extra_1.readdir(dir)).length <= 0;
}
exports.isDirEmpty = isDirEmpty;
function isDirEmptySync(dir) {
    return fs_extra_1.readdirSync(dir).length <= 0;
}
exports.isDirEmptySync = isDirEmptySync;
function checkDuplicates(arr, predicate) {
    const ids = new Set();
    arr.forEach((v, i) => {
        const id = predicate(v);
        if (ids.has(id))
            throw new Error(`Duplicate: >${id}<`);
    });
}
exports.checkDuplicates = checkDuplicates;
function bindThis(clazz, self) {
    const methodKeys = Reflect.ownKeys(clazz.prototype).filter(k => k !== "constructor");
    for (const k of methodKeys)
        self[k] = clazz.prototype[k].bind(self);
}
exports.bindThis = bindThis;
function hashCode(str) {
    var hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
exports.hashCode = hashCode;
//# sourceMappingURL=util.js.map