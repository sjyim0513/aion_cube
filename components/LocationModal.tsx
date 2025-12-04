"use client";

import { Location } from "@/types/location";

interface LocationModalProps {
  location: Location;
  onClose: () => void;
}

export default function LocationModal({
  location,
  onClose,
}: LocationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-6xl max-h-[95vh] overflow-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
          aria-label="닫기"
        >
          ×
        </button>

        {/* 상세 이미지 */}
        <div className="p-6">
          {location.description && (
            <p className="text-gray-600 mb-4 text-lg">{location.description}</p>
          )}
          <div className="relative w-full">
            <img
              src={location.imageUrl}
              alt={location.description || "위치 이미지"}
              className="w-full h-auto rounded"
              onError={(e) => {
                // 이미지 로드 실패 시 플레이스홀더 표시
                const target = e.target as HTMLImageElement;
                target.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E이미지 준비중%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
