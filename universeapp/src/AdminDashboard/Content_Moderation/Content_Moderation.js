import React, { useState, useEffect } from "react";
import CloseIcon from "../../icons/close.png";

const ContentModeration = ({ setActivePage }) => {
  // State for student posts & notices
  const [posts, setPosts] = useState([]);
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNotice, setNewNotice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Get current date
  const getCurrentDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  // Fetch student posts (Mock API Data)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = [
          { id: 1, author: "Alice Johnson", content: "This is my project submission.", status: "Pending", date: "2024-01-10" },
          { id: 2, author: "Bob Smith", content: "Anyone has notes for last class?", status: "Approved", date: "2024-01-09" },
          { id: 3, author: "Charlie Brown", content: "Here is an update on my research.", status: "Pending", date: "2024-01-08" },
        ];
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Approve a post
  const approvePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: "Approved" } : post
      )
    );
  };

  // Reject a post
  const rejectPost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: "Rejected" } : post
      )
    );
  };

  // Delete a post
  const deletePost = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  // Add a new notice
  const addNotice = () => {
    if (newNotice.trim() === "") return;
    setNotices([...notices, { id: notices.length + 1, content: newNotice, date: getCurrentDate() }]);
    setNewNotice("");
  };

  return (
    <div className="p-0 bg-white rounded-lg shadow-md">
      {/* Header with Date */}
      <header className="flex flex-col bg-blue-400 p-2 rounded mb-6 fixed top-0 w-full z-30">
        <h1 className="text-xl font-bold text-black">Content Moderation</h1>
        <p className="text-sm text-white">{getCurrentDate()}</p>
      </header>

      {/* Close Button */}
      <button
        className="fixed top-5 right-10 w-5 h-5 bg-transparent rounded-full flex items-center justify-center z-30"
        onClick={() => setActivePage("AdminMainContent")}
      >
        <img src={CloseIcon} alt="Close" className="w-full h-full" />
      </button>

      <div className="p-4">  
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-2 border rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Student Posts Table */}
        <h2 className="text-lg font-semibold mb-2">Student Posts</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Author</th>
              <th className="border p-2">Content</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id} className="border">
                  <td className="border p-2">{post.author}</td>
                  <td className="border p-2">{post.content}</td>
                  <td className={`border p-2 ${post.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                    {post.status}
                  </td>
                  <td className="border p-2">{post.date}</td>
                  <td className="border p-2">
                    {post.status === "Pending" && (
                      <>
                        <button className="px-2 py-1 bg-green-500 text-white rounded mr-2" onClick={() => approvePost(post.id)}>
                          Approve
                        </button>
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2" onClick={() => rejectPost(post.id)}>
                          Reject
                        </button>
                      </>
                    )}
                    <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => deletePost(post.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No posts found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 mx-1 border ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Admin Notice Posting */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Post a Notice</h2>
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows="3"
            placeholder="Write a notice..."
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={addNotice}>
            Post Notice
          </button>
        </div>

        {/* Display Notices */}
        {notices.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Notices</h2>
            <ul className="list-disc pl-5">
              {notices.map((notice) => (
                <li key={notice.id} className="mb-1">{notice.content} - <span className="text-gray-600 text-sm">{notice.date}</span></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentModeration;
