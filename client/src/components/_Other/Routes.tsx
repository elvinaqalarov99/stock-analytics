import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Fallback from "./Fallback/Fallback";

const Home = lazy(() => import("../../pages/Home/HomePage"));
const Crypto = lazy(() => import("../../pages/Crypto/CryptoPage"));
const Error404 = lazy(() => import("../../pages/Error404/Error404Page"));

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Suspense
          fallback={
            <Fallback>
              <Spinner />
            </Fallback>
          }
        >
          <Home />
        </Suspense>
      </Route>
      <Route path="/cryptos/:id">
        <Suspense
          fallback={
            <Fallback>
              <Spinner />
            </Fallback>
          }
        >
          <Crypto />
        </Suspense>
      </Route>
      <Route>
        <Suspense
          fallback={
            <Fallback>
              <Spinner />
            </Fallback>
          }
        >
          <Error404 />
        </Suspense>
      </Route>
    </Switch>
  );
}
