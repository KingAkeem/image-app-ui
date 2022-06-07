import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

const Units = new Set(["cup", "gram", "calorie", "percentage", "milligram"]);
const Nutrients = new Set(["Serving Size", "Calories", "Total Fat", "Cholesterol", "Dietary Fiber", "Total Carbohydrate", "Sugars", "Protein", "Vitamin A", "Sodium"]);

function Row(props) {
  const {id, title, value} = props;
  return (
    <div class="form-group row">
      <label for={id} class="col-sm-2 form-label">{title}</label>
      <div class="col-sm-10">
        <input readonly class="form-control" type="text" id={id} name={id} value={value}/>
      </div>
    </div>
  );
}

function App() {
  const [image, setImage] = useState(null);
  const[nutrients, setNutrients] = useState({});

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
    console.debug(nutrition_facts) // check if facts are being displayed

    for (const nutrient in nutrition_facts) {
      for (const unit of Units) {
        if (nutrition_facts[nutrient][unit]) {
          const quantity = nutrition_facts[nutrient][unit];
          setNutrients(prevNutrients => ({
            ...prevNutrients,
            [nutrient]: { 
              ...prevNutrients[nutrient],
              [unit]:  quantity
            }
          }))
        }
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Calculate Macros</h1>
      </header>
      <body>
        <form>
          {/* Render nutrition map as rows */}
          {Nutrients.map(nutrient => {
            let value = "";
            Units.forEach((unit, i) => {
              if (nutrients[nutrient] && nutrients[nutrient][unit]) {
                if (value === "") value += `${nutrients[nutrient][unit]} ${unit}`
                else value += ` - ${nutrients[nutrient][unit]} ${unit}`
              }
            })
            return <Row id={nutrient} title={nutrient} value={value}/>;
          })}
          <input
            type="file"
            name="scanImage"
            onChange={(event) => {
              console.debug('setting file', event.target.files[0]); // check if image is being set
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
