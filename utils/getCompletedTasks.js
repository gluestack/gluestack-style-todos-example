const getCompletedTasks = (todos, lastItemSelected) => {
  let complete = 0;
  todos.forEach((item) => {
    if (item.completed) {
      complete++;
    }
  });
  if (lastItemSelected) return complete + 1;
  else return complete;
};
export default getCompletedTasks;
