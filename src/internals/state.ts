import create, { State } from 'zustand'

interface ChatStateStore extends State {
    name?: string,
    description?: string
    chatHookUrl?: string,
}

/** Store to handle the state across the app */
export const useChatStore = create<ChatStateStore>((set, get) => ({}))
