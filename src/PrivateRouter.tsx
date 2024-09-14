import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authState } from './utils/atoms'

interface PrivateRouteProps {
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const Component = element
  const auth = useRecoilValue(authState)
  return auth ? Component : <Navigate to="/login" />
}
export default PrivateRoute
