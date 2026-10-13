// Khởi tạo danh sách công việc từ localStorage hoặc mảng rỗng
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Các phần tử DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const pendingCount = document.getElementById('pending-count');
const emptyState = document.getElementById('empty-state');

// Lưu dữ liệu vào localStorage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render danh sách công việc ra màn hình
function renderTodos() {
  todoList.innerHTML = '';
  
  // Lọc danh sách theo bộ lọc hiện tại
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'completed') return todo.completed;
    return todo.priority === currentFilter;
  });

  // Hiển thị trạng thái trống nếu không có item nào
  if (filteredTodos.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  // Tạo HTML cho từng công việc
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', todo.id);

    li.innerHTML = `
      <div class="todo-item-left">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${todo.completed ? 'checked' : ''} 
          aria-label="Đánh dấu hoàn thành"
        >
        <span class="todo-text">${escapeHTML(todo.text)}</span>
        <span class="priority-badge ${todo.priority}">
          ${todo.priority === 'high' ? 'Cao' : todo.priority === 'medium' ? 'Trung bình' : 'Thấp'}
        </span>
      </div>
      <button class="delete-btn" aria-label="Xóa công việc">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    `;

    // Sự kiện thay đổi trạng thái hoàn thành (Checkbox)
    const checkbox = li.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    // Sự kiện xóa công việc
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    todoList.appendChild(li);
  });

  // Cập nhật số lượng công việc chưa hoàn thành
  const pendingTodos = todos.filter(todo => !todo.completed).length;
  pendingCount.textContent = `Chờ làm: ${pendingTodos}`;
}

// Thêm công việc mới
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const text = todoInput.value.trim();
  const priority = prioritySelect.value;

  if (!text) return;

  const newTodo = {
    id: Date.now().toString(),
    text,
    priority,
    completed: false
  };

  todos.push(newTodo);
  saveToLocalStorage();
  renderTodos();

  // Reset form
  todoInput.value = '';
  prioritySelect.value = 'medium';
  todoInput.focus();
});

// Đổi trạng thái hoàn thành
function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveToLocalStorage();
  renderTodos();
}

// Xóa công việc
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveToLocalStorage();
  renderTodos();
}

// Xử lý sự kiện chuyển đổi bộ lọc
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.getAttribute('data-filter');
    renderTodos();
  });
});

// Hàm chống tấn công XSS khi render text người dùng nhập
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Khởi chạy ứng dụng lần đầu
renderTodos();
```

---