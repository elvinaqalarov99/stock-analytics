export const ACTION_TYPES = {
  setCrypto: 1,
};

export default class Actions {
  static setCryptos(cryptos: []) {
    return { type: ACTION_TYPES.setCrypto, payload: cryptos };
  }
}
