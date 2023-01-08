import { BaseStyle } from "src/style/BaseStyle"
import { ChatBtn } from "./ChatBtn"
import { ChatCard } from "./ChatCard"

export const Layout = () => {

    return <BaseStyle>
        <ChatCard/>
        <ChatBtn/>
    </BaseStyle>
}