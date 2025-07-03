import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-2">
     <div className="border-1 w-full lg:w-1/2 h-4/5 p-2">Dialog</div>
     <div className="border-1 w-full lg:w-1/2 h-1/5 p-3 rounded-2xl border-gray-300">
      <div className="flex ">
        <input type="text" className="border-1 w-full h-1/4 p-2 focus:outline-none" />
        <button className="border-1 border-gray-400 p-1 ml-1 rounded-md cursor-pointer h">Send</button>
      </div>

      <div>
        
      </div>
       
     </div>
    </div>
  );
}
