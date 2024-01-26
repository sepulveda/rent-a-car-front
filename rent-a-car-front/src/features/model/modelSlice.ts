import { createAppSlice } from "../../app/createAppSlice"
export const carModelSlice = createAppSlice({
    name: "carModel",
    initialState: {
        carModels: [
            {name:'Spin', manufacturer: 'Chevrolet'}, 
            {name: 'Onix', manufacturer: 'Chevrolet'}, 
            {name:'Celerio', manufacturer:'Suzuki'}, 
            {name:'Baleno', manufacturer: 'Suzuki'},
            {name: 'Picanto', manufacturer:'Kia'},
            {name: 'EV6', manufacturer:'Kia'},
            {name: 'Nueva Territory', manufacturer:'Ford'},
            {name: 'F-150', manufacturer:'Ford'},
            {name: 'EX30', manufacturer:'Volvo'},
            {name: 'XC40 Recharge', manufacturer:'Volvo'},
            ]
            ,
    },
    reducers: {
        save: (state, param) => {
            const { payload } = param;
            state.carModels = [...state.carModels, payload];
        },

    }
});
const { actions, reducer } = carModelSlice
export const { save } = actions;
export default reducer;