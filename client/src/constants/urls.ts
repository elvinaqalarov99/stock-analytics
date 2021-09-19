let urls = {
  cryptos: {
    base: "cryptos",
  },
  quotes: {
    base: "quotes",
  },
};

const root = "http://localhost:3001";

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
