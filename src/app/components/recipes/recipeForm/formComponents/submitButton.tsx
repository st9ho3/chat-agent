import React from 'react'
import { Check } from 'lucide-react'

interface Props {
    isSubmitting: boolean
}

const SubmitButton = ({isSubmitting}: Props) => {
  return (
    <div className='flex justify-center'>
        <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors w-full sm:w-auto flex-shrink-0" >
          {!isSubmitting && <Check />}
          <button type='submit' disabled={isSubmitting}  > {isSubmitting ? "Submitting..." : "Add recipe"}</button>
        </div>
      </div>
  )
}

export default SubmitButton
