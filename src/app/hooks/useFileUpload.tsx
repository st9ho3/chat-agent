import { useState } from 'react';
import type { PutBlobResult } from '@vercel/blob';

export const useFileUpload = () => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Uploads a file to the server.
   * @param {File} file - The file to upload.
   * @returns {Promise<void>}
   */

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!file) {
        throw new Error('No file selected.');
      }
      
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }

      const newBlob = (await response.json()) as PutBlobResult;
      return newBlob.url;
    } catch (e: unknown ) {
      if (e instanceof Error) {
        setError(e.message)
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
      if (file) {
        try {
          const url = await uploadFile(file)
          return url
        } catch (err) {
          console.log("An error occured while uploading the file:", err)
          console.log("Error message:", error)
        }
      }
    }

  return {
    uploadFile,
    isLoading,
    error,
    handleFileUpload
  };
};