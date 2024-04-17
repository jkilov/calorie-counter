const form = document.getElementById("cal-form");
const calBudget = document.getElementById("cal-budget");
const dropDown = document.getElementById("dropdown");
const addEntryBtn = document.querySelector(".add-entry-btn");
const output = document.getElementById('output');
const clearBtn = document.getElementById('clear-btn')
let isError = false;



function cleanInputString (str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

isInvalidInput = (str) => {
    const regex = /\d+e\d/i;
    return str.match(regex);
}


addEntry = () => {
const targetInputContainer = document.querySelector(`#${dropDown.value} .input-container`);
const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length +1;
const HTMLString = 
`
<div>
<label for="${dropDown.value}-${entryNumber}-name">${dropDown.value} ${entryNumber} Name</label>
<input type="text" placeholder="Name" id="${dropDown.value}-${entryNumber}-name" />
<label for="${dropDown.value}-${entryNumber}-calories">${dropDown.value} ${entryNumber} Calories</label>
<input type="number" placeholder="calories" id="${dropDown.value}-${entryNumber}-calories" />
<div>
`
targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);

}

function calculateCalories (e) {
    e.preventDefault();
    isError = false;

    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]')
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');


const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
const budgetCalories = getCaloriesFromInputs([calBudget]);

if (isError) {
    return;
}

const consumedCalories = breakfastCalories + lunchCalories  + dinnerCalories + snacksCalories;
const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
output.innerHTML = 
`
<h1><span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span></h1>
<hr>
<p>${budgetCalories} Calories Budgeted</p>
<p>${consumedCalories} Calories Consumed</p>
<p>${exerciseCalories} Calories Burned </p>
`
output.classList.remove('hide')


}

function getCaloriesFromInputs (list){
   let calories = 0

   for (const item of list){
    const currVal = cleanInputString(item.value)
    const invalidInputMatch = isInvalidInput(currVal)

    if (invalidInputMatch) {
        alert(`invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
    }
calories += Number(currVal)
   }
   return calories;

}

clearForm = () => {

    const inputContainers = Array.from(document.querySelectorAll('.input-container'))

    for (const container of inputContainers) {
        container.innerHTML ="";
        calBudget.value ="";
        output.innerHTML = "";
        output.classList.add('hide');

    }
}





addEntryBtn.addEventListener('click', addEntry);
form.addEventListener('submit', calculateCalories );
clearBtn.addEventListener('click', clearForm);