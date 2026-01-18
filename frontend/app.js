// document.addEventListener("DOMContentLoaded", () => {
//   loadStats();
//   loadTasks();
// });

// // ---------- TASK STATS ----------
// function loadStats() {
//   fetch("http://localhost:5000/tasks/stats")
//     .then((res) => res.json())
//     .then((data) => {
//       document.getElementById("stats").innerHTML = `
//         <h2>Task Statistics</h2>
//         <p>Total Tasks: ${data.total}</p>
//         <p>Completed Tasks: ${data.completed}</p>
//         <p>Pending Tasks: ${data.pending}</p>
//       `;
//     })
//     .catch(() => {
//       document.getElementById("stats").innerText = "Error fetching stats";
//     });
// }

// // ---------- TASK LIST + FILTER ----------
// function loadTasks(status = "") {
//   let url = "http://localhost:5000/tasks";
//   if (status) {
//     url += `?status=${status}`;
//   }

//   fetch(url)
//     .then((res) => res.json())
//     .then((tasks) => {
//       const list = document.getElementById("taskList");

//       if (!tasks.length) {
//         list.innerHTML = "<p>No tasks found</p>";
//         return;
//       }

//       list.innerHTML = tasks
//         .map(
//           (task) => `
//           <div style="border:1px solid #ccc; padding:10px; margin:8px 0;">
//             <strong>${task.title}</strong><br/>
//             Status: ${task.completed ? "Completed" : "Pending"}
//           </div>
//         `
//         )
//         .join("");
//     })
//     .catch((err) => {
//       console.error("Error fetching tasks:", err);
//     });
// }
const API_URL = "http://localhost:5000";

/* =====================
   TOKEN HELPERS
===================== */
function getToken() {
  return localStorage.getItem("token");
}

/* =====================
   LOGIN
===================== */
document.getElementById("loginBtn").addEventListener("click", login);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.innerText = "Logging in...";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ STORE TOKEN
    localStorage.setItem("token", data.token);

    message.innerText = "Login successful ✅";

    // Load tasks after login
    fetchTasks();

  } catch (err) {
    message.innerText = err.message;
  }
}

/* =====================
   FETCH TASKS (PROTECTED)
===================== */
async function fetchTasks() {
  const token = getToken();

  if (!token) {
    alert("Please login first");
    return;
  }

  const res = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tasks = await res.json();
  renderTasks(tasks);
}

/* =====================
   CREATE TASK (PROTECTED)
===================== */
async function createTask(title) {
  const token = getToken();

  if (!token) {
    alert("Please login first");
    return;
  }

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  fetchTasks();
}

/* =====================
   RENDER TASKS
===================== */
function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.title;
    list.appendChild(li);
  });
}

/* =====================
   ADD TASK BUTTON
===================== */
document.getElementById("addTaskBtn")?.addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();

  if (!title) return;

  createTask(title);
  input.value = "";
});


