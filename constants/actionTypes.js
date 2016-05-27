// import { createConstants } from '../utils';

// export default createConstants(
//   'ADD_USER',
//   'EMAIL_CHANGE',
//   'SHOW_USER',
//   'SHOW_USER_DETAILS',
//   'LOGIN_USER_REQUEST',
//   'LOGIN_USER_FAILURE',
//   'LOGIN_USER_SUCCESS',
//   'LOGOUT_USER',
//   'FETCH_PROTECTED_DATA_REQUEST',
//   'RECEIVE_PROTECTED_DATA'
// )

export const ADD_USER =                     Symbol('ADD_USER');
export const EMAIL_CHANGE =                 Symbol('EMAIL_CHANGE');
export const SHOW_USER =                    Symbol('SHOW_USER');
export const SHOW_USER_DETAILS =            Symbol('SHOW_USER_DETAILS');
export const LOGIN_USER_REQUEST =           Symbol('LOGIN_USER_REQUEST');
export const LOGIN_USER_FAILURE =           Symbol('LOGIN_USER_FAILURE');
export const LOGIN_USER_SUCCESS =           Symbol('LOGIN_USER_SUCCESS');
export const LOGOUT_USER =                  Symbol('LOGOUT_USER');
export const FETCH_PROTECTED_DATA_REQUEST = Symbol('FETCH_PROTECTED_DATA_REQUEST');
export const RECEIVE_PROTECTED_DATA =       Symbol('RECEIVE_PROTECTED_DATA');