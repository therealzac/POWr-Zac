import { connect } from 'react-redux'
import React from 'react';
import { PropTypes } from 'react';
import $ from 'jquery';
import { manualLogin } from '../actions/index'

const Login = React.createClass({
  getInitialState() {
    return { Email: '', Password: '' }
  },
  updateProperty(e) {
    this.state[e.target.placeholder] = e.target.value
    this.setState(this.state)
  },
  login() {
    this.props.manualLogin(this.state)
  },
  render() {
    return (
      <div>
        <h2>Login</h2>
        <input type='text' onChange={this.updateProperty} placeholder='Email'/>
        <input type='password' onChange={this.updateProperty} placeholder='Password'/>
        <button onClick={this.login}>Let's go!</button>
        <p>Don't have an account yet? <a href='#/signup/'>Sign Up</a>.</p>
      </div>
    )
  }
})

Login.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
};

const mapStateToProps = ( {user} ) => {
    return {user}
}

const LoginContainer = connect(
  mapStateToProps,
  { manualLogin }
)(Login);

module.exports = LoginContainer;
