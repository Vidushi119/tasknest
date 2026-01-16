// app.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.style.padding = "20px";
  container.style.border = "1px solid #ccc";
  container.style.borderRadius = "8px";

  const heading = document.createElement("h2");
  heading.textContent = "Task Statistics";
  container.appendChild(heading);

  const totalEl = document.createElement("p");
  const completedEl = document.createElement("p");
  const pendingEl = document.createElement("p");

  container.appendChild(totalEl);
  container.appendChild(completedEl);
  container.appendChild(pendingEl);

  document.body.appendChild(container);

  // Fetch stats from backend
  fetch("http://localhost:5000/tasks/stats")
    .then((res) => res.json())
    .then((data) => {
      totalEl.textContent = `Total Tasks: ${data.total}`;
      completedEl.textContent = `Completed Tasks: ${data.completed}`;
      pendingEl.textContent = `Pending Tasks: ${data.pending}`;
    })
    .catch((err) => {
      totalEl.textContent = "Error fetching stats";
      console.error(err);
    });
});
