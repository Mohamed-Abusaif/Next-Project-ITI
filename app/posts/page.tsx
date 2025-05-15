"use client";

import { useState, useEffect } from 'react';
import { Post } from "@prisma/client";

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<string>("");
  const [editingPost, setEditingPost] = useState<Post | null>(null); 
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:3000/api/posts');

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data.posts);
        setUser(data.loggedInUserId);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleSaveEdit = async () => {
    if (editingPost) {
      const res = await fetch(`http://localhost:3000/api/posts`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingPost.id,
          title: editedTitle,
          content: editedContent,
        }),
      });

      if (res.ok) {
        setPosts(posts.map(post => post.id === editingPost.id ? { ...post, title: editedTitle, content: editedContent } : post));
        setEditingPost(null); 
      } else {
        console.error("Failed to save edit");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postId }),
      });
      if (res.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 px-4">
        <svg 
          className="w-16 h-16 text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No posts available</h2>
        <p className="text-gray-500 text-center max-w-md">
          There are no posts to display. Get started by creating your first post.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Blog Posts</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <div className="p-6">
                {editingPost && editingPost.id === post.id ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Post</h2>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        id="title"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <textarea
                        id="content"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        rows={4}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-4 pt-2">
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
                    <p className="text-gray-600 mb-6">{post.content}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      {user === post.userId && (
                        <div className="flex space-x-3">
                          <button
                            className="text-indigo-600 hover:text-indigo-800 transition"
                            onClick={() => handleEdit(post)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 transition"
                            onClick={() => handleDelete(post.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
