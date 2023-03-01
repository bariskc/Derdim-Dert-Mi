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
		<div className="container mx-auto flex flex-col justify-center items-center mt-[20px]">
			<form className="w-[400px] bg-[#fff] py-[30px] px-[20px] rounded-[5px]">
				<h1 className="text-center text-[#016980] font-semibold text-[30px] mb-[20px]">
					kayıt ol
				</h1>
				<Input type="email" name="email" label="e-mail adresiniz" error={emailError} onChange={onChange} />
				<Input name="username" label="kullanıcı adı" error={usernameError} onChange={onChange} />
				<Input type="password" name="password" label="şifre" error={passwordError} onChange={onChange} />
				<Input type="password" name="rePassword" label="şifre(tekrar)" error={rePasswordError} onChange={onChange} />
				<div className="mb-3 form-check">
					<input
						type="checkbox"
						className="form-check-input"
						onChange={onChangeAgree}
					/>
					<label className="ml-2">
						kabul ediyorum
					</label>
				</div>

				<ButtonWithProgress
					onClick={onClickSignUp}
					disabled={!agreedClicked || pendingAPICall || rePasswordError !== undefined}
					pendingAPICall={pendingAPICall}
					text={"kayıt ol"}
					className={
						"bg-[#fdb668] w-full py-[13px] rounded-[5px] text-[#fff] font-semibold"
					}
				/>
			</form>
		</div>
	);
}


export default UserSignUpPage;