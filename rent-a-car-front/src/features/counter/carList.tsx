import DeleteIcon from '../../delete.svg'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
    save, selectCars, selectCount, remove
  } from "./carSlice"
import styled from "styled-components"
  
const options = [5, 10, 20, 30]

const Table= styled.table`
    font-size: 14px;
    padding-top: 30px;
    padding-bottom: 30px;
    th {
        
        font-size: 16px;
        border-bottom: 1px solid #CCCCCC;
        padding-right: 8px;
        padding-top: 30px;
        padding-bottom: 30px;
    };
    tr{

    }
    td{
        padding-top: 30px;
        padding-bottom: 30px;
        text-align: center;
        border-bottom: 1px solid #CCCCCC;
    }

`
const Title =styled.text`

font-size: 30px;
font-weight: 600;
line-height: 36px;
letter-spacing: 0em;
text-align: left;
color: #191919;
margin-top: 40px;
margin-bottom: 30px;


`
const Img= styled.img`
    cursor: pointer;
`
const Subtitle=styled.text`

font-size: 18px;
font-weight: 400;
line-height: 22px;
letter-spacing: 0em;
text-align: left;
color: #191919;
`

const Header =styled.div`
 display: flex;
 flex-direction: column;
`
const Main =styled.div`
width: 50%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 margin-left: auto;
 margin-right: auto;
`
const BottomText=styled.text`
    text-align: center;
    
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;


`
export const Quotes = () => {
    const dispatch = useAppDispatch()
  const carList = useAppSelector(selectCars)
  const carCount = useAppSelector(selectCount)

  const handleDispatch = (id) =>{
    dispatch(remove(id))
    alert("Registro eliminado.")
  }
  
  // Using a query hook automatically fetches data and returns query values
    return(
    <Main>
        <Header>
            <Title>Lista formulario</Title>
            <Subtitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the bed industry's standard dummy text ever since.</Subtitle>
        </Header>

    {carList.length>0?
        <>
        <Table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Rut vendedor</th>
                    <th>Patente vehículo</th>
                    <th>Marca vehículo</th>
                    <th>Modelo vehículo</th>
                    <th>Precio vehículo</th>
                    <th>Eliminar</th>
                </tr>
                </thead>
                <tbody>
                {carList.map((car)=>{
                    return(
                        
                        <tr>
                            <td>{car.sellerName}</td>
                            <td>{car.sellerRut}</td>
                            <td>{car.carPlate}</td>
                            <td>{car.carManuf}</td>
                            <td>{car.carModel}</td>
                            <td>{car.carPrice}</td>
                            <td><Img src={DeleteIcon} onClick={()=>handleDispatch(car.id)}></Img></td>
                        </tr>
                        
                    )
                    }
                )

                }</tbody></Table>
                <BottomText>Mostrando registros del 1 al {carList.length} de un total de {carCount} registros.</BottomText></>:
        <div><BottomText>No hay autos</BottomText></div>
            
    }


    </Main>)
}
