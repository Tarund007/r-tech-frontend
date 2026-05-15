// // File: src/hooks/useDashboardSocket.js
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// export default function useDashboardSocket() {
//   const [dashboardData, setDashboardData] = useState({
//     activeUsers: 0,
//     conversionRate: 0,
//     avgSession: "0m",
//     messages: [],
//     documents: [],
//   });

//   useEffect(() => {
//     const handleDashboardUpdate = (data) => {
//       setDashboardData((prev) => ({
//         ...prev,
//         activeUsers: data.activeUsers,
//         conversionRate: data.conversionRate,
//         avgSession: data.avgSession,
//         documents: [...data.documents, ...prev.documents],
//       }));
//     };

//     const handleNewMessage = (msg) => {
//       setDashboardData((prev) => ({
//         ...prev,
//         messages: [msg, ...prev.messages],
//       }));
//     };

//     const handleNewDocument = (doc) => {
//       setDashboardData((prev) => ({
//         ...prev,
//         documents: [doc, ...prev.documents],
//       }));
//     };

//     socket.on("dashboardUpdate", handleDashboardUpdate);
//     socket.on("newMessage", handleNewMessage);
//     socket.on("newDocument", handleNewDocument);

//     return () => {
//       socket.off("dashboardUpdate", handleDashboardUpdate);
//       socket.off("newMessage", handleNewMessage);
//       socket.off("newDocument", handleNewDocument);
//     };
//   }, []);

//   return dashboardData;
// }


// File: src/hooks/useDashboardSocket.js
// File: src/hooks/useDashboardSocket.js
// import { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";

// export default function useDashboardSocket() {
//   const [stats, setStats] = useState({
//     activeUsers: 0,
//     conversionRate: "0.0",
//     avgSession: "0m",
//     documents: [],
//     messages: [],
//   });

//   const docTimeoutRef = useRef(null);

//   useEffect(() => {
//     const socket = io("http://localhost:3000", {
//       withCredentials: true,
//     });

//     let loginTime = sessionStorage.getItem("loginTime");
//     if (!loginTime) {
//       loginTime = Date.now();
//       sessionStorage.setItem("loginTime", loginTime);
//     }

//     socket.emit("userOnline", { loginTime });

//     const handleUpdate = (data) => {
//       console.log("✅ Updating dashboard with:", data);
//       setStats((prev) => ({
//         ...prev,
//         ...data,
  
//       }));
//     };

//     const handleMessage = (msg) => {
//       console.log("💬 Incoming message:", msg);
//       setStats((prev) => ({
//         ...prev,
//         messages: [msg, ...prev.messages].slice(0, 5),
//       }));
//     };

//     const handleDoc = (doc) => {
//       console.log("📄 Incoming document:", doc);
//       const docWithNewFlag = { ...doc, isNew: true };

//       setStats((prev) => ({
//         ...prev,
//         documents: [docWithNewFlag, ...prev.documents], // no filtering
//       }));

//     // const handleDoc = (doc) => {
//     //   console.log("📄 Incoming document:", doc);
//     //   const docWithNewFlag = { ...doc, isNew: true };
//     //   setStats((prev) => {
//     //     const existing = prev.documents.filter((d) => d.name !== docWithNewFlag.name);
//     //     return {
//     //       ...prev,
//     //       documents: [docWithNewFlag, ...prev.documents],
//     //     };
//     //   });

//       if (docTimeoutRef.current) clearTimeout(docTimeoutRef.current);
//       docTimeoutRef.current = setTimeout(() => {
//         setStats((prev) => ({
//           ...prev,
//           documents: prev.documents.map((d) => ({ ...d, isNew: false })),
//         }));
//       }, 3000);
//     };

//     socket.on("dashboardUpdate", handleUpdate);
//     socket.on("newMessage", handleMessage);
//     socket.on("newDocument", handleDoc);

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         socket.disconnect();
//       } else {
//         socket.connect();
//         socket.emit("userOnline", { loginTime });
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       socket.off("dashboardUpdate", handleUpdate);
//       socket.off("newMessage", handleMessage);
//       socket.off("newDocument", handleDoc);
//       socket.disconnect();
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       if (docTimeoutRef.current) clearTimeout(docTimeoutRef.current);
//     };
//   }, []);

//   return stats;
// }





// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const useDashboardSocket = () => {
//   const [documents, setDocuments] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [metrics, setMetrics] = useState({ activeUsers: 0, conversionRate: "0.0", avgSession: 0 });
//   const docTimeoutRef = useRef(null);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     const socket = io("http://localhost:3000", { withCredentials: true });
//     socketRef.current = socket;
//     const loginTime = Date.now();

//     const handleUpdate = (data) => {
//       setMetrics({
//         activeUsers: data.activeUsers,
//         conversionRate: data.conversionRate,
//         avgSession: data.avgSession,
//       });

//       if (Array.isArray(data.documents)) {
//         setDocuments(data.documents);
//       }

//       if (Array.isArray(data.messages)) {
//         setMessages(data.messages);
//       }
//     };

//     const handleMessage = (msg) => {
//       setMessages(prev => [msg, ...prev]);
//     };

//     const handleDoc = (doc) => {
//       setDocuments(prev => [doc, ...prev]);
//     };

//     socket.on("dashboardUpdate", handleUpdate);
//     socket.on("newMessage", handleMessage);
//     socket.on("newDocument", handleDoc);

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         socket.disconnect();
//       } else {
//         socket.connect();
//         socket.emit("userOnline", { loginTime });
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     socket.emit("userOnline", { loginTime });

//     return () => {
//       socket.off("dashboardUpdate", handleUpdate);
//       socket.off("newMessage", handleMessage);
//       socket.off("newDocument", handleDoc);
//       socket.disconnect();
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       if (docTimeoutRef.current) clearTimeout(docTimeoutRef.current);
//     };
//   }, []);

//   return { documents, messages, ...metrics };
// };

// export default useDashboardSocket;




// PATCHED: useDashboardSocket + deduplication fix
// import { useEffect, useRef, useState, useMemo } from "react";
// import io from "socket.io-client";

// const useDashboardSocket = () => {
//   const [documents, setDocuments] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [metrics, setMetrics] = useState({ activeUsers: 0, conversionRate: "0.0", avgSession: 0 });

//   const docTimeoutRef = useRef(null);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     const socket = io("http://localhost:3000", { withCredentials: true });
//     socketRef.current = socket;
//     const loginTime = Date.now();

//     const handleUpdate = (data) => {
//       setMetrics({
//         activeUsers: data.activeUsers,
//         conversionRate: data.conversionRate,
//         avgSession: data.avgSession,
//       });

//       if (Array.isArray(data.documents)) {
//         setDocuments(prev => {
//           const combined = [...data.documents, ...prev];
//           const unique = combined.filter(
//             (doc, idx, self) =>
//               doc && doc.name && idx === self.findIndex(d => d.name === doc.name)
//           );
//           return unique.slice(0, 10);
//         });
//       }

//       if (Array.isArray(data.messages)) {
//         setMessages(prev => {
//           const combined = [...data.messages, ...prev];
//           const unique = combined.filter(
//             (msg, idx, self) =>
//               msg && msg.title &&
//               idx === self.findIndex(m => m.title === msg.title && m.sender === msg.sender)
//           );
//           return unique.slice(0, 10);
//         });
//       }
//     };

//     const handleMessage = (msg) => {
//       setMessages(prev => {
//         const combined = [msg, ...prev];
//         const unique = combined.filter(
//           (m, idx, self) =>
//             m && m.title &&
//             idx === self.findIndex(x => x.title === m.title && x.sender === m.sender)
//         );
//         return unique.slice(0, 10);
//       });
//     };

//     const handleDoc = (doc) => {
//       setDocuments(prev => {
//         const combined = [doc, ...prev];
//         const unique = combined.filter(
//           (d, idx, self) =>
//             d && d.name && idx === self.findIndex(x => x.name === d.name)
//         );
//         return unique.slice(0, 10);
//       });
//     };

//     socket.on("dashboardUpdate", handleUpdate);
//     socket.on("newMessage", handleMessage);
//     socket.on("newDocument", handleDoc);

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         socket.disconnect();
//       } else {
//         socket.connect();
//         socket.emit("userOnline", { loginTime });
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     socket.emit("userOnline", { loginTime });

//     return () => {
//       socket.off("dashboardUpdate", handleUpdate);
//       socket.off("newMessage", handleMessage);
//       socket.off("newDocument", handleDoc);
//       socket.disconnect();
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       if (docTimeoutRef.current) clearTimeout(docTimeoutRef.current);
//     };
//   }, []);

//   const filteredDocs = useMemo(() => documents.slice(0, 5), [documents]);
//   const filteredMsgs = useMemo(() => messages.slice(0, 10), [messages]);

//   return {
//     documents,
//     messages,
//     filteredDocs,
//     filteredMsgs,
//     ...metrics
//   };
// };

// export default useDashboardSocket;




// REFACTORED: useDashboardSocket with memoized filtered results
import { useEffect, useRef, useState, useMemo } from "react";
import io from "socket.io-client";

const useDashboardSocket = () => {
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [metrics, setMetrics] = useState({ activeUsers: 0, conversionRate: "0.0", avgSession: 0 });

  const socketRef = useRef(null);
  const loginTimeRef = useRef(Date.now());

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    const socket = io(SOCKET_URL, { withCredentials: true });
    socketRef.current = socket;

    const handleUpdate = ({ activeUsers, conversionRate, avgSession, documents: docs, messages: msgs }) => {
      setMetrics(prev => {
        if (
          prev.activeUsers === activeUsers &&
          prev.conversionRate === conversionRate &&
          prev.avgSession === avgSession
        ) return prev;
        return { activeUsers, conversionRate, avgSession };
      });

      if (Array.isArray(docs)) {
        setDocuments(prev => {
          const map = new Map();
          docs.forEach(doc => {
            if (doc?.name) map.set(doc.name, doc);
          });

          const deduped = Array.from(map.values()).slice(0, 10);

          return deduped;
        });
      }

      if (Array.isArray(msgs)) {
        setMessages(prev => {
          const map = new Map();
          msgs.forEach(msg => {
            const key = `${msg.title}-${msg.sender}`;
            if (msg?.title && msg?.sender) map.set(key, msg);
          });

          const deduped = Array.from(map.values()).slice(0, 10);

          return deduped;
        });
      }
    };

    const handleDoc = (doc) => {
    console.log("Received new document via socket:", doc);
      setDocuments(prev => {
        const merged = [doc, ...prev];
        const deduped = merged.filter((d, i, arr) => d && d.name && i === arr.findIndex(x => x.name === d.name)).slice(0, 10);
        const isSame = prev.length === deduped.length && prev.every((d, i) => d.name === deduped[i].name);
        return isSame ? prev : deduped;
      });
    };

    const handleMessage = (msg) => {
      setMessages(prev => {
        const merged = [msg, ...prev];
        const deduped = merged.filter((m, i, arr) => m && m.title && i === arr.findIndex(x => x.title === m.title && x.sender === m.sender)).slice(0, 10);
        const isSame = prev.length === deduped.length &&
          prev.every((m, i) => `${m.title}-${m.sender}` === `${deduped[i].title}-${deduped[i].sender}`);
        return isSame ? prev : deduped;
      });
    };

    socket.on("dashboardUpdate", handleUpdate);
    socket.on("newDocument", handleDoc);
    socket.on("newMessage", handleMessage);

    socket.emit("userOnline", { loginTime: loginTimeRef.current });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        socket.disconnect();
      } else {
        socket.connect();
        socket.emit("userOnline", { loginTime: loginTimeRef.current });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      socket.off("dashboardUpdate", handleUpdate);
      socket.off("newDocument", handleDoc);
      socket.off("newMessage", handleMessage);
      socket.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const filteredDocs = useMemo(() => documents.slice(0, 5), [documents]);
  const filteredMsgs = useMemo(() => messages.slice(0, 5), [messages]);

  return { filteredDocs, filteredMsgs, ...metrics };
};

export default useDashboardSocket;

// This hook connects to the dashboard socket, listens for updates, and provides memoized filtered results for documents and messages.