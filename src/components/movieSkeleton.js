import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'
import styled from "styled-components"
import { Skeleton } from '@chakra-ui/react'

const MovieSkeleton = ({cards, height}) => {
	return Array(cards).fill(0).map((_, i) =>
	(<Container key={i}>
		<Skeleton height={height} />
	</Container>
  ))
}

export default MovieSkeleton

const Container = styled.div`
	width: 100%;
	height: 100%;
`