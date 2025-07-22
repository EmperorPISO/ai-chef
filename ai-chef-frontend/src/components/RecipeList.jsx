import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function RecipeList({recipe, resetPage, setSavedRecipes, recipeName}) {

    const [showPrompt, setShowPrompt] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const inputRef = useRef(null)

    const handleSubmit = () => {
        const trimmedName = inputVal.trim()
        if(!trimmedName) {alert("Type in a Name for the recipe");
            return;
        };
        saveRecipe(recipe, trimmedName);
        setInputVal('');
        setShowPrompt(false);
        resetPage()
    }

    const handleKeydown = (e) => {
        if (e.key === "Enter"){handleSubmit()};
        if (e.key === "Escape"){setShowPrompt(false)}
    }
    const saveRecipe = (recipe, recipeName) => {
        setSavedRecipes(prev => [...prev, {
            id: Date.now().toString(26),
            name: recipeName,
            recipeMarkdown: recipe
        }])
    }

    useEffect(() => { 
        if (showPrompt && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }}
       ,[showPrompt])
    return(
    <>
         <div className='font-merienda flex-col flex-centered'>
            <ReactMarkdown>{recipe}</ReactMarkdown>
         <div className='w-full flex gap-12 flex-centered mt-4'><button onClick={resetPage}
         className='button-style rounded-md my-2 w-[25%]'>Clear Recipe</button>
         <button onClick={() => {
            setInputVal(recipeName || "")
            setShowPrompt(true)}}
         className='button-style rounded-md my-2 w-[25%]' >Save Recipe</button></div>
         </div>
         {showPrompt && 
         <div className='fixed inset-0 flex-centered w-screen h-screen bg-[#fdf5f5] font-cormorant-garamond z-20'>
            <div className=' w-[80%] flex-centered border-4 border-[#AD3C3C] backdrop-blur-3xl flex-col mx-auto h-[50vh] rounded-2xl bg-[#D76E6E] shadow-2xl shadow-[#308A30]'>
            <h3 className='font-black text-[#7F1515] text-3xl mb-2'>Recipe Name</h3>
            <input
            ref={inputRef}
            type='text'
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeydown}
            placeholder='Type a name for the Recipe' 
            className='w-[90%] min-text input-style px-4'/>
                <div className=' flex-centered gap-10 my-2'>
                <button onClick={handleSubmit}
                className='button-style rounded-md my-2 w-[100px]'>Save</button>
                <button 
                    onClick={() => {setShowPrompt(false)}}
                    className='button-style rounded-md my-2 w-[100px]'>Cancel</button>
                </div>
            </div>
        </div>}
    </>

    )
}