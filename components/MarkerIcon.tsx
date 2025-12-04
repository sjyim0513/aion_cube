interface MarkerIconProps {
  fillColor: string;
  strokeColor: string;
  size?: number;
  scale?: number;
}

export default function MarkerIcon({
  fillColor,
  strokeColor,
  size = 10,
  scale = 1,
}: MarkerIconProps) {
  // 지도 확대/축소에 따라 마커 크기 조정
  // scale = 1 (기본/축소) → 20px
  // scale = 8 (최대 확대) → 10px
  // 선형 보간으로 계산
  const minScale = 1;
  const maxScale = 8;
  const minSize = 15; // 축소 시
  const maxSize = 3; // 최대 확대 시

  // scale을 1~8 범위로 제한
  const clampedScale = Math.max(minScale, Math.min(maxScale, scale));

  // 선형 보간: scale이 작을수록(축소) 크기가 커짐
  const adjustedSize =
    minSize +
    (maxSize - minSize) * ((clampedScale - minScale) / (maxScale - minScale));
  return (
    <svg
      width={adjustedSize}
      height={adjustedSize}
      viewBox="0 0 16 16"
      style={{
        filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 1))",
        shapeRendering: "geometricPrecision",
        imageRendering: "crisp-edges",
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        style={{
          shapeRendering: "geometricPrecision",
        }}
        className="transition-colors"
      />
    </svg>
  );
}
