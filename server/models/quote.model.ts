export default class Quote {
  crypto_id: number;
  fully_diluted_market_cap: number;
  last_updated: string;
  market_cap: number;
  market_cap_dominance: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  price: number;
  volume_24h: number;

  constructor(
    crypto_id: number,
    fully_diluted_market_cap: number,
    last_updated: string,
    market_cap: number,
    market_cap_dominance: number,
    percent_change_24h: number,
    percent_change_7d: number,
    percent_change_30d: number,
    percent_change_60d: number,
    price: number,
    volume_24h: number
  ) {
    this.crypto_id = crypto_id;
    this.fully_diluted_market_cap = fully_diluted_market_cap;
    this.last_updated = last_updated;
    this.market_cap = market_cap;
    this.market_cap_dominance = market_cap_dominance;
    this.percent_change_24h = percent_change_24h;
    this.percent_change_7d = percent_change_7d;
    this.percent_change_30d = percent_change_30d;
    this.percent_change_60d = percent_change_60d;
    this.price = price;
    this.volume_24h = volume_24h;
  }
}
