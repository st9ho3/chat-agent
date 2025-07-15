"use client";
import { columns } from "@/app/constants/data";
import { paginate } from "@/app/services/helpers";
import { useHomeContext } from "@/app/context/homeContext/homeContext";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Recipe } from "@/shemas/recipe";
import { deleteRecipesFromServer } from "@/app/services/services";
import { useRouter } from "next/navigation";



const Table = ({items}: {items: Recipe[]}) => {
  const { state } = useHomeContext();
  const router = useRouter()
  const paginateItems = paginate(10, state.currentPage, items);
  const itemsToDisplay = paginateItems ? paginateItems : [];

  const handleDelete = async(rec: Recipe) => {
    deleteRecipesFromServer(rec.id)

    router.refresh()
  }


  return (
    <table className="w-full table-fixed mb-4 ">
      <thead>
        <tr className="border-b-1 border-gray-200">
          {columns.map((column) => (
            <th key={column.accessor} className={column.className}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-500 text-md">
        {itemsToDisplay.map((rec) => (
          <tr
            key={rec.id}
            className="border-b h-12.5 border-gray-200 text-sm"
          >
            <td className="pl-4 md:pl-0">
              <div className="flex items-center gap-2">
                <Image
                  className="w-8 h-8 rounded-full object-cover"
                  src={rec.imgPath || '/images/placeholder-image.png'}
                  alt={rec.title}
                  width={8}
                  height={8}
                />
                <p className="text-sm break-words">{rec.title}</p>
              </div>
            </td>
            <td className="hidden md:table-cell pl-4">{rec.createdBy}</td>
            <td className="hidden md:table-cell pl-4">
              <ClientOnlyTime date={rec.dateCreated} />
            </td>
            <td className="hidden md:table-cell pl-4">{rec.category}</td>
            <td className="hidden md:table-cell align-middle text-center md:text-start md:pl-4">
              € {Number(rec.totalCost).toFixed(2)}
            </td>
            <td className="align-middle text-center gap-5 flex justify-center md:text-start md:justify-start mt-4 md:pl-4">
              <Pencil
                size="18px"
                strokeWidth="1.5px"
                className="cursor-pointer"
              />
              <Trash2
                onClick={() => handleDelete(rec)}
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
  );
};

export default Table;

const ClientOnlyTime = ({ date }: { date: string | number | Date }) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    setFormattedTime(new Date(date).toLocaleTimeString());
  }, [date]);

  return <>{formattedTime}</>;
};
