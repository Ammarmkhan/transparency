import './App.css';
import React, { useState, useEffect } from 'react';
import Workouts from './components/visuals';
import ChartComponent from './components/ChartComponent';
import { useCookies } from 'react-cookie';


function App() {

  // Fetch token from cookies
  const [token] = useCookies(['workout-token']);

  // To fetch data
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/fitness_api/workouts/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['workout-token']}`
      },
    // Comvert response to JSON
    }).then(resp => resp.json())
    .then(resp => setWorkouts(resp))
    .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    if (!token['workout-token']) window.location.href = '/';
  }, [token]);

  // For csv upload
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        console.log(csvOutput);

        // Send csv data to backend
        const handleCsvUpload = (csvData) => {
          fetch('http://localhost:8000/fitness_api/workouts/', {
            method: 'POST',
            headers: {
              'Content-Type': 'text/csv', // Set content type to text/csv
              'Authorization': `Token ${token['workout-token']}`
            },
            body: csvData, // Send raw CSV text
          })
            .then((resp) => resp.json())
            .catch((error) => console.log(error));
        };

        // Call handleCsvUpload with the CSV data
        handleCsvUpload(csvOutput);
      };

      fileReader.readAsText(file);
    }
  };

  // For gmail extraction
  const handleExtractFromGmail = () => {
    fetch('http://localhost:8000/fitness_api/extract-from-gmail/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['workout-token']}`,
        },
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};


  return (
    <div>
      <ChartComponent workouts={workouts}/>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange} />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
        <button onClick={handleExtractFromGmail}>
            EXTRACT FROM GMAIL
        </button>
    </div>
  );
}

export default App;