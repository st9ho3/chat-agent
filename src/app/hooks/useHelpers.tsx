import React from 'react'
import { useHomeContext } from '../context/homeContext/homeContext'
import { NotificationType } from '@/types/context'

const useHelpers = () => {
    const {dispatch} = useHomeContext()

    const raiseNotification = (message: string, type: NotificationType) => {
        setTimeout(() => {
            dispatch({type: "HANDLE_NOTIFICATION", payload: {isOpen: true, message: message, notificationType: type}})
        }, 1500);
        
    }

    const closeNotification = () => {
        setTimeout(() => {
            dispatch({type: "HANDLE_NOTIFICATION", payload: {isOpen: false, message: "", notificationType: NotificationType.Info}})
        },4000)
        
    }

  return (
    {
        raiseNotification,
        closeNotification
    }
  )
}

export default useHelpers
