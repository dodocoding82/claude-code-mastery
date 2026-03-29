/**
 * ui.js - 렌더링 레이어
 * Store 상태를 DOM으로 변환. DOM에만 접근하며 데이터 변경 없음.
 */

const UI = {
  /**
   * 전체 UI를 상태 기반으로 동기화
   * @param {object} state - Store.getState()
   */
  render(state) {
    const filtered = Store.getFilteredTodos();
    this.renderTodoList(filtered);
    this.renderFilter(state.filter);
    this.renderSummary(state.todos);
    this.renderThemeIcon();
  },

  /**
   * 할 일 목록 렌더링 (<ul> 내부 교체)
   * @param {Array} todos - 렌더링할 todo 배열
   */
  renderTodoList(todos) {
    const list = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');

    if (todos.length === 0) {
      list.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    list.innerHTML = todos.map(todo => this.renderTodoItem(todo)).join('');
  },

  /**
   * 개별 할 일 항목 HTML 생성
   * @param {object} todo
   * @returns {string} HTML 문자열
   */
  renderTodoItem(todo) {
    const badgeClass = this.getCategoryBadgeClass(todo.category);
    const categoryLabels = { personal: '개인', work: '업무', study: '학습', other: '기타' };
    const label = categoryLabels[todo.category] || todo.category;

    const textClass = todo.completed
      ? 'line-through text-gray-400 dark:text-gray-500'
      : 'text-gray-800 dark:text-gray-100';

    // HTML 인젝션 방지: textContent 방식으로 삽입하므로 escapeHtml 사용
    const safeText = this._escapeHtml(todo.text);

    return `
      <li
        data-id="${todo.id}"
        class="todo-item flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm group transition-all"
      >
        <!-- 완료 체크박스 -->
        <input
          type="checkbox"
          class="todo-checkbox w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-600 cursor-pointer accent-blue-600 flex-shrink-0"
          ${todo.completed ? 'checked' : ''}
          aria-label="완료 체크"
        />

        <!-- 카테고리 배지 -->
        <span class="category-badge ${badgeClass} px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
          ${label}
        </span>

        <!-- 할 일 텍스트 -->
        <span class="todo-text flex-1 text-sm ${textClass} break-all">
          ${safeText}
        </span>

        <!-- 액션 버튼 (hover 시 표시) -->
        <div class="todo-actions flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            class="edit-btn p-1.5 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            aria-label="편집"
            title="편집"
          >
            ✏️
          </button>
          <button
            class="delete-btn p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            aria-label="삭제"
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </li>
    `;
  },

  /**
   * 필터 탭 활성 상태 업데이트
   * @param {object} filter - { status, category }
   */
  renderFilter(filter) {
    // 상태 탭
    document.querySelectorAll('.status-tab').forEach(btn => {
      const isActive = btn.dataset.status === filter.status;
      btn.classList.toggle('bg-blue-600', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('shadow-sm', isActive);
      btn.classList.toggle('text-gray-600', !isActive);
      btn.classList.toggle('dark:text-gray-400', !isActive);
      btn.classList.toggle('hover:bg-gray-100', !isActive);
      btn.classList.toggle('dark:hover:bg-gray-700', !isActive);
    });

    // 카테고리 탭
    document.querySelectorAll('.category-tab').forEach(btn => {
      const isActive = btn.dataset.category === filter.category;
      const categoryColors = {
        all:      { active: 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200', inactive: 'text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-500' },
        personal: { active: 'bg-blue-600 text-white border-blue-600',   inactive: 'text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700 hover:border-blue-500' },
        work:     { active: 'bg-red-500 text-white border-red-500',      inactive: 'text-red-500 dark:text-red-400 border-red-300 dark:border-red-700 hover:border-red-500' },
        study:    { active: 'bg-green-600 text-white border-green-600',  inactive: 'text-green-600 dark:text-green-400 border-green-300 dark:border-green-700 hover:border-green-500' },
        other:    { active: 'bg-gray-500 text-white border-gray-500',    inactive: 'text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-500' },
      };

      const colors = categoryColors[btn.dataset.category] || categoryColors.all;
      // 기존 색상 클래스 초기화
      btn.className = 'category-tab px-3 py-1.5 rounded-full text-xs font-medium border transition-all';
      btn.className += ' ' + (isActive ? colors.active : colors.inactive);
    });
  },

  /**
   * 요약 정보 업데이트
   * @param {Array} todos - 전체 todo 배열 (필터 미적용)
   */
  renderSummary(todos) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;

    const el = document.getElementById('todo-summary');
    if (total === 0) {
      el.textContent = '';
      return;
    }
    el.textContent = `전체 ${total}개 · 진행 중 ${active}개 · 완료 ${completed}개`;
  },

  /**
   * 테마 아이콘 업데이트
   */
  renderThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const isDark = document.documentElement.classList.contains('dark');
    icon.textContent = isDark ? '☀️' : '🌙';
  },

  /**
   * 인라인 편집 모드 활성화 (텍스트를 input으로 교체)
   * @param {string} id - todo id
   */
  enableEditMode(id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    if (!li) return;

    const textEl = li.querySelector('.todo-text');
    const actionsEl = li.querySelector('.todo-actions');
    const currentText = textEl.textContent.trim();

    // input 요소 생성
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.maxLength = 200;
    input.className = [
      'todo-edit-input flex-1 text-sm px-3 py-1.5 rounded-lg',
      'bg-gray-100 dark:bg-gray-700',
      'border border-blue-500 dark:border-blue-400',
      'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
      'text-gray-800 dark:text-gray-100',
    ].join(' ');

    // Enter: 저장, Escape: 취소
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.disableEditMode(id, input.value);
      } else if (e.key === 'Escape') {
        this.disableEditMode(id, null);
      }
    });

    // 포커스 아웃 시 저장
    input.addEventListener('blur', () => {
      // setTimeout으로 Enter 이벤트와 충돌 방지
      setTimeout(() => this.disableEditMode(id, input.value), 100);
    });

    textEl.replaceWith(input);
    actionsEl.classList.add('opacity-0');
    input.focus();
    input.select();
  },

  /**
   * 인라인 편집 모드 해제
   * @param {string} id - todo id
   * @param {string|null} newText - null이면 취소 (변경 없음)
   */
  disableEditMode(id, newText) {
    const li = document.querySelector(`[data-id="${id}"]`);
    if (!li) return;

    const input = li.querySelector('.todo-edit-input');
    if (!input) return; // 이미 해제됨 (blur+Enter 이중 호출 방지)

    const trimmed = newText && newText.trim();
    if (trimmed && trimmed !== '') {
      Store.updateTodo(id, { text: trimmed });
    }

    // UI 전체 재렌더링
    UI.render(Store.getState());
  },

  /**
   * 카테고리별 배지 Tailwind 클래스 반환
   * @param {string} category
   * @returns {string}
   */
  getCategoryBadgeClass(category) {
    const map = {
      personal: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
      work:     'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
      study:    'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
      other:    'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    };
    return map[category] || map.other;
  },

  /**
   * XSS 방지용 HTML 이스케이프
   * @param {string} str
   * @returns {string}
   */
  _escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },
};
