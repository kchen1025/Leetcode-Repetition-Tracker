// given an array and a key, create a map with the key as the key in the map and the rest as a value
export const pivot = (arr, key) => {
  return arr.reduce((acc, elem) => {
    if (elem[key] in acc) {
      const currValues = acc[elem[key]];
      acc[elem[key]] = [...currValues, elem];
    } else {
      acc[elem[key]] = [elem];
    }

    return acc;
  }, {});
};
