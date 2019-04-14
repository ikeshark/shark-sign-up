import React, { Component } from 'react';

import firebase, { auth } from './firebase';
import Success from './Success';

class SignUp extends Component {

  state = {
    email: '',
    isEmailValid: false,
    passwordOne: '',
    passwordTwo: '',
    error: false,
    errorMessage: '',
    success: false,
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
    if (e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ error: false });

    auth.createUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
    .then(() => this.setState({ success: true }))
    .catch(error => {
      this.setState({ error: true, errorMessage: error.message });
    });
  }


  render() {
    const {
      email,
      isEmailValid,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      passwordOne.length < 6 ||
      !isEmailValid;

    return (
      <div className="App">
        <h1>Create Your Account</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onEmailChange}
            />
          </label>
          <label>
            Password
            <input
              name="passwordOne"
              type="password"
              value={this.state.passwordOne}
              onChange={this.onChange}
            />
          </label>
          <label>
            Confirm Password
            <input
              name="passwordTwo"
              type="password"
              value={this.state.passwordTwo}
              onChange={this.onChange}
            />
          </label>
          <button disabled={isInvalid} type="submit">
            Patch In<sup>*</sup>
          </button>
        </form>
        <p className="disclaimer">
          <sup>*</sup>You may be called upon to kill a man for the Barnyard Sharks
          <br />With great privilege comes great responsibility
        </p>
        {this.state.error && <p>{this.state.errorMessage}</p>}
        {this.state.success && <Success />}
      </div>
    );
  }
}

export default SignUp;
