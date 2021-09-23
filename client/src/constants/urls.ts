let urls = {
  cryptos: {
    base: "cryptos",
  },
  quotes: {
    base: "quotes",
  },
};

function addRootToUrls(obj: any) {
  Object.entries(obj).forEach(function ([key, value]) {
    if (value) {
      if (typeof value === "object") return addRootToUrls(value);
      else obj[key] = `${value}/`;
    }
  });
  return obj;
}

export const URLS = addRootToUrls(urls);
