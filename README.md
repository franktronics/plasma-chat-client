## Plasma chat client

Front end for the client version of Plasma-chat. 

the client version must be able to be installed as a library

```js
import PlasmaChat from 'plasma-chat'

export const myComponent = () => {

    const plasmaOptions = {
        ...
    }

    return (
        <PlasmaChat
            id="user.id"
            options={plasmaOptions}
        >
    )
}
```

Or else as `custom elements` 

```html
<plasma-chat id="client.id" options="...">

</plasma-chat>
```

This version is connected to the backend [plasma-chat-back]()