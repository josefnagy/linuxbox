const todoList = (() => {
  const input = document.querySelector("#todoInput");
  const addBtn = document.querySelector("#addBtn");
  const errorLabel = document.querySelector(".error");
  const list = document.querySelector("#todoList");

  const showError = (error) => {
    errorLabel.textContent = error;
    setTimeout(() => {
      errorLabel.textContent = "";
    }, 2000);
  };

  const _validTodo = (todo) => {
    if (!todo || todo.length < 3 || todo.length > 20) return false;
    return true;
  };

  const addTodo = (e) => {
    const enterPressed = e.keyCode === 13;
    const mouseClicked = e.type === "click";

    if (enterPressed || mouseClicked) {
      const todo = input.value.trim();
      if (_validTodo(todo)) {
        _addTodoToList(todo);
        input.value = "";
      } else {
        showError("Task must have between 3 and 20 characters.");
      }
    }
  };

  const _removeTodo = (listItem) => {
    listItem.parentNode.removeChild(listItem);
  };

  const _addTodoToList = (todo) => {
    if (!todo) throw new Error("No todo to add ...");

    const listItem = document.createElement("li");
    listItem.textContent = todo;
    list.appendChild(listItem);

    listItem.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN") return;
      listItem.classList.toggle("checked");
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "-";
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", _removeTodo.bind(null, listItem));
  };

  const _init = (() => {
    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keydown", addTodo);
  })();
})();
