import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import { Link } from "react-router-dom";
type FilterRequest = {
  scale: string;
  language: string;
  informant: string;

};
type scaleLanguageInformant ={
    scales: [],
    languages: [],
    informants: [],
}

export default function Filter(){
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [SLI, setSLI] = useState<scaleLanguageInformant>({scales:[], languages: [], informants:[]});
    const [scale, setScale] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [informant, setInformant] = useState<string>("");
    async function searchWithFilter(scale: string, language: string, informant:string){
        try{
            const paylod: FilterRequest = {scale: scale, language: language, informant: informant};
            const res = await(apiFetch('/search_filter',{
                method: "POST",
                  headers: {
      'Content-Type': 'application/json', // Inform server you are sending JSON
    },
        body: JSON.stringify(paylod)
            }))
            const data = await res.json();
            return data;
        }catch(err){
            console.error(err);
            return [];
        }
    }
    async function getScalesLanguagesInformants(){
        try{
            const res = await(apiFetch('/s_l_i'))
            const data = await res.json();
            return data;
        }catch(err){
            console.error(err);
            return {scales: [], languages: [], informants: []};
        }
    }
    useEffect(()=>{
        async function loadData(){
        const sLIResults = await getScalesLanguagesInformants();
        const filterResults =await searchWithFilter("","","");
        setSearchResults(filterResults);
        setSLI(sLIResults);
        }
        loadData();
        console.log()
    },[])

    useEffect(() => {
  async function runFilter() {
    const results = await searchWithFilter(
      scale,
      language,
        informant
    );
    setSearchResults(results);
  }

  runFilter();
}, [scale, language, informant]);
    return(<div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-slate-600">Filter Instruments</h1>
       <div className="flex gap-4 mt-4">

  {/* Scale */}
  <select
    value={scale}
    onChange={(e) => setScale(e.target.value)}
    className="p-2 border rounded"
  >
    <option value="">All Scales</option>
    {SLI.scales.map((scale: string, i: number) => (
      <option key={i} value={scale}>
        {scale}
      </option>
    ))}
  </select>

  {/* Language */}
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="p-2 border rounded"
  >
    <option value="">All Languages</option>
    {SLI.languages.map((lang: string, i: number) => (
      <option key={i} value={lang}>
        {lang}
      </option>
    ))}
  </select>

  {/* Informant */}
  <select
    value={informant}
    onChange={(e) => setInformant(e.target.value)}
    className="p-2 border rounded"
  >
    <option value="">All Informants</option>
    {SLI.informants.map((inf: string, i: number) => (
      <option key={i} value={inf}>
        {inf}
      </option>
    ))}
  </select>

</div>
        {searchResults && searchResults.map((result, index) =>
            <Link key = {index} to={`/instruments/individual/${result}`} className="shadow-md hover:shadow-2xl w-10/12 text-xl p-5 m-2  border-2 border-gray-200 transition duration-300 ease-in-out hover:scale-105">{result}</Link>
        )}
    </div>

    )
}