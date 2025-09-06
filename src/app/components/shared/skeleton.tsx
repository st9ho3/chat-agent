import React from 'react';

const TableSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <div className="flex items-center w-1/4 space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;