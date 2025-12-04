"use client";

import { memo } from "react";
import { Location } from "@/types/location";

interface LocationModalProps {
  location: Location;
  onClose: () => void;
}

function LocationModal({ location, onClose }: LocationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-6xl max-h-[95vh] overflow-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상세 이미지 */}
        <div className="p-6">
          {location.description && (
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-gray-200 py-3 px-4 rounded-lg">
                <p className="text-gray-600 text-lg">{location.description}</p>
              </div>
              <button
                onClick={onClose}
                className="bg-red-200 hover:bg-red-300 text-gray-700 hover:text-gray-900 text-3xl font-bold px-4 rounded-lg flex items-center justify-center transition-colors"
                aria-label="닫기"
              >
                ×
              </button>
            </div>
          )}
          {!location.description && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-red-200 hover:bg-red-200 text-gray-700 hover:text-gray-900 text-3xl font-bold px-4 py-2 rounded-lg z-10 transition-colors"
              aria-label="닫기"
            >
              ×
            </button>
          )}
          <div className="relative w-full">
            <img
              src={location.imageUrl}
              alt={location.description || "위치 이미지"}
              className="w-full h-auto rounded"
              loading="lazy"
              onError={(e) => {
                // 이미지 로드 실패 시 플레이스홀더 표시
                const target = e.target as HTMLImageElement;
                target.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E사진은 못 찍었지만 나옴%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LocationModal);
