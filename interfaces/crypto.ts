export default interface Crypto {
  id: number;
  cmc_rank: number;
  date_added: string;
  name: string;
  circulating_supply: number;
  quote: object;
}
