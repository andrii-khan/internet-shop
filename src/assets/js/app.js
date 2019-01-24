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
    // multiplyPrices();
    // calculate();
});
var numberPeople = $("#number-people")
$(numberPeople).on('input', function () {
    numberPeople = $(this).val();
    // multiplyPrices();
    // calculate(numberPeople);
});
var counSel = $("[name=producer]");
$(counSel).on('change', function () {
    var countryInfo = countrySelect[$(this).find(":selected").val()];
    var calories = countryInfo["calories"];
    var prices = countryInfo["prices"];
    $(this).siblings('.relative').find('label').data('calories', calories);
    $(this).siblings('.relative').find('label').data('price', prices);
    var item = $(this).closest('.product-select').find('input[type=number]');
    calculate(item);
    // console.log(countryInfo);
});
// console.log(productIndex);
$('.product-select input[type=number]').on('input', function (e) {
    
    calculate($(this));
});


function calculate(item) {
    var productIndex = item.siblings('.relative').find('label').data('product-name');
    var productPrice = item.siblings('.relative').find('label').data('price');
    var productCalories = item.siblings('.relative').find('label').data('calories');
    var calories = (item.val() * productIndex * productCalories).toFixed(1);
    var price = (item.val() * productIndex * productPrice).toFixed(1);
    // console.log(productCalories, productPrice);
    item.siblings("[name=price]").attr('value', price + " UAH");
    item.siblings("[name=calories]").attr('value', calories + " kcal");

}

// function multiplyPrices() {
//     $("[name=price]").each(function(){
//         var newPrice = ($(this).val() * numberPeople);
//         console.log(newPrice);
//         $(this).val(newPrice);
//     });
// }
var arrayPrice = [];
var arrayBin = {};
checkEmptyBin()
function generateBin() {
    var orderForm = $('.order-form__content');
    var finalPrice = 0;
    orderForm.text(' ');
    for (const key in arrayBin) {
        
        orderForm.append(
            '<div class="order-form__list">' + '<div class="order-form__name">' + key + '</div>'
            + '<div class="order-form__price">' + arrayBin[key] + '</div>'
            +
            '</div>'
         )
         finalPrice += Number(arrayBin[key].replace("UAH", ''));
        //  console.log(arrayBin[key].replace("UAH", ''));
         
        //  console.log(finalPrice);
    }
    $('.total-price').text(finalPrice + ' UAH');
    checkEmptyBin();
}
function checkEmptyBin(){
    if($.isEmptyObject(arrayBin)){
        $('.bnt-product').css('opacity','0');
    }else{
        $('.bnt-product').css('opacity','1');
    }
}
$('.product-select input[type=checkbox]').on('change', function () {
    var findCalories = $(this).siblings('[name=calories]').val();
    var findPrice = $(this).siblings('[name=price]').val();
    var findProductName = $(this).siblings('.relative').find('label').text();

    // console.log(findCalories, findPrice, findProductName);
    // var orderForm = $('.order-form__content');
    // var orderForm = $('.order-form__list');

    // var orderFormName = $('.order-form__name');
    // var orderFormPrice = $('.order-form__price');
    
    // var arrayItem = (findProductName + ' ' + findPrice);
    var arrayItemName = (findProductName);
    var arrayItemPrice = (findPrice);


    if ($(this).prop("checked") ){

        // arrayListName.push(arrayItemName);

        arrayPrice.push(arrayItemPrice);

        arrayBin[arrayItemName] = arrayItemPrice;
        
        // arrayList.push(arrayItem);
        // console.log(arrayList);
        // orderForm.text(arrayList);
        
        // orderFormName.text(arrayListName);
        // orderFormPrice.text(arrayListPrice);
        generateBin();
        console.log(arrayPrice);

    } else {
        // var index = arrayList.indexOf(arrayItem);
        delete arrayBin[arrayItemName];
        console.log(arrayBin);
        // var indexName = arrayListName.indexOf(arrayItemName);
        // var indexPrice = arrayListPrice.indexOf(arrayItemPrice);

        // arrayList.splice(index, 1);

        // arrayListName.splice(indexName, 1);
        // arrayListPrice.splice(indexPrice, 1);

        // orderForm.text(arrayList);

        // orderFormName.text(arrayListName);
        // orderFormPrice.text(arrayListPrice);

        // console.log(arrayList);
        // console.log(arrayListName);

        generateBin();
    }

 });