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
    dots: false,
    slide: '.featured-slider__item',
    // appendDots: 'featured-slider__dots',
    autoplay: true,
    autoplaySpeed: 3000,
});
const beef = document.getElementById('beef');
const chicken = document.getElementById('chicken');
const fish = document.getElementById('fish');

// let productIndex = document.querySelectorAll('.product-name');

let cal = document.getElementById('calories');
const price = document.getElementById('price');
let calories = 1.3;
let prices = 1.7;

const producers = document.querySelectorAll('[name="producer"]');
producers.forEach(element => {
    element.addEventListener('change', updateCalc);
});

// producers.addEventListener('change', updateCalc);

beef.addEventListener('input', calculate);
chicken.addEventListener('input', calculate);
fish.addEventListener('input', calculate);

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

    // calories = this.value;
    // prices = this.value;
    calculate();
}


function calculate() {
    if (this.value > 500) {
        this.value = 500;
    } else if (this.value < 0) {
        this.value = 0;
    }
    cal.value = (calories * beef.value).toFixed(1) + " kcal";
    price.value = (prices * 0.83 * beef.value).toFixed(1) + " UAH";
};