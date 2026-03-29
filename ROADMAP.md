# Developer Web Resume - Roadmap

## Project Overview

HTML, CSS, JavaScript, Tailwind CSS를 활용한 개발자 웹 이력서 싱글 페이지 사이트.
반응형 디자인, 다크모드, 부드러운 애니메이션을 갖춘 모던한 이력서를 목표로 한다.

---

## Tech Stack

| 구분 | 기술 |
|------|------|
| Markup | HTML5 (Semantic) |
| Style | Tailwind CSS (CDN) + 커스텀 CSS |
| Script | Vanilla JavaScript (ES6+) |
| Font | Google Fonts (Inter / Noto Sans KR) |
| Icon | Font Awesome (CDN) |
| Deploy | GitHub Pages |

## File Structure

```
├── index.html        # 메인 페이지 (Tailwind CDN 포함)
├── css/
│   └── custom.css    # 커스텀 스타일, 애니메이션
├── js/
│   └── main.js       # 인터랙션 로직
├── assets/
│   └── images/       # 프로필, 프로젝트 이미지
├── ROADMAP.md
└── README.md
```

---

## Sample Resume Content

```
이름: 홍길동
직함: Frontend Developer
소개: 사용자 경험을 중시하는 3년차 프론트엔드 개발자입니다.

About:
  웹 기술에 열정을 가진 프론트엔드 개발자입니다.
  클린 코드와 직관적인 UI/UX 구현을 지향합니다.
  새로운 기술을 빠르게 습득하고 팀과 협업하는 것을 즐깁니다.

Skills:
  Frontend : HTML, CSS, JavaScript, TypeScript, React, Vue.js
  Style    : Tailwind CSS, Sass, Styled-components
  Tools    : Git, GitHub, Figma, VS Code
  Etc      : REST API, Firebase, Vercel

Experience:
  ABC 테크 | 프론트엔드 개발자 | 2023.03 - 현재
    - 사내 어드민 대시보드 개발 (React + TypeScript)
    - 디자인 시스템 구축 및 컴포넌트 라이브러리 개발
    - 웹 성능 최적화 (Lighthouse 90+ 달성)

  XYZ 스타트업 | 주니어 개발자 | 2021.06 - 2023.02
    - 이커머스 서비스 프론트엔드 개발 (Vue.js)
    - 반응형 웹 디자인 구현
    - RESTful API 연동

Projects:
  TaskFlow   - 칸반 보드 기반 할 일 관리 앱 (React, TypeScript, Firebase)
  WeatherNow - 위치 기반 실시간 날씨 대시보드 (Vue.js, Chart.js)
  DevBlog    - 개인 기술 블로그 플랫폼 (Next.js, MDX, Vercel)

Education:
  한국대학교 | 컴퓨터공학과 | 2017.03 - 2021.02

Contact:
  이메일  : honggildong@email.com
  GitHub  : github.com/honggildong
  LinkedIn: linkedin.com/in/honggildong
```

---

## Development Phases

### Phase 1: Setup & HTML Structure

- [ ] index.html 기본 틀 생성 (Tailwind CDN, Google Fonts, Font Awesome 연결)
- [ ] 시맨틱 HTML 구조 설계
- [ ] Header (로고 + 네비게이션 + 다크모드 토글)
- [ ] Hero 섹션 (이름, 직함, 한 줄 소개, CTA 버튼)
- [ ] About 섹션 (자기소개)
- [ ] Skills 섹션 (카테고리별 기술 태그)
- [ ] Experience 섹션 (경력 타임라인)
- [ ] Projects 섹션 (카드 목록)
- [ ] Education 섹션
- [ ] Contact 섹션 (연락처 + 소셜 링크)
- [ ] Footer

### Phase 2: Styling with Tailwind CSS

- [ ] 전체 레이아웃 (Tailwind 유틸리티 클래스)
- [ ] Hero: 그라데이션 배경
- [ ] Skills: 카테고리별 색상 뱃지
- [ ] Experience: 세로 타임라인 UI
- [ ] Projects: 카드 그리드 + hover 효과
- [ ] 반응형 디자인 (sm / md / lg 브레이크포인트)
- [ ] 다크모드 (`dark:` 클래스 적용)
- [ ] custom.css에 fade-in / slide-up 애니메이션 키프레임 정의

### Phase 3: JavaScript Interaction

- [ ] 다크모드 토글 (localStorage 저장/복원)
- [ ] 모바일 햄버거 메뉴
- [ ] 스무스 스크롤
- [ ] Intersection Observer 스크롤 애니메이션
- [ ] 활성 섹션 네비게이션 하이라이트
- [ ] 맨 위로 가기 버튼

### Phase 4: Polish & Optimize

- [ ] favicon 설정
- [ ] Open Graph / SEO 메타 태그
- [ ] 접근성 점검 (aria-label, 키보드 탐색, 색 대비)
- [ ] 이미지 lazy loading

### Phase 5: Deploy

- [ ] GitHub Repository 생성 및 push
- [ ] GitHub Pages 배포
- [ ] Lighthouse 점검 (성능/접근성/SEO 90+ 목표)
