import { createAppSlice } from "../../app/createAppSlice"
export const manufacturerSlice = createAppSlice({
    name: "manufacturer",
    initialState: {
        manufacturer: ['Chevrolet', 'Suzuki', 'Kia', 'Ford', 'Volvo'],
    },
    reducers: {
        save: (state, param) => {
            const { payload } = param;
            state.manufacturer = [...state.manufacturer, payload];
        },

    }
});
const { actions, reducer } = manufacturerSlice
export const { save } = actions;
export default reducer;