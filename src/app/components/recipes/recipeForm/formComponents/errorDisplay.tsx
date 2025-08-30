import { Divide } from 'lucide-react'
import React from 'react'


const ErrorDisplay = ({error, errors}: {error: string | undefined, errors: string[]}) => {
  return (
    <div>
      {errors.map((e: string) => <p className='text-red-500 ml-3'> {e} </p>  )}
      <p className='text-red-500 ml-3'> {error} </p>
    </div>
    
    
   
  )
}

export default ErrorDisplay
