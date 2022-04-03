export function getLocalStorage(key) {
  try {
    // Abstracting the necessity of parse the value
    return JSON.parse(window.localStorage[key]);
  } catch (err) {
    // console.log('getLocalStorage: ', err);
    return undefined;
  }
}
