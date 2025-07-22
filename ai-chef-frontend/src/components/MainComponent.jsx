import {useRef, useState, useEffect } from "react"
import IngredientsList from '@/components/IngredientsList'
import RecipeList from '@/components/RecipeList'
import RecipeSelector  from "@/components/RecipeSelector"

export default function MainComponent() {

const [savedRecipes, setSavedRecipes] = useState(() => {
    const localData = localStorage.getItem('myRecipes');
    return localData ? JSON.parse(localData) : [];
})
const [formVisibility, setFormVisibility] = useState(true)
const [listVisibility, setListVisibility] = useState(false)
const [showRecGenPrompt, setShowRecGenPrompt] = useState(false)
const [recipe, setRecipe] = useState("")
const [recipeName, setRecipeName] = useState("")
const [loading, setloading] = useState(false)
const [err, setErr] = useState(null)
const [ingredients, setIngredients] = useState(["all the main spices"])
const [showRecipeSelector, setShowRecipeSelector] = useState(false)
const [errDiv, setErrDiv] = useState(false)
const errRef = useRef(null)
const loadingRef = useRef(null)

const addIngredients= (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newIngredient = formData.get('ingredient')?.trim()

    if (newIngredient === ""){
        return alert('Please type in your ingredients')
    }

    if (ingredients.includes(newIngredient)){
        return alert(`Ingredients already include: ${newIngredient}`)}
    
    setIngredients(prev => [...prev, newIngredient])
    e.target.reset()
}


const removeIngredient = (itemToDelete) => setIngredients(prev => prev.filter(item => item !== itemToDelete))

const getRecipe = async(ingredients) => {

    setloading(true);
    setErr(null)
const ingredientsString = ingredients.join(",")
const url = `${import.meta.env.VITE_API_BASE_URL}`;
const requestBody = {
    messages: [
        {
            role: 'user',
            content: ingredientsString
        },
    ]
}
try{
    const response = await fetch(url, {
        method: 'POST',
        headers: {"Content-Type":'application/json'},
        body: JSON.stringify(requestBody)
    })
    const datafile = await response.json();

    if (!response.ok){
        setErr(datafile.error)
        throw new Error(`Server Error: ${response.status}`);}
    
    if (datafile.data.recipe){
        setRecipe(datafile.data.recipe)
        setRecipeName(datafile.data.recipeName)
        setShowRecGenPrompt(false)
        setFormVisibility(false)
    }else {setErr("No recipe returned")}

}catch(error){
setErr(error.message || "Request failed")
setListVisibility(true)
setErrDiv(true)
throw error
}finally {
    setloading(false)
}}


const resetPage = () => {
    setErr(null);
    setIngredients(["all the main spices"]);
    setRecipe("");
    setloading(false)
    setFormVisibility(true)
}

useEffect(() => {
    if(loading && loadingRef.current){loadingRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });}
    if(err && errRef.current){errRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });}
},[loading, err])
useEffect(() => localStorage.setItem('myRecipes', JSON.stringify(savedRecipes)), [savedRecipes])
useEffect(() => {const selectorRequirements = 
recipe === "" &&
ingredients.length === 1 &&
ingredients[0] === "all the main spices" &&
savedRecipes.length > 0;
setShowRecipeSelector(selectorRequirements)}, [recipe, ingredients, savedRecipes])

return(
    <>
    <div className="flex-col mt-[20px]">
        {formVisibility && <form onSubmit={addIngredients} className="flex flex-col justify-center items-center  h-[200px]
        border-b-[1px] shadow-2xs border-[#550000] font-cormorant-garamond "> 
            <input
            type="text"
            name='ingredient'
            placeholder="eg. chicken"
            aria-label="Add ingredients for Recipe"
            autoFocus
            className="w-[90%] max-w-[500px] h-[50px] px-4 text-[20px] input-style "
            />
            <button type="submit"
            className="
            w-[35%] h-[50px] rounded-lg bg-gradient-to-tl from-[#A33232] to-[#743030] my-[20px]  text-[#e1b5b5] font-black shadow-[#EDB1B1] shadow-sm text-[20px]
            transition-all duration-100 hover:scale-[1.03] hover:shadow-lg 
            " >Add Ingredients</button>
        </form>}
        {ingredients.length > 1 && <IngredientsList
        ingredients={ingredients}
        getRecipe={getRecipe}
        removeIngredient={removeIngredient}
        listVisibility={listVisibility}
        setListVisibility={setListVisibility}
        showRecGenPrompt={showRecGenPrompt}
        setShowRecGenPrompt={setShowRecGenPrompt}
        />}

        {loading && <div ref={loadingRef} className="flex flex-col items-center space-y-2">
  <div class="w-20 h-20 border-6 border-[#740909] border-t-transparent rounded-full animate-spin"></div>
  <span class="font-extrabold font-inter text-[20px] text-[#740909] ">Loading Recipe...</span>
</div>}

        {err && errDiv && <div ref={errRef} className="w-full h-[35%] flex-centered my-5">
                <div className="relative w-[350px] h-[120px] flex-centered p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg" role="alert">
  <button type="button" className="absolute text-2xl top-2 right-2 text-red-500 hover:text-red-700" onClick={() => setErrDiv(false)}>
    &times;
  </button>
  <span class="text-[20px] font-inter">Error: {err}
</span></div>
            </div>
}

        {recipe &&
        <RecipeList 
        recipe={recipe}
        recipeName={recipeName}
        resetPage={resetPage}
        setSavedRecipes={setSavedRecipes}
        />}
        {showRecipeSelector && <RecipeSelector 
        savedRecipes={savedRecipes}
        setSavedRecipes={setSavedRecipes}
        />}
    </div>
    </>
)

}