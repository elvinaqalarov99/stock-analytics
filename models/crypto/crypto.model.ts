export default class Crypto {
  id: number;
  cmc_rank: number;
  date_added: string;
  name: string;
  circulating_supply: number;

  constructor(
    id: number,
    cmc_rank: number,
    date_added: string,
    name: string,
    circulating_supply: number
  ) {
    this.id = id;
    this.cmc_rank = cmc_rank;
    this.date_added = date_added;
    this.name = name;
    this.circulating_supply = circulating_supply;
  }
}
