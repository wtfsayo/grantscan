import React from "react";
import Link from "next/link";

const HeaderAttribution = () => {
  return (
    <div className="fixed bottom-4 right-4 z-30 bg-white py-2 px-4  font-serif font-black rounded-sm text-black hover:text-white hover:bg-black  transition-colors">
      <Link
        href="http://warpcast.com/sayo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm"
      >
        Built by Sayonara
      </Link>
    </div>
  );
};

export default HeaderAttribution;
