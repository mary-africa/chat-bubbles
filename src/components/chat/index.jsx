// import { useCallback } from 'react';
import axios from 'axios';
import { composerOptions } from './composers'
import { useSpring, animated, config } from 'react-spring'
import { useEffect, useRef } from 'react';

import { PotatoChat } from 'react-chat-potato'
const { useChatUser, useMessage, useComposerComponent, useComposerType, useMessageUpdater, useMessages } = require('react-chat-potato/utils')

/**
 * Structure of the user -> me (the person typing)
 */
const selfUser = { name: "Me" }
const defaultUnknownUser = { name: "Anonymous" }


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
            {/* {
                !isYourMessage ? (
                    <span className="inline-flex items-center mr-1.5 mt-1.5 justify-center h-10 w-10 rounded-full bg-gray-500">
                        <span className="font-medium leading-none text-white">TW</span>
                    </span>
                ) : null
            } */}
            
            <animated.div className={`px-4 py-2 rounded-xl max-w-sm bg-white shadow-sm`} style={styleProps}>
                <label className="text-xs font-semibold text-gray-500">{user.name}</label>
                {children}
            </animated.div>
        </div>
    )
}

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



function ComposerBox({ sendAction }) {
    const [compType, ] = useComposerType()
    const ComposerComponent = useComposerComponent(compType)

    // TODO: this re-rendering is not supposed to happen
    // console.log("Kevin")
    // callback for adding switching btn types
    // const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCompType(e.target.value as ComposerType)
    // }, [setCompType])

    return (
        <div className="w-full flex flex-col">
            {/* <div className="w-full"> */}
                <ComposerComponent sendAction={sendAction} />
            {/* </div> */}
            {/* <div className="w-full">
                <label>Composer Option:</label>
                <select name="composer-option" onChange={onChange} value={compType}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
            </div> */}
        </div>
    )
}

/**
 * TODO: add ability to update board for sending infromation
 */
export  default function ChatBox({ url, title, description }) {
    const addToMessageList = useMessageUpdater()
    const messages = useMessages(state => state)

    const textProps = useSpring({
        opacity: 100,
        from: { opacity: 0 },
    })

    const sendAction = async (input, composerType) => {
        console.log("Send message:", input)
        console.log("ComposerType:", composerType)

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
