import { PotatoChat } from '../react-chat-potato/src'
import { ImageComposer, TextComposer } from '../react-chat-potato/src/lib';

const globalContextState = {
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

const messages = [
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
// interface Composer<T> {
//     component: (props: ComposerComponentProps<T>) => JSX.Element
// }

// type ComposerMap = { [type in ComposerType]: Atom<Composer<ComposerMessageInputType>> }


const composerOptions = {
    composerType: 'text',    // default composer 'text' | options 'text', 'image',
    sendAction: async (input: any) => {
        return;
    },
    // You might want to move this to the BaseComposer
    composerOptions: {
        'text': {
            component: TextComposer
        },
        'image': { 
            component: ImageComposer,
        },
    }
}

export default function ChatBox() {
    const sendCallback = async (message: any) => {
      console.log("Sent the message")
    }

    return (
        <PotatoChat 
            initialComposer='text'
            initialMessages={messages}
            globalChatContext={globalContextState}
            composerOptions={composerOptions}
            sendCallback={sendCallback} />
        // <PotatoProvider initialMessages={[]}>
        //     <PotatoChat
        //         initialComposer='text'
        //         sendCallback={sendCallback}/>
        // </PotatoProvider>  
    )
}