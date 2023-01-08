import { FunctionComponent, PropsWithChildren, useEffect, useRef } from "react"
import { usePlasma } from "src/store/plasma.context"

type DragOptions = {
    contentZone: Array<number>
}
const defaultOptions: DragOptions = {
    contentZone: [16, 16]
}

class Drag {
    private options: DragOptions
    private handel: HTMLElement
    private drag: HTMLElement
    private down: boolean
    private prevX: number
    private prevY: number
    private x: number
    private y: number
    private innitBoundingDrag: DOMRect
    private innerWidth: number
    private innerHeight: number

    constructor(handel: HTMLElement, drag: HTMLElement, options: DragOptions = defaultOptions){
        this.options = {...defaultOptions, ...options}
        this.handel = handel
        this.drag = drag
        this.down = false
        this.prevX = 0
        this.prevY = 0
        this.x = 0
        this.y = 0
        this.innitBoundingDrag = drag.getBoundingClientRect()

        this.innerWidth = window.innerWidth
        this.innerHeight = window.innerHeight

        this.mousemove = this.mousemove.bind(this)
        this.mouseup = this.mouseup.bind(this)
        this.mousedown = this.mousedown.bind(this)
        this.resizeWindow = this.resizeWindow.bind(this)

        handel.addEventListener('pointerdown', this.mousedown)
        handel.addEventListener('pointerup', this.mouseup)
        document.addEventListener('pointermove', this.mousemove)
        window.addEventListener('resize', this.resizeWindow)
    }
    private mousedown(e: MouseEvent){
        e.preventDefault()
        e.stopPropagation()
        this.down = true
        if(this.prevX === 0 && this.prevY === 0){
            this.reset(false)
        }
        this.drag.style.transition = `.2s width var(--pl-cubic-1), 
                                      .2s height var(--pl-cubic-1),
                                      .2s border-radius var(--pl-cubic-1)`
    }

    private mouseup(e: MouseEvent){
        e.preventDefault()
        e.stopPropagation()
        this.down = false

        const boundingDrag = this.drag.getBoundingClientRect()

        ////case x
        if(!(this.options.contentZone[0] && this.options.contentZone[1])) return

        if(boundingDrag.right - window.innerWidth > -1 * this.options.contentZone[0]){
            const diff = (window.innerWidth - this.options.contentZone[0] - this.innitBoundingDrag.right)
            this.x = diff
            this.drag.style.transform = `translate(${this.x}px, ${this.y}px)`
        }else if(boundingDrag.x < this.options.contentZone[0]){
            const diff = -1 * (this.innitBoundingDrag.left - this.options.contentZone[0])
            this.x = diff
            this.drag.style.transform = `translate(${this.x}px, ${this.y}px)`
        }
        ////case y
        if(boundingDrag.bottom - window.innerHeight > -1 * this.options.contentZone[1]){
            const diff = (window.innerHeight - this.options.contentZone[1] - this.innitBoundingDrag.bottom)
            this.y = diff
            this.drag.style.transform = `translate(${this.x}px, ${this.y}px)`
        }else if(boundingDrag.y < this.options.contentZone[1]){
            const diff = -1 * (this.innitBoundingDrag.top - this.options.contentZone[1])
            this.y = diff
            this.drag.style.transform = `translate(${this.x}px, ${this.y}px)`
        }
    }

    private mousemove(e: MouseEvent){
        e.preventDefault()
        e.stopPropagation()

        if(this.down){
            this.x = e.clientX - this.prevX
            this.y = e.clientY - this.prevY
            this.drag.style.transform = `translate(${this.x}px, ${this.y}px)`
        }
    }

    private resizeWindow(e: UIEvent){
        if(this.prevX !== 0 && this.prevY !== 0){
            this.reset()
        }
    }

    reset(hard: boolean = true){
        if(hard){ this.drag.style.transform = `translate(0, 0)` }
        const bouding = this.handel.getBoundingClientRect()
        this.prevX = bouding.left + (bouding.width / 2)
        this.prevY = bouding.top + (bouding.height / 2)
        this.innitBoundingDrag = this.drag.getBoundingClientRect()
    }

    resetPosition(){
        this.prevX = 0
        this.prevY = 0
        this.x = 0
        this.y = 0

        this.drag.style.transition = `.2s transform var(--pl-cubic-1), 
                                      .2s width var(--pl-cubic-1), 
                                      .2s height var(--pl-cubic-1),
                                      .2s border-radius var(--pl-cubic-1)`
        this.drag.style.transform = `translate(0, 0)`
    }

    disconnectEvents(){
        this.handel.removeEventListener('pointerdown', this.mousedown)
        this.handel.removeEventListener('pointerup', this.mouseup)
        document.removeEventListener('pointermove', this.mousemove)
        window.removeEventListener('resize', this.resizeWindow)
    }
}

export const Draggable: FunctionComponent<PropsWithChildren<{handel: string, drag: string, options: DragOptions}>> = ({handel, drag, options, children}) => {
    const plasma = usePlasma()
    let dragInstance = useRef<{instance: Drag | null}>({instance: null})
    useEffect(() => {
        const handelElt = document.querySelector<HTMLElement>(handel)
        const dragElt = document.querySelector<HTMLElement>(drag)

        if(handelElt && dragElt){
            dragInstance.current.instance = new Drag(handelElt, dragElt, options)
        }else{
            console.error("Can't find elements for plasma-card: #0001")
        }

        return () => {
            dragInstance.current.instance?.disconnectEvents()
        }
    }, [])

    useEffect(() => {
        if(!plasma.chatOpen){
            dragInstance.current.instance?.resetPosition()
        }
    }, [plasma.chatOpen])

    return <>
        {children}
    </>
}