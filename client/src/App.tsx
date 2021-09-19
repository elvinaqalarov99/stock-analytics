import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/_Other/Layout/Layout";
import Routes from "./components/_Other/Routes";
// import { StateManagement } from "./StateManagement/StateManagement";

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default App;
