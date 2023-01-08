import { css, keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { usePlasma } from "src/store/plasma.context"

const load = keyframes`
    0%{
        transform: translateY(0);
    }
    50%{
        transform: translateY(-5px);
    }
    80%{
        transform: translateY(2px);
    }
    100%{
        transform: translateY(0px);
    }
`

const BaseChatBtn = styled.button`
    border-radius: 50%;
    width: var(--pl-chatbtn-radius);
    height: var(--pl-chatbtn-radius);
    border: none;
    outline: none;
    display: inline-block;
    background: var(--pl-primary);
    box-shadow: var(--pl-shadow-1);

    position: fixed;
    inset: var(--pl-chatbtn-position);
    z-index: 99999;

    display: flex;
    justify-content: center;
    align-items: center;

    .svg-chat-icon svg{
        width: 50%;
        height: 50%;
    }
    .svg-chat-icon{
        transition: .1s transform var(--pl-cubic-2);
    }
    &:hover .svg-chat-icon{
        transform: scale(1.1);
    }
    &:hover svg:nth-child(2){
        opacity: 1;
    }
    &:hover div>span:nth-child(1){
        opacity: 1;
        animation: ${load} var(--pl-cubic-2) .4s .0s
    }
    &:hover div>span:nth-child(2){
        opacity: 1;
        animation: ${load} var(--pl-cubic-2) .4s .1s
    }
    &:hover div>span:nth-child(3){
        opacity: 1;
        animation: ${load} var(--pl-cubic-2) .4s .2s
    }
`

const BtnSvg = (props: {color?: string, variant: "fill" | "stroke"}) => {
    const {color, variant} = props

    return <>{variant === "fill"? (
        <svg width="64" height="65" viewBox="0 0 64 65" fill="none">
            <path fill={color} d="M10.2045 6.58782C17.3197 5.54165 24.5977 5 32.0009 5C39.4034 5 46.6808 5.54155 53.7953 6.58754C59.8245 7.47396 64 12.7545 64 18.6855V37.0288C64 42.9598 59.8245 48.2404 53.7953 49.1268C47.8851 49.9957 41.8625 50.5165 35.7491 50.6679C35.4335 50.6757 35.1446 50.8022 34.9373 51.0094L22.1877 63.7591C21.534 64.4128 20.5508 64.6084 19.6967 64.2546C18.8426 63.9008 18.2857 63.0673 18.2857 62.1429V50.0895C15.5703 49.8409 12.8759 49.5192 10.2045 49.1264C4.17536 48.2399 0 42.9594 0 37.0285V18.6858C0 12.7548 4.17537 7.47431 10.2045 6.58782Z"/>
        </svg>
        ):(
        <svg width="64" height="65" viewBox="0 0 64 65" fill="none">
            <path stroke={color} strokeWidth="5" d="M20.6923 48.8339C20.6923 48.3115 20.2902 47.8771 19.7694 47.8369C16.1542 47.5575 12.5735 47.1553 9.03149 46.6345C4.35826 45.9474 1 41.8255 1 37.0307V17.277C1 12.4822 4.35827 8.36026 9.03151 7.67314C16.5278 6.57093 24.1974 6 32.0009 6C39.8038 6 47.4727 6.57083 54.9684 7.67284C59.6417 8.35992 63 12.4818 63 17.2767V37.031C63 41.8259 59.6417 45.9478 54.9684 46.6349C48.9012 47.5269 42.7205 48.0709 36.4472 48.2458C34.9194 48.2884 33.453 48.902 32.363 49.992L20.6923 61.6627V48.8339Z"/>
        </svg>
        )
    }</>
}

const BtnDots = () => {

    return <div 
        css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3px;
            position: absolute;
            inset: 50% auto auto 50%;
            transform: translate(-50%, -50%);
            &>span{
                display: block;
                width: 4px;
                height: 4px;
                background: var(--pl-primary);
                opacity: 0;
                transition: .2s opacity var(--pl-cubic-1);
                border-radius: 50%;
                margin-bottom: 5px;
            }
        `}
    >
        <span></span>
        <span></span>
        <span></span>
    </div>
}

export const ChatBtn = () => {
    const plasma = usePlasma()

    return <BaseChatBtn
        onClick={() => {
            plasma.toggleChatOpen()
        }}
        css={css`
            display: ${plasma.chatOpen? 'none': 'inline-block;'};
        `}
    >
        <div 
            css={css`
                position: relative;
                width: var(--pl-chatbtn-radius);
                height: var(--pl-chatbtn-radius);

                &>svg{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                &>svg:nth-child(2){
                    opacity: 0;
                    transition: .2s opacity var(--pl-cubic-1);
                }
            `}
            className="svg-chat-icon"
        >
            <BtnSvg color="white" variant="stroke"/>
            <BtnSvg color="white" variant="fill"/>
        </div>
        <BtnDots/>
    </BaseChatBtn>
}