export const ValidationDictionary = {
  global: {
    required: (name: string) => `${name}: Se requiere un valor`,
    invalidType: (name: string) => `${name}: El tipo de dato es inválido`,
    invalidMin: (name: string, min: number | bigint) =>
      `${name}: El valor mínimo es ${min}`,
    invalidMax: (name: string, max: number | bigint) =>
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
      'La contraseña debe tener una mayúscula, una minúscula, un número y un caracter especial'
  },
  birthDate: {
    invalidAge: 'Debe ser mayor de 18 años'
  }
}
