import React from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux";
import { selectOriginals, selectRecommended, selectTrending } from '../features/movieSlice';
import { Link } from 'react-router-dom';
import MovieSkeleton from './movieSkeleton';

const Originals = ({isLoading}) => {
	const originalMovies = useSelector(selectRecommended);
  return (
	<Container>
		<h4>Originals</h4>
		  <Content>
			{isLoading && <MovieSkeleton cards={4} height="180px" />}
			{originalMovies?.slice(12, 16).map((originals) => (
					<Wrap key={originals.id}>
						  <Link to={`/detail/${originals.id}`}>
							<img src={`https://image.tmdb.org/t/p/original${originals.backdrop_path}`} alt={originals.title} />
						  </Link>
					</Wrap>
				  ))
			  }
		</Content>
	</Container>
  )
}

export default Originals

const Container = styled.div`
margin-left: 20px;
margin-right: 20px;
	h4 {
		text-align: left;
	}
`

const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	grid-gap: 25px;
	margin-top: 10px;

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`

const Wrap = styled.div`
	border-radius: 10px;
	cursor: pointer;
	overflow: hidden;
	border: 3px solid rgba(249, 249, 249, 0.1);
	box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
	rgb(0 0 0 / 73%) 0px 16px 10px -10px;
	transition: all 250ms cubic-bezier(.25, .46, .45, .94) 0s;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&:hover {
		transform: scale(1.05);
		border-color: rgba(249, 249, 249, 0.8);
		box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
		rgb(0 0 0 / 72%) 0px 30px 22px -10px;
	}
`