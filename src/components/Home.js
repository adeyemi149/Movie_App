import React, { useEffect } from 'react'
import styled from 'styled-components'
import ImageSlider from './ImageSlider'
import NewDisney from './NewDisney'
import Originals from './original'
import RecommendedMovies from './RecommendedMovies'
import Viewers from './Viewers'
import Trending from "./Trending"
import { trending, originals, recommendedForYou } from "../apiURL/apiURL"
import { useDispatch, useSelector } from "react-redux";
import useHttp from '../utils/useHttp';
import { setMovies } from '../features/movieSlice';

const Home = () => {
	const dispatch = useDispatch()
	const [trendingMovies, isLoadingTrending ] = useHttp(trending);
	const [originalMovies, isLoadingOriginal ] = useHttp(originals);
	const [recommended, isLoadingRecommended] = useHttp(recommendedForYou);

	useEffect(() => {
		dispatch(
		  setMovies({
			trending: trendingMovies,
			originals: originalMovies,
			recommendedForYou: recommended,
		  })
		)
	}, [trendingMovies, originalMovies, recommended])
	return (
		<Container>
			<ImageSlider isLoading={isLoadingTrending}/>
			<Viewers isLoading={isLoadingRecommended} />
			<RecommendedMovies isLoading={isLoadingRecommended} />
			<NewDisney isLoading={isLoadingRecommended} />
			<Originals isLoading={isLoadingOriginal} />
			<Trending isLoading={isLoadingTrending} />
		</Container>
	)
}

export default Home

const Container = styled.main`
	min-height: calc(100vh - 250px);
	position: relative;

	&:before {
		background: url("/images/home-background.png") center center / cover
		no-repeat fixed;
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: -1;
	}
`