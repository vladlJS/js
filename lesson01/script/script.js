'use strict'

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 100000,
    start = function(){
        do{
            money = prompt('Ваш месячный доход?');
        }while(!isNumber(money) || money === '' || money === null);
    };
    start();
let re = /\s*,\s*/;
const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 2000000,
    period: 12,
    asking: function(){

        if (confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome, cashIncome;
            do{
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            }while(isNumber(itemIncome));

            do{
            cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }while(!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кредит, БЕНЗИН,        тренировки   ,чё то ещё');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        
            // appData.addExpenses.forEach(function(item) {
            //     item = item.trim();
            //     item = item.charAt(0).toUpperCase() + item.substr(1);
            //     console.log(item);
            // }
            // );
            // console.log(appData.addExpenses.join().trim());

        let exp = appData.addExpenses.map(function(item) {
            item = item.trim();
            item = item.charAt(0).toUpperCase() + item.substr(1);
           // console.log(item);
        return item;
        });
        console.log(exp.join(', '));

            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            appData.getInfoDeposit();

        let amount;
        for (let i = 0; i < 2; i++) {
            let expensesName;
            do{
            expensesName = prompt('Введите обязательную статью расходов');
            }while (isNumber(expensesName));

            do{
               amount = +prompt('Во сколько это обойдётся?');
            }
            while (!isNumber(amount) || amount === '' || amount === null);
            appData.expenses[expensesName] = amount;
        }
    },
    
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function(){

        for (let item in appData.expenses){
            appData.expensesMonth += appData.expenses[item];
        }
        return appData.expensesMonth; 
    },
    getBudget: function (){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function (){
        return Math.ceil(appData.mission/appData.budgetMonth);
        
    },
    getStatusIncome: function(){
        switch (true) {
            case appData.budgetDay >= 1200:
            console.log('У вас высокий уровень дохода');
            break;
            case appData.budgetDay >= 600:
            console.log('У вас средний уровень дохода');
            break;
            case appData.budgetDay < 600:
            console.log('К сожалению у вас уровень дохода ниже среднего');
            break;
            default: console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }while(!isNumber(appData.percentDeposit));
            do{
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();

console.log(appData.expenses);

console.log('Расходы за месяц: ' + appData.getExpensesMonth());

appData.getBudget();

if (appData.getTargetMonth() < 0) {
console.log('Цель не будет достигнута');
} else {
console.log(`За ${appData.getTargetMonth()} месяцев будет достигнута цель ${appData.mission} рублей/долларов/евро.`);
};

console.log(`Дневной бюджет ${Math.floor(appData.budgetDay)}`);

appData.getStatusIncome();



console.log('Наша программа включает в себя данные:');
for (let key in appData){
    console.log('Свойство: ' + key + ' Значение: ' + appData[key]);
}
