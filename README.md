# New Video Project

이 프로젝트는 최신 영화와 시리즈 정보를 자동으로 수집하여 제공하며, 사용자에게 몰입감 있는 탐색 경험을 선사하는 웹 애플리케이션입니다.

## 🌟 주요 기능 (Key Features)

### 1. TMDB API 기반 자동 콘텐츠 수집 및 동기화
파이썬(Python) 기반의 데이터 수집기(`data_collector`)를 통해 TMDB API와 연동하여 최신 트렌드 콘텐츠를 주기적으로 파이어베이스(Firebase)에 업데이트합니다.

*   **자동화된 데이터 파이프라인**: 
    *   `Collector` 스크립트가 한국에서 상영 중인 영화와 인기 OTT 시리즈 정보를 TMDB에서 주기적으로 fetch 합니다.
    *   단순 수집을 넘어, **'한국어 제목', '한국어 줄거리', '공식 예고편(YouTube)'**이 존재하는 고품질 콘텐츠만을 엄선하여 필터링합니다.
*   **Firebase Integration**:
    *   정제된 데이터는 Firestore의 `new_releases` 컬렉션에 자동 저장되며, 프론트엔드에서 실시간으로 활용됩니다.
    *   이를 통해 관리자가 일일이 데이터를 입력하지 않아도 항상 최신의 콘텐츠 라인업이 유지됩니다.

### 2. 정교한 UI/UX & Absolute Layout Engine
사용자에게 끊김 없는 브라우징 경험을 제공하기 위해 **절대 좌표(Absolute Positioning)** 기반의 그리드 레이아웃 엔진을 자체 구현했습니다.

*   **Absolute Grid Layout (`useGridLayout`)**:
    *   CSS Grid나 Flexbox에만 의존하지 않고, 윈도우 리사이즈 이벤트와 컨테이너 너비를 실시간으로 계산하여 각 카드의 `top`, `left`, `width`, `height` 좌표를 정밀하게 제어합니다.
    *   이로 인해 다양한 화면 크기에서도 완벽한 비율과 정렬을 유지하는 Masonry/Grid 형태의 레이아웃을 제공합니다.
*   **Interactive Video Hover Effect**:
    *   사용자가 포스터에 마우스를 올리면(`Hover`), 카드가 자연스럽게 확장되면서 즉시 **YouTube 예고편**이 재생됩니다.
    *   단순한 이미지 확장이 아닌, 레이아웃 계산에 기반한 부드러운 전환 효과를 통해 시각적 만족도를 극대화했습니다.
    *   `react-youtube`를 활용하여 음소거, 자동 재생 등 최적화된 플레이어 경험을 제공합니다.

## 🛠 기술 스택 (Tech Stack)

*   **Frontend**: React, TypeScript, @imspdr/ui (Design System)
*   **Backend / Data**: Python, Firebase (Firestore), TMDB API
*   **Styling**: Emotion (Styled-components)
*   **State Management**: React Query

## 🚀 시작하기 (Getting Started)

### 설치 및 실행
```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

### 데이터 수집기 실행 (선택 사항)
TMDB API 키와 Firebase 서비스 키 설정이 필요합니다.
```bash
cd data_collector
python collector.py
```