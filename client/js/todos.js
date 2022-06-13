const addBtn = document.getElementById("addBtn");
const todo = document.getElementById("todo");
const todoColor = document.getElementById("todoColor");
const todoList = document.getElementById("todoList");
const logout = document.getElementById("logout");
const updateBtn = document.getElementById("updateBtn");
let html = "";
const token = localStorage.getItem("token");

//add todo
addBtn.addEventListener("click", function () {
  if (todo.value.length > 0) {
    console.log(todo.value);
    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        todo: todo.value,
        color: todoColor.value,
      }),
    }).then((res) => {
      res.json();
      if (res.status === 201) {
        window.location.reload();
      }
    });
  } else {
    alert("Please enter todo");
  }
});

//get todos
fetch("http://localhost:3000/todo", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-auth-token": token,
  },
})
  .then((response) => response.json())
  .then((todos) => {
    todos.forEach((todo) => {
      html += `<div class="col" data-id="${todo._id}">
        <div class="card" style="background:${todo.color}">
          <div class="card-body">
            <h5 class="card-title">${todo.todo}</h5>
            <button type="button" class="btn btn-success">Update</button>
            <button type="button" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>`;
      todoList.innerHTML = html;
    });
  });

// delete a todo
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-danger")) {
    if (confirm("Are you sure you want to delete this todo?")) {
      const parent = e.target.parentElement.parentElement.parentElement;
      const id = parent.dataset.id;
      fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((todo) => {
          parent.remove();
        });
    }
  }
});

//patch a todo
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-success")) {
    console.log("clicked");
    const parent = e.target.parentElement.parentElement.parentElement;
    console.log(parent);
    const id = parent.dataset.id;
    console.log(id);
    fetch(`http://localhost:3000/todo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((todos) => {
        console.log(todos);
        todo.value = todos.todo;
        todoColor.value = todos.color;
        addBtn.classList.add("d-none");
        updateBtn.classList.remove("d-none");
      });
    updateBtn.addEventListener("click", (e) => {
      fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          todo: todo.value,
          color: todoColor.value,
        }),
      })
        .then((response) => response.json())
        .then((todo) => {
          console.log(todo);
          window.location.reload();
        });
    });
  }
});
logout.addEventListener("click", function () {
  localStorage.removeItem("token");
  localStorage.removeItem("login");
  window.location = "././login.html";
});
