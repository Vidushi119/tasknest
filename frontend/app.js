const API_URL = "http://localhost:5000";

/* ---------------- TOKEN HELPERS ---------------- */
function getToken() {
  return localStorage.getItem("token");
}

/* ---------------- LOGIN ---------------- */
document.getElementById("loginBtn").addEventListener("click", login);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  message.innerText = "Logging in...";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    // ✅ Save token
    localStorage.setItem("token", data.token);

    message.innerText = "Login successful ✅";
    document.getElementById("logoutBtn").style.display = "block";

    fetchTasks();

  } catch (err) {
    message.innerText = err.message;
  }
}

/* ---------------- LOGOUT ---------------- */
document.getElementById("logoutBtn").addEventListener("click", logout);

function logout() {
  localStorage.removeItem("token");
  document.getElementById("taskList").innerHTML = "";
  document.getElementById("message").innerText = "Logged out successfully 👋";
  document.getElementById("logoutBtn").style.display = "none";
}

/* ---------------- FETCH TASKS ---------------- */
async function fetchTasks() {
  const token = getToken();
  if (!token) return;

  const res = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tasks = await res.json();
  renderTasks(tasks);
}

/* ---------------- ADD TASK ---------------- */
document.getElementById("addTaskBtn").addEventListener("click", addTask);

async function addTask() {
  const token = getToken();
  if (!token) {
    alert("Please login first");
    return;
  }

  const title = document.getElementById("taskInput").value;

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  const data = await res.json();
  document.getElementById("taskInput").value = "";
  fetchTasks();
}

/* ---------------- RENDER TASKS ---------------- */
function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.title;
    list.appendChild(li);
  });
}
