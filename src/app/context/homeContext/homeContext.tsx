"use client"

import {createContext, useContext, useReducer, PropsWithChildren} from 'react'
import {initialState, homeReducer} from './homeReducer'
import { Action } from '@/types/context'

interface HomeContextProps {
    state: typeof initialState,
    dispatch: React.Dispatch<Action>;
}

const homeContext = createContext<HomeContextProps | undefined>(undefined)

const HomeContextProvider = ({children}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(homeReducer, initialState)

  return (
    <homeContext.Provider value={{state, dispatch}}>
      {children}
    </homeContext.Provider>
  )
}

export default HomeContextProvider

// Custom hook to use the HomeContext
export const useHomeContext = () => {
  const homeCon = useContext(homeContext)
  if (!homeCon) {
    throw new Error("useHomeContext must be used within a HomeContext provider")
  }
  return homeCon
}