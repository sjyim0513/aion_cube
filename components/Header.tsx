"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "현재 지도", href: "/" },
  // 나중에 추가할 메뉴 항목들을 여기에 추가하세요
  // { label: "메뉴2", href: "/menu2" },
  // { label: "메뉴3", href: "/menu3" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 타이틀 */}
          <h1 className="text-xl font-bold">쉬었음 청년들을 위한 큐브 지도</h1>

          {/* 메뉴바 */}
          <nav className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded transition-colors ${
                  pathname === item.href
                    ? "bg-gray-700 text-white font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
