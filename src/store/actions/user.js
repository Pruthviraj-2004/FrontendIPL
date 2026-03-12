import api from '../../services/axios'
import { userActions } from '../reducers/userReducers'

export const logout = () => (dispatch) => {
  const data = api.post('/api/v1/logout/')
  dispatch(userActions.resetUserInfo())
  localStorage.removeItem('account')
}