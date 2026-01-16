document.addEventListener("DOMContentLoaded", () => {
  loadStats();
  loadTasks();
});

// ---------- TASK STATS ----------
function loadStats() {
  fetch("http://localhost:5000/tasks/stats")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("stats").innerHTML = `
        <h2>Task Statistics</h2>
        <p>Total Tasks: ${data.total}</p>
        <p>Completed Tasks: ${data.completed}</p>
        <p>Pending Tasks: ${data.pending}</p>
      `;
    })
    .catch(() => {
      document.getElementById("stats").innerText = "Error fetching stats";
    });
}

// ---------- TASK LIST + FILTER ----------
function loadTasks(status = "") {
  let url = "http://localhost:5000/tasks";
  if (status) {
    url += `?status=${status}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((tasks) => {
      const list = document.getElementById("taskList");

      if (!tasks.length) {
        list.innerHTML = "<p>No tasks found</p>";
        return;
      }

      list.innerHTML = tasks
        .map(
          (task) => `
          <div style="border:1px solid #ccc; padding:10px; margin:8px 0;">
            <strong>${task.title}</strong><br/>
            Status: ${task.completed ? "Completed" : "Pending"}
          </div>
        `
        )
        .join("");
    })
    .catch((err) => {
      console.error("Error fetching tasks:", err);
    });
}

