import DatePickerForm from './components/Form'
import Header from './components/Header'
import CustomizedTables from './components/Table'
import axios from 'axios'
import { useState } from 'react'

function App() {  

  const [brandsData, setBrandsData] = useState([])

  const callBackFunction = (range) => {

    let date = range[0]
    let startDate = date['startDate'].getTime()
    let endDate = date['endDate'].getTime()

    if(date['endDate'] > new Date() || startDate == endDate){
      alert("Please insert a valid range!")
      return;
    }

    let url = "https://socialinsider-backend.herokuapp.com/getData" 
    let data = {
      start: startDate,
      end: endDate
    }

    axios.post(url, data, {
      crossDomain: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
    .then(response => 
      setBrandsData(response.data)
    );
  }

  return (
    <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Header/>
      <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: '20px'}}> 
        <DatePickerForm callBackFunc={callBackFunction}/>
        <CustomizedTables brandsData = {brandsData}/>
      </div>
    </div>
  );
}

export default App;
