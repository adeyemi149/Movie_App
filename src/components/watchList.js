import { Grid, Heading, Image, Flex } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectWatchList } from '../features/detailSlice';
import { Wrap } from './wrap';

const WatchList = () => {
	const watchList = useSelector(selectWatchList);
	const watchListSet = new Set(watchList.map(watch => watch.id));
	const uniqueWatchList = Array.from(watchListSet, (id) => watchList.find(watch => watch.id === id));
	return (
  <>
	  {
		uniqueWatchList.length === 0
				  ?  <Flex justifyContent="center" alignItems="center" color="white" h="80vh">No Movies in Watchlist Yet</Flex>
				  :
				<Grid mt={5} mb={{ base: "20", lg: "15" }} maxW={{ sm: "550px", md: "700px", lg: "1200px" }} mx="auto" templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }} gap="3">
		  
			   {uniqueWatchList?.map((watch)=> (
				<Wrap key={watch.id}  maxW={{base: "150px", sm: "200px", md: "220px", lg: "250px"}} maxH={{base: "200px", sm: "250px", md: "270px", lg: "300px"}} mx="auto">
					<Link to={`/detail/`+ watch.id}>
					<Image src={`https://image.tmdb.org/t/p/original${watch.backdrop_path}`} alt={watch.title} />
					</Link>
				</Wrap>)
			)}

	</Grid>}
  </>
  )
}

export default WatchList;