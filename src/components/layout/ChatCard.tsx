import styled from "@emotion/styled"
import { CardHead } from "./CardHead"

const BaseChatCard = styled.div`
    width: 330px;
    max-width: 650px;
    height: 90vh;
    box-shadow: var(--pl-shadow-1);
    background: var(--pl-white);
    border-radius: 8px;
    overflow: hidden;

    position: fixed;
    z-index: 100000;
    inset: var(--pl-chatbtn-position);

    display: flex;
    flex-direction: column;
`

export const ChatCard = () => {

    return <BaseChatCard id="plasma-chat-card">
        <CardHead/>
    </BaseChatCard>
}