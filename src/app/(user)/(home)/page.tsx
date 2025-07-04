"use client"
import RecipeForm from '@/app/components/recipes/recipeForm'
import Modal from '@/app/components/shared/modal'
import { useHomeContext } from '@/app/context/homeContext/homeContext'
import React from 'react'

const page = () => {
const {state, dispatch} = useHomeContext()
  return (
    <div>
      <Modal isOpen={state.isModalOpen} onClose={() => dispatch({type: "CLOSE_MODAL"})}>
        <RecipeForm />
      </Modal>
    </div>
  )
}

export default page
