import React, { useCallback } from 'react'

import ReactTagInput from '@pathofdev/react-tag-input'
import '@pathofdev/react-tag-input/build/index.css'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'

import { ingredientParamsType } from 'types/ingredient'
import { procedureParamsType } from 'types/procedure'

type RecipeParamProps = {
  recipeName: string
  setRecipeName: (e: string) => void
  recipeTime: number
  setRecipeTime: (e: number) => void
  forHowManyPeople: number
  setForHowManyPeople: (e: number) => void
  setRecipeImage: (e: File) => void
  ingredientParams: ingredientParamsType[]
  setIngredientParams: (e: ingredientParamsType[]) => void
  numberOfIngredientForms: number
  setNumberOfIngredientForms: (e: number) => void
  categories: string[]
  setCategories: (e: string[]) => void
  procedureParams: procedureParamsType[]
  setProcedureParams: (e: procedureParamsType[]) => void
  numberOfProcedureForms: number
  setNumberOfProcedureForms: (e: number) => void
  sendRecipeData: () => void
}

const RecipeForm: React.FC<RecipeParamProps> = (props) => {
  const addIngredientForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    props.setIngredientParams([...props.ingredientParams, { ingredient_name: '', quantity: '' }])
    props.setNumberOfIngredientForms(props.numberOfIngredientForms + 1)
  }

  const addProcedureForms = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    props.setProcedureParams([...props.procedureParams, { procedure_content: '' }])
    props.setNumberOfProcedureForms(props.numberOfProcedureForms + 1)
  }

  // うまく行かないため中止
  // const deleteIngredientForm = (e: React.MouseEvent<HTMLButtonElement>, index: number): void => {
  //   e.preventDefault()
  //   // こうすると最初の要素が消されてエラーになる
  //   props.setNumberOfIngredientForms(numberOfIngredientForms - 1)
  //   props.setIngredientParams(ingredientParams.splice(index, 1))
  //   console.log(ingredientParams)
  // }

  const inputIngredientName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
    // quantityのvalueを取得してingredientNameの入力時にそのquantityをセット
    const quantityValue = document.getElementById('quantityOf' + String(index))
    const ingredientColumnCopy = props.ingredientParams.slice()
    ingredientColumnCopy[index] = {
      ingredient_name: e.target.value,
      quantity: quantityValue?.getAttribute('value'),
    }
    props.setIngredientParams(ingredientColumnCopy)
  }

  const inputQuantity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
    // ingredientNameのvalueを取得してquantityの入力時にそのingredientNameをセット
    const ingredientNameValue = document.getElementById('ingredientNameOf' + String(index))
    const ingredientColumnCopy = props.ingredientParams.slice()
    ingredientColumnCopy[index] = {
      ingredient_name: ingredientNameValue?.getAttribute('value'),
      quantity: e.target.value,
    }
    props.setIngredientParams(ingredientColumnCopy)
  }

  const inputProcedureContent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
    const procedureColumnCopy = props.procedureParams.slice()
    procedureColumnCopy[index] = {
      procedure_content: e.target.value,
    }
    props.setProcedureParams(procedureColumnCopy)
  }

  const uploadRecipeImage = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.files) {
      const file: File = e.currentTarget.files[0]
      props.setRecipeImage(file)
    }
  }, [])

  const recipeData = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    window.scrollTo(0, 0)
    props.sendRecipeData()
  }

  return (
    <form noValidate autoComplete="off">
      <Card className="max-w-2xl mx-auto px-2 py-2">
        <p className="text-center my-4 font-semibold text-3xl">レシピ登録</p>
        {props ? (
          <CardContent>
            <p className="w-32 mb-4 py-2 text-center bg-darkRed rounded-full">
              <span className="font-bold text-orange">レシピ名</span>
            </p>
            <div className="text-center">
              <TextField
                variant="outlined"
                required
                fullWidth
                label="レシピ名"
                value={props.recipeName}
                margin="dense"
                className="mr-2 mb-4 max-w-xl"
                onChange={(event) => props.setRecipeName(event.target.value)}
              />
            </div>
            <label htmlFor="recipeImage" className="mr-4 cursor-pointer">
              画像（任意）
            </label>
            <input
              accept="image/*,.png,.jpg,.jpeg,.gif"
              id="recipeImage"
              type="file"
              className="mt-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadRecipeImage(e)
              }}
            />
            <p className="w-28 mt-12 mb-4 py-2 text-center bg-darkRed rounded-full">
              <span className="font-bold text-orange">材料</span>
            </p>
            <div>
              <TextField
                variant="outlined"
                required
                type="number"
                inputProps={{ min: 0 }}
                value={props.forHowManyPeople}
                margin="dense"
                className="mb-4 w-20"
                onChange={(event) => props.setForHowManyPeople(Number(event.target.value))}
              />
              <span className="relative top-4 left-2 text-xl font-medium">人分</span>
            </div>
            {/* numberOfIngredientForms(1)個フォームを表示し、ボタンで追加 */}
            {[...Array(props.numberOfIngredientForms)].map((_, index: number) => (
              <div key={index}>
                <div className="flex justify-around">
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    label="材料名"
                    id={'ingredientNameOf' + String(index)}
                    value={props.ingredientParams[index].ingredient_name}
                    className="mb-4 mr-2"
                    onChange={(event) => inputIngredientName(event, index)}
                  />
                  <TextField
                    variant="outlined"
                    label="分量"
                    required
                    id={'quantityOf' + String(index)}
                    value={props.ingredientParams[index].quantity}
                    margin="dense"
                    className="mr-2"
                    onChange={(event) => inputQuantity(event, index)}
                  />
                </div>
              </div>
            ))}
            <div className="text-right">
              <button
                className="mr-14 mt-2 px-4 py-1 bg-orange text-white font-bold rounded-sm maxSm:mr-4"
                onClick={(e) => addIngredientForm(e)}
              >
                +
              </button>
            </div>

            <p className="w-36 mt-12 mb-4 py-2 text-center bg-darkRed rounded-full">
              <span className="font-bold text-orange">カテゴリ</span>
            </p>
            <ReactTagInput
              placeholder="カテゴリ名(Enterで登録)"
              maxTags={10}
              editable={true}
              readOnly={false}
              removeOnBackspace={true}
              tags={props.categories}
              onChange={(newCategories) => props.setCategories(newCategories)}
            />

            <p className="w-28 mt-12 mb-4 py-2 text-center bg-darkRed rounded-full">
              <span className="font-bold text-orange">手順</span>
            </p>
            <TextField
              variant="outlined"
              label="調理時間"
              type="number"
              required
              value={props.recipeTime}
              inputProps={{ min: 0 }}
              margin="dense"
              onChange={(event) => props.setRecipeTime(Number(event.target.value))}
            />
            <span className="relative top-4 left-2 text-xl font-medium">分</span>

            {/* numberOfProcedureForms(1)個フォームを表示し、ボタンで追加 */}
            {[...Array(props.numberOfProcedureForms)].map((_, index: number) => (
              <div key={index}>
                <p className="text-xl font-middle">{index + 1} .</p>
                <TextField
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  fullWidth
                  value={props.procedureParams[index].procedure_content}
                  label="内容"
                  margin="dense"
                  onChange={(event) => inputProcedureContent(event, index)}
                />
                <hr className="text-brown my-4" />
              </div>
            ))}
            <div className="text-right">
              <button
                className="mt-2 px-4 py-1 bg-orange text-white font-bold rounded-sm"
                onClick={(e) => addProcedureForms(e)}
              >
                +
              </button>
            </div>
            <button
              type="submit"
              className="block mt-8 mb-4 mx-auto px-10 py-2 rounded-full bg-lightGreen text-white"
              onClick={(e) => recipeData(e)}
            >
              投稿
            </button>
          </CardContent>
        ) : (
          <></>
        )}
      </Card>
    </form>
  )
}

export default RecipeForm
