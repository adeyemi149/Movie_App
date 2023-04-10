import React from 'react'
import styled from 'styled-components'

const Login  = () =>{
  return (
	<Container>
		<Content>
			<ContentLogoOne src="/images/cta-logo-one.svg" />
			<Signup>Get All there</Signup>
			<Description>
				  Stream now.18+ only includes Hulu (ad-supported) plan. Access content from each service
				  seperately. Offer valid for eligible subs only. Subject to terms of Disney+ and ESPN+ Subscriber
				  Agreement.
			</Description>
			<ContentLogoTwo src="/images/cta-logo-two.png" />
		</Content>
	</Container>
  )
}

export default Login

const Container = styled.div`
	min-height: calc(100vh - 70px);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: top;
	text-align: center;

	&:before {
		position: absolute;
		content: "";
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: url("/images/login-background.jpg");
		background-position: top;
		background-size: cover;
		background-repeat: no-repeat;
		z-index: -1;
	}
`

const Content = styled.div`
	max-width: 650px;
	padding: 80px 60px;
	width: 60%;
	display: flex;
	flex-direction: column;
	margin-bottom: 200px;
	align-items: center;
`

const ContentLogoOne = styled.img`
	

`

const Signup = styled.a`
	width: 100%;
	background-color: #0063e5; 
	padding: 15px 0;
	border-radius: 4px;
	font-size: 18px;
	cursor: pointer;
	transition-duration: all 250ms;
	letter-spacing: 1.5px;
	margin-top: 8px;

	&:hover {
		background: #0483ee;
	}
`

const Description = styled.p`
	font-size: 11px;
	letter-spacing: 1.5px;
	line-height: 1.5;
`

const ContentLogoTwo = styled.img`
	width: 80%;
`