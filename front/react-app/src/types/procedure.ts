export type Procedure = {
  id: number
  procedureContent: string
  recipeId: number
  createdAt: Date
  updatedAt: Date
}

export type procedureParamsType = {
  // formDataでキャメルケースに変換できないためスネークケースに
  procedure_content: string | null | undefined
}

export type procedureApiData = {
  procedureContent: string | null | undefined
}
