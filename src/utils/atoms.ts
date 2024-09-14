import { atom } from 'recoil'
import { SupportedThemes, Todo } from '../interfaces'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const todoListState = atom({
  key: 'TodoList',
  default: [] as Todo[]
})

export const authState = atom({
  key: 'auth',
  default: null,
  effects_UNSTABLE: [persistAtom]
})

export const navbarState = atom({
  key: 'isOpen',
  default: true,
  effects_UNSTABLE: [persistAtom]
})

export const themeState = atom({
  key: 'theme',
  default: SupportedThemes.LIGHT,
  effects_UNSTABLE: [persistAtom]
})

export const selectedLanguage = atom({
  key: 'selectedLanguage',
  default: null,
  effects_UNSTABLE: [persistAtom]
})
