import ReactMarkdown from "react-markdown"

export default function Recipe(props) {
    return(
        <article className="w-full lg:w-2/3 flex flex-col gap-2" aria-live="polite">
            <h2>Here's a recipe...</h2>
            <section className="text-2xl max-w-none p-4 bg-amber-100 prose">
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </section>
        </article>
    )
}