import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAppState } from '../store/app.action.js'
import Avatar from '@mui/material/Avatar';

import BeatLoader from "react-spinners/BeatLoader";

// import { socketService } from '../services/socketService.js'

import {
	loadUsers,
	removeUser,
	login,
	logout,
	signup,
} from '../store/user.action.js';

class _LoginSignup extends Component {
	state = {
		msg: '',
		loginCred: {
			username: '',
			password: '',
		},
		signupCred: {
			username: '',
			password: '',
			fullname: '',
			email: '',
		},
		formType: 'login',
	};

	componentDidMount() {
        this.props.setAppState({ isFullHeader: false, isHomePageTop: false, currPage: 'login' })
	}

	// componentWillUnmount() {
	// 	this.props.setFooterDisplay(true)
	// }

	loginHandleChange = (ev) => {
		const { name, value } = ev.target;
		this.setState((prevState) => ({
			loginCred: {
				...prevState.loginCred,
				[name]: value,
			},
		}));
	};

	signupHandleChange = (ev) => {
		const { name, value } = ev.target;
		this.setState((prevState) => ({
			signupCred: {
				...prevState.signupCred,
				[name]: value,
			},
		}));
	};

	doLogin = async (ev) => {
		ev.preventDefault();
		const { username, password } = this.state.loginCred;
		if (!username) {
			return this.setState({ msg: 'Please enter user/password' });
		}
		const userCreds = { username, password };
		try {
			await this.props.login(userCreds);
			// if (this.props.loggedInUser) {
			// 	socketService.emit('LOGIN', this.props.loggedInUser)
			// }
			this.setState({ loginCred: { username: '', password: '' } }, this.props.history.go(-1)
			)
		} catch (err) {
			this.setState({ msg: 'Login failed, try again.' });
		}
	};

	doSignup = async (ev) => {
		ev.preventDefault();
		const { username, password, fullname, email } = this.state.signupCred;
		if (!username || !password || !fullname || !email) {
			return this.setState({ msg: 'All inputs are required' });
		}
		const signupCreds = { username, password, fullname, email };
		await this.props.signup(signupCreds);
		// if (this.props.loggedInUser) {
		// 	socketService.emit('LOGIN', this.props.loggedInUser)
		// }
		this.setState(
			{ signupCred: { username: '', password: '', fullname: '', email: '' } },
			this.props.history.go(-1)
		);
	};

	removeUser = (userId) => {
		this.props.history.push('/');
		this.props.removeUser(userId);


	};

	toggleFormType = () => {
		const currForm = this.state.formType;
		const nextForm = currForm === 'login' ? 'signup' : 'login';
		this.setState({ formType: nextForm });
	};

	render() {
		let signupSection = (
			<form className="login-form" onSubmit={this.doSignup}>
				<div className="login-form-header">
					<h2>Sign Up</h2>
				</div>
				<div className="login-form-body">
					<h1>Welcome to <span>Homey</span></h1>

					<input
						type="text"
						name="fullname"
						value={this.state.signupCred.fullname}
						onChange={this.signupHandleChange}
						placeholder="Full name"
						autoComplete="fullname"
					/>
					<input
						name="password"
						type="password"
						value={this.state.signupCred.password}
						onChange={this.signupHandleChange}
						placeholder="Password"
						autoComplete="current-password"
					/>
					<input
						type="text"
						name="username"
						value={this.state.signupCred.username}
						onChange={this.signupHandleChange}
						placeholder="Username"
						autoComplete="username"
					/>
					<input
						type="text"
						name="email"
						value={this.state.signupCred.email}
						onChange={this.signupHandleChange}
						placeholder="email"
						autoComplete="email"
					/>
					<button className="login-btn" type="submit">
						sign up
					</button>
					<div className="login-actions-btn">
						<button
							type="button"
							className="toggle-form-btn"
							onClick={this.toggleFormType}>
							{' '}
							I already have an account
						</button>
					</div>
				</div>
			</form>
		)
		let loginSection = (
			<form className="login-form" onSubmit={this.doLogin}>
				<div className="login-form-header">

					<h2>Log in</h2>
				</div>

				<div className="login-form-body">

					<h1>Welcome back </h1>

					<input
						type="text"
						name="username"
						autoComplete="off"
						value={this.state.loginCred.username}
						onChange={this.loginHandleChange}
						placeholder="Username"
					/>
					<input
						type="password"
						name="password"
						autoComplete="off"
						value={this.state.loginCred.password}
						onChange={this.loginHandleChange}
						placeholder="Password"
					/>
					<button type="submit" className="login-btn">
						submit
					</button>
					<div className="login-actions-btn">
						<button
							type="button"
							className="toggle-form-btn"
							onClick={this.toggleFormType}
						>
							New user?
						</button>
						<button
							type="button"
							className="forgot-password-btn"
						// onClick={() => {
						// 	alert('Tough Luck');
						// }}
						>
							Forgot Password?
						</button>
					</div>
				</div>
			</form>
		)

		const { loggedinUser } = this.props;
		const { formType } = this.state;

		return (
			<section className="login-container main page">
				<p>{this.state.msg}</p>
				{loggedinUser &&
					<div className="login-forms-container">
						<div className='logout-container'>

						<h2>Not {loggedinUser.username}?</h2>
						<Avatar src={loggedinUser.imgUrl} />

						<button onClick={this.props.logout} className='logout-btn'>Log out</button>
						</div>
					</div>
				}

				
				<section className="login-forms-container">
					{!loggedinUser && formType === 'login' && loginSection}
					{!loggedinUser && formType === 'signup' && signupSection}
				</section>

				{/* {loggedInUser && loggedInUser.isAdmin && (
					<section className="admin">
						<details>
							<summary>Admin</summary>
							<button onClick={this.props.loadUsers}>Refresh Users</button>
							{this.props.isLoading && <BeatLoader />}
							{this.props.users && (
								<ul>
									{this.props.users.map((user) => (
										<li key={Math.random()}>
											<pre>{JSON.stringify(user, null, 2)}</pre>
											<button
												onClick={() => {
													this.removeUser(user._id);
												}}
											>
												Remove {user.username}
											</button>
										</li>
									))}
								</ul>
							)}
						</details>
					</section>
				)} */}
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.userModule.users,
		loggedinUser: state.userModule.loggedinUser,
		// isLoading: state.systemModule.isLoading,
	};
};
const mapDispatchToProps = {
	login,
	logout,
	signup,
	logout,
	loadUsers,
	setAppState
};

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup);
