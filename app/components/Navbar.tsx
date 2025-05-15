"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-indigo-700 text-white w-full shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="font-bold text-xl">
            <Link href="/">NextBlog</Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`hover:text-indigo-200 ${pathname === '/' ? 'font-bold text-white' : 'text-indigo-100'}`}
            >
              Home
            </Link>
            <Link 
              href="/posts" 
              className={`hover:text-indigo-200 ${pathname === '/posts' ? 'font-bold text-white' : 'text-indigo-100'}`}
            >
              Posts
            </Link>
            <Link 
              href="/add-post" 
              className={`hover:text-indigo-200 ${pathname === '/add-post' ? 'font-bold text-white' : 'text-indigo-100'}`}
            >
              Add Post
            </Link>
            <Link 
              href="/login" 
              className={`hover:text-indigo-200 ${pathname === '/login' ? 'font-bold text-white' : 'text-indigo-100'}`}
            >
              Login
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-indigo-200"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`hover:text-indigo-200 ${pathname === '/' ? 'font-bold text-white' : 'text-indigo-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/posts" 
                className={`hover:text-indigo-200 ${pathname === '/posts' ? 'font-bold text-white' : 'text-indigo-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Posts
              </Link>
              <Link 
                href="/add-post" 
                className={`hover:text-indigo-200 ${pathname === '/add-post' ? 'font-bold text-white' : 'text-indigo-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Add Post
              </Link>
              <Link 
                href="/login" 
                className={`hover:text-indigo-200 ${pathname === '/login' ? 'font-bold text-white' : 'text-indigo-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 