import React, { useState } from 'react';
import './uploadForm.css';
import SpinnerOverlay from '../LoadingScreen/loader';
// import { useHistory } from 'react-router-dom';

function UploadForm() {
    const [inputType, setInputType] = useState("text");
    const [fileInput, setFileInput] = useState("");
    const [textInput, setTextInput] = useState("");

    const [sentences, setSentences] = useState([]);
    const [labels,setLabels] = useState([]);
    // const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);


  // async function query(data) {
  //   const response = await fetch(
  //     "https://api-inference.huggingface.co/models/helinivan/english-sarcasm-detector",
  //     {
  //       headers: { Authorization: "Bearer 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" },
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   const result = await response.json();
  //   return result;
  // }

  function handleInputTypeChange(event) {
    setInputType(event.target.value);
  }

  function handleFileInputChange(event) {
    setFileInput(event.target.files[0].name);
    const file = event.target.files[0];
    const reader = new FileReader();

    console.log(reader)

    reader.onload = () => {
      const lines = reader.result.split("\n");
      const sentences = lines.filter((line) => line.trim() !== "")
                            .map((line) => line.split(",")[0])
                            .map((sentence) => sentence.replace(/\r$/, ""))
                            .map((sentence) => sentence.replace(/\\/g, ""))
                            .map((sentence) => sentence.replace(/"/g, ""))
                            .map((sentence) => sentence.replace(/'/g, ""));

      setSentences(sentences);
    };
    reader.readAsText(file);
  }

  function handleTextInputChange(event) {
    setTextInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(inputType === "text"){
      // console.log(sentences)
      let sentences = [textInput];
        setIsLoading(true);
        console.log(sentences,"testing");
      fetch('http://localhost:5000/getClass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sentences })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data,"Output");
          setIsLoading(false);
          localStorage.setItem('responseData', JSON.stringify(data));
          // window.location.href = '/dashboard';
          alert(data[0].result)
        })
        .catch(error => {
            setIsLoading(false);
            console.error('Error:', error);
        });
    }else{
        console.log(sentences)
        setIsLoading(true);
        fetch('http://localhost:5000/getClass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sentences })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data,"Output");
          setIsLoading(false);
          localStorage.setItem('responseData', JSON.stringify(data));
          window.location.href = '/dashboard';
        })
        .catch(error => {
            setIsLoading(false);
            console.error('Error:', error);
        });
    }

    
  }

  return (
    <div className="upload__container">
      {isLoading && <SpinnerOverlay />}
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    className="upload__input"
                    type={inputType}
                    placeholder={inputType === "file" ? fileInput : "Enter text..."}
                    onChange={inputType === "file" ? handleFileInputChange : handleTextInputChange}
                />
                <select
                    className="upload__select"
                    onChange={handleInputTypeChange}
                >
                    <option value="text">Text</option>
                    <option value="file">Dataset File</option>
                </select>
            </div>

            <div>
                <button type="submit" className="upload__button">
                Start Classification
                </button>
            </div>
        </form>
    </div>
  );
}

export default UploadForm;