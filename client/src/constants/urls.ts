let urls = {
  cryptos: {
    base: "cryptos",
  },
  quotes: {
    base: "quotes",
  },
};

const PORT = process.env.REACT_APP_PORT || 5000;

export const root = "http://localhost:" + PORT;

function addRootToUrls(obj: any) {
  Object.entries(obj).forEach(function ([key, value]) {
    if (value) {
      if (typeof value === "object") return addRootToUrls(value);
      else obj[key] = `${root}/api/${value}/`;
    }
  });
  return obj;
}

export const URLS = addRootToUrls(urls);
