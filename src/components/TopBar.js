import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImage from './ProfileImage';

const TopBar = (props) => {
	const { username, isLoggedIn, image } = useSelector((store) => ({
		isLoggedIn: store.isLoggedIn,
		username: store.username,
		image: store.image
	}))
	const menuArea = useRef(null);
	const [menuVisible, setMenuVisible] = useState(false);

	const dispatch = useDispatch();
	const onLogoutSuccess = () => {
		dispatch(logoutSuccess());
	}

	useEffect(() => {
		document.addEventListener('click', menuClickTracker);
		return () => {
			document.removeEventListener('click', menuClickTracker);
		}
	}, [isLoggedIn])

	const menuClickTracker = event => {
		if (menuArea.current === null || !menuArea.current.contains(event.target)) {
			setMenuVisible(false);
		}
	}

	let links = (
		<ul className="navbar-nav">
			<li><Link className="nav-link" to="/login">Giriş</Link></li>
			<li><Link className="nav-link" to="/signup">Kayıt Ol</Link></li>
		</ul>
	);
	if (isLoggedIn) {
		let dropDownClass = "dropdown-menu p-0 shadow";
		if (menuVisible) {
			dropDownClass += ' show';
		}
		links = (
			<ul className="navbar-nav ml-auto" ref={menuArea}>
				<li className="nav-item dropdown">
					<div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
						{/* <Link className="nav-link dropdown-toggle" to={`/users/${username}`}>{username}</Link> */}
						<span className="nav-link dropdown-toggle">{username}</span>
						{/* <ProfileImage image={image} width="32" height="32" className="rounded-circle m-auto" /> */}
					</div>
					<div className={dropDownClass}>
						<Link className="dropdown-item" to={`/users/${username}`} onClick={() => setMenuVisible(false)}>Profil</Link>
						<Link className="dropdown-item" to={`/${username}/settings`} onClick={() => setMenuVisible(false)}>Ayarlar</Link>
						<span className="dropdown-item" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>Çıkış</span>
					</div>
				</li>
			</ul>
		)
	}

	return (
		<div>
			<nav className="navbar bg-light navbar-expand">
				<div className="container-fluid container">
					<Link className="navbar-brand" to="/">derdim dert mi?</Link>

					{links}
				</div>
			</nav>
		</div>
	);

}

export default TopBar;