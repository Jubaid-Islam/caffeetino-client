import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext)

  const location = useLocation()


  if (user && user?.email) {
    return children
  }
  return <Navigate  state={{ from: location }} to='/signin'></Navigate>
}

export default PrivateRoute
