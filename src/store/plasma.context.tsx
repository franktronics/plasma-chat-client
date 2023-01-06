import { createContext, ReactNode, useContext, useState } from "react";
import { PlasmaContextT } from "src/types/contextType/plasmaContextType";

const PlasmaContextDefault: PlasmaContextT = {
    chatOpen: false,
    toggleChatOpen: () => {}
}

export const PlasmaContext = createContext<PlasmaContextT>(PlasmaContextDefault)

export const usePlasma = () => {
    return useContext(PlasmaContext)
}

export const PlasmaProvider = ({children}: {children: ReactNode}) => {
    const [chatOpen, setChatOpen] = useState<boolean>(false)
    const toggleChatOpen = (state?: boolean): void => {
        if(state){
            if(state !== chatOpen) setChatOpen(state)
        }else{
            setChatOpen(s => !s)
        }
    }

    const value = {
        chatOpen,
        toggleChatOpen
    }

    return <PlasmaContext.Provider value={value}>
        {children}
    </PlasmaContext.Provider>
}