"use client";

import { useState, memo } from "react";
import { Location } from "@/types/location";
import MarkerIcon from "./MarkerIcon";

interface MapMarkerProps {
  location: Location;
  onClick: () => void;
  scale: number;
}

function MapMarker({ location, onClick, scale }: MapMarkerProps) {
  // type에 따라 색상 결정
  const getColor = () => {
    if (location.type === "g") {
      return "#10b981"; // green-500
    } else if (location.type === "w") {
      return "#3b82f6"; // blue-500
    }
    return "#6b7280"; // gray-500
  };

  const getHoverColor = () => {
    if (location.type === "g") {
      return "#059669"; // green-600
    } else if (location.type === "w") {
      return "#2563eb"; // blue-600
    }
    return "#4b5563"; // gray-600
  };

  // SVG 크기가 이미 scale에 따라 조정되므로 버튼 scale은 1로 고정
  const markerScale = 1;
  const hoverScale = 1.1;
  const [isHovered, setIsHovered] = useState(false);
  // 호버 시 전체 흰색, 기본은 원래 색상 + 흰색 테두리
  const fillColor = isHovered ? "#ffffff" : getColor();
  const strokeColor = "#ffffff"; // 항상 흰색 테두리

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseDown={(e) => {
        e.stopPropagation(); // 지도 드래그 시작 방지
      }}
      className="absolute cursor-pointer z-10"
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
        transform: `translate(-50%, -50%) scale(${markerScale})`,
        imageRendering: "crisp-edges",
        willChange: "transform",
      }}
      aria-label={location.description || `위치 ${location.id}`}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.transform = `translate(-50%, -50%) scale(${hoverScale})`;
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.transform = `translate(-50%, -50%) scale(${markerScale})`;
      }}
    >
      <MarkerIcon
        fillColor={fillColor}
        strokeColor={strokeColor}
        scale={scale}
      />
    </button>
  );
}

export default memo(MapMarker);
