import React, {useState, useEffect} from 'react'
import { Flex, Input, InputGroup, InputLeftElement, Heading, Box, Grid, Image } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"
import { Wrap } from './wrap';
import axios from 'axios';
import { SEARCHAPI } from '../apiURL/apiURL';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MovieSkeleton from './movieSkeleton';
import useHttp from '../utils/useHttp';
import { trending } from "../apiURL/apiURL"
import { selectUserName } from '../features/userSlice';

const SearchMovies = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [movieResults, setMovieResults] = useState([])
	const [searchLoad, setSearchLoad] = useState(false);
	const user = useSelector(selectUserName);
	const navigate = useNavigate();

	

	useEffect(() => {
		let cancel;
		const getMovies = async (url) => {
			setSearchLoad(true);
			try {
				const resp = await axios.get(url, {
					cancelToken: new axios.CancelToken(c => {
						cancel = c;
					})
				})
				const movieData = resp.data.results;
				const movies = movieData.filter(data => data.backdrop_path !== null);
				setMovieResults(movies);
			} catch (error) {
				console.error(error);
			} finally {
				setSearchLoad(false);
			}
		}

		if (searchQuery) {
			getMovies(SEARCHAPI + searchQuery)
		}
		
		return () => cancel && cancel()
	}, [searchQuery])

	const handleInput = (e) => {
		setSearchQuery(e.target.value)
	}

	return (
		<>	
			{!user && navigate("/")}
			<Flex justifyContent="center" mt={3} mx="auto" width={{ sm: "300px", md: "400px", lg: "540px" }}>
				<InputGroup w= {{base: "250px", lg: "450px"}} boxShadow="dark-lg">	
						<InputLeftElement children={<SearchIcon color='gray.300'/>} />
						<Input backgroundColor="#040714" color='gray.300' variant="filled" placeholder="Search by title" width="500px" onChange={handleInput} />		
				</InputGroup>
			</Flex>
			{!searchQuery ? <Flex justifyContent="center" color="white" alignItems="center" h="80vh">Enter a term to Search</Flex> : 
				<Box minW={{ sm: "550px", md: "700px", lg: "1200px" }} mx="auto" mt={6} mb={4}>
				<Heading letterSpacing="3px" color="#fff" as="h1" size={{ sm: "xl", md: "2xl", lg: "2xl" }}>Explore</Heading>
				<Grid mt={5} mb={{base: "20", lg: "10"}} templateColumns={{base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }} columnGap="3" rowGap="3" mx="auto">
					{searchLoad && <MovieSkeleton cards={20} height="180px" />}
					{movieResults?.map((result) => (
						<Wrap 
							key={result.id}
							maxW={{ base: "150px", sm: "200px", md: "220px", lg: "250px" }}
							maxH={{ base: "200px", sm: "250px", md: "270px", lg: "300px" }}
							mx="auto"
						>
								<Link to={`/detail/` + result.id}>
									<Image src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} width="100%" height="100%" objectFit="cover" loading="eager" placeholder="blur" />
								</Link>
							</Wrap>
						))
					}
				</Grid>
			</Box>}
		</>
  )
}

export default SearchMovies