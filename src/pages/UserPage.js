import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import EntryFeed from '../components/EntryFeed';

const UserPage = () => {
	const [user, setUser] = useState({});
	const [notFound, setNotFound] = useState(false);
	const { username } = useParams();

	const pendingAPICall = useApiProgress('get', '/api/1.0/users/' + username, true);
	useEffect(() => {
		setNotFound(false);
	}, [user]);

	useEffect(() => {
		//console.log(props.match.params.username);
		const loadUser = async () => {
			try {
				const response = await getUser(username);
				setUser(response.data)
				//		setNotFound(false);
			} catch (error) {
				//		setNotFound(true);
			}
		}
		loadUser();
	}, [username]);

	if (notFound) {
		return (
			<div className='container'>
				<div className="alert alert-danger">
					User Not Found
				</div>
			</div>
		)
	}

	if (pendingAPICall || user.username !== username) {
		return (
			<Spinner />
		)
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col'>
					<EntryFeed />
				</div>
				<div className='col'>
					<ProfileCard user={user} />
				</div>
			</div>

		</div>
	);
};

export default UserPage;