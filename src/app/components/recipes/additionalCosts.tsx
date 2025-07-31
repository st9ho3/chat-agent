import React from 'react'
import { BanknoteX, Euro } from "lucide-react"

const AdditionalCosts = () => {
  return (
    <div>
      <div className="flex flex-col justify-evenly md:flex-row items-center rounded-lg space-x-2 p-2 my-2">
        <div className='flex items-center space-x-3 p-2' >
          <div className='flex items-center border-1 border-gray-300 border-dashed rounded-lg space-x-3 p-1'>
            <BanknoteX />
            <select className="block w-20 p-2 text-lg focus:outline-none bg-white text-gray-800" name="price" id="price">
              <option value="VAT">ΦΠΑ</option>
              <option value={13}>13%</option>
              <option value={23}>23%</option>
            </select>
          </div>
        </div >
      </div>
    </div>
  )
}

export default AdditionalCosts