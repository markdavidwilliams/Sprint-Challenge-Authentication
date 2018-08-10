import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Jokes extends Component {
  state = {
    jokes: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const URL = 'http://localhost:5000/api/jokes';
    if (token) {
      axios
        .get(URL, { headers: { Authorization: token }})
        .then(response => {
          this.setState({ jokes: response.data })
        })
        .catch(err => console.log(err))
    } else {
      setTimeout(() => window.location.pathname = '/', 3000)
    }
  }

  logout = () => {
    localStorage.removeItem('token');
  }

  render() {
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