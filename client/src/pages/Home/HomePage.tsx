import useStateManagement from "../../StateManagement/StateManagement";
import { ICrypto } from "../../interfaces/crypto.interface";
import Card from "../../components/Card/Card";

const Home = () => {
  const { state } = useStateManagement();

  return (
    <>
      <div className="row text-center" id="home">
        <h1>Cryptocurrencies</h1>
        {state.cryptos.map((crypto: ICrypto) => (
          <Card
            key={crypto.id}
            name={crypto.name}
            symbol={crypto.symbol}
            id={crypto.id}
            cmc={crypto.cmc_rank}
            date_added={crypto.date_added}
            circulating_supply={crypto.circulating_supply}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
