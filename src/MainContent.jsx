import React from "react"
import Recipe from "./components/Recipe"
import IngredientsList from "./components/IngredientsList"
import { getRecipeFromDeepSeek } from "./ai"

export default function MainContent() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const isProduction = import.meta.env.PROD;

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    async function toggleGenerateRecipe() {
        setLoading(true)
        setRecipe("")
        try {
            //for production
            if (isProduction) {
                const response = await fetch(`${import.meta.env.BASE_URL}mockDemo.md`)
                const mockRecipe = await response.text()
                setRecipe(mockRecipe);
                return;
            }
            //for dev
            const generatedRecipe = await getRecipeFromDeepSeek(ingredients);
            setRecipe(generatedRecipe);
        } catch (error) {
            console.error("Error generating recipe: ", error);
        } finally {
            setLoading(false)
        }
    }

    return(
        <main className="flex flex-col gap-8 p-4 w-full h-full bg-white justify-center items-center font-body text-2xl">

            <p className="font-bold">What ingredients do you have?</p>
            <form action={addIngredient} className="flex gap-4 w-full justify-center items-start flex-wrap">
                <input type="text" placeholder="enter ingredient..." className="grow w-full sm:w-1/2" aria-label="add ingredient" name="ingredient" />
                <button>add ingredient</button>
            </form>

            {/* Display list of Ingredients */}
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} toggleGenerateRecipe={toggleGenerateRecipe} loading={loading} /> }

            {/* Display recipe section */}
            {recipe && <Recipe recipe={recipe} /> }
        </main>
    )
}