import axios from "../../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { URLS } from "../../constants/urls";
import { IQuote } from "../../interfaces/quote.interface";
import Spinner from "../../components/Spinner/Spinner";
import ChartLine from "../../components/Charts/ChartLine";
import useStateManagement from "../../StateManagement/StateManagement";
import Fallback from "../../components/_Other/Fallback/Fallback";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Crypto = () => {
  let { id }: any = useParams();
  const { state } = useStateManagement();

  const crypto = state?.cryptos?.find(
    (crypto: { id: any }) => crypto.id === +id
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>(null);
  const [quotes, setQuotes] = useState<IQuote[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URLS.quotes.base + id);
        if (response.status === 200 && response.data) {
          setQuotes(response.data);
        } else {
          setErrors(
            response.data.errors || [
              "Something went wrong while fetching user data from Node Api",
            ]
          );
        }
      } catch (e: any) {
        setErrors([e.message]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }

    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 60 * 3);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id, loading]);

  return loading ? (
    <Fallback>
      <Spinner />
    </Fallback>
  ) : errors && errors.length ? (
    <ErrorsList errors={errors} />
  ) : (
    <div className="row h-100 text-center d-flex justify-content-center align-items-center">
      <div className="mb-4">
        <h3>
          {" "}
          <Link to="/" title="Back">
            <BsArrowLeft color="rgba(0, 212, 255, 1)" />
          </Link>{" "}
          <img
            style={{ objectFit: "contain", marginRight: 10 }}
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
            alt="logo"
            width={30}
            height={30}
          />
          {crypto.name} ({crypto.symbol})
        </h3>
        <p>{new Date(crypto.date_added).toDateString()}</p>
        <p>Rank: {crypto.cmc_rank}</p>
      </div>
      <ChartLine
        data={quotes}
        change="price"
        key={"quoteChange-price"}
        height={300}
        col={12}
      />
      <ChartLine
        data={quotes}
        change="percent_change_24h"
        key={"quoteChange-percent_change_24h"}
        height={300}
        col={12}
      />
      <ChartLine
        data={quotes}
        change="percent_change_7d"
        key={"quoteChange-percent_change_7d"}
        height={300}
        col={12}
      />
      <ChartLine
        data={quotes}
        change="percent_change_30d"
        key={"quoteChange-percent_change_30d"}
        height={300}
        col={12}
      />
    </div>
  );
};

function ErrorsList({ errors }: any) {
  return (
    <ul>
      {errors.map((error: any, index: any) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}

export default Crypto;
