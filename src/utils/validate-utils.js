export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  return /^.+\@.+\..+$/.test(email)
}

export function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
