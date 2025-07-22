import { useState , useRef} from "react"
import ReactMarkdown from 'react-markdown'

export default function RecipeSelector({savedRecipes, setSavedRecipes}) {

    
    const [showDropBox, setShowDropBox] = useState(true)
    const [displayRecipe, setDisplayRecipe] = useState(false)
    const [selectedId, setSelectedId] = useState('')
    const [copied, setCopied] = useState("idle")
    

    const renderedRef = useRef(null)

    const handleChange = (e) => {
        const id = e.target.value;
        setSelectedId(id);
        setShowDropBox(false);
        setDisplayRecipe(true);
    }
    const defaults = () => {
        setDisplayRecipe(false)
        setShowDropBox(true)
        setSelectedId('')
    }
    const deleteRecipe = (idToDel) => {
        const confirmDelete = confirm(`Are you sure you want to delete Recipe: 
            ${savedRecipes.find(recipe => recipe.id === idToDel).name}`);
        if (!confirmDelete){return};
        setSavedRecipes(prev => prev.filter(recipe => recipe.id !== idToDel));
        alert('Recipe deleted successfully.');
        defaults();
    }

    const copyRecipe = async() => {
        if(!renderedRef.current) return;
        const htmlContent = renderedRef.current.innerHTML
        try{
            await navigator.clipboard.write([
                new ClipboardItem(
                    {
                        "text/html" : new Blob([htmlContent], {type: "text/html"}),
                        "text/plain" : new Blob([renderedRef.current.innerText], {type: "text/plain"})
                    }
                )
            ])
            setCopied(true)
            setTimeout(()=> setCopied('idle'), 3000)
        } catch (err){
            console.error("Copy failed: ", err);
            setCopied(false)
            setTimeout(() => setCopied('idle'), 3000)
        }
    }
    const copyText = copied === true ? 'Copied !' : copied === false ? 'Copy Failed!' : 'Copy Recipe'
    const selectedRecipe = savedRecipes.find( recipe => recipe.id === selectedId)


    return (
        <div className="flex-centered">
        {showDropBox && <div
        className="flex-col flex-centered w-[80%] h-[25vh] my-15 font-merienda border-1 gap-5 rounded-3xl border-[#9D0004] shadow-sm shadow-[#308A30]">
            <h3 className="text-2xl mx-auto text-[#002100] ">View saved Recipes</h3>
            <select id="dropdown" 
            value={selectedId} 
            onChange={handleChange}
            className="text-center h-10  input-style">
                <option value='' className="text-center">-- Select --</option>
                {[...savedRecipes].sort((a,b) =>
                a.name.localeCompare(b.name)).map(recipe => (
                    <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                ))}
            </select>
        </div>}

        {displayRecipe && selectedRecipe &&
        <div
        className="mt-10 font-merienda text-[18px] flex-centered flex-col">
            <div ref={renderedRef}
            ><ReactMarkdown>
            {selectedRecipe.recipeMarkdown}</ReactMarkdown></div>
            <div className="w-[90%] text-[17px] flex items-center gap-12">
            <button onClick={defaults}
             className="button-style rounded-md h-[30px] w-[25%]">
            Back
            </button>
            <button disabled={!selectedId} onClick={() => deleteRecipe(selectedId)}
             className="button-style rounded-md h-[30px] w-[25%]">Delete Recipe</button>
            <button 
            disabled={copied !== 'idle'}
            onClick={copyRecipe}
            className={`${copied === 'idle'?'': 'cursor-not-allowed opacity-[70%]'} button-style rounded-md h-[30px] w-[25%] my-3`}
            >{copyText}</button>
            </div>
        </div>
            }
        </div>
    )
}