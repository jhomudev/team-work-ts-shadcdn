'use client'
import { useState, createContext, Dispatch, SetStateAction } from 'react'

type AppContext = {
  openMenu: boolean,
  setOpenMenu: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContext>({} as AppContext)
