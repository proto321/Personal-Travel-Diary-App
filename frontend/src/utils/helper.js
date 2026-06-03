// we will define validateEmail in it 
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
} 


// Display Name
export const getInitials = (name) => {
  if (!name) return ""
  const words = name.split(" ");

  let initials = ""

  for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0]
  }

  return initials.toUpperCase();
}

export const getEmptyCardMessage = (filterType) => {

  switch (filterType) {
    case "search":
      return "No travel stories found for the Search Query."
    case "date":
      return "No travel stories found for the selected date range."
    default:
      return "No travel stories found. Start by clicking below button and Create New Story!"
  }
}