'use strict';

const STORE = {
    mealTips: { sum: 0, count: 0 },
    subTotal: 0,
    tip: 0,
}

//renders the results onto the screen:
function renderResults() {
    renderCustomerCharges();
    renderEarningsInfo();
}

function renderCustomerCharges() {
    const subTotalNum = STORE.subTotal;
    const tipNum = STORE.tip;
    const totalNum = calculateTotal(tipNum, subTotalNum);

    const subTotalString = convertToMoneyFormat(subTotalNum);
    const tipString = convertToMoneyFormat(tipNum);
    const totalString = convertToMoneyFormat(totalNum);

    $('.js-subtotal-result').text(subTotalString);
    $('.js-tip-result').text(tipString);
    $('.js-total-result').text(totalString);
}

function renderEarningsInfo() {
    const tipTotal = STORE.mealTips.sum;
    const mealCount = STORE.mealTips.count;
    const avgTipPerMeal = (mealCount !== 0) ? calculateAvgTipPerMeal(tipTotal, mealCount) : 0;

    const tipTotalString = convertToMoneyFormat(tipTotal);
    const avgTipPerMealString = convertToMoneyFormat(avgTipPerMeal);

    $('.js-tip-total-result').text(tipTotalString);
    $('.js-meal-count-result').text(mealCount);
    $('.js-avg-tip-per-meal-result').text(avgTipPerMealString);
}

//grabs values from input fields and saved it to the STORE:
function handleSubmitButton() {
    $('#meal-details-form').submit(event => {
        event.preventDefault();
        saveInputs();
        event.currentTarget.reset();
        renderResults();
    });
}

function saveInputs() {
    const baseMealPrice = parseInt($('.js-base-meal-price-entry').val());
    const taxRate = parseInt($('.js-tax-rate-entry').val());
    const tipPercentage = parseInt($('.js-tip-percentage-entry').val())/100;

    const subTotal = calculateSubTotal(baseMealPrice, taxRate);
    const tip = calculateTip(tipPercentage, subTotal);

    //Increase saved tip by tip amount, increment count by 1.
    STORE.mealTips.sum += tip;
    STORE.mealTips.count++;
    
    STORE.subTotal = subTotal;
    STORE.tip = tip;
}

function calculateSubTotal(bmp, tr) {
    return bmp + bmp * (tr/100);
}

function calculateTip(tp, st) {
    return tp * st;
}

function calculateTotal(tn, bmp) {
    return tn + bmp;
}

function calculateAvgTipPerMeal(tt, mc) {
    return tt/mc;
}

function convertToMoneyFormat(num) {
    return `$ ${convertToFormalNumber(num)}`;
}

function convertToFormalNumber(num) {
    return num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

//Handles the Reset Button:
function handleResetButton() {
    $('.js-reset-button').click(() => {
        resetSTORE();
        renderResults();
    })
}

function resetSTORE() {
    STORE.mealTips.sum = 0;
    STORE.mealTips.count = 0;
    STORE.tip = 0;
    STORE.subTotal = 0;
}

//Main Function:
 
function main() {
    handleSubmitButton();
    handleResetButton();
}

$(main);