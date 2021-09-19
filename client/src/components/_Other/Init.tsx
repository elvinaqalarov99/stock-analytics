import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import useStateManagement from "../../StateManagement/StateManagement";
import Actions from "../../StateManagement/Actions";
import { IChildren } from "../../interfaces/children.interface";
import { URLS } from "./../../constants/urls";
import axios from "axios";
import Fallback from "./Fallback/Fallback";

export default function Init({ children }: IChildren) {
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<any>(null);
  const { dispatch } = useStateManagement();

  useEffect(() => {
    if (loading) {
      (async () => {
        try {
          const response = await axios.get(URLS.cryptos.base);
          if (response.status === 200 && response.data) {
            dispatch(Actions.setCryptos(response.data));
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
          setLoading(false);
        }
      })();
    }
  }, [dispatch, loading]);

  return loading ? (
    <Fallback>
      <Spinner />
    </Fallback>
  ) : errors && errors.length ? (
    <ErrorsList errors={errors} />
  ) : (
    children
  );
}

function ErrorsList({ errors }: any) {
  return (
    <ul>
      {errors.map((error: any, index: any) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
}
