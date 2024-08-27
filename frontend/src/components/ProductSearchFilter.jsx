// import React, { useState, useEffect } from 'react';
// import { FaSearch, FaMicrophone } from 'react-icons/fa';
// import { ProductCategories } from '../helpers/ProductCategories.jsx';

// const ProductSearchFilter = ({ onCategorySelect }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCategories, setFilteredCategories] = useState(ProductCategories);
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     filterCategories(searchTerm);
//   }, [searchTerm]);

//   const filterCategories = (term) => {
//     const filtered = ProductCategories.filter(category =>
//       category.label.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const startVoiceSearch = () => {
//     if ('webkitSpeechRecognition' in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.continuous = false;
//       recognition.interimResults = false;

//       recognition.onstart = () => {
//         setIsListening(true);
//       };

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setSearchTerm(transcript);
//       };

//       recognition.onerror = (event) => {
//         console.error('Speech recognition error', event.error);
//         setIsListening(false);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognition.start();
//     } else {
//       alert('Speech recognition is not supported in your browser.');
//     }
//   };

//   const handleCategoryClick = (category) => {
//     onCategorySelect(category.value === 'all' ? null : category.value);
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
//       <div className="flex items-center mb-4">
//         <div className="relative flex-grow">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearch}
//             placeholder="Search categories..."
//             className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//           <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>
//         <button
//           onClick={startVoiceSearch}
//           className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isListening ? 'animate-pulse' : ''}`}
//         >
//           <FaMicrophone />
//         </button>
//       </div>
//       <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {filteredCategories.map(category => (
//           <li
//             key={category.id}
//             className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
//           >
//             <button
//               className="w-full text-left focus:outline-none"
//               onClick={() => handleCategoryClick(category)}
//             >
//               {category.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export { ProductSearchFilter };


import React, { useState, useEffect } from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { ProductCategories } from '../helpers/ProductCategories.jsx';

const ProductSearchFilter = ({ onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(ProductCategories);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    filterCategories(searchTerm);
  }, [searchTerm]);

  const filterCategories = (term) => {
    const filtered = ProductCategories.filter(category =>
      category.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setSearchTerm(transcript);

        // Check if the transcript matches any category and select it
        const matchingCategory = ProductCategories.find(category =>
          category.label.toLowerCase() === transcript
        );

        if (matchingCategory) {
          handleCategoryClick(matchingCategory);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category.value === 'all' ? null : category.value);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
      <div className="flex items-center mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search categories..."
            className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={startVoiceSearch}
          className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isListening ? 'animate-pulse' : ''}`}
        >
          <FaMicrophone />
        </button>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredCategories.map(category => (
          <li
            key={category.id}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <button
              className="w-full text-left focus:outline-none"
              onClick={() => handleCategoryClick(category)}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ProductSearchFilter };
