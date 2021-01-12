import React from 'react'

// Type can be e: error or n:notification
 const Notification = ({message, type}) => {
    if (message === null) {
        return null
    }
    if (type === 'e'){
        return <ErrorNotification message={message}/>
    } else if (type === 'n') {
        return <GreenNotification message={message}/>
    }
}

const ErrorNotification = ({message}) => {
    return (
        <div className="error-notification">{message}</div>
    )
}

const GreenNotification = ({message}) => {
    return (
        <div className="green-notification">{message}</div>
    )
}

export default Notification