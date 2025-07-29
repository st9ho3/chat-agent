"use client"; // This is a client component

import React, { useState } from 'react';
import CreateButton from '../recipes/createButton';
import HomeButton from '../shared/homeButton';
import RecipesButton from '../shared/recipesButton';
import Chat from '../chatUI/chat';
import { Menu, X } from 'lucide-react'; // Importing icons for mobile toggle

const Sidebar = () => {
  // State to control the visibility of the sidebar on mobile devices
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button (Hamburger Icon) */}
      {/* This button is only visible on small screens (md breakpoint and below) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-full bg-blue-500 text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Content */}
      {/* On medium and larger screens (md:), the sidebar is always visible and fixed on the left. */}
      {/* On small screens, it's hidden by default and appears as a full-screen overlay when 'isOpen' is true. */}
      <aside
        className={`fixed top-0 left-0 h-full w-20 bg-gray-800 text-white p-4 flex flex-col space-y-4 shadow-lg z-40
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          transition-transform duration-300 ease-in-out md:flex md:flex-col`}
      >
        {/* Close button for mobile sidebar (visible only when open on small screens) */}
        <button
          className="md:hidden self-end p-2 text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>

        {/* Sidebar Navigation/Components */}
        {/* These components are now part of the sidebar */}
        <HomeButton />
        <RecipesButton />
        <CreateButton />
        <Chat /> {/* Assuming Chat is meant to be a fixed part of the sidebar UI */}
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {/* This darkens the main content area when the sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
