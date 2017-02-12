import { connect } from 'react-redux'
import React from 'react';
import $ from 'jquery';


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
      this.props.signup(this.state)
    }
  },
  render() {
    return (
      <div>
        <h2>Signup</h2>
        <input type='text' onChange={this.updateProperty} placeholder='Email'/>
        <input type='password' onChange={this.updateProperty} placeholder='Password'/>
        <input type='password' onChange={this.updateProperty} placeholder='ConfirmPassword'/>
        <button onClick={this.signup}>Lets go!</button>
        <p>Already have an account? <a href='#/'>Log In</a>.</p>
      </div>
    )
  }
})

const mapStateToProps = ( state, props ) => {
    return { ...state.Application }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (signupData) => {
      $.ajax({
        url: '/register/',
        method: 'POST',
        data: signupData
      }).done((response) => {
        console.log(response)
      }).fail((error) => {
        console.log(error)
      })
    }
  };
}

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)


module.exports = SignupContainer;
