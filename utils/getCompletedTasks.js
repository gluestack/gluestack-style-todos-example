const getCompletedTasks = (todos) => {
  let complete = 0;
  todos.forEach((item) => {
    if (item.completed) {
      complete++;
    }
  });
  return complete;
};
export default getCompletedTasks;
