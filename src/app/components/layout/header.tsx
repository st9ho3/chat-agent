import React from 'react'

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        {/* You can add a title or breadcrumbs here later */}
      </div>
      <div className="flex items-center">
        <span className="text-gray-600">
          Hello, Guest
        </span>
      </div>
    </header>
  )
}

export default Header
