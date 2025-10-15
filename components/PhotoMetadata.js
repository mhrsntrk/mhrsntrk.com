import { useState, useRef, useEffect } from 'react';

const PhotoMetadata = ({ metadata, photoTitle, isFixed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  // Parse metadata string into key-value pairs
  const parseMetadata = (metadataString) => {
    if (!metadataString) return [];
    
    return metadataString
      .split('\n')
      .map(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return null;
        
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        return { key, value };
      })
      .filter(Boolean);
  };

  const metadataItems = parseMetadata(metadata);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  if (!metadata || metadataItems.length === 0) {
    return null;
  }

  const containerClass = isFixed
    ? "fixed top-6 right-6 md:top-12 md:right-12 z-50 pointer-events-auto"
    : "relative";

  return (
    <div className={containerClass}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        data-lightbox-control="true"
        className={`${isFixed ? '' : 'absolute top-4 right-4'} z-10 p-2 sm:p-3 md:p-4 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition-colors duration-200 backdrop-blur-sm shadow-md ring-1 ring-white/30`}
        aria-label={`Show metadata for ${photoTitle || 'photo'}`}
        title="Show photo metadata"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className={`${isFixed ? 'fixed top-20 right-24 md:top-24 md:right-28' : 'absolute top-16 right-4'} z-50 w-80 max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Photo Metadata
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close metadata"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-2 overflow-y-auto max-h-64">
            {metadataItems.map((item, index) => (
              <div key={index} className="text-xs">
                <div className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                  {item.key}
                </div>
                <div className="text-gray-600 break-words dark:text-gray-400">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoMetadata;
