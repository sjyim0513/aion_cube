"use client";

import { useState, useRef, MouseEvent, WheelEvent } from "react";
import { Location } from "@/types/location";
import MapMarker from "./MapMarker";
import LocationModal from "./LocationModal";

interface MapProps {
  mapImageUrl: string;
  locations: Location[];
}

export default function Map({ mapImageUrl, locations }: MapProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showGrid, setShowGrid] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤로 확대/축소 (마우스 위치 중심)
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Shift 키가 눌려있으면 좌우 이동
    if (e.shiftKey) {
      const deltaX = e.deltaY; // 스크롤 방향에 따라 좌우 이동
      setPosition((prev) => ({
        x: prev.x - deltaX,
        y: prev.y,
      }));
      return;
    }

    // 일반 스크롤은 확대/축소
    const delta = e.deltaY > 0 ? -0.5 : 0.5;
    const newScale = Math.max(1, Math.min(8, scale + delta));

    if (outerContainerRef.current) {
      // 외부 컨테이너(변환되지 않은) 기준으로 마우스 위치 계산
      const rect = outerContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // 현재 마우스 위치에서 지도상의 실제 좌표 계산
      // (마우스 위치 - 현재 위치) / 현재 스케일 = 지도상 좌표
      const mapX = (mouseX - position.x) / scale;
      const mapY = (mouseY - position.y) / scale;

      // 새로운 스케일에서 마우스 위치가 동일한 지도상 좌표를 가리키도록 위치 조정
      // 새로운 위치 = 마우스 위치 - (지도상 좌표 * 새로운 스케일)
      const newX = mouseX - mapX * newScale;
      const newY = mouseY - mapY * newScale;

      setScale(newScale);
      setPosition({ x: newX, y: newY });
    }
  };

  // 드래그 시작
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // 왼쪽 클릭만
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // 드래그 중
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      // 그리드가 켜져있을 때만 좌표 표시
      if (showGrid && outerContainerRef.current && mapContainerRef.current) {
        const outerRect = outerContainerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - outerRect.left;
        const mouseY = e.clientY - outerRect.top;

        // 지도 컨테이너의 실제 크기 (변환 전)
        const mapRect = mapContainerRef.current.getBoundingClientRect();
        const containerWidth = mapRect.width / scale;
        const containerHeight = mapRect.height / scale;

        // 마우스 위치를 지도 컨테이너 기준으로 변환
        const relativeX = (mouseX - position.x) / scale;
        const relativeY = (mouseY - position.y) / scale;

        // 퍼센트 계산
        const percentX = (relativeX / containerWidth) * 100;
        const percentY = (relativeY / containerHeight) * 100;

        if (
          percentX >= 0 &&
          percentX <= 100 &&
          percentY >= 0 &&
          percentY <= 100
        ) {
          setMousePosition({
            x: Math.round(percentX * 10) / 10,
            y: Math.round(percentY * 10) / 10,
          });
        } else {
          setMousePosition(null);
        }
      } else {
        // 그리드가 꺼져있으면 좌표 숨김
        setMousePosition(null);
      }
    } else {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 아이콘 클릭 핸들러
  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  return (
    <div
      ref={outerContainerRef}
      className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-gray-900"
      onWheel={handleWheel}
    >
      {/* 컨트롤 버튼들 */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`px-4 py-2 rounded shadow-lg text-sm ${
            showGrid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          그리드 {showGrid ? "끄기" : "켜기"}
        </button>
        <button
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          className="bg-white px-4 py-2 rounded shadow-lg hover:bg-gray-100 text-sm"
        >
          리셋
        </button>
      </div>

      {/* 마우스 좌표 표시 */}
      {mousePosition && (
        <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-75 text-white px-3 py-2 rounded shadow-lg text-sm font-mono">
          X: {mousePosition.x}% | Y: {mousePosition.y}%
        </div>
      )}

      {/* 지도 컨테이너 */}
      <div
        ref={mapContainerRef}
        className="relative w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setMousePosition(null);
        }}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          transformOrigin: "0 0",
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        {/* 지도 이미지 */}
        <img
          src={mapImageUrl}
          alt="아이온 지도"
          className="w-full h-full object-contain select-none"
          draggable={false}
          style={{
            imageRendering: "auto",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />

        {/* 그리드 오버레이 */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 1) 1px, transparent 1px)
              `,
              backgroundSize: "10% 10%",
            }}
          >
            {/* 그리드 라벨 (10% 간격) */}
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={`x-${i}`}>
                <div
                  className="absolute text-white text-xs font-mono bg-black bg-opacity-50 px-1"
                  style={{
                    left: `${i * 10}%`,
                    top: 0,
                    transform: "translateX(-50%)",
                  }}
                >
                  {i * 10}%
                </div>
                <div
                  className="absolute text-white text-xs font-mono bg-black bg-opacity-50 px-1"
                  style={{
                    left: 0,
                    top: `${i * 10}%`,
                    transform: "translateY(-50%)",
                  }}
                >
                  {i * 10}%
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 아이콘 마커들 */}
        {locations.map((location) => (
          <MapMarker
            key={location.id}
            location={location}
            onClick={() => handleMarkerClick(location)}
            scale={scale}
          />
        ))}
      </div>

      {/* 상세 이미지 모달 */}
      {selectedLocation && (
        <LocationModal location={selectedLocation} onClose={handleCloseModal} />
      )}
    </div>
  );
}
