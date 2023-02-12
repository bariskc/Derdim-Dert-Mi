import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import { URL } from '../shared/System';
import Spinner from '../components/Spinner';
const UserPage = (props) => {
	const [user, setUser] = useState({});
	const [notFound, setNotFound] = useState(false);
	const { username } = props.match.params;

	const pendingAPICall = useApiProgress('post' + URL + '/api/1.0/users/' + username);
	useEffect(() => {
		console.log(props.match.params.username);
		const loadUser = async () => {
			try {
				const response = await getUser(username);
				setUser(response.data)
				//			setNotFound(false);
			} catch (error) {
				//		setNotFound(true);
			}
		}
		loadUser();
	}, [username])
	if (pendingAPICall) {
		return (
			<Spinner />
		)
	}
	if (notFound) {
		return (
			<div className='container'>
				<div className="alert alert-danger">
					User Not Found
				</div>
			</div>
		)
	}
	return (
		<div className='container'>
			<ProfileCard user={user} />
		</div>
	);
};

export default UserPage;