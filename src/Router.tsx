import { Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'
import Registration from './components/pages/Registration'
import TodoList from './components/TodoList'
import PrivateRoute from './PrivateRouter'
import Administration from './components/pages/Administration'
import Map from './components/pages/Map'
import PageNotFound from './components/pages/PageNotFound'
import Profile from './components/pages/Profile'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { authState, themeState } from './utils/atoms'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'

const Router = () => {
  const theme = useRecoilValue(themeState)
  const auth = useRecoilValue(authState)

  useEffect(() => {
    theme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }, [auth])

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/todo" element={<PrivateRoute element={<TodoList />} />} />
      <Route path="/administration" element={<PrivateRoute element={<Administration />} />} />
      <Route path="/map" element={<PrivateRoute element={<Map />} />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword">
        <Route index element={<PageNotFound />} />
        <Route path=":resetPasswordToken" element={<ResetPassword />} />
      </Route>
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router
