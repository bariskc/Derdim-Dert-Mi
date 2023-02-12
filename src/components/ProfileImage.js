import React from 'react';
import pic from '../assets/profile.png';

const ProfileImage = (props) => {
	const { image, tempimage } = props;

	let imageSource = pic;
	if (image) {
		imageSource = 'images/' + image;
	}
	return (
		<img src={tempimage || imageSource} {...props} onError={(event) => {
			event.target.src = pic
		}} />
	);
};

export default ProfileImage;