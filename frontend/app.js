// const API_URL = "http://localhost:5000";
const API_URL = import.meta?.env?.VITE_API_URL || "http://localhost:5000";

/* ---------------- TOKEN HELPERS ---------------- */
function getToken() {
  return localStorage.getItem("token");
}

/* ---------------- ELEMENTS ---------------- */
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const message = document.getElementById("message");
const taskSection = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

/* ---------------- AUTH GUARD ---------------- */
function checkAuth() {
  const token = getToken();

  if (token) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
    fetchTasks();
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    taskSection.innerHTML = "";
  }
}

/* ---------------- LOGIN ---------------- */
loginBtn.addEventListener("click", login);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  message.innerText = "Logging in...";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);
    message.innerText = "Login successful ✅";

    checkAuth();
  } catch (err) {
    message.innerText = err.message;
  }
}

/* ---------------- LOGOUT ---------------- */
logoutBtn.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("token");
  message.innerText = "Logged out 👋";
  checkAuth();
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
addTaskBtn.addEventListener("click", addTask);

async function addTask() {
  const token = getToken();
  if (!token) {
    alert("Please login first");
    return;
  }

  const title = document.getElementById("taskInput").value;
  if (!title) return;

  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  document.getElementById("taskInput").value = "";
  fetchTasks();
}

/* ---------------- RENDER ---------------- */
function renderTasks(tasks) {
  taskSection.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.title;
    taskSection.appendChild(li);
  });
}

/* ---------------- AUTO CHECK ON LOAD ---------------- */
checkAuth();
