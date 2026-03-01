export async function getRecipeFromDeepSeek(ingredientsArr) {
  const response = await fetch("http://localhost:3000/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredientsArr }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = await response.json();
  return data.recipe;
}