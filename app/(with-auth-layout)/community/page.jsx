"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ user: "", question: "", category: "", anonymous: false });

  const categories = ["Mental Health", "Fitness", "Nutrition", "Chronic Diseases"];

  // Load posts from localStorage on mount
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (storedPosts) setPosts(storedPosts);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Function to Add a New Post
  const addPost = () => {
    if (!newPost.question.trim()) return;
    const updatedPosts = [...posts, { ...newPost, id: Date.now(), likes: 0, answers: [] }];
    setPosts(updatedPosts);
    setNewPost({ user: "", question: "", category: "", anonymous: false }); // Reset Form
  };

  // Function to Add an Answer
  const addAnswer = (postId, answer) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, answers: [...post.answers, answer] } : post
    );
    setPosts(updatedPosts);
  };

  // Function to Like a Post
  const likePost = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4 text-center">Community-Driven Health Forum</h1>

      {/* New Post Form */}
      <div className="border p-4 rounded shadow mb-4">
        <input
          type="text"
          placeholder="Your Name (optional)"
          className="border p-2 w-full mb-2"
          value={newPost.user}
          onChange={(e) => setNewPost({ ...newPost, user: e.target.value })}
          disabled={newPost.anonymous}
        />
        <textarea
          placeholder="Ask a health-related question..."
          className="border p-2 w-full mb-2"
          value={newPost.question}
          onChange={(e) => setNewPost({ ...newPost, question: e.target.value })}
        />
        <select
          className="border p-2 w-full mb-2"
          value={newPost.category}
          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
        >
          <option value="" className="text-white bg-gray-700">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat} className="text-black">{cat}</option>)}
        </select>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={newPost.anonymous}
            onChange={(e) => setNewPost({ ...newPost, anonymous: e.target.checked, user: "" })}
            className="mr-2"
          />
          Post Anonymously
        </label>
        <button onClick={addPost} className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
      </div>

      {/* Display Posts */}
      {posts.length === 0 ? <p className="text-gray-500 text-center">No discussions yet.</p> : null}
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded shadow mb-4">
          <h2 className="text-lg font-bold">{post.anonymous ? "Anonymous" : post.user}</h2>
          <p className="italic text-sm text-black font-bold">{post.category}</p> {/* Category in black and bold */}
          <p className="mt-2">{post.question}</p>
          <button
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => likePost(post.id)}
          >
            👍 {post.likes}
          </button>

          {/* Answer Section */}
          <div className="mt-4">
            <h3 className="text-sm font-bold">Answers:</h3>
            {post.answers.length === 0 ? <p className="text-gray-500">No answers yet.</p> : (
              post.answers.map((answer, index) => (
                <p key={index} className="mt-1 bg-gray-100 p-2 rounded">{answer}</p>
              ))
            )}
            <input
              type="text"
              placeholder="Write an answer..."
              className="border p-2 w-full mt-2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  addAnswer(post.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
