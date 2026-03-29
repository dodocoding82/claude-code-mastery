# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## Project

개발자 웹 이력서 (단일 페이지 정적 사이트). 빌드 도구 없이 브라우저에서 직접 실행된다.

## Tech Stack

- **HTML5** - 시맨틱 마크업
- **Tailwind CSS** - CDN 방식 (`<script src="https://cdn.tailwindcss.com">`)
- **Vanilla JavaScript** - ES6+, 빌드 없음
- **CSS** - `css/custom.css` (애니메이션, Tailwind로 표현 불가한 스타일)

## Development

빌드 도구가 없으므로 `index.html`을 브라우저로 직접 열면 된다.

```bash
# VS Code Live Server 사용 시
# index.html 우클릭 → Open with Live Server

# 또는 Python 간이 서버
python -m http.server 8080
```

## Architecture

모든 콘텐츠는 `index.html` 한 파일에 담긴다. 섹션 구조:

```
Header (nav + dark mode toggle)
  └── #hero / #about / #skills / #experience / #projects / #education / #contact
Footer
```

- **Tailwind dark mode**: `darkMode: 'class'` 설정 → `<html>` 태그에 `dark` 클래스 토글
- **스크롤 애니메이션**: `css/custom.css`에 키프레임 정의, `js/main.js`의 Intersection Observer로 트리거
- **상태 유지**: 다크모드 설정은 `localStorage`에 저장

## Tailwind Config (인라인)

CDN 사용 시 `tailwind.config` 는 `<script>` 블록으로 `index.html` 내에 인라인 작성:

```html
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: { extend: {} }
  }
</script>
```

## ROADMAP

개발 단계별 체크리스트는 `ROADMAP.md` 참고.
