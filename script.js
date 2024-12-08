// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // Load tasks without saving again
  }

  // Create the addTask Function
  const addTask = (taskText, save = true) => {
    // If taskText is not provided, retrieve from input
    if (!taskText) {
      taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task."); // Prompt if input is empty
        return; // Exit if the input is empty
      }
    }

    // Task Creation and Removal
    // Create a new li element
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    // Create a new button element for removing the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove"; // Set button text
    removeButton.classList.add("remove-btn"); // Assign class using classList.add

    // Assign an onclick event to the remove button
    removeButton.onclick = () => {
      taskList.removeChild(listItem); // Remove the li element from taskList
      removeTaskFromStorage(taskText); // Remove from Local Storage
    };

    // Append the remove button to the li element
    listItem.appendChild(removeButton);

    // Append the li to taskList
    taskList.appendChild(listItem);

    // Clear the task input field
    taskInput.value = "";

    // Save task to Local Storage if needed
    if (save) {
      saveTaskToStorage(taskText);
    }
  };

  // Save task to Local Storage
  function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Remove task from Local Storage
  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Attach Event Listeners
  addButton.addEventListener("click", () => addTask()); // Call addTask when button is clicked
  taskInput.addEventListener("keypress", (event) => {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      addTask(); // Call addTask if Enter is pressed
    }
  });

  // Load tasks on page load
  loadTasks();
});
