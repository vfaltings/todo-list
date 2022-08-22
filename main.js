let taskList = document.getElementById("task-list");
let inputTask = document.getElementById("input-task");

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
for (let taskTuple of savedTasks) {
    let task = taskTuple[0];
    let completed = taskTuple[1];
    createTask(task, completed);
}

document.getElementById("add-task-button").addEventListener("click", function() {
    if (!inputTask.value) {
        return;
    }
    createTask(inputTask.value, false);
    inputTask.value = "";
    saveTasks();
});

function remove(task) {
    taskList.removeChild(task);
}

function createTask(text, completed) {
    let entry = document.createElement("li");
    let checkbox = document.createElement("input");
    let task = document.createElement("span");
    let deleteBtn = document.createElement("button");

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = completed;
    checkbox.addEventListener("change", function() {
        saveTasks();
    });

    task.classList.add("task");
    task.innerHTML = text;

    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "X";
    deleteBtn.addEventListener("click", function() {
        remove(entry);
        saveTasks();
    });

    entry.appendChild(checkbox);
    entry.appendChild(task);
    entry.appendChild(deleteBtn);

    taskList.appendChild(entry);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("li").forEach(
        node => {
            let task = node.querySelector(".task").innerHTML;
            let completed = node.querySelector("input").checked;
            tasks.push([task, completed]);
        }
    );
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}