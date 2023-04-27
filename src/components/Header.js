import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux';
import {auth, provider} from "../firebase"
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
	const dispatch = useDispatch();
	const userName = useSelector(selectUserName);
	const userPhoto = useSelector(selectUserPhoto);
	const navigate = useNavigate();
	const [showSignout, setShowSignout] = useState(false);

	const toggleSignout = () => {
		setShowSignout(!showSignout);
	}
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (!user) {
				navigate("/")
			} else if (user) {
				setUser(user);
				navigate("/home");
			} 
		})
	}, [userName]);

	const handleAuth = () => {
		if (!userName) {
			auth.signInWithPopup(provider).then(result => {
				setUser(result.user)
			}).catch(err => {
				alert(err.message)
			});
		} else if (userName) {
			auth.signOut().then(() => {
				dispatch(setSignOutState())
				navigate("/")
			}).catch(err => alert(err.message))
		}
	}

	const setUser = (user) => {
		dispatch(
			setUserLoginDetails({
				name: user.displayName,
				email: user.email,
				photo: user.photoURL
			})
		)
	}
  return (
	<>
		<Nav>
		  	<Logo>
			  <Link to="/home">	  
				<img alt="Logo" src="/images/logo.svg" />
			  </Link>
			</Logo>
		   {
			  !userName ? 
				( <Login onClick={handleAuth}>LOGIN</Login> ) :
		(<>
			<NavMenu>
			<Link to="/home">
			<a>
				<img alt='Home' src='/images/home-icon.svg' />
				<span>Home</span>
			</a>
			</Link>
			<Link to="/search">			  
			<a>
				<img alt="Search" src='/images/search-icon.svg' />
				<span>Search</span>
			</a>
						  </Link>
			<Link to="/watchList">			  
			<a>
				<img alt="watchList" src='/images/watchlist-icon.svg' />
				<span>Watchlist</span>
			</a>
			</Link>
			</NavMenu>
			<Signout>
				<UserImg src={userPhoto} />
				<DropDown><span onClick={handleAuth}>Sign out</span></DropDown>
			</Signout>
		</>)
		  }
		  </Nav>
		  {userName ? <BottomNav>
			  <Link to="/home">
			<a>
				<img alt="home" src='/images/home-icon.svg' />
			</a>
			</Link>
			<Link to="/search">			  
			<a>
				<img alt="search Icon" src='/images/search-icon.svg' />
			</a>
						  </Link>
			<Link to="/watchList">			  
			<a>
				<img alt="watchList" src='/images/watchlist-icon.svg' />
			</a>
			  </Link>
			  <Signout onClick={toggleSignout}>
				  <UserImg src={userPhoto} />
				  {
					  showSignout &&
				<DropDown><span onClick={handleAuth}>Sign out</span></DropDown>
				  }
			  </Signout>
		  </BottomNav> : ""}
	</>
  )
}

export default Header

const Nav = styled.div` 
	height: 70px;
	background: black;
	display: flex;
	align-items: center;
	overflow: hidden;
	width: 100%;
	justify-content: space-between;
	z-index: 99;
`

const Logo = styled.div`
	img {
		height: 70px;
		width: 70px;
		margin: 0 36px;
	}

	@media (max-width: 450px) {
		width: 100%;
		display: flex;
		justify-content: center;
	} 
`

const NavMenu = styled.div`
	display: flex;
	flex: 1;
	margin: 0 13px;
	text-align: center;

	a {
		display: flex;
		align-items: center;
		margin: 0 13px;
		cursor: pointer;

		img {
			height: 30px;
		}

		span {
			text-transform: uppercase;
			font-size: 13px;
			letter-spacing: 1.42px;
			position: relative;
			color: white;
			font-weight: 400;

			&:after {
				content: "";
				height: 2px;
				background: white;
				position: absolute;
				left: 0;
				right: 0;
				bottom: -4px;
				opacity: 0;
				transform-origin: left center;
				transform: scaleX(0);
				transition: all 250ms cubic-bezier(.25,.46,.45,.94)
			}
		}
		
		&:hover {
			span:after {
				transform: scaleX(1);
				opacity: 1;
			}
		}
		
	}

	@media (max-width: 519px) {
		display: none;
	}
`

const UserImg = styled.img`
	height: 100%;
`

const Login = styled.button`
	margin: 0 36px;
	padding: 10px 20px;
	font-size: 14px;
	font-weight: 600;
	border-radius: 6px;
	border: 2px solid grey;
	background-color: black;
	color: white;
	transition: all 250ms ease-in;
	box-sizing: content-box;
	cursor: pointer;

	&:hover {
		color: black;
		background: whitesmoke;
		border: 2px solid whitesmoke;
	}
`

const DropDown = styled.div`
	position: absolute;
	width: 98px;
	top: 28px;
	right: 18px;
	z-index: 99;
	color: #fff;
	background: rgb(19, 19, 19);
	border: 1px solid rgba(151,151,151,0.34);
	border-radius: 4px;
	box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
	padding: 10px;
	font-size: 14px;
	letter-spacing: 3px;
	text-align: center;
	opacity: 0;
`

const Signout = styled.div`
	position: relative;
	height: 48px;
	width: 48px;
	margin-right: 10px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;

	${UserImg} {
		border-radius: 50%;
		width: 100%;
		height: 100%;
	}

	&:hover {
		${DropDown} {
			opacity: 1;
			transition-duration: 1s;
		}
	}

	@media (max-width: 519px) {
		display: none;
	}
`

const BottomNav = styled.div`
	position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: black;
  color: #fff;
  z-index: 99;
  

  a {
	display: flex;
	flex-direction: column;
	width: 42px;
	height: 42px;
  }

  ${Signout} {
position: relative;
	height: 48px;
	width: 48px;
	margin-right: 10px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
  }

  ${UserImg} {
	width: 100%;
	height: 100%;
	border-radius: 50%;
  }

  ${DropDown} {
	position: absolute;
	width: 98px;
	top: -38px;
	right: 5px;
	z-index: 99;
	color: #fff;
	background: rgb(19, 19, 19);
	border: 1px solid rgba(151,151,151,0.34);
	border-radius: 4px;
	box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
	padding: 10px;
	font-size: 14px;
	letter-spacing: 3px;
	text-align: center;
	opacity: 0;
  }

	@media (min-width: 519px) {
		display: none;
	}
`