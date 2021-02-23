import { Potato } from '../react-chat-potato/@types';
import { PotatoChat } from '../react-chat-potato/src'
import { ImageComposer, TextComposer } from '../react-chat-potato/src/lib';


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


const composerOptions: Potato.Composer.GlobalContext<ComposerType, MessageInputType> = {
    composerType: 'text',    // default composer 'text' | options 'text', 'image',
    // You might want to move this to the BaseComposer
    composerOptions: {
        'text': {
            component: TextComposer,
        },
        'image': {
            component: ImageComposer,
        },
    }
}


export default function ChatBox() {
    const sendAction = async (input: Potato.Composer.NewMessage<MessageInputType>, composerType: ComposerType) => {
        console.log("Sent the message")
        switch (composerType) {
            case 'text': console.log("Text based message"); break;
            case 'image': console.log("Image based message"); break;
            default: console.log("DEFAULT MESSAGE TRANSFER")
        }
    }

    return (
        <PotatoChat 
            initialComposer='text'
            initialMessages={messages}
            globalChatContext={globalChatContext}
            composerOptions={composerOptions}
            sendAction={sendAction} />
    )
}