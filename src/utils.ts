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
