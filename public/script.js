class TodoApp {
  constructor() {
    this.todos = [];
    this.todoIdCounter = 1;

    // Get DOM elements
    this.todoInput = document.getElementById('todo-input');
    this.addBtn = document.getElementById('add-btn');
    this.todoList = document.getElementById('todo-list');
    this.emptyState = document.getElementById('empty-state');
    this.clearCompletedBtn = document.getElementById('clear-completed');

    this.totalCount = document.getElementById('total-count');
    this.pendingCount = document.getElementById('pending-count');
    this.completedCount = document.getElementById('completed-count');

    // Bind events
    this.bindEvents();

    // Initial stats
    this.updateStats();
  }

  bindEvents() {
    this.addBtn.addEventListener('click', () => this.addTodo());

    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });

    this.todoInput.addEventListener('input', () => {
      this.addBtn.disabled = !this.todoInput.value.trim();
    });

    this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    const todo = {
      id: this.todoIdCounter++,
      text: text,
      completed: false
    };

    this.todos.push(todo);
    this.todoInput.value = '';
    this.addBtn.disabled = true;

    this.renderTodos();
    this.updateStats();
  }

  renderTodos() {
    if (this.todos.length === 0) {
      this.emptyState.style.display = 'block';
      this.todoList.innerHTML = '';
      return;
    }

    this.emptyState.style.display = 'none';

    const todoElements = this.todos.map(todo => `
      <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoApp.toggleTodo(${todo.id})">
          ${todo.completed ? '✓' : ''}
        </div>
        <span class="todo-text ${todo.completed ? 'completed' : ''}">${this.escapeHtml(todo.text)}</span>
        <button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})">Delete</button>
      </div>
    `).join('');

    this.todoList.innerHTML = todoElements;
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.renderTodos();
      this.updateStats();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.renderTodos();
    this.updateStats();
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.renderTodos();
    this.updateStats();
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const pending = total - completed;

    this.totalCount.textContent = total;
    this.pendingCount.textContent = pending;
    this.completedCount.textContent = completed;

    if (completed > 0) {
      this.clearCompletedBtn.classList.add('show');
      this.clearCompletedBtn.textContent = `Clear Completed (${completed})`;
    } else {
      this.clearCompletedBtn.classList.remove('show');
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Ensure DOM is ready before running
document.addEventListener("DOMContentLoaded", () => {
  window.todoApp = new TodoApp();
});