import api from '../../services/axios'
import { userActions } from '../reducers/userReducers'

export const logout = () => async (dispatch) => {
  try {
    const response = await api.post('/api/v1/logout/')
    console.log(response)
  } catch (error) {
    console.error('Logout failed:', error)
  }

  dispatch(userActions.resetUserInfo())
  localStorage.removeItem('account')
}