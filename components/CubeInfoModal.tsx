"use client";

import { memo } from "react";

interface CubeInfoModalProps {
  onClose: () => void;
}

function CubeInfoModal({ onClose }: CubeInfoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-2xl max-h-[90vh] overflow-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">큐브 팁</h2>
          <button
            onClick={onClose}
            className="bg-red-200 hover:bg-red-300 text-gray-700 hover:text-gray-900 text-3xl font-bold px-4 py-2 rounded-lg transition-colors"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {/* 큐브 정보 내용 */}
        <div className="p-6">
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              • 큐브는 일정 범위 안에 여러 스폰 위치가 있고, 그 중 하나에서
              랜덤으로 스폰되는 것 같음 (거의 확실).
            </li>
            <li>• 찾는 위치에 없으면 주변 다른 스폰 위치 찾아보면 좋음</li>
            <li>• 큐브는 열쇠 없이 까도 오드 에너지 잘 나옴</li>
            <li>• 공중섬이 진짜 빈집임</li>
            <li>• 아울라우 쪽이 큐브가 진짜 많은데 찾기가 빡셈</li>
            <li>• 개인적으로 6 &gt; 3 &gt; 12시 방향이 먹기 좋음</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default memo(CubeInfoModal);
