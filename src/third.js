const TodoItem = (todo) => {
  return {
    text: todo,
    createdAt: new Date(),
    done: false,
  };
};

const todosController = (() => {
  const _todos = [];

  const getTodos = () => _todos;

  const addTodo = (todo) => {
    const newTodo = TodoItem(todo);
    _todos.push(newTodo);
    displayController.renderTodos(_todos);
  };

  const toggleTodo = (id) => {
    if (!_todos[id]) throw new Error("Task not found in todos...");

    _todos[id].done = !_todos[id].done;
    displayController.renderTodos(_todos);
  };

  const removeTodo = (id) => {
    _todos.splice(id, 1);
  };

  return {
    getTodos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
})();

const displayController = (() => {
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

  const _addTodo = (e) => {
    const enterPressed = e.keyCode === 13;
    const mouseClicked = e.pointerId;

    if (enterPressed || mouseClicked) {
      const todo = input.value.trim();
      if (_validTodo(todo)) {
        todosController.addTodo(todo);
        input.value = "";
      } else {
        showError("Task must have between 3 and 20 characters.");
      }
    }
  };

  const _removeTodo = (listItem) => {
    const index = [...list.children].indexOf(listItem);

    todosController.removeTodo(index);
    listItem.parentNode.removeChild(listItem);
  };

  const renderTodos = (todos) => {
    list.textContent = "";
    todos.forEach((todo) => addTodoToList(todo));
  };

  const _toggleTodo = (listItem) => {
    const index = [...list.children].indexOf(listItem);
    todosController.toggleTodo(index);
  };

  const addTodoToList = (todo) => {
    if (!todo) throw new Error("No todo to add ...");

    const listItem = document.createElement("li");
    listItem.textContent = todo.text;
    todo.done ? listItem.classList.add("checked") : null;
    list.appendChild(listItem);

    listItem.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN") return;
      _toggleTodo(listItem);
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "-";
    listItem.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", _removeTodo.bind(null, listItem));
  };

  const _init = (() => {
    addBtn.addEventListener("click", _addTodo);
    input.addEventListener("keydown", _addTodo);
  })();

  return {
    addTodoToList,
    renderTodos,
  };
})();

todosController.addTodo("buy milk");
todosController.addTodo("wash dishes");
