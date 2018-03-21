import { action, autorun, observable, isObservable, isObservableArray, isObservableObject, isObservableValue, isObservableMap } from './mobx.min.js'

const _mergeGetterValue = (res, object) => {
  Object.getOwnPropertyNames(object).forEach(function (propertyName) {
    if (propertyName === "$mobx") { return };
    const descriptor = Object.getOwnPropertyDescriptor(object, propertyName);
    if (descriptor && !descriptor.enumerable && !descriptor.writable) {
      res[propertyName] = toJS(object[propertyName]);
    }
  })
}

const toJS = (source, detectCycles, __alreadySeen) => {
  if (detectCycles === void 0) { detectCycles = true; }
  if (__alreadySeen === void 0) { __alreadySeen = []; }
  const cache = (value) => {
    if (detectCycles)
      __alreadySeen.push([source, value]);
    return value;
  }
  if (isObservable(source)) {
    if (detectCycles && __alreadySeen === null)
      __alreadySeen = [];
    if (detectCycles && source !== null && typeof source === "object") {
      for (let i = 0, l = __alreadySeen.length; i < l; i++)
        if (__alreadySeen[i][0] === source)
          return __alreadySeen[i][1];
    }
    if (isObservableArray(source)) {
      const res = cache([]);
      const toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
      res.length = toAdd.length;
      for (let i = 0, l = toAdd.length; i < l; i++)
        res[i] = toAdd[i];
      return res;
    }
    if (isObservableObject(source)) {
      const res = cache({});
      for (const key in source)
        res[key] = toJS(source[key], detectCycles, __alreadySeen);
      _mergeGetterValue(res, source);
      return res;
    }
    if (isObservableMap(source)) {
      const res_1 = cache({});
      source.forEach(function (value, key) { return res_1[key] = toJS(value, detectCycles, __alreadySeen); });
      return res_1;
    }
    if (isObservableValue(source))
      return toJS(source.get(), detectCycles, __alreadySeen);
    }

  if (Object.prototype.toString.call(source) === '[object Array]') {
    return source.map(function (value) {
      return toJS(value);
    });
  }
  if (source !== null && typeof source === 'object') {
    const res = {};
    for (const key in source) {
      res[key] = toJS(source[key]);
    }
    return res;
  }
  return source;
}

const observer = (page) => {

  const oldOnLoad = page.onLoad;
  const oldOnUnload = page.onUnload;

  page._update = function () {
    //console.log('_update');
    const newData = {};
    const data = this.data || {};
    console.log(data)
    this.setData({ data: toJS(data) });
  }

  page.onLoad = function () {
    // support observable props here
    this.data = observable(this.data);

    this._autorun = autorun(() => {
      //console.log('autorun');
      this._update();
    });

    if (oldOnLoad) {
      oldOnLoad.apply(this, arguments);
    }
  }

  page.onUnload = () => {
    // clear autorun
    this._autorun();

    if (oldOnUnload) {
      oldOnUnload.apply(this, arguments);
    }
  }

  return page;
}

module.exports = {
  observer: observer,
  toJSWithGetter: toJS,
  version: '0.0.1',
}