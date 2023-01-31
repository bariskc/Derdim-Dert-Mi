import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProfileCard = (props) => {
	
	const {username : loggedInUsername} = useSelector(store => ({username: store.username}));
	
	const routeParams = useParams();
	console.log(routeParams);
	const pathUserName = routeParams.username;
	let message = "nah edit";
	if (pathUserName === loggedInUsername) {
		message = "edit";
	}
	return (<div>{message}</div>);
};

// class ProfileCardContextWrapper extends React.Component {
// 	static contextType = Authentication;
// 	render() {
// 		return (
// 			<ProfileCard {...this.props} username={this.context.state.username} />
// 		);
// 	}
// }


export default ProfileCard;