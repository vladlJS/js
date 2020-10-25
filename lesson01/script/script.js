'use strict'

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 100000,
    start = function(){
        do{
            money = prompt('Ваш месячный доход?');
        }while(!isNumber(money) || money === '' || money === null);
    };
    start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 2000000,
    period: 12,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function(){
        let sum = 0;
        let amount;
        for (let i = 0; i < 2; i++) {

            appData.expenses[i] = prompt('Введите обязательную статью расходов');

            do{
                amount = prompt('Во сколько это обойдётся?');
            }
            while (!isNumber(amount) || amount === '' || amount === null);
                sum += +amount;
        }
        return sum; 
    },
    getAccumulatedMonth: function (){
        return money - expensesAmount; 
    },
    getTargetMonth: function (){
        return Math.ceil(appData.mission/accumulatedMonth); 
    },
    getStatusIncome: function(){
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
    }
};

appData.asking();


let budgetDay = money / 30, //дневной доход
    expenses1, expenses2, amount1, amount2, budgetMonth;

// let expenses = [];

// console.log('Длина строки: ', addExpenses.length);
// console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей`);

// console.log('Строка в нижнем регистре: ', addExpenses.toLowerCase());
//let arr = appData.addExpenses.split(',');
// console.log(arr);

// Обязательные расходы
// let getExpensesMonth = function(){
//     let sum = 0;
//     let amount;
//     for (let i = 0; i < 2; i++) {

//         expenses[i] = prompt('Введите обязательную статью расходов');

//         do{
//             amount = prompt('Во сколько это обойдётся?');
//         }
//         while (!isNumber(amount) || amount === '' || amount === null);
//             sum += +amount;
//         // sum += +prompt('Во сколько это обойдётся?');
//     }
//     return sum; 
// };

let expensesAmount = appData.getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

// Накопления за месяц
// function getAccumulatedMonth(){
//     return money - expensesAmount; 
// };
let accumulatedMonth = appData.getAccumulatedMonth(); 
//console.log(accumulatedMonth);

//Период достижения цели
// function getTargetMonth(){
//     return Math.ceil(appData.mission/accumulatedMonth); 
// };
if (appData.getTargetMonth() < 0) {
console.log('Цель не будет достигнута');
} else {
console.log(`За ${appData.getTargetMonth()} месяцев будет достигнута цель ${appData.mission} рублей/долларов/евро.`);
};

budgetDay = accumulatedMonth / 30; //дневной бюджет
console.log(`Дневной бюджет ${Math.floor(budgetDay)}`);

// let getStatusIncome = function(){
//     switch (true) {
//         case budgetDay >= 1200:
//         console.log('У вас высокий уровень дохода');
//         break;
//         case budgetDay >= 600:
//         console.log('У вас средний уровень дохода');
//         break;
//         case budgetDay < 600:
//         console.log('К сожалению у вас уровень дохода ниже среднего');
//         break;
//         default: console.log('Что то пошло не так');
//     }
// };

appData.getStatusIncome();
