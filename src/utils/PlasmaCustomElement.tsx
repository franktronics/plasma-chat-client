import { createRoot } from 'react-dom/client'
import { Layout } from 'src/components/layout/Layout'
import { PlasmaProvider } from 'src/store/plasma.context'

export class PlasmaChat extends HTMLElement {
    //private _shadow : ShadowRoot

    constructor () {
        super()
        //this._shadow  = this.attachShadow({mode: "open"})
        this.render()
    }

    private render () {
        createRoot(this).render(
            <PlasmaProvider>
                <Layout/>
            </PlasmaProvider>
        )
    }
}