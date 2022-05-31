import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

const units = ["cup", "gram", "calorie", "percentage", "milligram"];

function Row(props) {
  const {id, title, value } = props;
  return(
    <div class="form-group row">
      <label for={id} class="col-sm-2 form-label">{title}</label>
      <div class="col-sm-10">
        <input readonly class="form-control" type="text" id={id} name={id} value={value}/> 
      </div>
    </div>
  );
}
function App() {
  const [servingSizeCup, setServingSizeCup] = useState("");
  const [servingSizeGram, setServingSizeGram] = useState("");

  const [calories, setCalories] = useState("");

  const [fat, setFat] = useState("");
  const [sugar, setSugar] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [dietaryFiber, setDietaryFiber] = useState("");
  const [totalCarbs, setTotalCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [vitaminA, setVitaminA] = useState("");

  const [image, setImage] = useState(null);

  const handleScan = async () => {
    if (image == null) {
      console.warn('no image found');
      return;
    } 

    const response = await fetch("http://localhost:5002", {
      method: 'POST',
      body: image
    });
    const nutrition_facts = await response.json();

    if (nutrition_facts["Serving Size"]) {
      setServingSizeCup(nutrition_facts["Serving Size"]["cup"]);
      setServingSizeGram(nutrition_facts["Serving Size"]["gram"])
    }

    if (nutrition_facts["Calories"]) {
      setCalories(nutrition_facts["Calories"]["calorie"]);
    }
    
    if (nutrition_facts["Total Fat"]) {
      setFat(nutrition_facts["Total Fat"]["percentage"])
    }

    if (nutrition_facts["Cholesterol"]["milligram"]) {
      setCholesterol(nutrition_facts["Cholesterol"]["milligram"])
    }

    if (nutrition_facts["Dietary Fiber"]) {
      setDietaryFiber(nutrition_facts["Dietary Fiber"]["gram"])
    }

    if (nutrition_facts["Total Carbohydrate"]) {
      setTotalCarbs(nutrition_facts["Total Carbohydrate"]["gram"])
    }

    if (nutrition_facts["Total Carbohydrate"]) {
      setTotalCarbs(nutrition_facts["Total Carbohydrate"]["gram"])
    }

    if (nutrition_facts["Sugars"]) {
      setSugar(nutrition_facts["Sugars"]["gram"])
    }

    if (nutrition_facts["Protein"]) {
      setProtein(nutrition_facts["Protein"]["gram"])
    }

    if (nutrition_facts["Vitamin A"]) {
      setVitaminA(nutrition_facts["Vitamin A"]["percentage"])
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Calculate Macros</h1>
      </header>
      <body>
        <form>
          <Row id="serving-size" title="Serving Size" value={`${servingSizeCup} cup(s) - ${servingSizeGram}g`}/>
          <Row id="calories" title="Calories" value={`${calories} calories`}/>
          <Row id="total-fat" title="Total Fat" value={`${fat} percentage`}/>
          <Row id="cholesterol" title="Cholesterol" value={`${cholesterol}mg`}/>
          <Row id="dietary-fiber" title="Dietary Fiber" value={`${dietaryFiber}g`}/>
          <Row id="total-carbs" title="Total Carbohydrate" value={`${totalCarbs}g`}/>
          <Row id="sugar" title="Sugar" value={`${sugar}g`}/>
          <Row id="protein" title="Protein" value={`${protein}g`}/>
          <Row id="vitamin-a" title="Vitamin A" value={`${vitaminA} percentage`}/>
          <input
            type="file"
            name="scanImage"
            onChange={(event) => {
              console.log('setting file', event.target.files[0])
              setImage(event.target.files[0]);
            }}
          />
          <input type="submit" value="Scan" onClick={async event => {
            event.preventDefault();
            await handleScan();
          }}/>
        </form>
      </body>
    </div>
  );
}

export default App;
