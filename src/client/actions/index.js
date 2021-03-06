import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeUserRequest(method, data, api = '/login') {
  return request[method](api, data);
}


// Log In Action Creators
export function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    data
  };
}

export function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

// Sign Up Action Creators
export function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

export function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

export function signUpSuccess(data) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    data
  };
}

// Log Out Action Creators
export function beginLogout() {
  return { type: types.LOGOUT_USER};
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

export function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function beginCreatePost() {
  return { type: types.CREATE_POST};
}

export function createPostSuccess(data) {
  return { type: types.CREATE_POST_SUCCESS, data: data };
}

export function createPostError(message) {
  return { type: types.CREATE_POST_ERROR, message: message };
}

export function beginGetPosts() {
  return { type: types.GET_POSTS };
}

export function getPostsSuccess(data) {
  return { type: types.GET_POSTS_SUCCESS, data: data };
}

export function getPostsError(message) {
  return { type: types.GET_POSTS_ERROR, message: message };
}

export function beginGetUserData() {
  return { type: types.GET_USER_DATA };
}

export function getUserDataSuccess(data) {
  return { type: types.GET_USER_DATA_SUCCESS, data: data };
}

export function getUserDataError(message) {
  return { type: types.GET_USER_DATA_ERROR, message: message };
}


export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.data));
          dispatch(push('/posts'));
        } else {
          dispatch(loginError(response.data.message));
        }
      })
      .catch(err => {
        dispatch(loginError(getMessage(err)));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/register')
      .then(response => {
        if (response.status === 201) {
          dispatch(signUpSuccess(response.data.data));
          dispatch(push('/posts'));
        } else {
          dispatch(signUpError(response.data.message));
        }
      })
      .catch(err => {
        dispatch(signUpError(getMessage(err)));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
          dispatch(push('/'));
        } else {
          dispatch(logoutError());
        }
      });
  };
}

export function createPost(data) {
  return dispatch => {
    dispatch(beginCreatePost());

    return makeUserRequest('post', data, '/api/posts')
      .then(response => {
        if (response.status === 201) {
          dispatch(createPostSuccess(response.data.data));
        } else {
          dispatch(createPostError());
        }
      });
  };
}


export function getPosts() {
  return dispatch => {
    dispatch(beginGetPosts());

    return makeUserRequest('get', null, '/api/posts')
      .then(response => {
        if (response.status === 200) {
          dispatch(getPostsSuccess(response.data.data));
        } else {
          dispatch(getPostsError(response.data.message));
        }
      });
  };
}

export function getUserData() {
  return dispatch => {
    dispatch(beginGetUserData());

    return makeUserRequest('get', null, '/api/users')
      .then(response => {
        if (response.status === 200) {
          dispatch(getUserDataSuccess(response.data.data));
        } else {
          dispatch(getUserDataError(response.data.message));
        }
      });
  };
}
