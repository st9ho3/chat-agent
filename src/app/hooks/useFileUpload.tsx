/**
 * @fileoverview This custom React hook, `useFileUpload`, provides functionality for uploading files to a server using a Vercel Blob storage API.
 * @module hooks/useFileUpload
 * @description A custom hook that encapsulates the logic for file uploads, including managing loading states, handling errors, and interacting with a serverless function (`/api/upload`). It leverages the `useState` hook for state management and an external `useHelpers` hook for notifications.
 * @dependencies
 * - React: Specifically the `useState` hook for state management.
 * - @vercel/blob: The `PutBlobResult` type for type-safe handling of the API response.
 * - ./useHelpers: A custom hook for raising user notifications.
 * @exports {object} An object containing the `uploadFile` and `handleFileUpload` functions, as well as `isLoading` and `error` state variables.
 */
"use client"
import { useState } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import useHelpers from './useHelpers';
export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { raiseNotification } = useHelpers();
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileUpload = async (file: File) => {
    if (file) {
      try {
        const url = await uploadFile(file);
        return url;
      } catch (err) {
        raiseNotification({
          success: false,
          message: 'An unexpected error occurred.',
          error: { message: `${err}` },
        });
      }
    }
  };
  return {
    uploadFile,
    isLoading,
    error,
    handleFileUpload,
  };
};