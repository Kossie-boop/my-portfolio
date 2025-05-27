// Wait for DOM content
document.addEventListener("DOMContentLoaded", () => {
  // === Section fade-in animation ===
  const sections = document.querySelectorAll(".section");
  let delay = 0;
  sections.forEach((section) => {
    setTimeout(() => {
      section.classList.add("visible");
    }, delay);
    delay += 300; // 300ms delay between each section fade-in
  });

  // === To-Do List App Logic ===

  const openTodoBtn = document.getElementById("open-todo-btn");
  const closeTodoBtn = document.getElementById("close-todo-btn");
  const todoApp = document.getElementById("todo-app");
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  openTodoBtn.addEventListener("click", () => {
    todoApp.classList.remove("hidden");
    openTodoBtn.disabled = true;
    todoInput.focus();
  });

  closeTodoBtn.addEventListener("click", () => {
    todoApp.classList.add("hidden");
    openTodoBtn.disabled = false;
  });

  function saveTasks() {
    const tasks = [];
    todoList.querySelectorAll("li").forEach((li) => {
      tasks.push({
        text: li.firstChild.textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    todoList.innerHTML = "";
    tasks.forEach((task) => {
      addTaskToDOM(task.text, task.completed);
    });
  }

  function addTaskToDOM(text, completed = false) {
    const li = document.createElement("li");
    li.textContent = text;
    if (completed) li.classList.add("completed");

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.className = "delete-btn";
    li.appendChild(delBtn);

    // Toggle completed on click (except delete)
    li.addEventListener("click", (e) => {
      if (e.target === delBtn) return;
      li.classList.toggle("completed");
      saveTasks();
    });

    // Delete task on delete button click
    delBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
      addTaskToDOM(taskText);
      saveTasks();
      todoInput.value = "";
      todoInput.focus();
    }
  });

  loadTasks();

  // === Contact form submission (dummy) ===
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! I will get back to you soon.");
    contactForm.reset();
  });
});
