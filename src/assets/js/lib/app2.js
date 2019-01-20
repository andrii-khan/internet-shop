// const beef = document.getElementById('beef');
// const chicken = document.getElementById('chicken');
// const fish = document.getElementById('fish');
// let cal = document.getElementById('calories');
// const price = document.getElementById('price');
// beef.addEventListener('input', calculate);
// chicken.addEventListener('input', calculate);
// fish.addEventListener('input', calculate);

const daysQuont = document.getElementById('number-days');
const peopleQuont = document.getElementById('number-people');
const setGrams = document.querySelector('.grams');
const countrySelect = {
    german : {
        calories: 1.3,
        prices: 1.7
    },
    france : {
        calories: 1.2,
        prices: 1.5
    },
    uk : {
        calories: 1.4,
        prices: 1.44
    },
    ukraine : {
        calories: 1.2,
        prices: 1.2
    }
}


peopleQuont.addEventListener('input', calculate);
daysQuont.addEventListener('input', calculate);

const producers = document.querySelectorAll('[name="producer"]');
producers.forEach(element => {
    element.addEventListener('change', updateCalc);
});

let orderList = document.querySelectorAll('.product-select');
orderList.forEach(element => {
    element.addEventListener('change', selectInput);
    element.addEventListener('input', selectInput);
    // console.log(element);
});

function selectInput(event) {
    let input = event.target;
    let orderItem = input.closest('.product-select');
    let cal = orderItem.querySelector('[name="calories"]');
    // let cals = Array.from(document.querySelectorAll('[name="calories"]')).reduce((accumulator, currentValue) => {
    //     console.log(currentValue.value)
    //     return accumulator + parseInt(currentValue.value);
    // }, 1);
    const price = orderItem.querySelector('[name="price"]');
    // console.log(input);
    calculate(cal, price, input.value);
}

function calculate(cal, price, input) {
    cal.value = (daysQuont.value * peopleQuont.value * input).toFixed(1) + " kcal";
    price.value = (daysQuont.value * peopleQuont.value * 0.83 * input).toFixed(1) + " UAH";
    // setGrams.textContent = cals * peopleQuont.value * daysQuont.value;
};

function updateCalc() {
    switch (this.value) {
        case "German":
            {
                prices = 1.3;
                calories = 1.7;
                break;
            }
        case "UK":
            {
                prices = 1.7;
                calories = 2.6;
                break;
            }
        case "Ukraine":
            {
                prices = 1;
                calories = 2;
                break;
            }
        case "France":
            {
                prices = 1.5;
                calories = 1.9;
                break;
            }
    }
    calculate(calories, prices);
}