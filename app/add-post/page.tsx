"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import Link from 'next/link';

function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push('/posts');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to create post');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Error submitting form:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
                    <p className="text-gray-600 mb-6">You need to be logged in to create a post.</p>
                    <Link 
                        href="/login" 
                        className="inline-block bg-indigo-700 text-white py-2 px-6 rounded-lg hover:bg-indigo-800 transition"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-indigo-700 text-center">Create New Post</h2>
                
                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1 text-sm text-gray-700 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter a title"
                        required
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="content" className="mb-1 text-sm text-gray-700 font-medium">Content</label>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Write your content here..."
                        required
                        rows={5}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
}

export default Page;
