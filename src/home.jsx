import React,{useEffect,useState,useRef} from "react";
import './home.css'
export default function Home() {
    const API_ID="0c0e9182";
    const API_KEY="371d2ae73a92606bf1093d45460c378b";
    const [Inlist,setInlist]=useState([]);
    const [Loading,setLoading]=useState(false);
    const inputRef=useRef(null);
    const selectRef=useRef(null);
    const search=()=>{
        console.log(inputRef.current.value);
        console.log(selectRef.current.value);
        // console.log(selectRef1.current.value);
        searchRecipe(inputRef.current.value,selectRef.current.value);
        inputRef.current.value="";
    }
    const searchRecipe=(query,cuisine)=>{
        setLoading(true);
        let url = `api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}&diet=balanced&cuisineType=${cuisine}`;
        fetch(url,{mode:"no-cors"})
        .then(response=>{
           return response.json()
        })
        .then(res=>{
            // const check=selectRef.current.value.toLowerCase();
            console.log(res.hits);
            console.log(res.hits.length);
            for(let i=0;i<21;i++){
                for(let j=0;j<res.hits[i].recipe.cuisineType.length;j++){
                // console.log(res.hits[i].recipe.cuisineType[j]);
                // console.log(selectRef.current.value);
                if(res.hits[i].recipe.cuisineType[j]==selectRef.current.value){
                    setInlist(res.hits);  
                    
                    
                }
            }
            }
            // setInlist(res.hits);
            console.log(Inlist.length); 
            setLoading(false);
        })
        .catch(error => {console.log("error",error);
            setLoading(false);
        })
    }
    useEffect(()=>{
        searchRecipe("chicken");
    },[])
    return (
        <div className="Home_overall">
            <div className="search_bar">
                <h1> Recipe Finder</h1>
                <div className="cusine_content"> 
                    <label> Recipe Search</label>
                        <input ref={inputRef} placeholder="Eg.. chicken"/>
                </div>
                    <div className="cusine_content"> 
                        <label> Cuisine type</label>
                        <select ref={selectRef}>
                        <option> --- </option>
                            <option> american </option>
                            <option> asian </option>
                            <option> british </option>
                            <option> caribbean </option>
                            <option> central Europe </option>
                            <option> chinese </option>
                            <option> eastern european </option>
                            <option> french </option>
                            <option> indian </option>
                            <option> italian </option>
                            <option> japanese </option>
                            <option> kosher </option>
                            <option> mediterranean </option>
                            <option> mexican </option>
                            <option> middle Eastern </option>
                            <option> nordic </option>
                            <option> south american </option>
                            <option> south east asian </option>
                        
                        </select>
                    </div>
                    {/* <div className="cusine_content"> 
                        <label> Dietary type</label>
                        <select ref={selectRef1}>
                        <option> --- </option>
                            <option> Balanced </option>
                            <option> high-fiber </option>
                            <option> high-protien </option>
                            <option> low-crab </option>
                            <option> low-fat </option>
                            <option> low-sodium </option>
                            
                        </select>
                    </div> */}
                    <button onClick={search}>Search</button>

                </div>
                {Loading && <p>Loading...!</p>}
            <div className="content">
               
                {Inlist.map((item)=>{
                    return(
                        <div key={item.recipe.label} className="Ingredient">
                            <h3>{item.recipe.label}</h3>
                            <img src={item.recipe.image}/>
                            <div className="Ingerdientlist">
                                {item.recipe.ingredientLines.map((step,index)=>{
                                    return <p key={index}> {step}</p>
                                })}
                            </div>
                            <a href={item.recipe.url}><button>View Description</button> </a>
                            <p> Cuisine type : {item.recipe.cuisineType}</p>
                            <p> Diet type : {item.recipe.dietLabels}</p>
                        </div>
                    )
                })}

            </div>

        </div>

    )
}