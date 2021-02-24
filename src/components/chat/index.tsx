import { useCallback } from 'react';
import { Potato } from '../react-chat-potato/@types';
import { PotatoChat, ComposerBoxProps } from '../react-chat-potato/src'
import { useChatUser, useMessage, useComposerComponent, useComposerType } from '../react-chat-potato/src/utils';
import { ComposerType, MessageInputType, composerOptions } from './composers'

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
            name: "Brian Gasper"
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
 * Structure of the user -> me (the person typing)
 */
const selfUser = { name: "Me" }
const defaultUnknownUser = { name: "Anonymous" }

function MessageCanvasWrapper({ children }: any) {
    return (
        <div className="bg-green-300">
            {children}
        </div>
    )
}

function Message({ messageId }: any) {
    const message = useMessage(messageId)
    const user = useChatUser(message.user, selfUser, defaultUnknownUser)

    return (
        <div className="py-2">
            {/* @ts-ignore */}
            <label className="text-sm font-semibold text-gray-500">{user.name}</label>
            <p>{message.input as string}</p>
        </div>
    )
}



function ComposerBox({ sendAction }: ComposerBoxProps<ComposerType, MessageInputType>) {
    const [compType, setCompType] = useComposerType<ComposerType>()
    const ComposerComponent = useComposerComponent(compType)

    // TODO: this re-rendering is not supposed to happen
    // console.log("Kevin")
    // callback for adding switching btn types
    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompType(e.target.value as ComposerType)
    }, [setCompType])

    return (
        <div>
            <ComposerComponent sendAction={sendAction} />
            <div>
                <label>Composer Option:</label>
                <select name="composer-option" onChange={onChange} value={compType}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
            </div>
        </div>
    )
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
            initialComposer='text'
            initialMessages={messages}
            globalChatContext={globalChatContext}
            composerOptions={composerOptions}
            messageComponent={Message}
            messageCanvasWrapper={MessageCanvasWrapper}
            composerBox={ComposerBox}
            sendAction={sendAction} />
    )
}