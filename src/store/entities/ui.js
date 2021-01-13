import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'ui',
  initialState: {
    loadingScreen: false,
    classes: '',
    phoneMenu: false,
  },
  reducers: {
    loadingSet: (ui, action) => {
      ui.loadingScreen = action.payload
    },
    loadingClassSet: (ui, action) => {
      ui.classes = action.payload
    },
    phoneMenuSwitched: (ui, action) => {
      ui.phoneMenu = action.payload
    },
  },
})

export default slice.reducer

//actions
const actions = slice.actions
export const setLoading = (value) => {
  return actions.loadingSet(value)
}
export const setLoadingClass = (value) => actions.loadingClassSet(value)

export const switchPhoneMenu = (value) => actions.phoneMenuSwitched(value)
