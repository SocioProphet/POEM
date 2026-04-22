import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import  Loading  from "../components/Loading";
export default function Scales() {
    const [scales, setScales] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const getScales = async () => {
        try {
            setLoading(true);
            const res = await apiFetch("/scales");
            const data = await res.json();
            setScales(data.scales);
            console.log(data);
        } catch (err) {
            console.error("Fetch failed:", err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getScales();
    }, []);
    if(loading){
        return <Loading/>
    }

    return (
        <div className="flex flex-col gap-6 items-center mt-12 "> <h2 className="text-3xl font-bold text-slate-600">Scales</h2>
        {scales.map((scale, index) => (
          <p key={index} className="shadow-md hover:shadow-2xl w-10/12 text-xl p-5 m-2  border-2 border-gray-200 transition duration-300 ease-in-out hover:scale-105 ">
            {scale }</p>
        ))}
        </div>
      );
}