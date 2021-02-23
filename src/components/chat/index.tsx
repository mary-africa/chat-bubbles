import { useState } from 'react';
import { Potato } from '../react-chat-potato/@types';
import { PotatoChat } from '../react-chat-potato/src'
import { useSendCallback } from '../react-chat-potato/src/lib/utils';


interface User {
    name: string
    avatar?: string
}

const globalChatContext: Potato.GlobalChatContext<User> = {
    dateTime: Date.now(),
    users: {
        'self': null,   // TODO: this should indicate that user can chat
        'kevin': {
            name: "Kevin James",
        },
        'brian': {
            name: "Brian Gaspar"
        }
    }
}

const messages: Potato.Messages<MessageInputType> = [
    {
        input: "Hi here, how are you doing", 
        dateTimeDelta: 129122762,
        user: 'kevin'
    },
    { 
        input: "Sent this message on Wednesday", 
        dateTimeDelta: 215617315,
        user: 'brian'
    }
]

/**
 * Composer Component details
 */
type ComposerType =
    | 'text'
    | 'image'

type MessageInputType =
    | string    // message type for text
    | string    // message type for image


function ImageComposer <TComposerType, TMessageInputType>({ composerType, sendAction }: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType> ) {
    const [fileValue, setFile] = useState<string>("")

    const onSend = useSendCallback(fileValue, composerType, sendAction)
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
    

function TextComposer <TComposerType, TMessageInputType>({ composerType, sendAction }: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType>) {
    const [value, setValue] = useState<string>("")
    const onSend = useSendCallback(value, composerType, sendAction)

    return (
        <div className="w-full justify-start flex items-start gap-4">
            <textarea className="border w-96" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onSend} className="bg-green-700 px-4 py-2 rounded-sm">
                Send
            </button>
        </div>
    )
}
    

const composerOptions: Potato.Composer.GlobalContext<ComposerType, MessageInputType> = {
    composerType: 'text', 
    composerOptions: {
        'text': { component: TextComposer },
        'image': { component: ImageComposer },
    }
}



export default function ChatBox() {
    const sendAction = async (input: Potato.Composer.NewMessage<MessageInputType>, composerType: ComposerType) => {
        console.log("Send message:", input)
        console.log("ComposerType:", composerType)

        switch (composerType) {
            case 'text': console.log(">> Text based message"); break;
            case 'image': console.log(">> Image based message"); break;
            default: console.log("DEFAULT MESSAGE TRANSFER")
        }
    }

    return (
        <PotatoChat 
            initialComposer='image'
            initialMessages={messages}
            globalChatContext={globalChatContext}
            composerConfig={composerOptions}
            sendAction={sendAction} />
    )
}