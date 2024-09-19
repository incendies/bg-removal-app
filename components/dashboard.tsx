'use client'

import { useState, useEffect } from 'react';

export function Dashboard() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('processedImages') || '[]');
    setImages(storedImages);
  }, []);

  const removeImage = (url: string) => {
    const updatedImages = images.filter(image => image !== url);
    setImages(updatedImages);
    localStorage.setItem('processedImages', JSON.stringify(updatedImages));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Processed Images</h2>
      {images.length === 0 ? (
        <p>No processed images found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Processed ${index}`} className="max-w-full h-auto" />
              <button onClick={() => removeImage(image)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}