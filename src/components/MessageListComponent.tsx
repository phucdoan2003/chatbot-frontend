import React, {useEffect, useRef} from 'react'
import MessageComponent from './MessageComponent'
import { Message } from '@/types/types'
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles'

interface MessageListProps {
    messages: Message[]
    loadingState: Boolean
}
const MessageListComponent: React.FC<MessageListProps> = ({messages, loadingState}) =>{
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
        <div className='flex flex-col w-full h-11/12 items-center justify-items-start overflow-y-auto overflow-hidden no-scrollbar pt-5 pb-5' ref={scrollableDivRef}>
			{messages.map((message, index) =>(
                <div key={index} className='w-3/5 h-auto'>
                    <MessageComponent message={message}></MessageComponent>
                </div>
            ))}
            <SpinningCircles className={loadingState?'visible':'invisible'}></SpinningCircles>
            <div style={{ float:'left', clear: 'both' }}
                    ref={dummyDivRef}>
            </div>
		</div>
    )
}

export default MessageListComponent