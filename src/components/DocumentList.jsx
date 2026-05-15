import React, { useState, useRef, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const DocumentFeed = () => {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('documents');
    return saved ? JSON.parse(saved) : [];
  });

  const [visibleDocs, setVisibleDocs] = useState([]);
  const [remainingDocs, setRemainingDocs] = useState([]);
  const loaderRef = useRef(null);

  // Partition visible and remaining docs on load/update
  useEffect(() => {
    const [visible, remaining] = [documents.slice(0, 3), documents.slice(3)];
    setVisibleDocs(visible);
    setRemainingDocs(remaining);
  }, [documents]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  // Add a new document (simulated upload)
  const uploadNewDocument = () => {
    const newDoc = {
      id: Date.now(),
      name: `Document ${documents.length + 1}`,
      size: `${(Math.random() * 500).toFixed(1)} KB`,
      url: `${API_URL}/api/documents/${documents.length + 1}`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // Infinite scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && remainingDocs.length > 0) {
          const nextBatch = remainingDocs.slice(0, 3);
          setVisibleDocs((prev) => [...prev, ...nextBatch]);
          setRemainingDocs((prev) => prev.slice(3));
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [remainingDocs]);

  return (
    <div className="p-4">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={uploadNewDocument}
      >
        Upload New Document
      </button>

      <div className="space-y-2">
        {visibleDocs.map((doc) => (
          <div
            key={doc.id}
            className="border p-3 rounded flex justify-between items-center bg-white shadow"
          >
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium hover:underline"
            >
              {doc.name}
            </a>
            <span className="text-sm text-gray-500">{doc.size}</span>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="h-6" />
    </div>
  );
};

export default DocumentFeed;
