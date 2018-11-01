const getCurrentWeek = () => {
  const todayDate = new Date();
  const thisWeek = [];

  for (let i = 1; i <= 5; i += 1) {
    const first = (todayDate.getDate() - todayDate.getDay()) + i;
    const day = new Date(todayDate.setDate(first)).toDateString().slice(4, 15);
    thisWeek.push(day);
  }
  return thisWeek;
};

export default getCurrentWeek;
