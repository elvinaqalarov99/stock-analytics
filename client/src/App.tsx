import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/_Other/Layout/Layout";
import Routes from "./components/_Other/Routes";
import { StateManagement } from "./StateManagement/StateManagement";
import Init from "./components/_Other/Init";
import "./assets/scss/app.scss";
import ScrollToTop from "./helpers/ScrollToTop";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <StateManagement>
        <Init>
          <Fragment>
            <ScrollToTop />
            <Layout>
              <Routes />
            </Layout>
          </Fragment>
        </Init>
      </StateManagement>
    </Router>
  );
}

export default App;
