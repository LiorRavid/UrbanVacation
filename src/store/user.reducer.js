import { userService } from '../services/user.service'

const initialState = {
  loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, user: action.user }
      break
    default:
      break
  }

  return newState
}
