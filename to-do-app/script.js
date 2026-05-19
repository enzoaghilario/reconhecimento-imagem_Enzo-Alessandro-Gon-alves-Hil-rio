/* ════════════════════════════════════════════════════════
   TaskFlow — script.js
   Vanilla JS · localStorage · No dependencies
════════════════════════════════════════════════════════ */

// ─── Constants ────────────────────────────────────────────────
const DB_KEY           = 'taskflow_db';
const CURRENT_USER_KEY = 'taskflow_current_user';

// ─── DB Layer ─────────────────────────────────────────────────

/** @returns {{ users: Array, todos: Array }} */
function getDB() {
  try { return JSON.parse(localStorage.getItem(DB_KEY)) || { users: [], todos: [] }; }
  catch { return { users: [], todos: [] }; }
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// ─── Auth Layer ───────────────────────────────────────────────

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)); } catch { return null; }
}
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}
function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// ─── Screen Manager ───────────────────────────────────────────

const SCREENS = ['login', 'register', 'dashboard'];

function showScreen(name) {
  SCREENS.forEach(id => {
    const el = document.getElementById(`screen-${id}`);
    if (!el) return;
    if (id === name) {
      el.classList.add('active');
      el.style.animation = 'none';
      requestAnimationFrame(() => (el.style.animation = ''));
    } else {
      el.classList.remove('active');
    }
  });
}

// ─── UI Helpers ───────────────────────────────────────────────

function showErr(inputEl, errEl, msg) {
  inputEl.classList.add('is-error');
  errEl.textContent = msg;
  errEl.classList.remove('hidden');
}

function clearErr(inputEl, errEl) {
  inputEl.classList.remove('is-error');
  errEl.classList.add('hidden');
}

function shake(formEl) {
  const card = formEl.closest('.glass-card') || formEl;
  card.classList.remove('do-shake');
  void card.offsetWidth;
  card.classList.add('do-shake');
  card.addEventListener('animationend', () => card.classList.remove('do-shake'), { once: true });
}

function showAlert(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

function hideAlert(el) {
  el.textContent = '';
  el.classList.add('hidden');
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

// ─── Eye toggle ───────────────────────────────────────────────

document.querySelectorAll('.eye-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const inp = document.getElementById(btn.dataset.target);
    if (!inp) return;
    const isText = inp.type === 'text';
    inp.type = isText ? 'password' : 'text';
    btn.setAttribute('aria-label', isText ? 'Mostrar senha' : 'Ocultar senha');
    btn.style.color = isText ? '' : '#a5b4fc';
  });
});

// ─── LOGIN ────────────────────────────────────────────────────

const loginForm     = document.getElementById('form-login');
const loginEmail    = document.getElementById('login-email');
const loginPass     = document.getElementById('login-password');
const loginEmailErr = document.getElementById('login-email-err');
const loginPassErr  = document.getElementById('login-password-err');
const loginAlert    = document.getElementById('login-alert');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErr(loginEmail, loginEmailErr);
  clearErr(loginPass, loginPassErr);
  hideAlert(loginAlert);

  const email = loginEmail.value.trim();
  const pass  = loginPass.value;
  let valid   = true;

  if (!email)               { showErr(loginEmail, loginEmailErr, 'Informe seu e-mail.');   valid = false; }
  else if (!isValidEmail(email)) { showErr(loginEmail, loginEmailErr, 'E-mail inválido.'); valid = false; }
  if (!pass)                { showErr(loginPass, loginPassErr, 'Informe sua senha.');      valid = false; }

  if (!valid) { shake(loginForm); return; }

  const db   = getDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    showAlert(loginAlert, 'E-mail não cadastrado. Crie uma conta primeiro.');
    shake(loginForm); return;
  }
  if (user.password !== pass) {
    showAlert(loginAlert, 'Senha incorreta.');
    showErr(loginPass, loginPassErr, 'Senha inválida.');
    shake(loginForm); return;
  }

  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  loginForm.reset();
  initDashboard();
  showScreen('dashboard');
});

// ─── REGISTER ─────────────────────────────────────────────────

const regForm    = document.getElementById('form-register');
const regName    = document.getElementById('reg-name');
const regEmail   = document.getElementById('reg-email');
const regPass    = document.getElementById('reg-password');
const regNameErr = document.getElementById('reg-name-err');
const regEmailErr= document.getElementById('reg-email-err');
const regPassErr = document.getElementById('reg-password-err');
const regAlertErr= document.getElementById('register-alert-err');
const regAlertOk = document.getElementById('register-alert-ok');

regForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErr(regName, regNameErr);
  clearErr(regEmail, regEmailErr);
  clearErr(regPass, regPassErr);
  hideAlert(regAlertErr);
  hideAlert(regAlertOk);

  const name  = regName.value.trim();
  const email = regEmail.value.trim();
  const pass  = regPass.value;
  let valid   = true;

  if (!name)                      { showErr(regName,  regNameErr,  'Informe seu nome.');               valid = false; }
  if (!email)                     { showErr(regEmail, regEmailErr, 'Informe seu e-mail.');             valid = false; }
  else if (!isValidEmail(email))  { showErr(regEmail, regEmailErr, 'E-mail inválido.');               valid = false; }
  if (!pass)                      { showErr(regPass,  regPassErr,  'Informe uma senha.');              valid = false; }
  else if (pass.length < 6)       { showErr(regPass,  regPassErr,  'Mínimo 6 caracteres.');           valid = false; }

  if (!valid) { shake(regForm); return; }

  const db     = getDB();
  const exists = db.users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    showAlert(regAlertErr, 'Este e-mail já está cadastrado.');
    showErr(regEmail, regEmailErr, 'E-mail já em uso.');
    shake(regForm); return;
  }

  const newUser = {
    id:        crypto.randomUUID(),
    name,
    email:     email.toLowerCase(),
    password:  pass,
    createdAt: Date.now(),
  };
  db.users.push(newUser);
  saveDB(db);

  showAlert(regAlertOk, `Conta criada! Bem-vindo(a), ${name.split(' ')[0]} 🎉`);
  regForm.reset();

  setTimeout(() => {
    hideAlert(regAlertOk);
    showScreen('login');
  }, 1800);
});

// ─── NAVIGATION ───────────────────────────────────────────────

document.getElementById('goto-register').addEventListener('click', () => showScreen('register'));
document.getElementById('goto-login').addEventListener('click',    () => showScreen('login'));

document.getElementById('btn-logout').addEventListener('click', () => {
  clearCurrentUser();
  currentFilter = 'all';
  refreshFilterTabs();
  showScreen('login');
});

// ─── DASHBOARD ────────────────────────────────────────────────

let currentFilter = 'all';

const formAddTodo  = document.getElementById('form-add-todo');
const todoTitleEl  = document.getElementById('todo-title');
const todoTypeEl   = document.getElementById('todo-type');
const todoDescEl   = document.getElementById('todo-desc');
const todoTitleErr = document.getElementById('todo-title-err');
const todoListEl   = document.getElementById('todo-list');
const todoEmptyEl  = document.getElementById('todo-empty');
const emptyMsgEl   = document.getElementById('empty-msg');
const charCountEl  = document.getElementById('char-count');
const statTotal    = document.getElementById('stat-total');
const statDone     = document.getElementById('stat-done');

// Char counter
todoDescEl.addEventListener('input', () => {
  charCountEl.textContent = `${todoDescEl.value.length} / 300`;
});

// Clear title error on type
todoTitleEl.addEventListener('input', () => {
  if (todoTitleEl.value.trim()) clearErr(todoTitleEl, todoTitleErr);
});

/** Initialise dashboard after login */
function initDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById('user-greeting').textContent = `Olá, ${user.name.split(' ')[0]}!`;
  currentFilter = 'all';
  refreshFilterTabs();
  renderTodos();
}

// ─── Todo CRUD ────────────────────────────────────────────────

function getUserTodos() {
  const user = getCurrentUser();
  if (!user) return [];
  return getDB().todos.filter(t => t.userId === user.email.toLowerCase());
}

function addTodo(todo) {
  const db = getDB();
  db.todos.push(todo);
  saveDB(db);
}

function toggleDone(id) {
  const db  = getDB();
  const idx = db.todos.findIndex(t => t.id === id);
  if (idx < 0) return;
  db.todos[idx].done = !db.todos[idx].done;
  saveDB(db);
}

function removeTodo(id) {
  const db  = getDB();
  db.todos  = db.todos.filter(t => t.id !== id);
  saveDB(db);
}

// ─── Form submit ──────────────────────────────────────────────

formAddTodo.addEventListener('submit', e => {
  e.preventDefault();
  clearErr(todoTitleEl, todoTitleErr);

  const title = todoTitleEl.value.trim();
  const type  = todoTypeEl.value;
  const desc  = todoDescEl.value.trim();

  if (!title) {
    showErr(todoTitleEl, todoTitleErr, 'Título é obrigatório.');
    todoTitleEl.focus();
    return;
  }

  const user = getCurrentUser();
  if (!user) return;

  addTodo({
    id:          crypto.randomUUID(),
    userId:      user.email.toLowerCase(),
    title,
    type,
    description: desc,
    done:        false,
    createdAt:   Date.now(),
  });

  formAddTodo.reset();
  charCountEl.textContent = '0 / 300';
  renderTodos();
});

// ─── Render ───────────────────────────────────────────────────

function renderTodos() {
  const all = getUserTodos();

  // Update stats
  const doneCount = all.filter(t => t.done).length;
  statTotal.textContent = `${all.length} tarefa${all.length !== 1 ? 's' : ''}`;
  statDone.textContent  = `${doneCount} concluída${doneCount !== 1 ? 's' : ''}`;

  // Filter
  const filtered = currentFilter === 'all'
    ? all
    : all.filter(t => t.type === currentFilter);

  // Sort: pending first, done last
  const sorted = [
    ...filtered.filter(t => !t.done),
    ...filtered.filter(t =>  t.done),
  ];

  todoListEl.innerHTML = '';

  if (sorted.length === 0) {
    todoEmptyEl.classList.remove('hidden');
    emptyMsgEl.textContent = all.length === 0
      ? 'Nenhuma tarefa cadastrada ainda.'
      : 'Nenhuma tarefa nessa categoria.';
  } else {
    todoEmptyEl.classList.add('hidden');
    sorted.forEach(todo => todoListEl.appendChild(buildCard(todo)));
  }
}

function buildCard(todo) {
  const card = document.createElement('div');
  card.className = `todo-card${todo.done ? ' is-done' : ''}`;
  card.dataset.id = todo.id;

  // Type accent color via CSS custom property
  const typeColors = { Trabalho: '#3b82f6', Pessoal: '#8b5cf6', Estudos: '#10b981' };
  card.style.setProperty('--type-color', typeColors[todo.type] || '#6366f1');

  const badgeClass = {
    Trabalho: 'badge-trabalho',
    Pessoal:  'badge-pessoal',
    Estudos:  'badge-estudos',
  }[todo.type] || 'badge-trabalho';

  const typeEmoji = { Trabalho: '💼', Pessoal: '🏠', Estudos: '📚' }[todo.type] || '';

  card.innerHTML = `
    <div class="todo-card-top">
      <p class="todo-title">${escapeHtml(todo.title)}</p>
      <span class="type-badge ${badgeClass}">${typeEmoji} ${escapeHtml(todo.type)}</span>
    </div>

    ${todo.description
      ? `<p class="todo-desc">${escapeHtml(todo.description)}</p>`
      : ''}

    <div class="todo-card-footer">
      <span class="todo-date">${formatDate(todo.createdAt)}</span>
      <div style="display:flex;align-items:center;gap:.4rem">
        ${!todo.done ? `
          <button class="btn-done" data-action="done" aria-label="Marcar como concluída">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Concluir
          </button>` : `
          <span class="btn-done is-done">
            <svg class="check-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Concluída
          </span>`}
        <button class="btn-delete" data-action="delete" aria-label="Remover tarefa">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 3h9M5 3V2h3v1M10.5 3l-.7 7.1a1 1 0 01-1 .9H4.2a1 1 0 01-1-.9L2.5 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Done button
  const doneBtn = card.querySelector('[data-action="done"]');
  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      toggleDone(todo.id);
      renderTodos();
    });
  }

  // Delete button
  card.querySelector('[data-action="delete"]').addEventListener('click', () => {
    card.style.opacity = '0';
    card.style.transform = 'scale(.95)';
    card.style.transition = 'opacity .2s, transform .2s';
    setTimeout(() => { removeTodo(todo.id); renderTodos(); }, 200);
  });

  return card;
}

// ─── Filter tabs ──────────────────────────────────────────────

function refreshFilterTabs() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    const isActive = btn.dataset.filter === currentFilter;
    btn.classList.toggle('is-active', isActive);
  });
}

document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    refreshFilterTabs();
    renderTodos();
  });
});

// ─── Bootstrap ───────────────────────────────────────────────

(function boot() {
  const user = getCurrentUser();
  if (user) { initDashboard(); showScreen('dashboard'); }
  else       { showScreen('login'); }
})();
