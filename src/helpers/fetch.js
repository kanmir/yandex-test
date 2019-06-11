export const get = async (url) => {
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/' + url);
    return response.json();
  } catch (e) {
    return e;
  }
};