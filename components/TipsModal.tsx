"use client";

import { memo } from "react";

interface TipsModalProps {
  onClose: () => void;
}

function TipsModal({ onClose }: TipsModalProps) {
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
          <h2 className="text-2xl font-bold">사용 팁</h2>
          <button
            onClick={onClose}
            className="bg-red-200 hover:bg-red-300 text-gray-700 hover:text-gray-900 text-3xl font-bold px-4 py-2 rounded-lg transition-colors"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {/* 팁 내용 */}
        <div className="p-6 space-y-6">
          {/* 기본 조작 */}
          <div>
            <h3 className="text-xl font-semibold mb-3">기본 조작</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>마우스 휠</strong>: 지도 확대/축소
              </li>
              <li>
                • <strong>Shift + 마우스 휠</strong>: 지도 좌우 이동
              </li>
              <li>
                • <strong>마우스 드래그</strong>: 지도 이동
              </li>
              <li>
                • <strong>마커 클릭</strong>: 상세 정보 보기
              </li>
            </ul>
          </div>

          {/* 마커 색상 설명 */}
          <div className="bg-gray-300 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">마커 색상 의미</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                <span className="text-gray-700">
                  <strong>초록색</strong>: 육지
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                <span className="text-gray-700">
                  <strong>파란색</strong>: 물 아래
                </span>
              </div>
            </div>
          </div>

          {/* 그리드 기능 */}
          <div>
            <h3 className="text-xl font-semibold mb-3">그리드 기능</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 그리드를 켜면 좌표를 확인할 수 있음</li>
              <li>• 마우스를 지도 위로 이동하면 좌표가 표시됨</li>
              <li>
                • 추가하고 싶은 큐브 위치가 있으면 좌표 + 사진을
                <br />
                디코에 알려주면 추가해드림
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TipsModal);
