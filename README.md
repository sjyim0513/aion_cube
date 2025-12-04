# 아이온 지도 프로젝트

아이온 게임의 지도에 특정 위치를 표시하고, 클릭 시 상세 이미지를 보여주는 Next.js 애플리케이션입니다.

## 기능

- 지도 확대/축소
- 지도 드래그 이동
- 위치 아이콘 표시
- 아이콘 클릭 시 상세 이미지 모달 표시

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
aion_cube/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 전역 스타일
├── components/
│   ├── Map.tsx             # 지도 컴포넌트 (확대/축소, 드래그)
│   ├── MapMarker.tsx       # 위치 아이콘 마커
│   └── LocationModal.tsx   # 상세 이미지 모달
├── data/
│   └── locations.ts        # 위치 데이터
├── types/
│   └── location.ts         # 위치 타입 정의
└── public/
    └── images/
        ├── map.jpg         # 지도 이미지 (직접 추가 필요)
        └── locations/      # 위치별 상세 이미지 (직접 추가 필요)
```

## 사용 방법

1. `public/images/map.jpg`에 지도 이미지를 추가하세요.
2. `public/images/locations/` 폴더에 각 위치의 상세 이미지를 추가하세요.
3. `data/locations.ts` 파일에서 위치 좌표와 정보를 수정하세요.

## 위치 데이터 형식

```typescript
{
  id: string;           // 고유 ID
  name: string;         // 위치 이름
  x: number;            // 지도상 x 좌표 (%)
  y: number;            // 지도상 y 좌표 (%)
  imageUrl: string;     // 상세 이미지 경로
  description?: string; // 설명 (선택)
}
```

