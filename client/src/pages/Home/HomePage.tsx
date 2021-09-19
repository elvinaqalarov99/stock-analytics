import useStateManagement from "../../StateManagement/StateManagement";
import { ICrypto } from "../../../../interfaces/crypto/crypto.interface";
import Card from "../../components/Card/Card";

const Home = () => {
  const { state } = useStateManagement();

  return (
    <>
      <div className="row">
        {state.cryptos.map((crypto: ICrypto) => (
          <Card key={crypto.id} name={crypto.name} id={crypto.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
