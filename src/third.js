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
    console.log(_todos);
  };
  const toggleTodo = (id) => {
    _todos[id].done = !_todos[id].done;
    displayController.renderTodos(_todos);
    console.log(_todos);
  };
  const removeTodo = (id) => {
    _todos.splice(id, 1);
    console.log(id);
    console.log(_todos);
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
  const list = document.querySelector("#todoList");

  const _addTodo = () => {
    const todo = input.value;
    todosController.addTodo(todo);
    input.value = "";
  };

  const _removeTodo = (listItem) => {
    const index = [...list.children].indexOf(listItem);

    todosController.removeTodo(index);
    listItem.parentNode.removeChild(listItem);
  };

  const renderTodos = (todos) => {
    list.textContent = "";
    todos.forEach((todo) => addTodoToList(todo));
    // addTodoToList(todos[todos.length - 1]);
  };

  const _toggleTodo = (listItem) => {
    const index = [...list.children].indexOf(listItem);
    todosController.toggleTodo(index);
  };

  const addTodoToList = (todo) => {
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
  })();

  return {
    addTodoToList,
    renderTodos,
  };
})();

todosController.addTodo("buy milk");
todosController.addTodo("wash dishes");
