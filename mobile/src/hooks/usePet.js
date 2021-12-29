import React, { useContext } from 'react'
import {PetContext} from '../contexts/PetContext'

export function usePet(){
  const value = useContext(PetContext)
  return value;
}