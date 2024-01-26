import { useState } from "react"
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Laptop from '../../laptop.svg'
import {
  save
} from "./carSlice"

const Body = styled.div`
display: flex;
flex-direction: column;
`
const TextHeader = styled.span`
    font-size: 56px;
    font-weight:${props => props.fontWeight ? props.fontWeight : 400};
    line-height: 67px;
    letter-spacing: 0em;
    text-align: left;
    color: #002EFF;
    @media (max-width: 768px){
     
      font-size: 30px;
      line-height: 30px;
      letter-spacing: 0em;
      text-align: left;


    }
`
const TextTitle = styled.span`
  font-size: 30px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;


`
const TextTitleForm = styled.text`

font-size: 20px;
font-weight: 600;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
margin-bottom: 24px;

`
const TextSubtitleForm = styled.span`

  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;



`
const Main = styled.div`
  width: 60%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 margin-left: auto;
 margin-right: auto;
 @media (max-width: 768px) {
  width: 90%;
  
}
`
const Fieldset = styled.div`
position: relative;


`
const Input = styled.input`
  border: 1px solid #002EFF;
border-radius: 6px;
position: relative;
width: 200px;
margin: 10px;
line-height: 6ex;
width: ${props => props.width ? props.width : '255px'};
@media (max-width: 768px) {
  width: 320px;
  
}
`
const Label = styled.label`
position: absolute;
top: 0.2ex;
z-index: 1;
left: 24px;
background-color: white;
color: #002EFF;
font-size: 14px;
padding: 0 5px;
&:after{
  content: '*';
}`
const Error = styled.label`

color: red;
font-size: 14px;
@media (max-width: 768px) {
  display: flex;
  flex-wrap: wrap;
  
}

`
const Select = styled.select`
  border: 1px solid #002EFF;
  border-radius: 6px;
  position: relative;
  width: 255px;
  margin: 10px;
  height: 6ex;
  @media (max-width: 768px) {
  width: 320px;
  
}
`
const Form = styled.div`
padding-top: 65px;
padding-bottom: 10px;
@media (max-width: 768px){
  padding-top: 29px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
`
const FormBlock = styled.div`
display: flex;
@media (max-width: 768px){
  flex-direction: column;
}

`

const Footer = styled.div`
display: flex;
margin-left: auto;
flex-direction: column;

`
const Button = styled.button`
width: 140px;
font-size: 16px;
background-color: #002EFF;
color: #FFFFFF;
border-radius: 100px;
border-width: 0px;
align-self: flex-end;
padding-top: 12px;
margin-top: 24px;
cursor: pointer;
padding-bottom: 12px;
&:disabled{
  background-color: gray;
  cursor: none;
}


@media (max-width: 768px){
  width: 211px;
}

`
const Image =styled.img`
width: 300;
height  : 300;

@media (max-width: 768px){
  width: 124px;
  height: 124px;
}
`
const Header = styled.div`
display: flex;
align-items: center;
justify-content: center;



`
var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto: string) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}

export const Counter = () => {
  const dispatch = useAppDispatch()
  const [sellerName, setSellerName] = useState('');
  const [sellerRut, setSellerRut] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [carManuf, setCarManuf] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [disabledModel, setDisabledModel] = useState(true)
  const [carModels, setCarModels] = useState([]) 
  let carList = useAppSelector((state)=>state.carModel.carModels)
  const manufacturer = useAppSelector((state)=>state.manufacturer.manufacturer)
  console.log(useAppSelector(state=>state))
  const handleName = (event: any)=>{

    setSellerName(event.target.value)
  }

  const handleRut = (event: any)=>{

    setSellerRut(event.target.value)
  }

  const handlePlate = (event: any)=>{

    setCarPlate(event.target.value)
  }
  const handleCarManuf = (event: any)=>{
    
    if(carManuf!==event.target.value || event.target.value!==''){
      setCarManuf(event.target.value)
      setDisabledModel(true)

      let cars= carList.filter((car)=>car.manufacturer===event.target.value)
      setCarModels(cars)
      setDisabledModel(false)
    }
    
  }
  const handleCarModel = (event:any)=>{
    console.log("MODELO", event.target.value)
    if(carManuf!==event.target.value || event.target.value!==''){
      setCarModel(event.target.value)
    }
    
  }

  const handlePrice = (event: any)=>{

    setCarPrice(event.target.value)
  }
  const validate = () =>{
    if(carPrice=='' && carModel==''&& carManuf=='' && carPlate && (sellerRut==='' || Fn.validaRut(sellerRut)==false) && sellerName==''){
      return true
    }
    return false
  }
  function submitForm(){
    let id = Date.now()
    const newCar = {
      id: id,
      sellerName: sellerName,
      sellerRut: sellerRut,
      carPlate: carPlate,
      carManuf: carManuf,
      carModel: carModel,
      carPrice: carPrice

    }
    dispatch(save(newCar))

    alert('Vehículo registrado correctamente')
    setSellerName('')
    setSellerRut('')
    setCarPlate('')
    setCarManuf('')
    setCarModel('')
    setCarPrice('')
    setDisabledModel(true)
  }


  return (
    <Main>

      <Header>
        <div >
        <TextHeader>
        Formulario
        </TextHeader>
        <TextHeader fontWeight={"600"}> de Prueba</TextHeader>
        </div>
        
        <Image src={Laptop}/>
      </Header>
      <hr/>
      <Body>
        <div><TextTitle>Nuevo formulario</TextTitle></div>
      <div><TextSubtitleForm>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the bed industry's standard dummy text ever since.</TextSubtitleForm></div>
      
      <Form>
        <TextTitleForm>Datos del vendedor:</TextTitleForm>
        <FormBlock>
        <Fieldset>
          <Label>Nombre completo</Label>
          <Input value={sellerName} type="text" required onChange={handleName}></Input>
        </Fieldset>
        <Fieldset>
          <Label>Rut Vendedor</Label>
          <Input type="text" value={sellerRut} onChange={handleRut} placeholder="12345678-9" required ></Input>
          {sellerRut!=='' && Fn.validaRut(sellerRut)===false?
            <Error>Rut no válido</Error>:<></>

          }
        </Fieldset>
        </FormBlock>
        <hr/>
        
        <TextTitleForm>Datos del vehículo:</TextTitleForm>
        <FormBlock>
        <Fieldset>
          <Label>Patente del vehículo</Label>
          <Input type="text" value={carPlate} onChange={handlePlate} maxLength={7} required></Input>
        </Fieldset>
        <Fieldset>
          <Label>Marca del vehiculo</Label>
          <Select onChange={handleCarManuf}>
            <option value={''}>Seleccione una marca...</option>
            {manufacturer.map((m: string)=>{
              return(
              <option value={m}>{m}</option>
              )
            })

            }
          </Select>
        </Fieldset>
        
        <Fieldset>
          <Label>Modelo del vehiculo</Label>
          <Select disabled={disabledModel} onChange={handleCarModel}>
            <option value={''}>Seleccione un modelo...</option>
            {carModels.map((car)=>{
              return(
              <option value={car.name}>{car.name}</option>
                )
              })
            }
          </Select>
        </Fieldset>
        <Fieldset>
          <Label>Precio del vehículo</Label>
          <Input value={carPrice} type="number" onChange={handlePrice}></Input>
        </Fieldset>
        </FormBlock>
        <hr/>
        <Footer><Button onClick={()=>submitForm()}>Enviar</Button></Footer>
      </Form>
      </Body>
    </Main>
  )
}
