export type Recipe = {
  id: number
  recipeName: string
  recipeImage: {
    url: string
  }
  recipeTime: number
  forHowManyPeople: number
  userId: number
  createdAt: Date
  updatedAt: Date
}
