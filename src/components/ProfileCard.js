import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ProfileImage from './ProfileImage';
import Input from './Input';
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess } from '../redux/authActions';
import { countries } from '../shared/countries.js';
import { cities } from '../shared/cities.js';

const ProfileCard = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [updatedEmail, setUpdatedEmail] = useState();
	const [updatedCity, setUpdatedCity] = useState();
	const [updatedGender, setUpdatedGender] = useState();
	const [tempCity, setTempCity] = useState();
	const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
	const routeParams = useParams();
	const pathUsername = routeParams.username;
	const [user, setUser] = useState({});
	const [editable, setEditable] = useState(false);
	// const [newImage, setNewImage] = useState();
	const [validationErrors, setValidationErrors] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		setUser(props.user);
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
			city: undefined,
		}));
	}, [updatedCity]);
	useEffect(() => {
		console.log(updatedGender)
		setValidationErrors((previousValidationErrors) => ({
			...previousValidationErrors,
			gender: undefined,
		}));
	}, [updatedGender]);
	// useEffect(() => {
	// 	setValidationErrors((previousValidationErrors) => ({
	// 		...previousValidationErrors,
	// 		image: undefined,
	// 	}));
	// }, [newImage]);
	const { username, email, city, gender } = user;
	useEffect(() => {
		if (!editMode) {
			setUpdatedEmail(undefined);
			// setNewImage(undefined);
		} else {
			setUpdatedEmail(email);
			setUpdatedCity(city);
			setUpdatedGender(gender);
		}

	}, [editMode, email,city,gender])
	//TODO update işlemi sayfa yenilenmeden çalışmıyor.
	const onClickSave = async () => {
		// let image;
		// if (newImage) {
		// 	image = newImage.split(',')[1];
		// }
		const body = {
			email: updatedEmail,
			city: updatedCity,
			gender: updatedGender
			// image
		}
		console.log(body);
		try {
			const response = await updateUser(username, body);
			setUser(response.data);
			setEditMode(false);
			dispatch(updateSuccess(response.data));
		} catch (error) {
			console.log(error);
			if (error.response.data.validationErrors) {
				setValidationErrors(error.response.data.validationErrors);
			}
			//console.log(error.response.data);
		}
	}

	const onChangeCities = (value) => {
		setTempCity(value);
		setUpdatedCity(value);
	}
	const onGenderChange = (value) => {
		console.log(value.target.value);
		setUpdatedGender(value.target.value); 
	}

	// const onChangeFile = (event) => {
	// 	if (event.target.files.length < 1) {
	// 		return;
	// 	}
	// 	const file = event.target.files[0];
	// 	const fileReader = new FileReader();

	// 	fileReader.onloadend = () => {
	// 		setNewImage(fileReader.result);
	// 	}
	// 	fileReader.readAsDataURL(file);
	// }

	const pendingAPICall = useApiProgress('put', '/api/1.0/users/' + username);
	//const { email: emailError, image: imageError } = validationErrors;
	const { email: emailError } = validationErrors;

	return (
		<div className='card'>
			<div className='card-body'>
				{/* <ProfileImage className='rounded-circle shadow' width={128} height={128} image={image} tempimage={newImage} /> */}
				{!editMode &&
					<>
						{username}
						<br />
						{email}
						<br />
						{city}
						<br />
						{gender}
						<br />
						{editable &&
							<button className='btn btn-primary' onClick={() => setEditMode(true)}>Düzenle</button>
						}
					</>
				}
				{editMode &&
					<div>
						<Input label={'E-Posta adresini düzenle'} defaultValue={email} onChange={event => setUpdatedEmail(event.target.value)} error={emailError} />
						{/* <select className="form-select" onChange={event => onChangeCountry(event.target.value)}>
							<option>{country ? country : "Seçiniz"}</option>
							{countries.map(country =>
								<option value={country.name} key={country.id}>{country.name}</option>
							)}
						</select>
						<br /> */}
						<select className="form-select" onChange={event => onChangeCities(event.target.value)}>
							<option>{city ? city : "Seçiniz"}</option>
							{cities.map(city =>
								<option value={city.name} key={city.id}>{city.name}</option>
							)}
						</select>

						<br />
						<div className="form-check form-check-inline" onChange={onGenderChange}>
							<input className="form-check-input" type="radio" name="flexRadioDefault" value="Erkek" defaultChecked={gender === "Erkek"} />
							<label className="form-check-label">
								Erkek
							</label>
						</div>
						<div className="form-check form-check-inline" onChange={onGenderChange}>
							<input className="form-check-input" type="radio" name="flexRadioDefault" value="Kadın" defaultChecked={gender === "Kadın"} />
							<label className="form-check-label">
								Kadın
							</label>
						</div>
						<div className="form-check form-check-inline" onChange={onGenderChange}>
							<input className="form-check-input" type="radio" name="flexRadioDefault" value="Diğer" defaultChecked={gender === "Diğer"} />
							<label className="form-check-label">
								Diğer
							</label>
						</div>
						<br />
						{/* <Input type="file" onChange={onChangeFile} error={imageError} /> */}
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

export default ProfileCard;