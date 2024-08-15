import type { IGenerateSettings } from '@/models/interfaces/GenerateInterface'

export function generateRandomPassword(obj: IGenerateSettings) {

  const uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase: string = 'abcdefghijklmnopqrstuvwxyz'
  const numbers: string = '0123456789'
  const specialChars: string = '!@#$%^&*()-_+={}[]|\\:;'
  let characters: string = ''
  let password: string = ''

  if (obj.inputString.length) {
    characters += obj.inputString
  }

  if (obj.letters && obj.transform === 'Заглавные') {
    characters += uppercase
  } else if (obj.letters && obj.transform === 'Строчные') {
    characters += lowercase
  } else if (obj.letters && obj.transform === 'Все'){
    characters += uppercase + lowercase
  }

  if (obj.digits) {
    characters += numbers
  }

  if (obj.chars) {
    characters += specialChars
  }

  for (let i = 0; i < +obj.passwordLength; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return password
}
