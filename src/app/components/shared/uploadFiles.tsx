"use client"
import { useRef } from 'react';
import { UploadCloudIcon } from 'lucide-react'
import { useFileUpload } from '@/app/hooks/useFileUpload';
import { useHomeContext } from '@/app/context/homeContext/homeContext';


const UploadFiles = () => {
const {dispatch} = useHomeContext()
const inputFileRef = useRef<HTMLInputElement>(null);

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = inputFileRef.current?.files
    if (files) {
        dispatch({ type: "SET_FILE", payload: files[0] });
    }
}

    return (
        <div className="mb-6">
            <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-1 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition duration-300 ease-in-out"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloudIcon color='blue' size='25px' className='my-2' />
                    <p className="mb-2 text-sm text-blue-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-blue-500">
                        Any file type (Max 5MB per file)
                    </p>
                </div>
                
                <input
                    onChange={handleInputChange}
                    ref={inputFileRef}
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                />
            </label>
        </div>
  )
}

export default UploadFiles
