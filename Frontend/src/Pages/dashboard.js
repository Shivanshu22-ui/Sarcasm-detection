import React, { useState, useEffect }  from "react";
import Navbar from '../Components/NavBar/Navbar'
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Dashboard/Header';
import './dashboard.css'
import PieChart from '../Components/Dashboard/PieChart';
import DataRecord from "../Components/Dashboard/DataRecord";
import CsvDownloadButton from 'react-json-to-csv'

function Dashboard() {

  const [sarcasmNumber, setSarcasmNumber] = useState(110);
  const [regularNumber, setRegularNumber] = useState(20);
  const [totalNumber, setTotalNumber]     = useState(130)
  const [classArr, setClassArr] = useState([]);

  const [cleanedArr, setCleanedArr] = useState([]);

  
  useEffect(() => {

    let responseData = JSON.parse(localStorage.getItem("responseData"));
    console.log(responseData.labels.length)
    setClassArr(responseData.labels)
    let totalcount = responseData.labels.length
    setTotalNumber(totalcount)

    let sarcasmCounter = 0
    let tempCleanedArr = []
    responseData.labels.forEach(element => {
      if(element.class === 'Sarcasm'){
        sarcasmCounter = sarcasmCounter+1
      }else{
        tempCleanedArr.push({"Tweet":element.sentence})
      }
    });
    setCleanedArr(tempCleanedArr)
    setSarcasmNumber(sarcasmCounter)
    setRegularNumber(totalcount-sarcasmCounter)
    console.log("Sarcasm",sarcasmNumber)
    console.log("Regular",regularNumber)

    console.log(cleanedArr)

  }, []);


  const organizeDownloadFile = () => {
    let responseData = JSON.parse(localStorage.getItem("responseData"));
    let tempCleanedArr = []
    responseData.labels.forEach(element => {
      console.log(element)
      if(element.class !== 'Sarcasm'){
        tempCleanedArr.push({"Tweet":element.sentence})
      }
    });
    setCleanedArr(tempCleanedArr)

  }

  const changeClass = (sentence,label) => {

    const updatedArr = classArr.map(record => {
      if (record.sentence !== sentence) {
        return record;
      } else {
        if(label === "Sarcasm"){

          return {
            ...record,
            class: "Regular",
          };

        }else{

          return {
            ...record,
            class: "Sarcasm",
          };

        }
      }
    });
    setClassArr(updatedArr);
    localStorage.setItem('responseData', JSON.stringify({"labels":updatedArr}));
    console.log(classArr)
    organizeDownloadFile()
  }


  const deleteRecord = (stenence) => {
    const updatedClassArr = classArr.filter(obj => obj.sentence !== stenence);
    setClassArr(updatedClassArr)
    localStorage.setItem('responseData', JSON.stringify({"labels":updatedClassArr}));
    organizeDownloadFile()
  }


  return (
    <div>
      <Navbar/>

      <div className="dashboard">

        <div className="column">
          <PieChart sarcasmNumber={sarcasmNumber} regularNumber={regularNumber}/>
          <Header sarcasmNumber={sarcasmNumber} totalNumber={totalNumber}/>
        </div>

        <div className="column">
          <div className="downloadFile">DonwloadFile</div>
          <CsvDownloadButton data={cleanedArr}  />
        </div>

      </div>



      <div className="dashboard">
        <div className="column">
            {/* data list for sarcastic class */}
            <h1 className="heading">Sarcasm Class</h1>
            <p className="columnIntro">Following Records are the sarcastic Tweets found in the dataset. You can delete them or manually change the data record class</p>
            <div className='datalist'>


              {/* {sarcasmArr.map((sentence, index) => (
                  <DataRecord key={index} sentence={sentence} label="Sarcasm" />
              ))} */}

              {classArr.map((item, index) => {
                  return item.class === "Sarcasm" ? (
                    <DataRecord key={index} sentence={item.sentence} label="Sarcasm" deleteRecord={deleteRecord} changeClass={changeClass}/>
                  ) : (null);
              })}



            </div>
        </div>
        <div className="column">
            {/* data list for regular class */}
            <h1 className="heading">Regular Class</h1>
            <p className="columnIntro">Following Records are the regular Tweets found in the dataset. You can delete them or manually change the data record class</p>
            {/* {regularArr.map((sentence, index) => (
                <DataRecord key={index} sentence={sentence} label="Regular" />
              ))} */}

                {classArr.map((item, index) => {
                  return item.class === "Regular" ? (
                    <DataRecord key={index} sentence={item.sentence} label="Regular" deleteRecord={deleteRecord}  changeClass={changeClass}/>
                  ) : (null);
                })}

        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default Dashboard;