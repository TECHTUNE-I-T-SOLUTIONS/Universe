import React, { useState } from "react";

const SocialNetworking = () => {
  const [friends] = useState(["Alice", "Bob", "Charlie"]); // Removed `setFriends`
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setMessages([]); // Clear messages when switching friends
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    setMessages((prev) => [...prev, { sender: "You", text: message }]);
    e.target.reset();
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md max-w-4xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Social Networking</h2>
      <div className="flex border rounded-lg overflow-hidden">
        {/* Friends List */}
        <ul className="w-1/3 bg-gray-200 p-4 border-r">
          {friends.map((friend) => (
            <li
              key={friend}
              className={`p-2 mb-2 cursor-pointer rounded ${
                selectedFriend === friend ? "bg-purple-300" : "bg-white"
              }`}
              onClick={() => handleFriendClick(friend)}
            >
              {friend}
            </li>
          ))}
        </ul>

        {/* Chat Section */}
        <div className="w-2/3 p-4 bg-white">
          {selectedFriend ? (
            <>
              <h3 className="font-bold text-lg mb-4 text-center">
                Chat with {selectedFriend}
              </h3>
              <div className="h-64 overflow-y-auto mb-4 border p-2 rounded bg-gray-50">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded-lg max-w-xs ${
                      msg.sender === "You"
                        ? "ml-auto bg-green-200 text-right"
                        : "mr-auto bg-gray-200 text-left"
                    }`}
                  >
                    <strong>{msg.sender}:</strong>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  name="message"
                  placeholder="Type a message..."
                  className="flex-grow border p-2 rounded-lg"
                  required
                />
                <button className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-lg">
                  Send
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Select a friend to start chatting.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialNetworking;
