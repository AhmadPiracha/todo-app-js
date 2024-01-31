class Task {
    static lastId = 0;
    constructor(title, description, dueDate, status) {
        this.id = Task.lastId + 1;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        Task.lastId += 1;
    }
}
const tasks = [];

function AddTask() {
    var taskTitle = document.getElementById("title").value;
    var taskDescription = document.getElementById("description").value;
    var current_date = new Date();
    var taskDueDate = document.getElementById("dueDate").value;
    var date = new Date(taskDueDate);
    var taskStatus = document.getElementById("status").value;

    if (
        taskTitle.trim() === "" ||
        taskDescription.trim() === "" ||
        taskDueDate.trim() === ""
    ) {
        alert("Fields can't be Empty...");
        return;
    }
    if (date < current_date) {
        alert(
            "Invalid date or date is in the past. Please enter a valid date"
        );
        return;
    }


    const taskObj = new Task(taskTitle, taskDescription, taskDueDate, taskStatus);

    // Adding data in List
    tasks.push(taskObj);
    // Displaying data From lIst
    displayData(taskObj);
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("status").value = "Set Status";
}

function displayData(taskList) {
    // console.log(taskList);

    var output = document.getElementById("taskList");
    const existingRow = document.getElementById(`${taskList.id}`);

    if (existingRow) {
        existingRow.innerHTML = `
    <td>${taskList.id}</td>
    <td>${taskList.title}</td>
    <td>${taskList.description}</td>
    <td>${taskList.dueDate}</td>
    <td>${taskList.status}</td>
    <td>
    <input class="form-check-input" type="checkbox" id="${
      taskList.id
    }" name="${taskList.title}" value="${
    taskList.status
  }" onclick="markTask(${taskList.id})" 
      ${taskList.status === "Complete" ? "checked" : ""} 
      ${taskList.status === "Complete"
      ? existingRow.classList.add("complete")
      : existingRow.classList.remove("complete")
  } ${taskList.status === "Complete" ? disabled="disabled" : ""} />
  </td>

  <td><button class="btn btn-danger" id="${
    taskList.id
  }" type="button" onclick="deleteTask(${taskList.id});"${
    taskList.status === "Pending" ? "disabled" : ""
  }>Delete</button></td>`;
    } else {
        const newRow = document.createElement("tr");
        newRow.id = `${taskList.id}`;

        newRow.innerHTML = `
  <td>${taskList.id}</td>
  <td>${taskList.title}</td>
  <td>${taskList.description}</td>
  <td>${taskList.dueDate}</td>
  <td>${taskList.status}</td>
  <td>
    <input class="form-check-input" type="checkbox" id="${
      taskList.id
    }" name="${taskList.title}" value="${
    taskList.status
  }" onclick="markTask(${taskList.id})" ${
    taskList.status === "Complete" ? "checked" : ""
  } ${taskList.status === "Complete" ? disabled="disabled" : ""} />
  </td>
  <td>
    <button class="btn btn-danger" id="${
      taskList.id
    }" type="button" onclick="deleteTask(${taskList.id});" ${
    taskList.status === "Pending" ? "disabled" : ""
  }>Delete</button>
  </td>`;

        output.appendChild(newRow);

        taskList.status === "Complete" ?
            newRow.classList.add("complete") :
            "";
    }
}

function deleteTask(task_id) {
    if (tasks.id !== -1) {
        tasks.splice(tasks.id, 1);
        const deleteTaskList = document.getElementById(`${task_id}`);
        if (deleteTaskList) {
            deleteTaskList.remove();
        }
    }
}

function markTask(task_id) {
    var task = tasks.find((task) => task.id === task_id);
    var checkbox = document.getElementById(task_id);

    if (!checkbox.checked) {
        task.status = "Complete";
    } else {
        alert("Completed Task can't be changed");
    }

    displayData(task);
}
