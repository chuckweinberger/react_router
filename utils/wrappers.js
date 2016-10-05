
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.currentUser.currentUser,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'

})

export const UserIsAdmin = UserAuthWrapper({
  authSelector: state => state.currentUser,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => user.isAdmin,
  allowRedirectBack: false
})

export const VisibleOnlyAdmin = UserAuthWrapper({
  authSelector: state => state.currentUser,
  wrapperDisplayName: 'VisibleOnlyAdmin',
  predicate: user => user.isAdmin,
  FailureComponent: null
})