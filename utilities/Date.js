const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getFormattedDate = () => {
  const date = new Date();
  return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' +  date.getFullYear();
}



export default getFormattedDate;