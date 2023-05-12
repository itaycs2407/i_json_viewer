export const getMaxDepth = (obj: any, depth = 0) => {
  if (typeof obj !== "object" || obj == null) {
    return depth;
  }

  let maxDepth = depth;
  for (let key in obj) {
    const propDepth = getMaxDepth(obj[key], depth + 1);
    if (propDepth > maxDepth) {
      maxDepth = propDepth;
    }
  }

  return maxDepth;
};

export const findKeyPath = (obj: any, key: string): null | string[] => {
  for (const prop in obj) {
    if (prop === key) {
      return [key];
    } else if (typeof obj[prop] === "object") {
      const path = findKeyPath(obj[prop], key);
      if (path) {
        return [prop, ...path];
      }
    }
  }
  return null;
};
