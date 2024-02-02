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

  if (taskStatus.trim() === "" || taskStatus.trim() === "Set Status") {
    alert("Status can not Empty and Invalid");
    return;
  }

  if (date < current_date) {
    alert("Invalid date or date is in the past. Please enter a valid date");
    return;
  }
  const taskObj = new Task(taskTitle, taskDescription, taskDueDate, taskStatus);

  // Adding data in List
  tasks.push(taskObj);
  // Displaying data From lIst
  displayData(taskObj);

  $("#title, #description, #dueDate").val("");
  $("#status").val("Set Status");
}

function rowAdd(row, t) {
  row.html(`
      <td>${t.id}</td>
      <td>${t.title}</td>
      <td>${t.description}</td>
      <td>${t.dueDate}</td>
      <td>${t.status}</td>
      <td>
        <input class="form-check-input" type="checkbox" id="${t.id}" name="${
    t.title
  }" value="${t.status}" onclick="markTask(${t.id})"
          ${t.status === "Complete" ? "checked" : ""}
          ${t.status === "Complete" ? (disabled = "disabled") : ""}
        />
      </td>

      <td><button class="btn btn-danger" id="${
        t.id
      }" type="button" onclick="deleteTask(${t.id});"
        ${t.status === "Pending" ? "disabled" : ""} >Delete</button></td>`);
}

function displayData(t) {
  var output = $("#taskList");
  var existingRow = $(`#${t.id}`);
  if (existingRow.length) {
    rowAdd(existingRow, t);
    t.status === "Complete"
      ? existingRow.addClass("complete")
      : existingRow.removeClass("complete");
  } else {
    const newRow = $("<tr></tr>");
    newRow.attr("id", `${t.id}`);
    rowAdd(newRow, t);

    // Adds at end
    output.append(newRow);
    // Add at begining
    // output.prepend(newRow);

    t.status === "Complete" ? newRow.addClass("complete") : "";
  }
}

function deleteTask(task_id) {
  tasks.splice(tasks.id, 1);
  const deleteTaskList = $("#" + task_id);
  if (deleteTaskList) {
    deleteTaskList.remove();
  }
}

function markTask(task_id) {
  var task = tasks.find((task) => task.id === task_id);
  var checkbox = $("#" + task_id);

  if (!checkbox.checked) {
    task.status = "Complete";
  } else {
    alert("Completed Task can't be changed");
  }

  displayData(task);
}
