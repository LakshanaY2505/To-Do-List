class TodoApp {
  constructor() {
    this.todos = [];
    this.todoIdCounter = 1;

    this.todoInput = document.getElementById('todo-input');
    this.addBtn = document.getElementById('add-btn');
    this.todoList = document.getElementById('todo-list');
    this.emptyState = document.getElementById('empty-state');
    this.clearCompletedBtn = document.getElementById('clear-completed-btn');

    this.progressBar = document.getElementById('progress-bar');
    this.progressImage = document.getElementById('progress-image');
    this.progressContainer = document.getElementById('progress-container');
    
    // Stats elements
    this.pendingCount = document.getElementById('pending-count');
    this.totalCount = document.getElementById('total-count');

    // Enable Add button when typing
    this.todoInput.addEventListener('input', () => {
      this.addBtn.disabled = !this.todoInput.value.trim();
    });

    this.addBtn.addEventListener('click', () => this.addTodo());
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });
    this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

    this.renderTodos();
    this.updateStats();
  }

  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    this.todos.push({ id: this.todoIdCounter++, text: text, completed: false });
    this.todoInput.value = '';
    this.addBtn.disabled = true;

    this.renderTodos();
    this.updateStats();
  }

  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    this.renderTodos();
    this.updateStats();
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

  renderTodos() {
    this.todoList.innerHTML = '';
    if (this.todos.length === 0) {
      this.emptyState.style.display = 'block';
    } else {
      this.emptyState.style.display = 'none';
    }

    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

      // Create checkbox
      const checkbox = document.createElement('div');
      checkbox.className = `todo-checkbox ${todo.completed ? 'checked' : ''}`;
      checkbox.addEventListener('click', () => this.toggleComplete(todo.id));

      // Create text span
      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;

      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      this.todoList.appendChild(li);
    });
  }

  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const pending = total - completed;

    // Update stats display
    this.totalCount.textContent = total;
    this.pendingCount.textContent = completed;

    // Progress percentage
    const percentage = total === 0 ? 0 : (completed / total) * 100;
    this.progressBar.style.width = percentage + '%';

    // Move image along the bar
    this.setProgressImage(percentage);

    // Show/hide Clear Completed button
    if (completed > 0) {
      this.clearCompletedBtn.classList.add('show');
      this.clearCompletedBtn.style.display = 'block';
      this.clearCompletedBtn.textContent = `Clear Completed (${completed})`;
    } else {
      this.clearCompletedBtn.classList.remove('show');
      this.clearCompletedBtn.style.display = 'none';
    }
  }

  setProgressImage(percentage) {
    if (this.progressImage && this.progressContainer) {
      const containerWidth = this.progressContainer.offsetWidth;
      const newLeft = (percentage / 100) * containerWidth;
      this.progressImage.style.left = newLeft + "px";
      this.progressImage.style.transform = `translateX(-50%)`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
})