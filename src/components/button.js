import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const TrailerButton = styled(Button)`
	border-radius: 4px;
	font-size: 15px;
	display: flex;
	align-items: center;
	height: 56px;
	padding: 0 24px;
	letter-spacing: 1.8px;
	cursor: pointer;
	transition: all 250ms cubic-bezier(.25, .46, .45, .94) 0s;
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgb(249, 249, 249);
	color: white;

	&:hover {
		background: rgba(249, 249, 249, 0.5);
	}
`