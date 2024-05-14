import React, {useEffect, useRef} from 'react'
import MessageComponent from './MessageComponent'
import { Message } from '@/types/types'

interface MessageListProps {
    messages: Message[]
}
const MessageListComponent: React.FC<MessageListProps> = ({messages}) =>{
    const scrollableDivRef = useRef<HTMLDivElement>(null)
    const dummyDivRef = useRef<HTMLDivElement>(null)
	const scrollToBottom = () =>{
		if (scrollableDivRef.current) {
			dummyDivRef.current?.scrollIntoView({behavior: 'smooth'})
		}
	}

    useEffect(() =>{
        scrollToBottom()
    }, [messages])

    return (
        <div className='flex flex-col w-full h-11/12 items-center justify-items-start overflow-y-auto overflow-hidden no-scrollbar' ref={scrollableDivRef}>
			{messages.map((message) =>(
                <MessageComponent message={message}></MessageComponent>
            ))}
            <div style={{ float:'left', clear: 'both' }}
                    ref={dummyDivRef}>
            </div>
		</div>
    )
}

export default MessageListComponent