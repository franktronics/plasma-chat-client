import styled from "@emotion/styled"
import { CardHead } from "./CardHead"
import { Draggable } from "./Draggable"
import { usePlasma } from "src/store/plasma.context"

const BaseChatCard = styled.div<{chatOpen: boolean}>`
    width: ${props => props.chatOpen? 'var(--pl-chatcard-width)': 'var(--pl-chatbtn-radius)'};
    height: ${props => props.chatOpen? 'var(--pl-chatcard-height)': 'var(--pl-chatbtn-radius)'};
    max-height: 650px;
    box-shadow: var(--pl-shadow-1);
    background: var(--pl-white);
    border-radius: ${props => props.chatOpen? 'var(--pl-chatcard-radius)': '50%'};
    overflow: hidden;

    @media(max-width: 480px){
        width: ${props => props.chatOpen? '100%': 'var(--pl-chatbtn-radius)'};
        height: ${props => props.chatOpen? '100%': 'var(--pl-chatbtn-radius)'};
        inset: 0;
        border-radius: 0;
    }

    position: fixed;
    z-index: 99998;
    inset: var(--pl-chatbtn-position);

    display: flex;
    flex-direction: column;
`

export const ChatCard = () => {
    const plasma = usePlasma()

    return <Draggable
        handel="#plasma-card-drag-zone"
        drag="#plasma-chat-card"
        options={{
            contentZone: [16, 16]
        }}
    >
        <BaseChatCard 
            chatOpen={plasma.chatOpen}
            id="plasma-chat-card"
            
        >
            <CardHead/>
        </BaseChatCard>
    </Draggable>
}