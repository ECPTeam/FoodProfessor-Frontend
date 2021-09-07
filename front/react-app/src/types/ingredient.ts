export type Ingredient = {
  id: number
  ingredientName: string
  quantity: string
  recipeId: number
  createdAt: Date
  updatedAt: Date
}

export type ingredientParamsType = {
  // formDataでキャメルケースに変換できないためスネークケースに
  ingredient_name: string | null | undefined
  quantity: string | null | undefined
}

export type ingredientApiData = {
  ingredientName: string | null | undefined
  quantity: string | null | undefined
}
