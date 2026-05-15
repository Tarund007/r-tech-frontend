import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useDropzone } from 'react-dropzone';
import Sidebar from './Sidebar';
import { FaFilePdf, FaFileExcel, FaFileImage, FaFileAlt } from 'react-icons/fa';
import { Search } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import "@fontsource/noto-sans/latin.css";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/messages');
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setMessages(data);
      } catch (error) {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    socket.on('newMessage', (msg) => {
      setMessages(prev => [msg, ...prev]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const onDrop = acceptedFiles => setFiles(acceptedFiles);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleReply = async () => {
    const formData = new FormData();
    formData.append('messageId', selected._id);
    formData.append('reply', replyText);
    files.forEach(file => formData.append('attachments', file));
    setLoading(true);

    try {
      await axios.post('/api/messages/reply', formData);
      setReplyText('');
      setFiles([]);
      toast.success('Reply sent via email successfully!');
    } catch (err) {
      toast.error('Failed to send reply');
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.sender?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <FaFilePdf className="text-red-500 mr-2" />;
    if (ext === 'xlsx' || ext === 'xls') return <FaFileExcel className="text-green-500 mr-2" />;
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) return <FaFileImage className="text-blue-500 mr-2" />;
    return <FaFileAlt className="text-gray-500 mr-2" />;
  };

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Toaster />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-58 bg-white shadow-lg border-r z-10">
        <Sidebar />
      </div>

      <main className="flex flex-col flex-1 ml-0 sm:ml-64 max-h-screen overflow-hidden">
        {/* Header Section */}
        <div className="sticky top-0 z-20 px-6 py-3 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dashboards, reports, users..."
              className="w-full rounded-full border border-gray-300 px-4 py-2 pr-10 text-sm placeholder-gray-500"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-900">Alex Morgan</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <img src="/assets/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full border" />
            <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">
              Logout
            </button>
          </div>
        </div>

        {/* Messages Section */}
        <div className="sticky top-0 z-20 px-6 py-3 flex justify-between items-center">
          <div className="text-xl font-semibold text-blue-800">Messages</div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
            New Message
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Inbox List */}
          <div className="w-1/3 border-r p-3 overflow-y-auto bg-white">
            <h2 className="font-semibold text-lg mb-3 px-2">Inbox</h2>
            {loading ? (
              <p className="text-sm text-gray-500 px-2">Loading messages...</p>
            ) : filteredMessages.map(msg => (
              <div
                key={msg._id}
                className={`rounded-md shadow-sm mb-3 p-4 cursor-pointer border transition-colors duration-150 ${selected?._id === msg._id ? 'bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setSelected(msg)}
              >
                <div className="font-semibold text-blue-800">{msg.sender}</div>
                <div className="text-xs text-gray-500">{new Date(msg.time).toLocaleString()}</div>
                <div className="text-sm text-gray-700 truncate mt-1">{msg.subject}</div>
                {msg.attachments?.length > 0 && (
                  <div className="text-xs text-gray-400 mt-1">📎 {msg.attachments.length} file{msg.attachments.length > 1 ? 's' : ''}</div>
                )}
              </div>
            ))}
          </div>

          {/* Message Details */}
          <div className="flex-1 p-4 overflow-hidden">
            {selected ? (
              <div className="bg-white p-4 rounded shadow-md flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{selected.sender}</h3>
                  <p className="text-sm text-gray-500 mb-4">Marketing Director • {new Date(selected.time).toLocaleString()}</p>
                  <hr className="mb-4" />
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">{selected.subject}</h4>
                  <p className="mb-4 text-gray-800 whitespace-pre-line">{selected.body}</p>

                  <div className="space-y-2">
                    {selected.attachments?.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-gray-100 p-3 rounded hover:bg-gray-200"
                      >
                        {renderIcon(file.filename)}
                        <span className="font-medium text-blue-700 truncate w-64 overflow-hidden whitespace-nowrap">{file.filename}</span>
                        <span className="ml-auto text-sm text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Reply Section */}
                <div className="border-t p-4">
                  <textarea
                    className="w-full p-3 border rounded mb-2"
                    rows={4}
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                  />

                  <div {...getRootProps({ className: 'border-dashed border p-4 rounded bg-gray-50 cursor-pointer text-sm text-gray-500' })}>
                    <input {...getInputProps()} />
                    {files.length ? `${files.length} file(s) selected` : 'Click or drop files here to attach'}
                  </div>

                  <button
                    onClick={handleReply}
                    disabled={loading}
                    className={`mt-4 px-6 py-2 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {loading ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center mt-20">Select a message to view details</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
