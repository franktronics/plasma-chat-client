import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useEffect, useRef, useState } from "react"

const hover = css`
    &::before{
        content: '';
        transition: .2s background var(--pl-cubic-2);
        border-radius: 4px;
        display: block;
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    &:hover::before{
        background: var(--pl-white-faded);
    }
    &:hover{
        cursor: pointer;
    }
`

const MenuBtn = () => {

    return <div
        css={css`
            width: 40px;
            height: 20px;
            border-radius: 4px;
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;

            ${hover}

            &>span{
                width: 4px;
                height: 4px;
                background: var(--pl-white);
                border-radius: 50%;
                position: relative;
                z-index: 1;
            }
        `}
    >
        <span></span>
        <span></span>
        <span></span>
    </div>
}

const DragZone = () => {

    const [down, setDown] = useState<boolean>(false)
    const drag = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const card = document.getElementById("plasma-chat-card") as HTMLElement
        function pointerDown (e: MouseEvent) {
            e.preventDefault()
            e.stopPropagation()
            setDown(true)
        }
        function pointerUp (e: MouseEvent) {
            e.preventDefault()
            e.stopPropagation()
            setDown(false)
        }
        function pointerMove (e: MouseEvent) {
            e.preventDefault()
            e.stopPropagation()
            if(!down) return

            const clientX = e.clientX
            const clientY = e.clientY
            const bounding = card?.getBoundingClientRect()

            const x = document.body.offsetWidth - (clientX + (bounding.width - (clientX - bounding?.left)))
        }
        drag.current?.addEventListener('pointerdown', pointerDown)
        drag.current?.addEventListener('pointerup', pointerUp)
        drag.current?.addEventListener('pointermove', pointerMove)

        return () => {
            drag.current?.removeEventListener('pointerdown', pointerDown)
            drag.current?.removeEventListener('pointerup', pointerUp)
            drag.current?.removeEventListener('pointermove', pointerMove)
        }
    }, [])

    return <div
        ref={drag}
        css={css`
            width: 48px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            will-change: width;
            position: relative;
            top: -5px;

            &:hover span{
                width: 40px;
            }
            &:hover{
                cursor: grab;
            }

            &>span{
                width: 32px;
                height: 4px;
                border-radius: 4px;
                display: block;
                background: #f6f6f7;
                transition: 200ms width var(--pl-cubic-2);
            }
        `}
    >
        <span></span>
    </div>
}

const CloseBtn = () => {

    return <div
        css={css`
            width: 40px;
            height: 20px;
            border-radius: 4px;
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;

            ${hover}

            &>span{
                width: 20px;
                height: 2px;
                background: var(--pl-white);
                border-radius: 2px;
                position: relative;
                z-index: 1;
            }
        `}
    >
        <span></span>
    </div>
}

const BaseCardHead = styled.div`
    width: 100%;
    height: 80px;
    background: var(--pl-primary);

    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
`
export const CardHead = () => {

    return <BaseCardHead>
        <MenuBtn/>
        <DragZone/>
        <CloseBtn/>
    </BaseCardHead>
}