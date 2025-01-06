// src/components/TruncatedText.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TruncatedText = ({ text, maxLines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div
        className={`text-sm text-gray-700 dark:text-gray-400 dark:opacity-2  leading-relaxed relative ${
          !isExpanded ? 'line-clamp-3' : ''
        }`}
      >
        {text}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium dark:text-white "
      >
        {isExpanded ? (
          <>
            Show Less <ChevronUp size={16} className="ml-1" />
          </>
        ) : (
          <>
            Read More <ChevronDown size={16} className="ml-1" />
          </>
        )}
      </button>
    </div>
  );
};

export default TruncatedText;