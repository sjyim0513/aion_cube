export interface Location {
  id: string;
  type: string;
  x: number; // 지도상 x 좌표 (%)
  y: number; // 지도상 y 좌표 (%)
  imageUrl: string; // 상세 이미지 경로
  description?: string;
}
