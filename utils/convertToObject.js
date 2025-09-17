const isPlainObject = (value) => {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const serializeValue = (value) => {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, serializeValue(nestedValue)]),
    );
  }

  if (typeof value === 'object') {
    if (typeof value.toJSON === 'function') {
      const jsonValue = value.toJSON();

      if (jsonValue !== value) {
        return serializeValue(jsonValue);
      }
    }

    if (typeof value.valueOf === 'function') {
      const primitiveValue = value.valueOf();

      if (primitiveValue !== value) {
        return serializeValue(primitiveValue);
      }
    }

    if (typeof value.toString === 'function') {
      const stringValue = value.toString();

      if (stringValue !== '[object Object]') {
        return stringValue;
      }
    }
  }

  return value;
};

export function convertToSerializableObject(leanDocument) {
  return serializeValue(leanDocument);
}
