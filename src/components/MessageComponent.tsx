import React from 'react';
import {Message} from '@/types/types';

const MessageComponent: React.FC<{message: Message}> = ({message}) =>{
    return (
        <div className='w-full h-auto m-4'>
            <label className='font-semibold text-lg'>{message.sender}</label>
            <p className='whitespace-pre-line'>{message.content}</p>
        </div>
    )
}

export default MessageComponent