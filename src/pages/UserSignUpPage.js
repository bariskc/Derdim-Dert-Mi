import React, { useState } from 'react';
import { signup } from '../api/apiCalls';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler, signupHandler } from '../redux/authActions';
import { URL } from '../shared/System';

const UserSignUpPage = (props) => {
	const [form, setForm] = useState({
		username: null,
		email: null,
		password: null,
		rePassword: null
	})
	// const [username, setUsername] = useState();
	// const [email, setEmail] = useState();
	// const [password, setPassword] = useState();
	// const [rePassword, setRePassword] = useState();
	const [agreedClicked, setAgreedClicked] = useState();
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();
	const onChange = event => {
		const { name, value } = event.target;
		const errorsCopy = { ...errors };
		errorsCopy[name] = undefined;

		setErrors(errorsCopy);
		const formCopy = { ...form };
		formCopy[name] = value;
		setForm(formCopy)

	}
	const onChangeAgree = event => {
		// this.setState({ agreedClicked: event.target.checked });
		setAgreedClicked(!agreedClicked);
	}
	const onClickSignUp = async event => {
		event.preventDefault();
		const { email, username, password } = form;
		const { history } = props;
		const { push } = history;
		const body = {
			username,
			password,
			email,
			image: null
		};

		try {
			// const response = await signup(body);
			await dispatch(signupHandler(body));
			push('/');
		} catch (error) {
			if (error.response.data.validationErrors) {
				setErrors(error.response.data.validationErrors);
			}
			console.log(error.response.data)
		}
		// signup(body)
		// .then((response) =>{
		//     this.setState({ pendingAPICall: false });
		// }).catch((error) => {
		//     this.setState({ pendingAPICall: false });
		// });
	}

	//const { agreedClicked, errors } = this.state;				
	const { username: usernameError, email: emailError, password: passwordError } = errors;
	const pendingAPICallSignUp = useApiProgress('post', '/api/1.0/users');
	//const pendingAPILogin = useApiProgress('https://ac37-94-54-232-254.eu.ngrok.io/api/1.0/auth');
	const pendingAPICall = pendingAPICallSignUp;//|| pendingAPILogin;
	let rePasswordError;
	if (form.password !== form.rePassword) {
		rePasswordError = 'Şifreler uyuşmamakta';
	}
	return (
		<div className='container'>
			<form>
				<h1 className='text-center'>Sign Up</h1>
				<Input type="email" name="email" label="E-Mail Adresiniz" error={emailError} onChange={onChange} />
				<Input name="username" label="Kullanıcı Adı" error={usernameError} onChange={onChange} />
				<Input type="password" name="password" label="Şifre" error={passwordError} onChange={onChange} />
				<Input type="password" name="rePassword" label="Şifre(Tekrar)" error={rePasswordError} onChange={onChange} />
				<div className="mb-3 form-check">
					<input type="checkbox" className="form-check-input" id="agreement" onChange={onChangeAgree} />
					<label className="form-check-label" htmlFor="agreement">Kabul ediyorum</label>
				</div>
				<ButtonWithProgress onClick={onClickSignUp} disabled={!agreedClicked || pendingAPICall || rePasswordError !== undefined} pendingAPICall={pendingAPICall} text={'Kayıt Ol'} />
			</form>
		</div>
	);
}


export default UserSignUpPage;