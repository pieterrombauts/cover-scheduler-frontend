export const capitalise = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatMobile = (phone: string) => {
  // Filter only numbers from input
  let cleaned = ('' + phone).replace(/\D/g, '');

  // Check if input is correct length
  let match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

  if (match) {
    return match[1] + ' ' + match[2] + ' ' + match[3];
  } else {
    return null;
  }
}