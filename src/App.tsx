import React, { useCallback, useState } from 'react';

import ChatBox from './components/chat'
import { Potato } from './components/react-chat-potato/@types';
import { PotatoChatProvider } from './components/react-chat-potato/src';
// import { MessageInputType } from './components/chat/composers';
import axios from 'axios';

export function Chat({ url, ready, title, description, name }: any) {

  interface User {
      name: string
      avatar?: string
  }

  if (!Boolean(ready)) {
    return (
      <div>
        not ready
      </div>
    )
  }
  
    
  const globalChatContext: Potato.GlobalChatContext<User> = {
      dateTime: Date.now(),
      users: {
          'self': null,
          'bot': { name }
      }
  }

  // const messages: Potato.Messages<MessageInputType> = [
  //   {
  //       input: "Hi here, how are you doing", 
  //       dateTimeDelta: 129122762,
  //       user: 'kevin'
  //   },
  //   { 
  //       input: "Sent this message on Wednesday", 
  //       dateTimeDelta: 215617315,
  //       user: 'brian'
  //   }
  // ]
  return (
    <PotatoChatProvider 
        initialMessages={[]}
        globalChatContext={globalChatContext}>
        <ChatBox url={url} title={title} description={description} />
    </PotatoChatProvider>
  )
}

function App() {

  const [title, setTitle] = useState("<Untitled>")
  const [description, setDescription] = useState("<description>")
  const [name, setChatName] = useState("Unknown")

  const [url, setUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)


  const attemptChatConnection = useCallback(() => {
    setError(null)
    setReady(false)

    if (url.trim().length === 0) {
      setError("You need to set enter the URL")
    } else {
      // Send the message
      axios.get(url)
        .then(response => {
          setTitle(response.data.title)
          setDescription(response.data.description)
          setChatName(response.data.name)
          setReady(true)
        })
        .catch(() => {
          setError("Unable to do initiate chat")
          setReady(false)
        })
    }
  }, [url])

  return (
    <div className="relative h-screen w-full flex flex-col justify-between p-24">
      {/* body of the site */}
      <section className="w-full mx-auto container grid grid-rows-2 md:grid-cols-2 gap-4 md:gap-10">
        {error !== null ? (<div className="bg-red-700 text-xl font-bold text-white">{error}</div>): null}
        {/* left */}
        <div>
          {/* Intro text */}
          <div>
            <h1 className="font-bold text-6xl max-w-sm">Chat Bubbles</h1>
            <p className="text-gray-600 my-4">Chatbot example showing what you can do with the Nena service</p>
          </div>
          
          {/* Url entry */}
          <div className="my-10">
            <p className="max-w-xs">Please pass in a chat webhook URL to get to try out the chat</p>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <span className="text-gray-500 sm:text-sm">
                    http://
                  </span> */}
                  <svg className="text-gray-500 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  onChange={(e) => setUrl(e.target.value)}
                  className="py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:pl-10 sm:text-sm border-gray-300 rounded-l-md" 
                  placeholder="http://chathook.example.com/parrot" />
              </div>
              <button onClick={attemptChatConnection} className="-ml-px relative inline-flex items-center space-x-2 px-3 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                <span>Connect</span>
              </button>
            </div>
          </div>
        </div>

        {/* right */}
        <div>
            <Chat 
              url={url}
              ready={ready}
              name={name}
              title={title}
              description={description}/>
        </div>
      </section>
      <footer>
        <div className="mx-auto container py-8">
          <div>
            <p className="text-gray-600">
              Made with 
              {/* heroicon: heart */}
              <span className="inline-flex justify-center items-center p-1">
                <svg className="w-4 h-4 text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </span>
              by Mary.Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
