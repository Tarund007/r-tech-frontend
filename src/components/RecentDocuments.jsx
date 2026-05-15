// import React from "react";
// import { File, FileText } from "lucide-react";

// const getFileIcon = (filename) => {
//   const ext = filename?.split(".").pop().toLowerCase();
//   switch (ext) {
//     case "pdf": return <FileText className="w-4 h-4 text-red-500" />;
//     case "doc":
//     case "docx": return <FileText className="w-4 h-4 text-blue-600" />;
//     default: return <File className="w-4 h-4 text-gray-400" />;
//   }
// };

// const getFileTypeLabel = (filename) => {
//   const ext = filename?.split(".").pop().toLowerCase();
//   switch (ext) {
//     case "pdf": return "PDF";
//     case "doc":
//     case "docx": return "Word";
//     default: return "File";
//   }
// };

// export default function RecentDocuments({ documents = [] }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow border">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-semibold text-blue-900 text-base">Recent Documents</h3>
//         <button className="text-sm text-blue-600 hover:underline">View All</button>
//       </div>

//       <ul className="space-y-4 max-h-96 overflow-y-auto" >
//         {documents.length === 0 && (
//           <p className="text-sm text-gray-400">No documents found.</p>
//         )}

//         {documents.map((doc, idx) => {
//           if (!doc) return null;
//           const link = doc.path || doc.url || "#";
//           const name = (doc.originalName || doc.name || "Unnamed Document").replace(/\.[^/.]+$/, "");
//           const icon = getFileIcon(name);
//           const size = doc.size ? `${(doc.size / 1024 / 1024).toFixed(1)} MB` : "Unknown size";
//           const uploadedDate = doc.uploadedAt
//             ? new Date(doc.uploadedAt).toLocaleDateString("en-US", {
//                 month: "short", day: "numeric", year: "numeric"
//               })
//             : "Unknown date";
//           const label = getFileTypeLabel(doc.originalName || doc.name);

//           return (
//             <li key={idx}>
//               <a
//                 href={link}
//                 target={link === "#" ? "_self" : "_blank"}
//                 rel="noopener noreferrer"
//                 className="text-blue-800 font-semibold text-sm hover:underline block"
//               >
//                 {icon} {name}
//               </a>
//               <div className="flex items-center text-xs text-gray-500 mt-1 gap-3">
//                 <span>{label}</span>
//                 <span>{size}</span>
//                 <span>{uploadedDate}</span>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState, useCallback } from "react";
import { File, FileText } from "lucide-react";

const getFileIcon = (filename) => {
  const ext = filename?.split(".").pop().toLowerCase();
  switch (ext) {
    case "pdf": return <FileText className="w-4 h-4 text-red-500" />;
    case "doc":
    case "docx": return <FileText className="w-4 h-4 text-blue-600" />;
    default: return <File className="w-4 h-4 text-gray-400" />;
  }
};

const getFileTypeLabel = (filename) => {
  const ext = filename?.split(".").pop().toLowerCase();
  switch (ext) {
    case "pdf": return "PDF";
    case "doc": return "Word";
    case "docx": return "Word";
    case "ppt": return "PPT";
    case "pptx": return "PPT";
    case "xls": return "Excel";
    case "xlsx": return "Excel";
    case "txt": return "Text";
    case "json": return "JSON";
    case "csv": return "CSV";
    case "zip": return "Archive"; 
    case "rar": return "Archive";
    default: return "File";
  }
};

export default function RecentDocuments({ documents = [] }) {
  const [visibleDocs, setVisibleDocs] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    setVisibleDocs(documents.slice(0, 20));
  }, [documents]);

  const loadMore = useCallback(() => {
    setVisibleDocs((prev) => {
      const next = documents.slice(prev.length, prev.length + 5);
      return [...prev, ...next];
    });
  }, [documents]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore();
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="bg-white p-6 rounded-xl shadow border h-[26rem] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-blue-900 text-base">Recent Documents</h3>
        <button className="text-sm text-blue-600 hover:underline">View All</button>
      </div>

      <div className="overflow-y-auto flex-1 pr-1">
        <ul className="space-y-4">
          {documents.length === 0 && (
            <p className="text-sm text-gray-400">No documents found.</p>
          )}

          {documents.map((doc, idx) => {
            if (!doc) return null;
            const link = doc.path || doc.url || "#";
            const name = (doc.originalName || doc.name || "Unnamed Document").replace(/\.[^/.]+$/, "");
            const icon = getFileIcon(name);
            const size = doc.size ? `${(doc.size / 1024 / 1024).toFixed(1)} MB` : "Unknown size";
            const uploadedDate = doc.uploadedAt
              ? new Date(doc.uploadedAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric"
                })
              : "Unknown date";
            const label = getFileTypeLabel(doc.originalName || doc.name);

            return (
              <li key={idx}>
                <a
                  href={link}
                  target={link === "#" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="text-blue-800 font-semibold text-sm hover:underline block"
                >
                  {icon} {name}
                </a>
                <div className="flex items-center text-xs text-gray-500 mt-1 gap-3">
                  <span>{label}</span>
                  <span>{size}</span>
                  <span>{uploadedDate}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
