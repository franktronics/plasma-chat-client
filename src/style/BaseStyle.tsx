import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import { FunctionComponent, PropsWithChildren } from "react"

export const Reset = styled.div(
    css`
        font-size: 16px;
        color: #f00;
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