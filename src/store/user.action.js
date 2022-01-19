import { userService } from '../services/user.service.js'

export function signup(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(credentials)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.error(err)
    }
  }
}

export function login(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.error(err)
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.error(err)
    }
  }
}