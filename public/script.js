class TodoApp {
  constructor() {
    // Stores all todos and unique ID counter
    this.todos = [];
    this.todoIdCounter = 1;

    // Takes all DOM elements needed
    this.todoInput = document.getElementById('todo-input');
    this.addBtn = document.getElementById('add-btn');
    this.todoList = document.getElementById('todo-list');
    this.emptyState = document.getElementById('empty-state');
    this.clearCompletedBtn = document.getElementById('clear-completed-btn');

    // Progress bar elements
    this.progressBar = document.getElementById('progress-bar');
    this.progressImage = document.getElementById('progress-image');
    this.progressContainer = document.getElementById('progress-container');
    
    // Stats elements
    this.pendingCount = document.getElementById('pending-count');
    this.totalCount = document.getElementById('total-count');

    // Enable "Add button" when typing
    this.todoInput.addEventListener('input', () => {
      this.addBtn.disabled = !this.todoInput.value.trim();
    });
    // Add new list item on button click
    this.addBtn.addEventListener('click', () => this.addTodo());
    // Add new list item when Enter key is clicked
    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });

    // Clear all completed tasks when button is clicked
    this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

    this.renderTodos();
    this.updateStats();
  }

  // Adds a new list item
  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return; // Do nothing if input is empty

     // Pushes new todo object into the list
    this.todos.push({ id: this.todoIdCounter++, text: text, completed: false });
    this.todoInput.value = ''; // Reset input field
    this.addBtn.disabled = true;

    this.renderTodos();
    this.updateStats();
  }

  // Toggle between completed and not completed
  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    this.renderTodos();
    this.updateStats();
  }

  // Removes a single todo by ID
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.renderTodos();
    this.updateStats();
  }

  // Removes all completed todos
  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.renderTodos();
    this.updateStats();
  }

  // Displays all todos in the DOM
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

      // Creates checkbox
      const checkbox = document.createElement('div');
      checkbox.className = `todo-checkbox ${todo.completed ? 'checked' : ''}`;
      checkbox.addEventListener('click', () => this.toggleComplete(todo.id));

      // Creates text span
      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;

      // Creates delete button
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

  // Updates stats, progress bar, and buttons
  updateStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const pending = total - completed;

    // Stats display
    this.totalCount.textContent = total;
    this.pendingCount.textContent = completed;

    // Progress percentage
    const percentage = total === 0 ? 0 : (completed / total) * 100;
    this.progressBar.style.width = percentage + '%';
    this.setProgressImage(percentage); // Move image along the bar

    // Show/hide "Clear Completed" button
    if (completed > 0) {
      this.clearCompletedBtn.classList.add('show');
      this.clearCompletedBtn.style.display = 'block';
      this.clearCompletedBtn.textContent = `Clear Completed (${completed})`;
    } else {
      this.clearCompletedBtn.classList.remove('show');
      this.clearCompletedBtn.style.display = 'none';
    }
  }

  // Positions image according to progress %
  setProgressImage(percentage) {
    if (this.progressImage && this.progressContainer) {
      const containerWidth = this.progressContainer.offsetWidth;
      const newLeft = (percentage / 100) * containerWidth;
      this.progressImage.style.left = newLeft + "px";
      this.progressImage.style.transform = `translateX(-50%)`;
    }
  }
}

// Initialises app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TodoApp();
})