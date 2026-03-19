import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../constants/constants";

/**
 * Hook to fetch data from an API.
 *
 * @param {function} fetcher - API call to fetch data.
 * @returns {Object} - object containing data, loading and error state.
 *
 * @example
 * const { data, loading, error } = useFetch(apiCall);
 */
export default function useFetch(fetcher) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetcher();
        setData(result);
      } catch (err) {
        setError(err?.message || ERROR_MESSAGES.GENERIC_ERROR);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetcher]);

  return { data, loading, error };
}
