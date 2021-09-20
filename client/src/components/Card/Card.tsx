import { Link } from "react-router-dom";
import formatCurrency from "../../helpers/formatCurrency";

const Crypto = ({
  name,
  symbol,
  id,
  cmc,
  date_added,
  circulating_supply,
}: {
  name: string;
  symbol: string;
  id: number | null;
  cmc: number;
  date_added: string;
  circulating_supply: number;
}) => {
  return (
    <div className="col-12 col-md-4 py-3">
      <Link
        to={id !== null ? `/cryptos/${id}` : ""}
        className={id === null ? "disabled-link" : ""}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-decoration-underline">
              {" "}
              <img
                style={{ objectFit: "contain", marginRight: 10 }}
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                alt="logo"
                width={30}
                height={30}
              />
              {name} ({symbol})
            </h5>
            <p className="card-text mb-1">Rank: {cmc}</p>
            <p className="card-text mb-1">
              Date added: {new Date(date_added).toDateString()}
            </p>
            <p className="card-text mb-1">
              Circulating: {formatCurrency(circulating_supply)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Crypto;
