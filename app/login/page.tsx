"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
    const { data: session, status } = useSession(); 
    
    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                {session ? (
                    <div className="space-y-6 text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                            {session.user?.image ? (
                                <img 
                                    src={session.user.image} 
                                    alt={session.user.name || "User"} 
                                    className="rounded-full w-20 h-20 object-cover"
                                />
                            ) : (
                                <svg 
                                    className="w-12 h-12 text-indigo-600 dark:text-indigo-300" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={1.5} 
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                                    />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">{session.user?.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                        </div>
                        <button 
                            onClick={() => signOut()} 
                            className="w-full px-4 py-3 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Sign out
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 text-center">
                        <div className="inline-flex items-center justify-center w-full">
                            <svg 
                                className="w-16 h-16 text-indigo-600 dark:text-indigo-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Sign in to access your posts and manage your content
                        </p>
                        <button 
                            onClick={() => signIn("google")} 
                            className="w-full px-4 py-3 flex items-center justify-center bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    className="fill-[#4285F4]"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    className="fill-[#34A853]"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    className="fill-[#FBBC05]"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    className="fill-[#EA4335]"
                                />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
