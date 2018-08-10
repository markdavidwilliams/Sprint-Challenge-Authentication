import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  registerUser = event => { // checks to make sure password is consistent and sends up user object to server, if no error places response token in local storage, redirects to jokes
    event.preventDefault();
    if(this.state.password !== this.state.confirmPassword) {
      return this.setState({ password: '', confirmPassword: '' })
    }
    const URL = 'http://localhost:5000/api/register';
    const user = { 
      username: this.state.username,
      password: this.state.password
     };
    axios
      .post(URL, user)
      .then(response => {
        const token = response.data;
        localStorage.setItem('token', token)
        window.location.pathname = '/jokes';
      })
      .catch(err => console.log(err))
    }

  render() {
    return(
      <div className='register'>
        <form>
          <label>
            Create Username:
            <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Create Password:
            <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
          </label>
          <label>
            Confirm Password:
            <input type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} />
          </label>
          <button type='submit' onClick={this.registerUser}>
           Register
          </button>
        </form>
        <div className='already-registered'>
          <p>Already Registered?</p>
          <Link to='/'>
            Login
          </Link>
        </div>
      </div>
    )
  }
}

export default Register;