import React, { act } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../src/i18n'
import LoginForm from '../../../src/components/login/LoginForm'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import { RecoilRoot } from 'recoil'

vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ status: 200 }))
  }
}))

const mockedNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}))

const setUpLoginForm = () => {
  render(
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <LoginForm />
      </I18nextProvider>
    </RecoilRoot>
  )

  const emailInput = screen.getByLabelText('email')
  const passwordInput = screen.getByLabelText(i18n.t('inputLabels.password'))
  const submitButton = screen.getByRole('button')

  return { emailInput, passwordInput, submitButton }
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('shows validation errors when form is submitted without email and password', async () => {
    const { submitButton } = setUpLoginForm()
    await act(async () => {
      fireEvent.click(submitButton)
    })
    await waitFor(() => {
      expect(screen.getByText(i18n.t('errors.emptyEmailField'))).toBeInTheDocument()
      expect(screen.getByText(i18n.t('errors.emptyPasswordField'))).toBeInTheDocument()
    })
  })
  it('shows invalid email error when form is submitted with invalid email format', async () => {
    const { submitButton, emailInput } = setUpLoginForm()
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.click(submitButton)
    })
    await waitFor(() => {
      expect(screen.getByText(i18n.t('errors.invalidEmailFormat'))).toBeInTheDocument()
    })
  })

  it('does not call axios post when form is submitted with empty inputs', async () => {
    const { submitButton } = setUpLoginForm()

    await act(async () => {
      fireEvent.click(submitButton)
    })

    await vi.waitFor(() => {
      expect(axios.post).not.toBeCalledWith(`${process.env.BASE_URL}/api/login`)
    })
  })

  it('makes axios post request when form is submitted with valid inputs', async () => {
    const { emailInput, passwordInput, submitButton } = setUpLoginForm()

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.click(submitButton)
    })
    await vi.waitFor(() => {
      expect(axios.post).toBeCalledWith(`${process.env.BASE_URL}/api/login`)
    })
  })

  it('navigates to "/" after successful login response', async () => {
    const { emailInput, passwordInput, submitButton } = setUpLoginForm()

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.click(submitButton)
    })

    await vi.waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('/')
    })
  })
})
