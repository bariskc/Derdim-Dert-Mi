import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';

const TopBar = (props) => {

	const { username, isLoggedIn } = useSelector((store) => ({
		isLoggedIn: store.isLoggedIn,
		username: store.username
	}))

	const dispatch = useDispatch(); 
	const onLogoutSuccess = () => {
		dispatch(logoutSuccess());
	}

	let links = (
		<ul className='navbar-nav'>
			<li><Link className="nav-link" to="/login">Giriş</Link></li>
			<li><Link className="nav-link" to="/signup">Kayıt Ol</Link></li>
		</ul>
	);
	if (isLoggedIn) {
		links = (
			<ul className='navbar-nav'>
				<li><Link className="nav-link" to={`/user/${username}`}>{username}</Link></li>
				<li className="nav-link" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>Çıkış</li>
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