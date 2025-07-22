import { useRef, useEffect} from 'react';

export default function IngredientsList({ingredients, getRecipe, removeIngredient, listVisibility,setListVisibility, showRecGenPrompt, setShowRecGenPrompt}) {

    const genRef = useRef(null)
    
    const ingredientsListed = [...ingredients].sort().map( ingredient => (
        <div
            key={ingredient}
            className="
            flex-centered border border-[#90a46d] shadow-sm shadow-[#550000] mx-auto rounded-2xl px-4 py-2 my-2 w-[70vw] max-w-[500px]">
            <span className="min-text mx-auto font-merienda" >
            {ingredient.toUpperCase()} 
            </span>
            <button className='text-2xl ml-auto right-[20px]' 
                onClick={() => removeIngredient(ingredient)} aria-label="remove">&times;</button>
        </div>
    ))

    const clicked = (ing) => {
        getRecipe(ing);
        setListVisibility(false)
    }
    
    useEffect(() => {
  
  if(ingredients.length >  1){
    setListVisibility(true)
  }
  if(ingredients.length > 4){
    setShowRecGenPrompt(true)
  }
  if (ingredients.length > 4 && genRef.current) {
    setTimeout(() => {
      genRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  }
}, [ingredients.length, setListVisibility, setShowRecGenPrompt]);
return(
    <section className="flex-centered flex-col mt-10">
        {ingredientsListed.length > 3 && showRecGenPrompt && <div ref={genRef}
    className='flex border rounded-3xl my-[50px] border-[#90a46d] shadow-md shadow-[#550000] bg-gradient-to-tl from-[#e2e9e2] to-[#edf0ed] w-[90%] max-w-[500px] h-[150px] scroll-mt-1 '
    >
        <div
        className='my-[30px] mx-1 flex-col flex-centered gap-2 w-[70%]'><h3 className='mx-auto font-bold font-cormorant-garamond min-text-2 '>What can our chef do with these?</h3>
        <p className='text-center font-merienda min-text'>Generate a recipe base on your ingredients</p></div>
        <button 
        className='mx-auto my-auto w-[25%] right-[100px] h-[40px] rounded-2xl min-text button-style '
        type="button" onClick={()=>clicked(ingredients)}>Get Recipe</button>
     </div>}
     {listVisibility && <div className='flex-centered flex-col '>
      <h2 className="font-black min-text-2 font-libre-caslon-display mb-5 text-[#002100]">Here are your ingredients at hand:</h2>
     <div className="w-[100%]">{ingredientsListed}</div></div>}
    
    </section>
)
}