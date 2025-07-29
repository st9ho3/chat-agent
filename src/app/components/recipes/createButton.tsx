"use client"
import React from 'react'
import {Plus } from 'lucide-react'
import { useHomeContext } from '@/app/context/homeContext/homeContext'
import RecipeForm from '@/app/components/recipes/recipeForm'
import Modal from '@/app/components/shared/modal'

const CreateButton = () => {
const {state, dispatch} = useHomeContext()

  return (
    <div
          className=" m-4 p-3"
          onClick={() => {
              dispatch({type: "OPEN_MODAL", payload: {type: "create", id: ''}})
              
          } }
        >
          <Plus />
          <div>
            <Modal isOpen={state.isModalOpen} onClose={() => { dispatch({type: "CLOSE_MODAL"}); dispatch({type: "RESET_FILE"})}}>
            <RecipeForm />
            </Modal>
          </div>
      </div>
  )
}

export default CreateButton
