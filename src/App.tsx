import React from 'react';

import ChatBox from './components/chat'

function App() {

  return (
    <div className="relative h-screen w-full p-24">
      {/* body of the site */}
      <section className="w-full mx-auto container grid grid-rows-2 md:grid-cols-2 gap-4 md:gap-10">
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
                  <span className="text-gray-500 sm:text-sm">
                    http://
                  </span>
                </div>
                <input 
                  type="text" 
                  className="py-2 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-l-md" 
                  placeholder="chathook.example.com/parrot" />
              </div>
              <button className="-ml-px relative inline-flex items-center space-x-2 px-3 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                {/* <!-- Heroicon name: gloe-alt --> */}
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                <span>Connect</span>
              </button>
            </div>
          </div>
        </div>

        {/* right */}
        <div>
            <ChatBox />
        </div>
      </section>
      <footer className="absolute bottom-0">
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
