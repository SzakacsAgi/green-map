import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useResetRecoilState } from 'recoil'
import { authState, themeState, navbarState, selectedLanguage } from '../utils/atoms'
import i18n from '../i18n'

export const useLogout = () => {
  const navigate = useNavigate()
  const resetAuth = useResetRecoilState(authState)
  const resetTheme = useResetRecoilState(themeState)
  const resetNavbar = useResetRecoilState(navbarState)
  const resetSelectedLanguage = useResetRecoilState(selectedLanguage)

  const logout = useCallback(() => {
    resetAuth()
    resetTheme()
    resetNavbar()
    resetSelectedLanguage()
    i18n.changeLanguage(navigator.language)
    navigate('/login')
  }, [resetAuth, resetTheme, resetNavbar, navigate])

  return logout
}
