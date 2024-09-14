import React, { act } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../src/i18n'
import RegistrationForm from '../../../src/components/registration/RegistrationForm'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
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

const setUpRegistrationForm = () => {
  render(
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <RegistrationForm />
      </I18nextProvider>
    </RecoilRoot>
  )
  const firstNameInput = screen.getByLabelText(i18n.t('inputLabels.firstName'))
  const lastNameInput = screen.getByLabelText(i18n.t('inputLabels.lastName'))
  const emailInput = screen.getByLabelText('email')
  const passwordInput = screen.getByLabelText(i18n.t('inputLabels.password'))
  const passwordConfirmInput = screen.getByLabelText(i18n.t('inputLabels.confirmPassword'))
  const submitButton = screen.getByRole('button')

  return { firstNameInput, lastNameInput, emailInput, passwordInput, passwordConfirmInput, submitButton }
}

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows validation errors when form is submitted with empty inputs', async () => {
    const { submitButton } = setUpRegistrationForm()

    await act(async () => {
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(screen.getByText(i18n.t('errors.emptyFirstNameField'))).toBeInTheDocument()
      expect(screen.getByText(i18n.t('errors.emptyLastNameField'))).toBeInTheDocument()
      expect(screen.getByText(i18n.t('errors.emptyEmailField'))).toBeInTheDocument()
      expect(screen.getAllByText(i18n.t('errors.emptyPasswordField'))).toHaveLength(2)
    })
  })
  it('shows password mismatch error when confirm password and password inputs are not the same', async () => {
    const { submitButton, passwordInput, passwordConfirmInput } = setUpRegistrationForm()

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: '123' } })
      fireEvent.change(passwordConfirmInput, { target: { value: '123aaaa' } })
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(screen.getByText(i18n.t('errors.passwordMissMatch'))).toBeInTheDocument()
    })
  })

  it('navigates to "/login" if every input fields are filled out correctly', async () => {
    const { firstNameInput, lastNameInput, emailInput, passwordInput, passwordConfirmInput, submitButton } = setUpRegistrationForm()

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.change(passwordConfirmInput, { target: { value: 'password123' } })
      fireEvent.change(firstNameInput, { target: { value: 'Agnes' } })
      fireEvent.change(lastNameInput, { target: { value: 'Szakacs' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.click(submitButton)
    })

    await vi.waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('/login')
    })
  })
})
