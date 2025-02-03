import { eventBus } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', (msg) => {
            displayMsg(msg)
        })

        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
            displayMsg({ txt: `New review about you: ${review.txt}`, type: 'success' })
        })

        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
        }
    }, [])

    function displayMsg(msg) {
        setMsg(msg)
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current)
        }
        timeoutIdRef.current = setTimeout(closeMsg, 3000)
    }

    function closeMsg() {
        setMsg(null)
    }

    function msgClass() {
        return msg ? 'visible' : ''
    }

    return (
        msg && (
            <section className={`user-msg ${msg?.type} ${msgClass()}`}>
                <button onClick={closeMsg}>x</button>
                {msg?.txt}
            </section>
        )
    )
}
