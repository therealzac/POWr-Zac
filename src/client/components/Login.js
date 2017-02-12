import { connect } from 'react-redux'
import React from 'react';
import $ from 'jquery';

const Login = React.createClass({
  getInitialState() {
    return { Email: '', Password: '' }
  },
  updateProperty(e) {
    this.state[e.target.placeholder] = e.target.value
    this.setState(this.state)
  },
  login() {
    this.props.login(this.state)
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

const mapStateToProps = ( state, props ) => {
    return {
      ...state.Application
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginData) => {
      $.ajax({
        url: '/login/',
        method: 'POST',
        data: loginData,
      }).done((response) => {
        console.log(response)
      }).fail((error) => {
        console.log(error)
      })
    }
  };
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)


module.exports = LoginContainer;
