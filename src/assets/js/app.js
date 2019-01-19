import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
// require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

import slick from 'slick-carousel/slick/slick.min.js';

$(document).foundation();
$('.featured-slider').slick({
    arrows: false,
    dots: true,
    // slide: '.featured-slider__item',
    appendDots: 'featured-slider__dots',
    autoplay: true,
    autoplaySpeed: 3000,
});

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
// let calories = 1.3;
// let prices = 1.7;

peopleQuont.addEventListener('input', calculate);
daysQuont.addEventListener('input', calculate);

// const producers = document.querySelectorAll('[name="producer"]');
// producers.forEach(element => {
//     element.addEventListener('change', updateCalc);
// });

let orderList = document.querySelectorAll('.product-select');
orderList.forEach(element => {
    element.addEventListener('change', selectInput);
    element.addEventListener('input', selectInput);
    // console.log(element);
});

function selectInput(event) {
    let input = event.target;
    // console.log(input);
    let orderItem = input.closest('.product-select');
    let cal = orderItem.querySelector('[name="calories"]');
    // let cals = Array.from(document.querySelectorAll('[name="calories"]')).reduce((accumulator, currentValue) => {
    //     console.log(currentValue.value)
    //     return accumulator + parseInt(currentValue.value);
    // }, 1);
    const price = orderItem.querySelector('[name="price"]');
    calculate(cal, price, input.value);
}

function calculate(cal, price, input) {
    cal.value = (daysQuont.value * peopleQuont.value * input).toFixed(1) + " kcal";
    price.value = (daysQuont.value * peopleQuont.value * 0.83 * input).toFixed(1) + " UAH";
    // setGrams.textContent = cals * peopleQuont.value * daysQuont.value + " g";
};

// function updateCalc() {
//     switch (this.value) {
//         case "German":
//             {
//                 prices = 1.3;
//                 calories = 1.7;
//                 break;
//             }
//         case "UK":
//             {
//                 prices = 1.7;
//                 calories = 2.6;
//                 break;
//             }
//         case "Ukraine":
//             {
//                 prices = 1;
//                 calories = 2;
//                 break;
//             }
//         case "France":
//             {
//                 prices = 1.5;
//                 calories = 1.9;
//                 break;
//             }
//     }
//     calculate(cal, price, input.value);
// }