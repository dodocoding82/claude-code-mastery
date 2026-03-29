/**
 * theme.js - 다크모드 토글 레이어
 * localStorage에 테마 설정 저장/복원
 */

const THEME_KEY = 'todo-app-theme';

const Theme = {
  /**
   * 저장된 테마를 읽어 <html> 클래스에 즉시 적용
   * FOUC 방지를 위해 index.html <head>에서도 인라인 스크립트로 실행됨
   */
  init() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  /**
   * 다크/라이트 모드 전환 후 저장
   */
  toggle() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  },

  /**
   * 현재 테마 반환
   * @returns {'dark'|'light'}
   */
  getCurrent() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  },
};
