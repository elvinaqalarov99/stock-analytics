export default class Crypto {
  id: number;
  cmc_rank: number;
  date_added: string;
  name: string;
  circulating_supply: number;
  quote: object;

  constructor(
    id: number,
    cmc_rank: number,
    date_added: string,
    name: string,
    circulating_supply: number,
    quote: object
  ) {
    this.id = id;
    this.cmc_rank = cmc_rank;
    this.date_added = date_added;
    this.name = name;
    this.circulating_supply = circulating_supply;
    this.quote = quote;
  }
}
