type Props = {
  value: string
  enumObj: object
}

/**
 * This function validate if value exist in any enum
 * @param param value: string, enumObj: enum
 * @returns if value exist in enum return value, else return undefined
 */

export const validateEnumValue = ({ enumObj, value }: Props) => {
  const isInEnum = Object.values(enumObj).includes(value)
  return isInEnum ? value : undefined  
}