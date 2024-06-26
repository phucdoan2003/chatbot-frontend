'use client'

import { Message } from '@/types/types';
import MessageComponent from '@/components/MessageComponent';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import MessageListComponent from '@/components/MessageListComponent';

export default function Home() {
	const [messages, setMessages] = useState<Array<Message>>([])
	const [loading, setLoading] = useState<boolean>(false);

	const postMessage = async (message: string) =>{
		try {
			console.log(message)
			const res = await fetch('https://api.chatcom.org/api/post-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					message: message
				})
			})
			const resData = await res.json()
			console.log(resData)
			const resMsg: Message = {
				sender: 'ChatGPT',
				content: resData.message
			}
			setMessages(messages => [...messages, resMsg])
			setLoading(false)
		} catch (error) {
			console.error('Error:', error)
		}
	}
	

	const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) =>{
		event.preventDefault()
		const form = event.currentTarget
		const msg: Message = {
			sender: 'You',
			content: form.content.value
		}
		if (form.content.value != ''){
			form.content.value = ''
			setMessages(messages => [...messages, msg])
			setLoading(true)
			await postMessage(msg.content)
		}
	}
	
  return (
    <main className='flex-col h-svh w-screen flex bg-slate-600 justify-between'>
		<MessageListComponent messages={messages} loadingState={loading}></MessageListComponent>
		<div className='flex w-full h-auto p-2 justify-center '>
			<form className=' flex items-center border rounded-2xl bg-inherit w-3/5 h-auto p-2' autoComplete='off' onSubmit={handleSendMessage}>
				<input name='content' type='text'  className='bg-inherit outline-none h-auto mr-5 ml-5 w-11/12' disabled={loading} placeholder='Type something to ChatGPT...' ></input>
				<button className='rounded-xl bg-slate-100 text-slate-800 h-10 w-1/12' type='submit'>Send</button>
			</form>
		</div>
    </main>
  );
}
