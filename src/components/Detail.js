import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import {useParams} from "react-router-dom"
import axios from 'axios'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
	ModalCloseButton,
	Button,
	Text,
  Box
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { TrailerButton } from './button'
import ReactPlayer from 'react-player'
import { getAverage } from '../utils/average'
import { useDispatch, useSelector } from "react-redux";
import { addwatchList, setMovies } from "../features/movieSlice"
import { SkeletonText, Skeleton } from "@chakra-ui/react"
import { CheckIcon } from '@chakra-ui/icons'
import { selectWatchList } from '../features/movieSlice';


const Detail = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { id } = useParams();
	const [details, setDetails] = useState(null)
	const [trailer, setTrailer] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [watchListItems, setWatchListItem] = useState({})
	const [addedToWatchList, setAddedToWatchList] = useState(false);
	const dispatch = useDispatch();

	
	const getDetails = async () => {
		await axios
			.get(`https://api.themoviedb.org/3/movie/${id}?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`)
			.then(resp => {
				setDetails(resp.data)
				setIsLoading(false)
	})
	}

	const getMoviesTrailer = async () => {
		await axios
			.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`)
			.then(resp => {
				const results = resp.data.results;
				const trailers = results
					.filter(result => {
						if (result.site == "YouTube" && result.type == "Trailer") {
							return true
						} else {
							return false
						}
					})
				setTrailer(trailers);
			});
	}

	
	const addToWatchList = () => {
		dispatch(
			addwatchList({
				watchList: watchListItems
				})
		)
		setAddedToWatchList(true);
	}

	useEffect(() => {
		const updateWatchList = () => {
			setWatchListItem({ id: details?.id, backdrop_path: details?.backdrop_path, title: details?.title });
		}
		updateWatchList();
		getDetails();
		getMoviesTrailer();
	}, [id, details])

  return (
	<Container>
		<Background>
			<img src={`https://image.tmdb.org/t/p/original${details?.backdrop_path}`} />
		</Background>
		<ImageTitle>
		  </ImageTitle>
		  <DateTitle>	  
		  <MetaLanguage>{details?.original_language}</MetaLanguage>
			  <span>{details?.release_date}</span>
			  <span>🔘{details?.runtime}mins</span>
		  </DateTitle>
		  {isLoading && <SkeletonText mb={2} noOfLines={2} width="20%" />}
		  {details?.genres.map(genre => (
			  <Text key={genre.id} mb={3} display="inline-block" fontSize="15px">{genre.name},&nbsp;</Text>
		  ))}
		<Controls>
			<PlayButton>
				<img src='/images/play-icon-black.png' />
				<span>PLAY</span>
			</PlayButton>
			  <TrailerButton onClick={onOpen}>
				  TRAILER
			  </TrailerButton>
		<Modal isOpen={isOpen} onClose={onClose} size="3xl" px="0">
        <ModalOverlay />
        <ModalContent background="#040714">
          <ModalHeader color="#fff">Trailer</ModalHeader>
          <ModalCloseButton color="#fff" />
				<ModalBody>
					{
						trailer?.length 
								  ? (<ReactPlayer controls width="100%" url={`https://www.youtube.com/embed/${trailer[0].key}`} />)	  
						: <Text align="center" fontSize="lg">No available Trailer</Text>		  
					}
          </ModalBody>
        </ModalContent>
      	</Modal>
			  <AddButton onClick={() => addToWatchList(details)}>
				  {addedToWatchList
					  ? (<CheckIcon color="green.500" />)
					  : (<span>+</span>)
				  }
			</AddButton>
			<GroupWatchButton>
				<img src='/images/group-icon.png' />
			</GroupWatchButton>
		</Controls>
		<Subtitle>
			{details?.title || <SkeletonText mb={2} noOfLines={1} width="15%" />}
			  <Meta vote={!details?.vote_average}>{details?.vote_average.toFixed(1)}</Meta>
		</Subtitle>
		  <Description>
			  {details?.overview || <SkeletonText width="60%"/>}
		  </Description>
	</Container>
  )
}

export default Detail;

const Container = styled.div`
	min-height: calc(100vh - 70px);
	padding: 0 calc(3.5vw + 5px);
	position: relative;
	color: #fff;
`

const Background = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: -1;
	opacity: 0.8;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

const ImageTitle = styled.div`
	height: 30vh;
	width: 35vw;
	min-height: 170px;
	min-width: 200px;
	opacity: 0.85;
	margin-top: 50px;


	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`

const Controls = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 15px;
`

const PlayButton = styled.button`
	border-radius: 4px;
	font-size: 15px;
	border: 0;
	display: flex;
	align-items: center;
	height: 56px;
	background: rgb(249, 249, 249);
	padding: 0 24px;
	letter-spacing: 1.8px;
	color: black;
	cursor: pointer;
	transition: all 250ms cubic-bezier(.25, .46, .45, .94) 0s;

	&:hover {
		background: rgb(198, 198, 198);
	}
`

const AddButton = styled.button`
	height: 44px;
	width: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	border: 2px solid white;
	background: rgba(0, 0, 0, 0.3);
	cursor: pointer;
	transition: all 250ms cubic-bezier(.25, .46, .45, .94) 0s;

	span {
		font-size: 30px;
		color: white;
		transform: translateY(-3px);
	}

	&:hover {
		background: rgba(249, 249, 249, 0.5);
	}
`

const GroupWatchButton = styled(AddButton)`
	background: rgba(0, 0, 0);
`

const Subtitle = styled.div`
	color: rgb(249, 249, 249, 0.8);
	font-size: 15px;
	min-height: 20px;
	margin-top: 26px;

	span {
		margin-left: .5rem;
	}
`

const Description = styled.div`
	line-height: 1.4;
	font-size: 20px;
	margin-top: 16px;
	color: rgb(249, 249, 249);
	max-width: 760px;
`

const MetaLanguage = styled.span`
	background: #22254b;
	opacity: 0.89;
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
	`

const Meta = styled(MetaLanguage)`
	color: ${props => getAverage(props.vote)};
	margin-left: .5rem;
`

const DateTitle = styled.div`
	font-size: 1rem;

	span:nth-child(2) {
		margin-left: .5rem;
	}
`