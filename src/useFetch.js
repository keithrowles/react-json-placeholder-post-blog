import { useState, useEffect } from "react";

const useFetch = (url) => {

    // this hook used for state changes
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // this hook runs for every render or certain dependancies - can be used to fetch data and use in the application - have an empty render dependancy
    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch data');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError') {
                    console.log('Fetch Aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
                
            })

            return () => abortCont.abort();

    }, [url]);

    return { data, isPending, error }

}

export default useFetch;