fetch("http://localhost:5000/tasks")
  .then((res) => res.json())
  .then((tasks) => {
    const taskList = document.getElementById("taskList");

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerText = task.title;
      taskList.appendChild(li);
    });
  })
  .catch((err) => console.error(err));
