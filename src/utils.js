export const calculateAge = (dobString) => {
  if (!dobString) return '-';
  
  // Try to parse different formats
  // Assuming DD-MM-YYYY is the standard as per our new placeholder
  let dateParts = dobString.split('-');
  let birthDate;
  
  if (dateParts.length === 3) {
    if (dateParts[2].length === 4) {
      // DD-MM-YYYY
      birthDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    } else if (dateParts[0].length === 4) {
      // YYYY-MM-DD
      birthDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    } else {
      birthDate = new Date(dobString);
    }
  } else {
    birthDate = new Date(dobString);
  }

  if (isNaN(birthDate.getTime())) return '-';

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};
