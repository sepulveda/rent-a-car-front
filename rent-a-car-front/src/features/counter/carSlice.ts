
import { createAppSlice } from "../../app/createAppSlice"


export interface Car {
  id: number
  sellerName: string,
  sellerRut: string,
  carPlate: string,
  carManuf: string,
  carModel: string,
  carPrice: number

}
export interface CarsArraySliceState{
  cars: Car[]
  count: number
  
}
const initialState: CarsArraySliceState = {cars:[{id: 123456, sellerName: 'Pedro Picapiedra', sellerRut: '111111-1', carPlate: 'P1EDR4', carManuf:'Picapiedra', carModel: 'Troncomovil', carPrice:100 }], count: 1}


export const carSlice = createAppSlice({
  name: "car",
  initialState,
  reducers: create => ({
    save: create.reducer((state,param) => {
      const { payload } = param;
      state.cars = [...state.cars, payload];
      state.count= state.count+1;
    }),
    remove: create.reducer((state, param)=>{
        const {payload} = param
        console.log("en reducer", payload, state)
        let index = state.cars.findIndex((e)=>e.id===payload)
        let newCars = []
        for(var i=0; i<state.cars.length;i++){
          if(i!==index){
            newCars=[...newCars, state.cars[i]]
          }
        }
        state.cars=[...newCars]
        state.count=state.count-1
        
    })


  }),
  selectors: {
    selectCars: (state=>{
      let lastCars = state.cars.slice(-10)
      lastCars.reverse()
      return lastCars
    }),
    selectCount: state=>state.count
  },
})

export const { save, remove } =
  carSlice.actions

export const { selectCars, selectCount } = carSlice.selectors
