const URL = "https://restcountries.com/v3.1";

export const state = {
  countries: [],
  names: [],
};
// export let state = [];
// export let names = [];

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getJSON = async function (url, field) {
  try {
    const fetchPro = fetch(`${url}/${field}`);
    const res = await Promise.race([fetchPro, timeout(10)]);
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const loadAllCountries = async function (field = "all") {
  const data = await getJSON(URL, field);
  state.countries = data;
  console.log(state);
  if (state.names.length === 0) {
    data.forEach((el) =>
      state.names.push({ name: el.name.common, fifa: el.fifa })
    );
  }
};
