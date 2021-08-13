type RecipeImage = {
  url: string | null
}

export type Recipe = {
  id: number
  recipeName: string
  recipeImage?: RecipeImage
  recipeTime: number
  userId: number
  folderId: number
}
