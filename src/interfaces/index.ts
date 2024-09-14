import { ComponentType, SVGProps } from 'react'

export interface Todo {
  id: string
  text: string
  status: boolean
}

export interface PoiData {
  id: string
  address: string
  category: string
  description: string
  email: string
  latitude: number
  longitude: number
  name: string
  openingHours: string
  phoneNumber: string
  subCategory: string
  url: string
}

export interface ModalState {
  opened: boolean
  data: PoiData | null
  type: ModalTypes | null
}

export enum SupportedInputs {
  ADDRESS = 'address',
  CATEGORY = 'category',
  DESCRIPTION = 'description',
  EMAIL = 'email',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  POI_NAME = 'name',
  OPENING_HOURS = 'openingHours',
  PHONE_NUMBER = 'phoneNumber',
  SUBCATEGORY = 'subCategory',
  URL = 'url',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'passwordConfirm',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  OPENING_TIME = 'openingTime',
  CLOSING_TIME = 'closingTime'
}

export enum ModalTypes {
  EDIT_POI = 'editPoi',
  CREATE_POI = 'createPoi',
  VIEW_POI = 'viewPoi',
  DELETE_POI = 'deletePoi'
}

export interface LoginFormInput {
  email: string
  password: string
}

export interface RegistrationFormInput {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
}

export interface ModalFormInput {
  address: string
  category: string
  description: string
  email: string
  latitude: string
  longitude: string
  name: string
  openingHours: string
  phoneNumber: string
  subCategory: string
  url: string
  openingTime: string
  closingTime: string
}

export type IconComponentType = ComponentType<SVGProps<SVGSVGElement>> & {
  className?: string
}

export enum SupportedLanguages {
  ENGLISH = 'en',
  HUNGARY = 'hu'
}

export enum SupportedThemes {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum SupportedUserActionFeedBackType {
  ERROR,
  POSITIVE_FEEDBACK
}

export interface ResponsesType {
  isShow: boolean
  type: ResponseError | ResponseSuccess
}

export enum ResponseError {
  BAD_REQUEST = 'BAD_REQUEST',
  SERVER_ERROR = 'SERVER_ERROR'
}

export enum ResponseSuccess {
  POSITIVE_FEEDBACK = 'POSITIVE_FEEDBACK'
}

export interface PaginationState {
  shownData: PoiData[] | []
  lastPage: number | null
  currentPage: number
  isLoading: boolean
  pageSize: number
  searchedText?: string
  handleNextClick?: () => void
  handlePrevClick?: () => void
  handleSearch?: (pageToGet: number, searchedText: string) => Promise<void>
  setPageSize?: () => void
  handlePageNavigation?: (page: number) => void
}
