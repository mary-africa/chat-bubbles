import { useState } from "react"
// import { Potato } from "react-chat-potato/@types"
const { useSendCallback } = require("react-chat-potato/utils")

function ImageComposer({ sendAction }) {
    const [fileValue, setFile] = useState("")

    const onSend = useSendCallback(fileValue, sendAction)
    return (
        <div>
            <div>Send the image here</div>
            <input type="file" value={fileValue} onChange={(e) => setFile(e.target.value)}/>
            <button onClick={onSend} className="bg-green-400 px-4 py-2 rounded-sm">
                Send Image
            </button>
        </div>
    )
}
    

function TextComposer ({ sendAction }) {
    const [value, setValue] = useState("")
    const onSend = useSendCallback(value, sendAction)

    return (
        <form className="w-full flex flex-row items-center justify-center gap-2 px-2" onSubmit={(e) => { onSend(); e.preventDefault(); }}>
            <textarea placeholder="Type a message..." className=" w-full resize-none px-4 py-4 focus:outline-none h-full" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button type="submit" className="p-3 rounded-full group hover:bg-indigo-100 transition ease-in-out duration-150 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                <svg className="h-6 w-6 text-gray-600 group-hover:text-indigo-700" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M27.442 15.1275L6.32759 3.30346C6.14996 3.20399 5.9462 3.1611 5.74354 3.18053C5.54089 3.19996 5.34899 3.28078 5.1935 3.4122C5.03801 3.54361 4.92633 3.71935 4.87339 3.91593C4.82045 4.11252 4.82877 4.32057 4.89725 4.5123L8.87988 15.6637C8.95756 15.8812 8.95756 16.1189 8.87988 16.3363L4.89725 27.4877C4.82877 27.6794 4.82045 27.8875 4.87339 28.0841C4.92633 28.2807 5.03801 28.4564 5.1935 28.5878C5.34899 28.7192 5.54089 28.8001 5.74355 28.8195C5.9462 28.8389 6.14996 28.796 6.32759 28.6966L27.442 16.8725C27.597 16.7857 27.7262 16.659 27.8161 16.5057C27.906 16.3523 27.9533 16.1778 27.9533 16C27.9533 15.8222 27.906 15.6477 27.8161 15.4943C27.7262 15.341 27.597 15.2144 27.442 15.1275V15.1275Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 16H17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </form>
    )
}
    


/**
 * Composer Component details
 */
// export type ComposerType =
//     | 'text'
//     | 'image'


// export type MessageInputType =
//     | string    // message type for text
//     | string    // message type for image


// TODO: Could be possible reason of rerendering
//  when  `composerType` changes.. the `composerOpotions` are recreated
export const composerOptions = {
    'text': { component: TextComposer },
    'image': { component: ImageComposer },
}
