export const isValidUKPostcode = (postcode: string): boolean => {
  // Regular expression for UK postcode validation
  const postcodeRegex = /^[A-Za-z]{1,2}[0-9]{1,2}[A-Za-z]? [0-9][A-Za-z]{2}$/
  return postcodeRegex.test(postcode.trim())
}
