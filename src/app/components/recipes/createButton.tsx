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
          className="fixed bottom-15 right-0 z-50 m-4 p-3 bg-white rounded-full border border-dashed border-gray-400 shadow-lg"
          onClick={() => {
              dispatch({type: "OPEN_MODAL"})
              console.log('clicked')
          } }
        >
          <Plus />
          <div>
            <Modal isOpen={state.isModalOpen} onClose={() => dispatch({type: "CLOSE_MODAL"})}>
            <RecipeForm />
            </Modal>
          </div>
      </div>
  )
}

export default CreateButton
