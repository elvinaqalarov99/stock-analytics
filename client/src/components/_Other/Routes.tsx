import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Fallback from "./Fallback/Fallback";

const Home = lazy(() => import("../../pages/Home/Home"));
const Error404 = lazy(() => import("../../pages/Error404/Error404"));

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
