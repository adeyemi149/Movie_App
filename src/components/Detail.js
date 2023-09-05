import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useParams} from "react-router-dom"
import axios from 'axios'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
	ModalCloseButton,
	Text,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { TrailerButton } from './button'
import ReactPlayer from 'react-player'
import { getAverage } from '../utils/average'
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList } from "../features/detailSlice"
import { SkeletonText } from "@chakra-ui/react"
import toast, {Toaster} from "react-hot-toast"
import { selectDetails, selectLoading, selectTrailer, setDetails, setTrailer} from "../features/detailSlice"


const Detail = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { id } = useParams();
	const [watchListItem, setWatchListItem] = useState({})
	const dispatch = useDispatch();
	const details = useSelector(selectDetails);
	const isLoading = useSelector(selectLoading);
	const trailer = useSelector(selectTrailer);

	
	const getDetails = async () => {
		await axios
			.get(`https://api.themoviedb.org/3/movie/${id}?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`)
			.then(resp => {
				dispatch(
					setDetails({
						details: resp.data,
						isLoading: false
					})
				)
	})
	}

	const getMoviesTrailer = async () => {
		await axios
			.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`)
			.then(resp => {
				const results = resp.data.results;
				const trailers = results
					.filter(result => {
						if (result.site === "YouTube" && result.type === "Trailer") {
							return true
						} else {
							return false
						}
					})
				dispatch(
					setTrailer({
						trailer: trailers
					})
				)
			});
	}
	const addToWatchListHandler = () => {
		dispatch(
			addToWatchList({
				watchListItems: watchListItem,
				addedToWatchList: true
			})
		)

		toast.success('Movie added to watchlist');
	}

	useEffect(() => {
		const updateWatchList = () => {
			setWatchListItem({ id: details?.id, backdrop_path: details?.backdrop_path, title: details?.title, addedToWatchList: true});
		}
		updateWatchList();
		getDetails();
		getMoviesTrailer();
	}, [id, details])

  return (
	<Container>
		<Background>
			<img alt={details?.title} src={`https://image.tmdb.org/t/p/original${details?.backdrop_path}`} />
		</Background>
		  <MovieTitle>
			{details?.title || <SkeletonText mb={4} noOfLines={1} width="15%" />}
		  </MovieTitle>
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
			  <TrailerButton alt="Trailer Button" onClick={onOpen}>
				  WATCH TRAILER NOW
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
			  <AddButton onClick={() => addToWatchListHandler()}>
					<span>+</span>
			</AddButton>
			<GroupWatchButton>
				<img alt="group icon" src='/images/group-icon.png' />
			</GroupWatchButton>
		</Controls>
		<Subtitle>
			{details?.title || <SkeletonText mb={2} noOfLines={1} width="15%" />}
			  <Meta vote={!details?.vote_average}>{details?.vote_average.toFixed(1)}</Meta>
		</Subtitle>
		  <Description>
			  {details?.overview || <SkeletonText width="60%"/>}
		  </Description>
		  <Toaster
			  position='top-right'
			  icon="🎥"
			  duration="3000"
		  />
	</Container>
  )
}

export default Detail;

const Container = styled.div`
	min-height: calc(100vh - 70px);
	padding: 0 calc(3.5vw + 5px);
	position: relative;
	color: #fff;
	margin-bottom: 3em;
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

const MovieTitle = styled.div`
	width: 100%;
	min-height: 170px;
	min-width: 200px;
	opacity: 0.85;
	margin-top: 50px;
	display: flex;
	align-items: flex-end;
	font-size: 40px;
	margin-bottom: 5px;
	font-family: 'Rubik Wet Paint', cursive;
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