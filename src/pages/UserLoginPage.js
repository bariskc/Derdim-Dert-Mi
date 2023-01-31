import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler, loginSuccess } from '../redux/authActions';
const UserLoginPage = (props) => {

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [agreedClicked, setAgreedClicked] = useState();
	const [error, setError] = useState();
	const dispatch = useDispatch();

	const onChangeAgree = event => {
		// this.setState({ agreedClicked: event.target.checked });
	}

	useEffect(() => {

	}, [username, password])

	const onClickLogin = async event => {
		event.preventDefault();
		
		const { history} = props;
		const { push } = history;
		const body = {
			username,
			password,
		};
		setError(undefined);
		try {
			await dispatch(loginHandler(body));
			push('/');
		} catch (apiError) {
			setError(apiError.response.data.message)
		}
	}
	
	const pendingAPICall = useApiProgress('https://ac37-94-54-232-254.eu.ngrok.io/api/1.0/auth');
	const buttonEnabled = username && password;
	return (
		<div className='container'>
			<form>
				<h1 className='text-center'>Login</h1>
				{error && <div className="alert alert-danger">{error}</div>}
				<Input name="username" label="Kullanıcı Adı" onChange={(event) => setUsername(event.target.value)} />
				<Input type="password" name="password" label="Şifre" onChange={(event) => setPassword(event.target.value)} />
				<div className="mb-3 form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck" onChange={onChangeAgree} />
					<label className="form-check-label" htmlFor="exampleCheck">Beni hatırla</label>
				</div>
				<ButtonWithProgress onClick={onClickLogin} disabled={pendingAPICall || !buttonEnabled} pendingAPICall={pendingAPICall} text={'Giriş'} />
			</form>
		</div>
	);
}

// const mapDisspatchToProps = (dispatch) => {
// 	return {
// 		onLoginSuccess: (authState) => dispatch(loginSuccess(authState))
// 	};
// }

export default UserLoginPage;
