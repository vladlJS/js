'use strict'

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 100000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 2000000;
let period = 12;
let budgetDay = money / 30; //дневной доход
let expenses1, expenses2, amount1, amount2, budgetMonth;

let start = function(){
    //money = prompt('Ваш месячный доход?');

    // while (!isNumber(money)) {
    //     money = prompt('Ваш месячный доход?');
    // }
    do{
        money = prompt('Ваш месячный доход?');
    }while(!isNumber(money));
};
start();

// Тип данных
let showTypeOf = function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

// console.log('Длина строки: ', addExpenses.length);
// console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей`);

// console.log('Строка в нижнем регистре: ', addExpenses.toLowerCase());
let arr = addExpenses.split(',');
// console.log(arr);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// console.log(addExpenses.split(','));
deposit = confirm('Есть ли у вас депозит в банке?');

// Обязательные расходы
let getExpensesMonth = function(){
    let sum = 0;
    let amount;
    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов');

        do{
            amount = prompt('Во сколько это обойдётся?');
        }
        while (!isNumber(amount));
            sum += +amount;
        // sum += +prompt('Во сколько это обойдётся?');
    }
    return sum; 
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);
console.log(addExpenses.toLowerCase().split(',')); // Возможные расходы

// Накопления за месяц
function getAccumulatedMonth(){
    return money - expensesAmount; 
};
let accumulatedMonth = getAccumulatedMonth(); 
//console.log(accumulatedMonth);

//Период достижения цели
function getTargetMonth(){
    return Math.ceil(mission/accumulatedMonth); 
};
if (getTargetMonth() < 0) {
console.log('Цель не будет достигнута');
} else {
console.log(`За ${getTargetMonth()} месяцев будет достигнута цель ${mission} рублей/долларов/евро.`);
};

budgetDay = accumulatedMonth / 30; //дневной бюджет
console.log(`Дневной бюджет ${Math.floor(budgetDay)}`);

let getStatusIncome = function(){
    switch (true) {
        case budgetDay >= 1200:
        console.log('У вас высокий уровень дохода');
        break;
        case budgetDay >= 600:
        console.log('У вас средний уровень дохода');
        break;
        case budgetDay < 600:
        console.log('К сожалению у вас уровень дохода ниже среднего');
        break;
        default: console.log('Что то пошло не так');
    }
};

getStatusIncome();
