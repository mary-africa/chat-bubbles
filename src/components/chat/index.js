import { PotatoChat, PotatoProvider } from '../react-chat-potato/src'

export default function ChatBox() {
    const sendCallback = async (message) => {
      console.log("Sent the message")
    }

    return (
        <PotatoProvider initialMessages={[]}>
            <PotatoChat
                initialComposer='text'
                sendCallback={sendCallback}/>
        </PotatoProvider>  
    )
}