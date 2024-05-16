import React, {ReactElement, useEffect, useRef} from 'react'
import MessageComponent from './MessageComponent'
import { Message } from '@/types/types'
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles'

interface MessageListProps {
    messages: Message[]
    loadingState: Boolean
}
const MessageListComponent: React.FC<MessageListProps> = ({messages, loadingState}) =>{
    const scrollableDivRef = useRef<HTMLDivElement>(null)
    const bottomDivRef = useRef<HTMLDivElement>(null)
	const scrollToBottom = () =>{
		bottomDivRef.current?.scrollIntoView({behavior: 'smooth'})
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
            <div>
                <SpinningCircles className={loadingState?'h-auto':'h-0'}></SpinningCircles>
            </div>
            <div ref={bottomDivRef}></div>
		</div>
    )
}

export default MessageListComponent