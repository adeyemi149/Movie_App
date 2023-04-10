import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react"

export const Wrap = styled(Box)`
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