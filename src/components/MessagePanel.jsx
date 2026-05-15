import React from "react";
import { motion, AnimatePresence } from "framer-motion";
      

//   const [messages, setMessages] = useState([]);

// useEffect(() => {
//   socket.on("newMessage", (message) => {
//     setMessages((prev) => [message, ...prev.slice(0, 9)]); // Max 10 messages
//   });

//   return () => socket.off("newMessage");
// }, []);

export default function MessagePanel({ messages = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-blue-900 text-base">Messages</h3>
        <button className="text-sm text-blue-600 hover:underline">View All</button>
      </div>

      <ul className="space-y-3 max-h-[24rem] overflow-y-auto pr-2">
        {messages.length === 0 && (
          <p className="text-sm text-gray-400">No messages to show.</p>
        )}

        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border bg-blue-50 p-4"
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="text-sm font-bold text-blue-900">{msg.sender}</p>
                  <p className="text-xs text-gray-500">
                    {msg.role} • {msg.time}
                  </p>
                </div>
                {msg.isNew && (
                  <span className="text-xs font-semibold text-blue-600">New</span>
                )}
              </div>

              <p className="text-sm text-gray-800 mb-3">{msg.title}</p>

              <div className="flex gap-2">
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Reply</button>
                <button className="bg-white border border-blue-600 text-blue-600 text-xs px-3 py-1 rounded-full">View</button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
