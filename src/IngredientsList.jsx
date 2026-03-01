export default function IngredientsList(props){

    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return(
        <section className="flex flex-col gap-4 justify-start w-full sm:w-2/3" aria-live="polite">
            <p className="text-4xl text-left uppercase">ingredient list:</p>
            <ul className="mx-10 list-decimal">
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 2 && <section className="flex gap-4 items-center justify-around border-2 flex-wrap p-4 bottom-0" aria-live="polite">
                <div className="flex flex-col gap-2 justify-center items-center text-center">
                    <h2 className="uppercase text-4xl">ready for a recipe?</h2>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                {props.loading ? (
                    <button type="button" className="flex flex-nowrap gap-4 items-center justify-center cursor-not-allowed opacity-70" disabled>
                        <div className="w-6 h-6 border-4 border-t-transparent border-black rounded-full animate-spin"></div>
                        <span>getting a recipe...</span>
                    </button>
                    ) : (
                    <button onClick={props.toggleGenerateRecipe}>get a recipe!</button>
                )}
            </section>}
        </section>
    )
}