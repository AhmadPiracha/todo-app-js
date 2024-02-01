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
  var taskTitle = $("#title").val();
  var taskDescription = $("#description").val();
  var current_date = new Date();
  var taskDueDate = $("#dueDate").val();
  var date = new Date(taskDueDate);
  var taskStatus = $("#status").val();

  if (taskTitle.trim() === "") {
    alert("Title can not Empty");
    return;
  }

  if (taskDescription.trim() === "") {
    alert("Description can not Empty");
    return;
  }

  if (taskDueDate.trim() === "") {
    alert("Date can not Empty");
    return;
  }

  if (taskStatus === "Set Status") {
    alert("Invalid Status");
    return;
  }

  if (date < current_date) {
    alert(
      "Invalid date or date is in the past. Please enter a valid date"
    );
    return;
  }
  const taskObj = new Task(
    taskTitle,
    taskDescription,
    taskDueDate,
    taskStatus
  );

  // Adding data in List
  tasks.push(taskObj);
  // Displaying data From lIst
  displayData(taskObj);

  $("#title, #description, #dueDate").val("");
  $("#status").val("Set Status");
}

function displayData(t) {
  console.log(t);
  var output = $("#taskList");
  console.log("output", output);
  var existingRow = $(`#${t.id}`);
  // var existingRow = $("#"+t.id);

  if (existingRow.length) {
    existingRow.html(`
    <td>${t.id}</td>
    <td>${t.title}</td>
    <td>${t.description}</td>
    <td>${t.dueDate}</td>
    <td>${t.status}</td>
    <td>
      <input class="form-check-input" type="checkbox" id="${
        t.id
      }" name="${t.title}" value="${t.status}" onclick="markTask(${
      t.id
    })"  ${
      t.status === "Complete"
        ? existingRow.addClass("complete")
        : existingRow.removeClass("complete")
    }
        ${t.status === "Complete" ? "checked" : ""}
        ${t.status === "Complete" ? (disabled = "disabled") : ""}
      />

    </td>
    <td>
      <button class="btn btn-danger" id="${
        t.id
      }" type="button" onclick="deleteTask(${t.id});"
      ${t.status === "Pending" ? "disabled" : ""}
      >Delete</button></td>`);
  } else {
    const newRow = $("<tr></tr>");
    newRow.attr("id", `${t.id}`);
    newRow.html(`
    <td>${t.id}</td>
    <td>${t.title}</td>
    <td>${t.description}</td>
    <td>${t.dueDate}</td>
    <td>${t.status}</td>
    <td>
      <input class="form-check-input" type="checkbox" id="${
        t.id
      }" name="${t.title}" value="${t.status}" onclick="markTask(${
      t.id
    })" 
        ${t.status === "Complete" ? "checked" : ""}
        ${t.status === "Complete" ? (disabled = "disabled") : ""}
      />
    </td>
    <td>
      <button class="btn btn-danger" id="${
        t.id
      }" type="button" onclick="deleteTask(${t.id});" 
      ${t.status === "Pending" ? "disabled" : ""}
      >Delete</button>
    </td>`);

    output.append(newRow);

    t.status === "Complete"
      ? newRow.addClass("complete")
      : "";
  }
}

function deleteTask(task_id) {
  console.log("Delete Task Called");
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
