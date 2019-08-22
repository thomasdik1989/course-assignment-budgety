'use strict';

const watchObject = (object, onChange) => {
  const handler = {
    get(target, property, receiver) {
      if (property === 'splice') {
        const originalMethod = target[property];
        return function (...args) {
          originalMethod.apply(target, args);
        }
      }

      try {
        return new Proxy(target[property], handler);
      }
      catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      const reflect = Reflect.defineProperty(target, property, descriptor);
      if (property !== 'length') {
        onChange();
      }
      return reflect;
    },
    deleteProperty(target, property) {
      const reflect = Reflect.deleteProperty(target, property);
      onChange();
      return reflect;
    }
  };

  return new Proxy(object, handler);
};

export { watchObject };
