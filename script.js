const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData();
  updateStats();
}

/* Menambahkan tugas dengan tombol Enter */
inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

/* Menandai tugas selesai dan menghapus tugas */
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      updateStats();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      updateStats();
    }
  },
  false
);

/* Menyimpan data tugas */
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

/* Menampilkan kembali data tugas */
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

/* Memperbarui statistik tugas */
function updateStats() {
  const tasks = listContainer.querySelectorAll("li");
  const completed = listContainer.querySelectorAll("li.checked");

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completed.length;
  pendingTasks.textContent = tasks.length - completed.length;
}

showTask();
updateStats();