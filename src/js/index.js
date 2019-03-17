// eslint-disable-next-line no-undef
const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;
const basePath =
    requireFunc.main.id === '.' ? requireFunc.main.id : requireFunc.resolve(`${requireFunc.main.id}/package.json`);
const options = {
    // eslint-disable-next-line no-undef
    version: app.version,
    map: [`${basePath}/templates/map.json`]
};

export default options;
