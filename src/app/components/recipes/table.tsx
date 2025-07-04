import React from 'react'
import { columns, recipes} from '@/app/constants/data'

const Table = () => {
  return (
    <table className='w-full mb-3'>
      <thead>
        <tr >
            {columns.map((column) => (
                <th
                key={column.accessor}
                className={column.className}
                >
                {column.header}
                </th>
            ))}
        </tr>
      </thead>
      <tbody className='text-gray-500 text-md '>
            {
                recipes.map((rec) =>
                    <tr key={rec.id} className='border-b border-gray-200 h-13 text-sm'>
                        <td className='pl-4'>
                            <div className='flex items-center gap-2'>
                               <img className='w-8 h-8 rounded-full object-cover' src={rec.imgPath} alt={rec.title} />
                               <p className='text-sm'>{rec.title}</p>
                            </div>
                        </td>
                        <td className='hidden md:table-cell pl-4'>{rec.createdBy}</td>
                        <td className='hidden md:table-cell pl-4'>{new Date(rec.dateCreated).toLocaleDateString()}</td>
                        <td className='hidden md:table-cell pl-4'>{rec.category}</td>
                        <td className='pl-4'>${rec.totalCost.toFixed(2)}</td>
                    </tr>
                )
            }
      </tbody>
    </table>
  )
}

export default Table
