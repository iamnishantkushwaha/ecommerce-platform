import {createSlice} from "@reduxjs/toolkit"

const initialState={
    items:[]
}
const CartSlice=createSlice({
    name:"cart",
initialState,
reducers:{
    
removefromcart:(state,action)=>{
    
state.items=state.items.filter((item)=>item.product._id!==action.payload)
},

setCart:(state,action)=>{
      state.items=action.payload;
      console.log(action.payload)
}
}


})


export const {removefromcart,setCart}=CartSlice.actions;
export default CartSlice.reducer;