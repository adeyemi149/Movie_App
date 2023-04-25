import axios from "axios";
import { useEffect, useState  } from "react";

const useHttp = (url) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true)
	
	const getMovies = async () => {
		await axios.get(url).then(resp => {
			setData(resp.data.results)
			setIsLoading(false)
		})
		.catch(err => {
			console.log(err)
		})
	}
	useEffect(() => {
		getMovies()
	}, [getMovies]);

	return [ data, isLoading ];
};

export default useHttp;