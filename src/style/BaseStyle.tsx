import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import { FunctionComponent, PropsWithChildren } from "react"

export const Reset = styled.div(
    css`
        font-size: 16px;
        --pl-primary: #005DE9;
        --pl-secondary: #FF715B;
        --pl-black: #2E3532;
        --pl-white: #FFFFFF;
        --pl-white-faded: rgba(255, 255, 255, 0.2);

        --pl-chatbtn-radius: 60px;
        --pl-chatbtn-position: auto 16px 16px auto;

        --pl-chatcard-radius: 4px;
        --pl-chatcard-width: 350px;
        --pl-chatcard-height: 90vh;

        --pl-cubic-1: ease-in-out;
        --pl-cubic-2: cubic-bezier(0.02, 0.59, 0.74, 0.66);
        --pl-shadow-1: 0 4px 12px rgb(0 0 0 / 30%);
        
        --pl-pos-x: 16px;
        --pl-pos-y: 16px;

        *, *::before, *::after {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
    `
)

export const BaseStyle: FunctionComponent<PropsWithChildren> = ({children}) => {

    return (<>
        <Global styles={{'plasma-chat': { display: 'block' }}}/>
        <Reset>{children}</Reset>
    </>)
}