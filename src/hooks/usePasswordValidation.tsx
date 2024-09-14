const usePasswordValidation = () => {
  const isLongEnough = (password: string) => {
    return password && password.length >= 8
  }

  const isSpecialCharacter = (password: string) => {
    return password && password.match('(?=.*\\W)')
  }

  const isLowerCaseCharacter = (password: string) => {
    return password && password.match('(?=.*[a-z])')
  }

  const isUppercaseCaseCharacter = (password: string) => {
    return password && password.match('(?=.*[A-Z])')
  }

  const isNumberCharacter = (password: string) => {
    return password && password.match('(?=.*[0-9])')
  }

  return { isLongEnough, isSpecialCharacter, isLowerCaseCharacter, isUppercaseCaseCharacter, isNumberCharacter }
}

export { usePasswordValidation }
