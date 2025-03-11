import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';



function LeftPanel({ joiners , socketId, onClientSelect, clientSocketid }) {
    const [joinees, setJoiners] = useState([]);
    const location = useLocation();

      useEffect(() => {
        setJoiners(joiners);
        console.log(socketId);
      }, [joiners]);
    return (
    <div className="w-1/5 bg-gray-800 p-4 border-r border-gray-700">
        <h1 className="text-3xl font-semibold mb-4">CodeR</h1>
          <h2 className="text-xl font-semibold mb-4">Joiners</h2>
          <div className="space-y-2">
            {joinees.map((joiner) => (
              <div 
                key={joiner.socketId} 
                onClick= {() => onClientSelect(joiner)}
                className={`p-2 rounded ${
                  joiner.socketId === socketId
                    ? 'bg-green-600' 
                    : 'bg-yellow-600'
                } ${joiner.socketId === clientSocketid ? 'bg-blue-600' : ''}`}
              >
                {joiner.username} 
              </div>
            ))}
          </div>
        </div>
        );
};

export default LeftPanel;