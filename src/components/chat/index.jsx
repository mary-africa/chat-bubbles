// import { useCallback } from 'react';
import axios from 'axios';
import { composerOptions } from './composers'
import { useSpring, animated, config } from 'react-spring'
import { useEffect, useRef } from 'react';

import { PotatoChat } from 'react-chat-potato'
import { useChatUser, useMessage, useComposerComponent, useComposerType, useMessageUpdater, useMessages } from 'react-chat-potato/utils'

/**
 * Structure of the user -> me (the person typing)
 */
const selfUser = { name: "Me" }

/**
 * Structure of the message of an anonymous user (user that is not described in the globalContext)
 */
const defaultUnknownUser = { name: "Anonymous" }


/**
 * Component that is used for wrapping the entire message content
 */
function MessageCanvasWrapper({ children }) {
    const messageCanvasRef = useRef(null)
    const _messages = useMessages()

    useEffect(() => {
        if (messageCanvasRef === null) {
            throw new Error("message canvas not rendered")
        }
        
        // @ts-ignore
        const scroll = messageCanvasRef.current.scrollHeight - messageCanvasRef.current.clientHeight;

        // @ts-ignore
        messageCanvasRef.current.scrollTo(0, scroll);
    }, [_messages])


    return (
        <div className="bg-gray-100 h-96 overflow-y-auto py-2 flex flex-col" ref={messageCanvasRef}>
            {children}
        </div>
    )
}


/**
 * Designing for creating the message bubble
 */
function BaseMessage({ user, children, self }) {
    const isYourMessage = Boolean(self)
    const styleProps = useSpring({
        opacity: 100,
        from: {
            opacity: 0
        },
        delay: 100,
        config: config.wobbly })

    return (
        <div className={`py-2 px-4 flex ${ isYourMessage ? 'flex-row-reverse': 'flex-row'} items-start`}>
            <animated.div className={`px-4 py-2 rounded-xl max-w-sm bg-white shadow-sm`} style={styleProps}>
                <label className="text-xs font-semibold text-gray-500">{user.name}</label>
                {children}
            </animated.div>
        </div>
    )
}

/**
 * Message component that are used in rendering in the component screen
 */
function Message({ messageId }) {
    const message = useMessage(messageId)
    const user = useChatUser(message.user, selfUser, defaultUnknownUser)

    return (
        <BaseMessage user={user} self={message.user === "self"}>
            {/* @ts-ignore */}
            <p className="w-full truncate" style={{ hyphens: 'auto' }}>{message.input}</p>
        </BaseMessage>
    )
}


/**
 * ComposerBox is the region where users get to input the message input for the chat
 */
function ComposerBox({ sendAction }) {
    const [compType, ] = useComposerType()
    const ComposerComponent = useComposerComponent(compType)

    return (
        <div className="w-full flex flex-col">
                <ComposerComponent sendAction={sendAction} />
        </div>
    )
}

/**
 * This is the entire chat frame for the App
 */
export  default function ChatBox({ url, title, description }) {
    const addToMessageList = useMessageUpdater()
    const messages = useMessages(state => state)

    const textProps = useSpring({
        opacity: 100,
        from: { opacity: 0 },
    })

    const sendAction = async (input, composerType) => {
        // update the message list
        addToMessageList(input)

        if (composerType === 'text') {
            axios({ 
                url,
                method: 'POST',
                headers: {
                  "Content-Type": 'application/json',
                  "Access-Control-Allow-Origin": "*"
                },
                data: JSON.stringify({
                    state: {
                        history: messages.map(x => x.input)
                    },
                    message: input.input
                })
            }).then((response) => {                
                const { data } = response
                return ({ input: data.message, user: 'bot' })
            }).then(message => addToMessageList(message))
        }
    }

    return (
        <div className="w-full divide-y divide-gray-300 border rounded-md shadow-sm">
            <div className="bg-blue-400 w-full px-4 py-6">
                <animated.h1 className="text-3xl font-bold" style={textProps}>{title}</animated.h1>
                <animated.p className="text-sm" style={textProps}>{description}</animated.p>
            </div>
            <PotatoChat
                initialComposer='text'
                composerOptions={composerOptions}
                messageComponent={Message}
                messageCanvasWrapper={MessageCanvasWrapper}
                composerBox={ComposerBox}
                sendAction={sendAction} />
        </div>
    )
}
