import { useState } from "react"
import { Potato } from "../react-chat-potato/@types"
import { useSendCallback } from "../react-chat-potato/src/utils"

function ImageComposer <TComposerType, TMessageInputType>({ sendAction }: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType> ) {
    const [fileValue, setFile] = useState<string>("")

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
    

function TextComposer <TComposerType, TMessageInputType>({ sendAction }: Potato.Composer.OptionComponentProps<TComposerType, TMessageInputType>) {
    const [value, setValue] = useState<string>("")
    const onSend = useSendCallback(value, sendAction)

    return (
        <div className="w-full justify-start flex items-start gap-4">
            <textarea className="border w-96" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button onClick={onSend} className="bg-green-700 px-4 py-2 rounded-sm">
                Send
            </button>
        </div>
    )
}
    


/**
 * Composer Component details
 */
export type ComposerType =
    | 'text'
    | 'image'


export type MessageInputType =
    | string    // message type for text
    | string    // message type for image


// TODO: Could be possible reason of rerendering
//  when  `composerType` changes.. the `composerOpotions` are recreated
export const composerOptions: Potato.ComposerOption<ComposerType, MessageInputType> = {
    'text': { component: TextComposer },
    'image': { component: ImageComposer },
}
// composerType: 'text', 
