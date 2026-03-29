/**
 * app.js - 앱 진입점 및 이벤트 바인딩
 * 모든 핸들러 패턴: Store 메서드 호출 → UI.render(Store.getState())
 */

document.addEventListener('DOMContentLoaded', () => {
  // 테마 초기화 (FOUC 방지는 index.html 인라인 스크립트가 담당)
  Theme.init();

  // 초기 렌더링
  UI.render(Store.getState());

  // ─── 이벤트 바인딩 ────────────────────────────────────────────

  // 할 일 추가 폼 제출
  document.getElementById('todo-form').addEventListener('submit', handleAddTodo);

  // 목록 내 이벤트 위임 (체크/편집/삭제)
  const todoList = document.getElementById('todo-list');
  todoList.addEventListener('click', handleTodoListClick);
  todoList.addEventListener('change', handleTodoListChange);

  // 상태 필터 탭
  document.getElementById('status-filter').addEventListener('click', handleStatusFilter);

  // 카테고리 필터 태그
  document.getElementById('category-filter').addEventListener('click', handleCategoryFilter);

  // 완료 항목 일괄 삭제
  document.getElementById('clear-completed').addEventListener('click', handleClearCompleted);

  // 다크모드 토글
  document.getElementById('theme-toggle').addEventListener('click', handleThemeToggle);
});

// ─── 이벤트 핸들러 ──────────────────────────────────────────────

/**
 * 할 일 추가
 */
function handleAddTodo(e) {
  e.preventDefault();

  const input = document.getElementById('todo-input');
  const select = document.getElementById('category-select');
  const text = input.value.trim();

  if (!text) {
    // 빈 입력 시 input 흔들기 애니메이션
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 400);
    return;
  }

  Store.addTodo(text, select.value);
  UI.render(Store.getState());

  // 입력 초기화 + 포커스 유지
  input.value = '';
  input.focus();
}

/**
 * 목록 내 클릭 이벤트 처리 (이벤트 위임)
 */
function handleTodoListClick(e) {
  const li = e.target.closest('[data-id]');
  if (!li) return;
  const id = li.dataset.id;

  // 편집 버튼
  if (e.target.closest('.edit-btn')) {
    UI.enableEditMode(id);
    return;
  }

  // 삭제 버튼
  if (e.target.closest('.delete-btn')) {
    // 삭제 애니메이션 후 제거
    li.classList.add('slide-out');
    li.addEventListener('animationend', () => {
      Store.deleteTodo(id);
      UI.render(Store.getState());
    }, { once: true });
    return;
  }

  // 텍스트 더블클릭 시 편집 모드
  if (e.target.classList.contains('todo-text') && e.detail === 2) {
    UI.enableEditMode(id);
  }
}

/**
 * 목록 내 change 이벤트 처리 (체크박스)
 */
function handleTodoListChange(e) {
  if (!e.target.classList.contains('todo-checkbox')) return;

  const li = e.target.closest('[data-id]');
  if (!li) return;

  Store.toggleTodo(li.dataset.id);
  UI.render(Store.getState());
}

/**
 * 상태 필터 탭 클릭
 */
function handleStatusFilter(e) {
  const btn = e.target.closest('.status-tab');
  if (!btn) return;

  Store.setFilter('status', btn.dataset.status);
  UI.render(Store.getState());
}

/**
 * 카테고리 필터 태그 클릭
 */
function handleCategoryFilter(e) {
  const btn = e.target.closest('.category-tab');
  if (!btn) return;

  Store.setFilter('category', btn.dataset.category);
  UI.render(Store.getState());
}

/**
 * 완료 항목 일괄 삭제
 */
function handleClearCompleted() {
  const state = Store.getState();
  const completedCount = state.todos.filter(t => t.completed).length;
  if (completedCount === 0) return;

  Store.clearCompleted();
  UI.render(Store.getState());
}

/**
 * 다크모드 토글
 */
function handleThemeToggle() {
  Theme.toggle();
  UI.renderThemeIcon();
}
