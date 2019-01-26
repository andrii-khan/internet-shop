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
  // dots: true,
  // appendDots: 'featured-slider__dots',
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
});
var numberPeople = $("#number-people")
$(numberPeople).on('input', function () {
  numberPeople = $(this).val();
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
var arrayBin = {};
checkEmptyBin();

function generateBin() {
  var orderForm = $('.order-form__content');
  var finalPrice = 0;
  orderForm.text(' ');
  for (const key in arrayBin) {

    orderForm.append(
      '<div class="order-form__list">' + '<div class="order-form__name">' + key + '</div>' +
      '<div class="order-form__price">' + arrayBin[key] + '</div>' +
      '</div>'
    )
    finalPrice += Number(arrayBin[key].replace("UAH", ''));
    //  console.log(finalPrice);
  }
  $('.total-price').text((finalPrice).toFixed(1) + ' UAH');
  checkEmptyBin();
  var arrayJSON = JSON.stringify(arrayBin);
  localStorage.setItem('dishList', arrayJSON);
  localStorage.setItem('price', finalPrice);
}

function checkEmptyBin() {
  if ($.isEmptyObject(arrayBin)) {
    $('.bnt-product').css('display', 'none');
  } else {
    $('.bnt-product').css('display', 'block');
  }
}
$('.product-select input[type=checkbox]').on('change', function () {
  var findCalories = $(this).siblings('[name=calories]').val();
  var findPrice = $(this).siblings('[name=price]').val();
  var findProductName = $(this).siblings('.relative').find('label').text();

  var arrayItemName = findProductName;
  var arrayItemPrice = findPrice;

  if ($(this).prop("checked")) {
    arrayBin[arrayItemName] = arrayItemPrice;
    generateBin();
    // console.log(arrayPrice);
  } else {
    delete arrayBin[arrayItemName];
    // console.log(arrayBin);
    generateBin();
    // delete localStorage['dishList'];
  }

});


function initMap() {
  // The location of Uluru
  const centerCoords = {
    lat: 53.205980,
    lng: -6.104930
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(
    document.querySelector('.ba-map__show'), {
      zoom: 8,
      center: centerCoords,
      disableDefaultUI: true,
      styles: [{
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative.province",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road",
          "stylers": [{
            "color": "#ffffff"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road.local",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "transit",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "water",
          "stylers": [{
            "color": "#5dbc2e"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "off"
          }]
        }
      ]


    });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: centerCoords,
    map: map
  });
}

initMap();

const showPassword = document.querySelector(".ba-form-person-password__show");

function myPassword() {
  const password = document.getElementById("myPassword");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

showPassword.onclick = myPassword;

$(document).ready(function () {
  var localResult = JSON.parse(localStorage.getItem('dishList'));
  for (const key in localResult) {
    $('.ba-local').append('<p>' + key + '</p>');
  }
  var localResultPrice = localStorage.getItem('price');
  if (localResultPrice > 0) {
    $('.ba-local-price').text(localResultPrice + ' UAH');
  }
  
});
$('.ba-form-send').on('click', function clearLocal() {
  localStorage.clear()
})