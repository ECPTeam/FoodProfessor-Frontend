export const topPageUrl = '/top'

export const registerUrl = '/auth'
export const loginUrl = '/auth/sign_in'
// export const guestLoginUrl = '/auth/guest_login'
export const logOutUrl = '/auth/sign_out'
export const sessionsUrl = '/auth/sessions'

export const profileUrl = (userId: number): string => `/users/${userId}`
export const editProfileUrl = (userId: number): string => `/users/${userId}/edit`
export const updateProfileUrl = '/auth'

export const recipeDetailUrl = (recipeId: number): string => `/recipes/${recipeId}`
export const createRecipeUrl = '/recipes'
export const editRecipeUrl = (recipeId: number): string => `/recipes/${recipeId}/edit`
export const updateRecipeUrl = (recipeId: number | undefined): string => `/recipes/${recipeId}`
export const deleteRecipeUrl = (recipeId: number | undefined): string => `/recipes/${recipeId}`

export const createCommentUrl = (recipeId: number | undefined): string => `/recipes/${recipeId}/comments`
export const deleteCommentUrl = (recipeId: number | undefined, commentId: number | undefined): string =>
  `/recipes/${recipeId}/comments/${commentId}`

export const favoriteRecipeUrl = '/favorites'
export const unFavoriteRecipeUrl = (recipeId: number | undefined, currentUserId: number | undefined): string =>
  `/favorites/${recipeId}/users/${currentUserId}`

export const searchRecipesUrl = (recipeName: string): string => `/recipes/search/${recipeName}`
export const ingredientRecipesUrl = (ingredientName: string): string => `/ingredients/${ingredientName}/recipes`
export const categoryRecipesUrl = (categoryName: string): string => `/categories/${categoryName}/recipes`
