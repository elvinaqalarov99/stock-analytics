import { Link } from "react-router-dom";

const Crypto = ({ name, id }: { name: any; id: number | null }) => {
  return (
    <div className="col-4 py-3">
      <Link
        to={id !== null ? `/cryptos/${id}` : ""}
        className={id === null ? "disabled-link" : ""}
      >
        <div className="card">
          <h5 className="card-header">{name}</h5>
          <div className="card-body">
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Crypto;
