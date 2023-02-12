import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileImage from './ProfileImage';
import Input from './Input';
import { updateEmail } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import { URL } from '../shared/System';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = (props) => {
	const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
	const [editMode, setEditMode] = useState(false);
	const [updatedEmail, setUpdatedEmail] = useState();
	const routeParams = useParams();
	const pathUsername = routeParams.username;
	const [user, setUser] = useState({});
	const [editable, setEditable] = useState(false);
	const [newImage, setNewImage] = useState();
	const [validationErrors, setValidationErrors] = useState({});
	useEffect(() => {
		setUser(props.user)
	}, [props.user]);
	useEffect(() => {
		setEditable(pathUsername === loggedInUsername);

	}, [pathUsername, loggedInUsername]);
	useEffect(() => {
		setValidationErrors((previousValidationErrors) => ({
			...previousValidationErrors,
			email: undefined,
		}));
	}, [updatedEmail]);
	useEffect(() => {
		setValidationErrors((previousValidationErrors) => ({
			...previousValidationErrors,
			image: undefined,
		}));
	}, [newImage]);
	const { username, email, image } = user;
	useEffect(() => {
		if (!editMode) {
			setUpdatedEmail(undefined);
			setNewImage(undefined);
		} else {
			setUpdatedEmail(email);
		}

	}, [editMode, email])
	const onClickSave = async () => {
		let image;
		if (newImage) {
			image = newImage.split(',')[1];
		}
		const body = {
			email: updatedEmail,
			image
		}
		try {
			const response = await updateEmail(username, body);
			setEditMode(false);
		} catch (error) {
			setValidationErrors(error.response.data.validationErrors);
		}
	}

	const onChangeFile = (event) => {
		if (event.target.files.length < 1) {
			return;
		}
		const file = event.target.files[0];
		const fileReader = new FileReader();

		fileReader.onloadend = () => {
			setNewImage(fileReader.result);
		}
		fileReader.readAsDataURL(file);
	}

	const pendingAPICall = useApiProgress('post' + URL + '/api/1.0/users/' + username);
	const {email: emailError, image :imageError} = validationErrors;
	return (
		<div className='card'>
			<div className='card-body'>
				<ProfileImage className='rounded-circle shadow' width={128} height={128} image={image} tempimage={newImage} />
				{!editMode &&
					<>
						{username}
						{editable &&
							<button className='btn btn-primary' onClick={() => setEditMode(true)}>Düzenle</button>
						}
					</>
				}
				{editMode &&
					<div>
						<Input label={'E-Posta adresini düzenle'} defaultValue={email} onChange={(event) => setUpdatedEmail(event.target.value)} error={emailError} />
						<Input type="file" onChange={onChangeFile} error={imageError} />
						<br />
						<div>
							<button className='btn btn-secondary' onClick={() => setEditMode(false)} disabled={pendingAPICall}>Vazgeç</button>
							<ButtonWithProgress disabled={pendingAPICall} pendingAPICall={pendingAPICall} text={'Kaydet'} className='btn btn-success' onClick={onClickSave} />
						</div>
					</div>
				}
			</div>
		</div>);
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