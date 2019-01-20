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
const countrySelect = {
    german: {
        calories: 1.3,
        prices: 1.7
    },
    france: {
        calories: 1.5,
        prices: 1.3
    },
    uk: {
        calories: 1.4,
        prices: 1.44
    },
    ukraine: {
        calories: 1.2,
        prices: 1.1
    }
}

var numberDays = $("#number-days");
$(numberDays).on('input', function () {
    numberDays = $(this).val();
    // console.log(numberDays);
});

var numberPeople = $("#number-people")
$(numberPeople).on('input', function () {
    numberPeople = $(this).val();
    // console.log(numberPeople);
});

var counSel = $("[name=producer]");
$(counSel).on('change', function () {
    var countryInfo = countrySelect[$(this).find(":selected").val()];
    var calories = countryInfo["calories"];
    var prices = countryInfo["prices"];
    $(this).siblings('.relative').find('label').attr('data-calories', calories);
    $(this).siblings('.relative').find('label').attr('data-price', prices);
    var item = $(this).closest('.product-select').find('input[type=number]');
    calculate(item);
    // console.log(countryInfo);
});



// console.log(productIndex);

$('.product-select input[type=number]').on('input', function (e) {
    // var productIndex = $(this).siblings('.relative').find('label').data('product-name');
    // var productPrice = $(this).siblings('.relative').find('label').data('price');
    // var productCalories = $(this).siblings('.relative').find('label').data('calories');
    // console.log(productIndex);
    calculate($(this));
});

function calculate(item) {
    var productIndex = item.siblings('.relative').find('label').data('product-name');
    var productPrice = item.siblings('.relative').find('label').data('price');
    var productCalories = item.siblings('.relative').find('label').data('calories');
    var calories = (item.val() * productIndex * productCalories).toFixed(1);
    var price = (item.val() * productIndex * productPrice).toFixed(1);
    console.log(productCalories, productPrice);
    item.siblings("[name=price]").attr('value', price + " UAH");
    item.siblings("[name=calories]").attr('value', calories + " kcal");
}