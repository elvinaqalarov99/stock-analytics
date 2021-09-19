import { ACTION_TYPES as AT } from "./Actions";

export default function reducer(state: object, action: any) {
  switch (action.type) {
    case AT.setCrypto:
      return { ...state, cryptos: action.payload };
    default:
      return state;
  }
}
