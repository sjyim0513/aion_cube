# 성능 최적화 가이드

## 적용된 최적화

### 1. 마우스 이벤트 최적화 ✅
- **requestAnimationFrame 사용**: 마우스 이동 이벤트를 requestAnimationFrame으로 감싸서 브라우저 렌더링 사이클에 맞춤
- **마우스 위치 변화 감지**: 2px 이하 변화는 무시하여 불필요한 계산 방지
- **이전 위치 캐싱**: `lastMousePositionRef`로 이전 위치 저장

### 2. React 메모이제이션 ✅
- **React.memo**: `MapMarker`, `LocationModal` 컴포넌트 메모이제이션
- **useCallback**: 이벤트 핸들러 메모이제이션 (`handleMarkerClick`, `handleMouseMove`)
- **useMemo**: 계산 결과 캐싱 (필요 시)

### 3. 이미지 최적화 ✅
- **Next.js Image 컴포넌트**: `LocationModal`에서 Next.js Image 사용
- **Lazy Loading**: `loading="lazy"` 적용
- **품질 조정**: `quality={85}`로 적절한 품질 유지

### 4. CSS 최적화 (이미 적용됨)
- **GPU 가속**: `transform3d`, `willChange` 사용
- **backfaceVisibility**: 렌더링 최적화

## 추가 최적화 권장사항

### 1. 이미지 CDN 사용
- Vercel의 자동 이미지 최적화 활용
- 또는 Cloudinary, Imgix 같은 CDN 사용

### 2. 코드 스플리팅
```typescript
// 동적 import로 모달 지연 로딩
const LocationModal = dynamic(() => import('./LocationModal'), {
  ssr: false
});
```

### 3. 가상화 (많은 마커의 경우)
- 100개 이상의 마커가 있다면 `react-window` 또는 `react-virtualized` 사용 고려

### 4. Web Workers
- 복잡한 계산이 필요하다면 Web Worker로 이동

### 5. 디바운싱/쓰로틀링
- 필요 시 추가로 throttle/debounce 적용 가능

## 성능 측정

Chrome DevTools의 Performance 탭으로 측정:
1. FPS 확인 (60fps 목표)
2. 메인 스레드 블로킹 시간 확인
3. 메모리 사용량 확인

## 모니터링

Vercel Analytics로 실제 사용자 성능 모니터링:
- Core Web Vitals (LCP, FID, CLS)
- First Contentful Paint (FCP)
- Time to Interactive (TTI)

