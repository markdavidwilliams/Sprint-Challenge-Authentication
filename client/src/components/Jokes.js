import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Jokes.css';

class Jokes extends Component {
  state = {
    jokes: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('token'); // check if token exists
    const URL = 'http://localhost:5000/api/jokes';
    if (token) {
      axios
        .get(URL, { headers: { Authorization: token }}) // sends up token to server to be verified
        .then(response => {
          this.setState({ jokes: response.data }) // places jokes on state
        })
        .catch(err => console.log(err))
    } else {
      setTimeout(() => window.location.pathname = '/', 3000) // if no token, redirects to login
    }
  }

  logout = () => {
    localStorage.removeItem('token'); // removes token 
  }

  render() { // redirects if no token, logout removes token and redirects to login, displays jokes once token validated
    return(
      <Fragment>
        {!localStorage.getItem('token') ? (
          <p>You are not logged in. Redirecting...</p>
        ) : (
          <Fragment>
            <Link to='/'> 
              <button type='button' className='logout' onClick={this.logout}> 
                Logout
              </button>
            </Link>
            {this.state.jokes.map(joke => {
              return (
                  <div className='joke' key={joke.id}>
                    <p>{joke.setup}</p>
                    <p>{joke.punchline}</p>
                  </div>
              )
            })}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Jokes;