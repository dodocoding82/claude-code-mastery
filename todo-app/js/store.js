/**
 * store.js - 데이터 레이어
 * localStorage CRUD, 필터링, 상태 관리
 */

const STORAGE_KEY = 'todo-app-data';

// 기본 카테고리 목록
const DEFAULT_CATEGORIES = [
  { id: 'personal', label: '개인', color: 'blue' },
  { id: 'work',     label: '업무', color: 'red' },
  { id: 'study',    label: '학습', color: 'green' },
  { id: 'other',    label: '기타', color: 'gray' },
];

// 초기 상태 구조
const DEFAULT_STATE = {
  todos: [],
  categories: DEFAULT_CATEGORIES,
  filter: {
    category: 'all',
    status: 'all',
  },
};

const Store = {
  /**
   * localStorage에서 전체 상태를 읽어 반환
   * @returns {object} 전체 앱 상태
   */
  getState() {
    return this._load();
  },

  /**
   * 현재 필터가 적용된 할 일 목록 반환
   * @returns {Array} 필터링된 todo 배열
   */
  getFilteredTodos() {
    const state = this._load();
    const { todos, filter } = state;

    return todos.filter(todo => {
      // 상태 필터
      if (filter.status === 'active' && todo.completed) return false;
      if (filter.status === 'completed' && !todo.completed) return false;

      // 카테고리 필터
      if (filter.category !== 'all' && todo.category !== filter.category) return false;

      return true;
    });
  },

  /**
   * 새 할 일 추가
   * @param {string} text - 할 일 내용
   * @param {string} category - 카테고리 id
   */
  addTodo(text, category) {
    const state = this._load();
    const now = Date.now();
    const todo = {
      id: this._generateId(),
      text: text.trim(),
      completed: false,
      category: category || 'personal',
      createdAt: now,
      updatedAt: now,
    };
    state.todos.unshift(todo); // 최신 항목이 위에 오도록
    this._save(state);
  },

  /**
   * 할 일 수정
   * @param {string} id - todo id
   * @param {object} patch - 변경할 필드 (text?, completed?, category?)
   */
  updateTodo(id, patch) {
    const state = this._load();
    const idx = state.todos.findIndex(t => t.id === id);
    if (idx === -1) return;

    state.todos[idx] = {
      ...state.todos[idx],
      ...patch,
      updatedAt: Date.now(),
    };
    this._save(state);
  },

  /**
   * 할 일 삭제
   * @param {string} id - todo id
   */
  deleteTodo(id) {
    const state = this._load();
    state.todos = state.todos.filter(t => t.id !== id);
    this._save(state);
  },

  /**
   * 완료 상태 토글
   * @param {string} id - todo id
   */
  toggleTodo(id) {
    const state = this._load();
    const todo = state.todos.find(t => t.id === id);
    if (!todo) return;

    this.updateTodo(id, { completed: !todo.completed });
  },

  /**
   * 완료된 항목 일괄 삭제
   */
  clearCompleted() {
    const state = this._load();
    state.todos = state.todos.filter(t => !t.completed);
    this._save(state);
  },

  /**
   * 필터 설정
   * @param {'status'|'category'} type - 필터 타입
   * @param {string} value - 필터 값
   */
  setFilter(type, value) {
    const state = this._load();
    state.filter[type] = value;
    this._save(state);
  },

  // ─── 내부 헬퍼 ────────────────────────────────────────────────

  /**
   * 상태를 localStorage에 저장
   * @param {object} state
   */
  _save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('[Store] 저장 실패:', e);
    }
  },

  /**
   * localStorage에서 상태를 읽어 반환 (없으면 기본값)
   * @returns {object}
   */
  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATE, todos: [], categories: [...DEFAULT_CATEGORIES] };

      const parsed = JSON.parse(raw);
      // 누락된 필드 보정
      return {
        todos: parsed.todos || [],
        categories: parsed.categories || [...DEFAULT_CATEGORIES],
        filter: { ...DEFAULT_STATE.filter, ...(parsed.filter || {}) },
      };
    } catch (e) {
      console.error('[Store] 읽기 실패:', e);
      return { ...DEFAULT_STATE, todos: [], categories: [...DEFAULT_CATEGORIES] };
    }
  },

  /**
   * 고유 ID 생성 (crypto.randomUUID 지원 시 사용, 아니면 폴백)
   * @returns {string}
   */
  _generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // 폴백: timestamp + random
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  },
};
