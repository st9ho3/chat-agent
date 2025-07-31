"use client";
import { recipesColumns } from "@/app/constants/data";
import { paginate } from "@/app/services/helpers";
import { useHomeContext } from "@/app/context/homeContext/homeContext";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Recipe } from "@/shemas/recipe";
import { deleteRecipesFromServer } from "@/app/services/services";
import { useRouter } from "next/navigation";
import Notification from '@/app/components/shared/notification'
import Link from "next/link";


const RecipesTable = ({items}: {items: Recipe[]}) => {
  const { state } = useHomeContext();
  const router = useRouter()
  const paginateItems = paginate(10, state.currentPage, items);
  const itemsToDisplay = paginateItems ? paginateItems : [];

  const handleDelete = async(rec: Recipe) => {
    await deleteRecipesFromServer(rec.id)
    router.replace("recipes")
  }

  console.log(state.isModalOpen, state.modalType.type)

  return (
    <div>
      <table className="w-full table-fixed mb-4 ">
        <thead>
          <tr className="border-b-1 border-gray-200">
            {recipesColumns.map((column) => (
              <th key={column.accessor} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-500 text-md">
          {itemsToDisplay.map((item) => (
            <tr
              key={item.id}
              className="border-b h-12.5 border-gray-200 text-sm"
            >

              <td className="pl-4 md:pl-0 pt-2">
                <Link href={`/recipes/${item.id}`}>
                  <div className="flex items-center gap-2">
                    <Image
                      className="w-9 h-9 rounded-full object-cover"
                      src={item.imgPath || '/images/placeholder-image.png'}
                      alt={item.title}
                      width={1200}
                      height={800}
                    />
                    <p className="text-sm break-words transition-colors duration-300 ease-in-out hover:text-gray-400">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </td>

              <td className="hidden md:table-cell pl-4">{item.createdBy}</td>
              <td className="hidden md:table-cell pl-4">
                <ClientOnlyTime date={item.dateCreated} />
              </td>
              <td className="hidden md:table-cell pl-4">{item.category}</td>
              <td className="hidden md:table-cell align-middle text-center md:text-start md:pl-4">
                € {Number(item.totalCost).toFixed(2)}
              </td>
              <td className="align-middle text-center gap-5 flex justify-center md:text-start md:justify-start mt-4 md:pl-4">
                <Link href={`/recipes/edit/${item.id}`}>
                  <Pencil
                    size="18px"
                    strokeWidth="1.5px"
                    className="cursor-pointer"
                  />
                </Link>

                <Trash2
                  onClick={() => handleDelete(item)}
                  size="18px"
                  strokeWidth="1.5px"
                  color="red"
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {state.notification.isOpen && <Notification />}
    </div>
  );
};

export default RecipesTable;

const ClientOnlyTime = ({ date }: { date: string | number | Date }) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    setFormattedTime(new Date(date).toLocaleDateString());
  }, [date]);


  return <>{formattedTime}</>;
};
