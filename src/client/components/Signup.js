import { connect } from 'react-redux'
import React from 'react';
import { signUp } from '../actions/index'
import { browserHistory } from 'react-router'


const Signup = React.createClass({
  getInitialState() {
    return { Email: '', Password: '', ConfirmPassword: '' }
  },
  updateProperty(e) {
    this.state[e.target.placeholder] = e.target.value
    this.setState(this.state)
  },
  signup() {
    if (this.state.Password === this.state.ConfirmPassword) {
      this.props.signUp(this.state)
    }
  },
  goToLogin() {
    browserHistory.push('/')
  },
  render() {
    return (
      <div>
        <h2>Signup</h2>
        <input type='text' onChange={this.updateProperty} placeholder='Email'/>
        <input type='password' onChange={this.updateProperty} placeholder='Password'/>
        <input type='password' onChange={this.updateProperty} placeholder='ConfirmPassword'/>
        <button onClick={this.signup}>Lets go!</button>
        <p>Already have an account? <a onClick={this.goToLogin}>Log In</a>.</p>
      </div>
    )
  }
})

const mapStateToProps = ( {user} ) => {
    return { user }
}

const SignupContainer = connect(
  mapStateToProps,
  { signUp }
)(Signup)


module.exports = SignupContainer;
