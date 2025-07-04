"use client"
import { columns, recipes} from '@/app/constants/data'
import { paginate } from '@/app/services/helpers'
import { useHomeContext } from '@/app/context/homeContext/homeContext'

const Table = () => {
  const {state} = useHomeContext()
  const paginateItems = paginate(10, state.currentPage, recipes)
  const itemsToDisplay = paginateItems ? paginateItems : []
  
  return (
    <table className='w-full table-fixed mb-4 '>
      <thead>
        <tr className='border-b-1 border-gray-200'>
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
      <tbody className='text-gray-500 text-md'>
            {
                itemsToDisplay.map((rec) =>
                    <tr key={rec.id} className='border-b h-12.5  border-gray-200 text-sm'>
                        <td className='pl-4  md:pl-0'>
                            <div className='flex items-center gap-2'>
                               <img className='w-8 h-8 rounded-full object-cover' src={rec.imgPath} alt={rec.title} />
                               
                               <p className='text-sm break-words'>{rec.title}</p>
                            </div>
                        </td>
                        <td className='hidden md:table-cell pl-4'>{rec.createdBy}</td>
                        <td className='hidden md:table-cell pl-4'>{new Date(rec.dateCreated).toLocaleDateString()}</td>
                        <td className='hidden md:table-cell pl-4'>{rec.category}</td>
                        <td className='flex justify-center md:justify-start'>${rec.totalCost.toFixed(2)}</td>
                    </tr>
                )
            }
      </tbody>
    </table>
  )
}

export default Table