import React, { useMemo, useReducer, useContext } from "react";
import { IChildren } from "../interfaces/children.interface";
import reducer from "./Reducer";

export const MainContext = React.createContext(null);

const initialState = { cryptos: [] };

export function StateManagement({ children }: IChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <MainContext.Provider value={contextValue as any}>
      {children}
    </MainContext.Provider>
  );
}

export default function useStateManagement() {
  const context: any = useContext(MainContext);
  return { state: context.state, dispatch: context.dispatch };
}
