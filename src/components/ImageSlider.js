import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { selectTrending } from '../features/movieSlice';
import { Link } from 'react-router-dom';
import MovieSkeleton from './movieSkeleton';

const ImageSlider = ({isLoading}) => {
	const imageSlider = useSelector(selectTrending)
	let settings = {
		dots: true,
		infinite: true,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true
	  };
  return (
	  <Carousel {...settings}>
		  {isLoading ? <MovieSkeleton cards={1} height="300px"/> :
		  	 imageSlider?.slice(10, 14).map(imageSliderItems => (		  
				<Wrap key={imageSliderItems.id}>
					  <Link to={`/detail/` + imageSliderItems.id}>  
						<a>
						<img src={`https://image.tmdb.org/t/p/original${imageSliderItems.backdrop_path}`} alt={imageSliderItems.title} />
						</a>
					  </Link>
				</Wrap>
			  ))
		  }
	</Carousel>
  )
}

export default ImageSlider

const Carousel = styled(Slider)`
	margin-top: 20px;
	overflow: hidden;

	ul li button {
		&:before {
			font-size: 10px;
			color: rgb(150, 158, 171);
		}
	}

	.slick-list {
		overflow: initial;
	}

	.slider-prev {
		left: -40px;
	}

	.slider-next {
		left: -40px;
	}
 
	li.slick-active button::before {
		color: white;
	}

	& > button {
		z-index: 1;
		opacity: 0;
		height: 100%;
		width: 5vw;
	}
`

const Wrap = styled.div`
		position: relative;
		cursor: pointer;
		border-radius: 4px;

		a {
			border-radius: 4px;
			box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
			rgb(0 0 0 / 73%) 0px 16px 10px -10px; 
			cursor: pointer;
			display: block;
			position: relative;
			padding: 4px;

			img {
				width: 1440px;
				height: 368px;
				object-fit: cover;
			}
			&:hover {
				padding: 0;
				border: 4px solid white;
			}
}
`