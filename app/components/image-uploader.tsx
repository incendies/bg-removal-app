'use client'

import { useState, useCallback } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { removeBg } from '../actions'
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { signIn, signOut, useSession } from "next-auth/react"; // Import signOut and useSession

export function ImageUploader() {
  const router = useRouter(); // Initialize router for navigation
  const { data: session } = useSession(); // Get session data
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (2 MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setError("Please don't use images bigger than 2 MB.");
        return;
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setProcessedImage(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const processImage = useCallback(async () => {
    if (selectedImage) {
      setIsProcessing(true);
      setError(null);
      try {
        const result = await removeBg(selectedImage);
        setProcessedImage(result);
        
        // Save processed image to local storage
        const storedImages = JSON.parse(localStorage.getItem('processedImages') || '[]');
        storedImages.push(result);
        localStorage.setItem('processedImages', JSON.stringify(storedImages));
      } catch (error) {
        console.error('Failed to process image:', error);
        setError('Failed to process image. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  }, [selectedImage])

  const downloadImage = useCallback((imageUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const openFullscreen = useCallback((imageUrl: string) => {
    setFullscreenImage(imageUrl)
  }, [])

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Background Image Processor</h1>
        <nav className="flex space-x-4">
          <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
          {session ? (
            <Button onClick={() => signOut()}>Sign Out</Button> // Use signOut here
          ) : (
            <>
              <Button onClick={() => router.push('/auth/signin')}>Sign In</Button>
              <Button onClick={() => router.push('/auth/signup')}>Sign Up</Button>
            </>
          )}
        </nav>
      </header>

      <main className="flex-grow flex p-4">
        <div className="w-1/2 pr-2">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Select an image</Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <p className="text-gray-500 text-sm">Please don't use images bigger than 2 MB.</p>
            {error && <p className="text-red-500">{error}</p>}
            {selectedImage && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Selected Image:</h3>
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="max-w-full h-auto cursor-pointer" 
                  onClick={() => openFullscreen(selectedImage)}
                />
                <div className="mt-2 space-x-2">
                  <Button onClick={processImage} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Process Image'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 pl-2 border-l">
          <h2 className="text-xl font-semibold mb-4">Processed Result</h2>
          {isProcessing ? (
            <p>Processing image...</p>
          ) : processedImage ? (
            <div>
              <img 
                src={processedImage} 
                alt="Processed" 
                className="max-w-full h-auto cursor-pointer" 
                onClick={() => openFullscreen(processedImage)}
              />
              <div className="mt-2 space-x-2">
                <Button onClick={() => downloadImage(processedImage, 'processed.png')}>
                  Download Processed Image
                </Button>
                <Button onClick={() => openFullscreen(processedImage)}>
                  View Full Screen
                </Button>
              </div>
            </div>
          ) : (
            <p>No processed image yet.</p>
          )}
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground p-4 text-center">
        <p>&copy; 2024 Image Processor. All rights reserved.</p>
      </footer>

      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeFullscreen}
          >
            &times; {/* This is the "X" button */}
          </button>
          <img 
            src={fullscreenImage} 
            alt="Fullscreen" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}