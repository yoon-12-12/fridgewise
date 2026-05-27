# 🧊 FridgeWise

냉장고 속 식재료를 효율적으로 관리하고  
유통기한 알림과 레시피 추천을 제공하는 스마트 식재료 관리 웹 서비스입니다.

---

# 📌 프로젝트 소개

FridgeWise는 사용자가 보유한 식재료를 등록하고 관리할 수 있으며,

- 유통기한 임박 알림
- 보유 재료 기반 레시피 추천
- 부족한 재료 장보기 리스트 생성
- OCR 영수증 인식 자동 등록
- 엑셀 다운로드

기능을 제공하는 웹 애플리케이션입니다.

식재료를 보다 효율적으로 소비하도록 도와
불필요한 식재료 폐기를 줄이는 것을 목표로 개발했습니다.

# ✨ 주요 기능

## 1. 식재료 등록 및 관리

- 식재료명 등록
- 수량 등록
- 유통기한 등록

냉장고 재료를 직접 추가하고 삭제할 수 있습니다.

---

## 2. 유통기한 임박 알림

유통기한이 가까운 재료를 자동으로 감지하여

⚠ 유통기한 임박 알림

배너 형태로 표시합니다.

---

## 3. 레시피 추천

냉장고에 등록된 재료를 기반으로

- 만들 수 있는 레시피
- 부족한 재료

를 함께 확인할 수 있습니다.

---

## 4. 장보기 리스트 자동 생성

부족한 재료를 자동 추출하여

🛒 장보기 리스트

형태로 제공합니다.

---

## 5. OCR 영수증 등록

마트 영수증 사진 업로드 시

OCR로 텍스트를 인식하여 식재료를 자동 등록합니다.

---

## 6. Excel 다운로드

등록된 냉장고 재료 목록을 `.xlsx` 파일로 다운로드할 수 있습니다.

---

## 7. 검색 및 정렬

- 재료 검색
- 이름순 정렬
- 유통기한순 정렬

기능을 제공합니다.

---

## 8. Dashboard 시각화

Dashboard 페이지에서

- 재료 수
- 냉장고 현황

을 차트로 확인할 수 있습니다.

---

## 9. 다크모드 지원

Light Mode / Dark Mode 전환이 가능합니다.
# 🛠 기술 스택

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS

---

## State Management

- Context API

---

## Libraries

- Tesseract.js → OCR 영수증 인식
- XLSX → Excel 다운로드
- Recharts → Dashboard 차트 시각화

# 📂 프로젝트 구조

```bash
src/
├── components/
├── context/
├── data/
├── pages/
├── types/
└── utils/
```
# 🔧 React Hook 사용

## useState

- 입력값 관리
- 검색 상태 관리
- 정렬 상태 관리
- 다크모드 상태 관리

---

## useEffect

- localStorage 자동 저장
- 새로고침 시 데이터 복원

---

## useMemo

- 자동완성 최적화
- 검색 및 정렬 성능 최적화

---

## useContext

- 식재료 정보 전역 공유
- 테마 상태 전역 공유# 🔧 React Hook 사용

## useState

- 입력값 관리
- 검색 상태 관리
- 정렬 상태 관리
- 다크모드 상태 관리

---

## useEffect

- localStorage 자동 저장
- 새로고침 시 데이터 복원

---

## useMemo

- 자동완성 최적화
- 검색 및 정렬 성능 최적화

---

## useContext

- 식재료 정보 전역 공유
- 테마 상태 전역 공유

# 🌐 페이지 구성

| URL | 설명 |
|---|---:|
| `/` | Home |
| `/inventory` | 냉장고 재료 관리 |
| `/recipes` | 레시피 추천 |
| `/dashboard` | 통계 Dashboard |

# 🚀 실행 방법

## 패키지 설치

```bash
npm install
```

## 개발 서버 실행

```bash
npm run dev
```

## 빌드

```bash
npm run build
```

# 🌍 배포 URL

배포 후 입력 예정

예시:

https://fridgewise.vercel.app

---

# 🤖 AI 활용 내용

본 프로젝트는 AI를 활용하여 개발되었습니다.

활용 내용:

- 프로젝트 구조 설계
- React + TypeScript 코드 작성 보조
- UI/UX 개선 아이디어 도출
- OCR 기능 설계 지원
- 보고서 작성 지원

활용 도구:

- ChatGPT

---

# 👨‍💻 개발자

Yoon