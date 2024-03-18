export const ValidationDictionary = {
  global: {
    required: (name: string) => `${name}: Se requiere un valor`,
    invalidType: (name: string) => `${name}: El tipo de dato es inválido`,
    invalidMin: (name: string, min: number) =>
      `${name}: El valor mínimo es ${min}`,
    invalidMax: (name: string, max: number) =>
      `${name}: El valor máximo es ${max}`,
    nonNegative: (name: string) => `${name}: El valor debe ser positivo`,
    nonPositive: (name: string) => `${name}: El valor debe ser positivo`,
    finite: (name: string) => `${name}: El valor debe ser finito`,
    pastDate: (name: string) => `${name}: Debe ser una fecha pasada`,
    validDate: (name: string) => `${name}: Debe ser una fecha valida`,
    futureDate: (name: string) => `${name}: Debe ser una fecha futura`,
    onlyAlphabetic: (name: string) => `${name}: Debe contener solo letras`,
    onlyAlphaNumeric: (name: string) =>
      `${name}: Debe contener solo letras y números`,
    invalidEmail: (name: string) => `${name}: Debe ser un email valido`
  },

  password: {
    strong:
      'La contraseña debe tener una mayúscula, una minúscula, un número y un caracter especial' // usado
  },

  // comprobar...
  id: {
    required: 'La ID es requerido',
    invalidType: 'La ID debe contener solo numeros',
    nonNegative: 'La ID debe ser positiva'
  },
  name: {
    required: 'El nombre es requerido',
    onlyLetters: 'El nombre debe contener solo letras',
    invalidType: 'El nombre debe ser un texto'
  },
  lastName: {
    required: 'El apellido es requerido',
    onlyLetters: 'El apellido debe contener solo letras',
    invalidType: 'El apellido debe ser un texto'
  },
  dni: {
    required: 'El DNI es requerido',
    invalidType: 'El DNI debe contener solo numeros',
    length: 'El DNI debe contener 8 dígitos'
  },
  email: {
    required: 'El email es requerido',
    invalidEmail: 'El email debe ser valido',
    invalidType: 'El email debe ser un texto'
  },
  phoneNumber: {
    required: 'El número telefónico es requerido',
    invalidType: 'El número telefónico debe contener solo numeros',
    length: 'El número telefónico debe contener 10 dígitos'
  },
  confirmPassword: {
    required: 'Es necesario confirmar la contraseña',
    invalidType: 'La confirmación de contraseña debe ser un texto',
    match: 'Las contraseñas no coinciden'
  },
  address: {
    required: 'La dirección es requerida',
    onlyLetters: 'La dirección no puede tener caracteres especiales',
    invalidType: 'La dirección debe ser un texto'
  },
  birthDate: {
    required: 'La fecha de nacimiento es requerida',
    invalidType: 'Debe ingresar una fecha válida',
    invalidAge: 'Debe ser mayor de 18 años'
  },
  sex: {
    required: 'El sexo es requerido',
    invalidType: 'Debe ingresar una opción válida'
  },
  role: {
    required: 'El rol es requerido',
    invalidType: 'Debe ingresar una opción válida'
  },
  balance: {
    required: 'El balance es requerido',
    invalidType: 'El balance debe ser un número',
    negative: 'El balance debe ser positivo'
  },
  url: {
    required: 'La URL es requerida',
    invalidType: 'La URL debe ser un texto',
    invalidURL: 'La URL debe ser válida'
  },
  number: {
    required: 'El número es requerido',
    invalidType: 'El número debe ser un número',
    nonnegative: 'El número debe ser positivo',
    integer: 'El número debe ser entero',
    finite: 'El número debe ser finito'
  },
  float: {
    required: 'El número es requerido',
    invalidType: 'El número debe ser un número',
    nonnegative: 'El número debe ser positivo',
    finite: 'El número debe ser finito'
  },
  alphabetic: {
    required: 'El texto es requerido',
    invalidType: 'El texto debe ser un texto',
    onlyLetters: 'El texto debe contener solo letras'
  },
  alphaNumeric: {
    required: 'El texto es requerido',
    invalidType: 'El texto debe ser un texto',
    onlyAlphaNumeric: 'El texto debe contener solo letras y números'
  },
  pastDate: {
    required: 'La fecha es requerida',
    invalidType: 'Debe ingresar una fecha válida',
    invalidDate: 'Debe ser una fecha pasada'
  },
  validDate: {
    required: 'La fecha es requerida',
    invalidType: 'Debe ingresar una fecha válida'
  },
  futureDate: {
    required: 'La fecha es requerida',
    invalidType: 'Debe ingresar una fecha válida',
    invalidDate: 'Debe ser una fecha futura'
  }
}
