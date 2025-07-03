import React from 'react';

const Message = ({user, text}: {user: string, text: string}) => {
  return (
    <>
      { user === "me" ?
        <div className='flex justify-end my-3'> 
        <div className='flex justify-center items-center flex-col max-w-1/2 max-h-40 min-w-fit min-h-1 text-sm bg-blue-50 rounded-lg p-2 '>
          {text}
        </div>
      </div>
       :
        <div className='flex justify-start my-3'> 
        <div className='flex justify-center items-center flex-col w-fit text-sm bg-white rounded-2xl p-3 '>
          {text}
        </div>
      </div>
    }
    </>
  );
};

export default Message;