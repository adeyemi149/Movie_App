import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectRecommended } from '../features/movieSlice';
import { useState } from 'react';
import MovieSkeleton from './movieSkeleton';


const NewDisney = ({isLoading}) => {
	const disneyPlus = useSelector(selectRecommended);
  return (
	<Container>
		<h4>New to Disney+</h4>
		  <Content>
			  	{isLoading && <MovieSkeleton cards={4} height="180px" />}
			  	{disneyPlus?.slice(0, 4).map(disney => (		  
					  <Wrap key={disney.id}>
						<Link to={`/detail/${disney.id}`}>	  
							<img src= {`https://image.tmdb.org/t/p/original${disney.backdrop_path}`} alt={disney.title} />
						</Link>
					</Wrap>
				  ))
			  }
		</Content>
	</Container>
  )
}

export default NewDisney

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