import axios from "axios";
import { useEffect, useState } from "react";
import { ICrypto } from "../../interfaces/crypto/crypto.interface";
import "./App.css";

function App() {
  const [cryptos, setCryptos] = useState<ICrypto | []>([]);

  useEffect(() => {
    const FIVE_MINUTES_MS = 60000 * 5;

    const fetchData = async () => {
      try {
        const { data } = await axios.get("/cryptos");
        setCryptos(cryptos);
        console.log(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
      }
    };
    // fetchData();
    const interval = setInterval(fetchData, FIVE_MINUTES_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
