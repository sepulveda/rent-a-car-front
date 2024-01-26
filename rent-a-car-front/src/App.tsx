import { Counter } from "./features/counter/carForm"
import { Quotes } from "./features/counter/carList"
import {useState} from 'react'
import styled from 'styled-components';

const Button = styled.button<{active: boolean}>`
    background-color: ${props => props.active? "#F3F5FF": "transparent"} ;;
    cursor: pointer;
    border-radius: 24px;
    padding: 8px 16px 8px 16px;
    border: 0px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #002EFF;
    margin-right: 18px;
    margin-top: 25px;
    margin-bottom: 25px;
    @media (max-width: 768px){
      background-color: transparent;
      padding: 8px 0px 0px 0px; 
      border-bottom: ${props => props.active? "1px solid": "0px"} ;
      font-weight: ${props => props.active? "600": "400"};
      border-color: #0C0C0C ;
      border-radius: 0px;
      color: #0C0C0C;
      
    }

  `; 

  const Header = styled.div`
  display: flex;
  height: 90px;
  justify-content: end;
  box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.15);
  
  
  `
const App = () => {

  const [selectedItem, setSelectedItem] = useState('formulario')

  


  const handleSelectedItem = (select: string) =>{
    if(select!==selectedItem){
      setSelectedItem(select)
    }
  }



  return (
    <div>
    <Header >
     <Button onClick={()=>handleSelectedItem('formulario')} active={selectedItem==='formulario'? true:false} >Formulario</Button>
     
     <Button onClick={()=>handleSelectedItem('lista formulario')}active={selectedItem==='lista formulario'? true:false}>Lista formulario</Button>

    </Header>
    {selectedItem==='formulario'?
      <Counter></Counter>
      :
      <Quotes></Quotes>
    }
    </div>
   
  )
}

export default App
