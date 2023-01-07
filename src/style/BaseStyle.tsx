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
        --pl-chatbtn-radius: 60px;
        --pl-chatbtn-position: auto 16px 16px auto;
        --pl-cubic-1: ease-in-out;

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