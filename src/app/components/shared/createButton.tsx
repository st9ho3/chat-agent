"use client"
import React from 'react'
import {Plus } from 'lucide-react'
import { useHomeContext } from '@/app/context/homeContext/homeContext'
import RecipeForm from '@/app/components/recipes/recipeForm'
import Modal from '@/app/components/shared/modal'
import OptionsModal from './optionsModal'
import IngredientsForm from '../ingredients/ingredientsform'

const CreateButton = () => {
const {state, dispatch} = useHomeContext()

  return (
    <div
          className=" m-4 p-3"
          onClick={() => {
              dispatch({type: "OPEN_MODAL", payload: {type: "create"}})
              
          } }
        >
          <Plus />
          <div>
            <Modal isOpen={state.isModalOpen} onClose={() => { dispatch({type: "CLOSE_MODAL"}); dispatch({type: "RESET_FILE"})}}>
            { state.modalType.type === "create" && <OptionsModal />}
            { state.modalType.type === "recipe" && (<div onClick={(e) => e.stopPropagation()} > <RecipeForm /></div>)}
            { state.modalType.type === "ingredient" && (<div onClick={(e) => e.stopPropagation()} > <IngredientsForm /></div>)}
            </Modal>
          </div>
      </div>
  )
}

export default CreateButton
