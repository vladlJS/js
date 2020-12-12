'use strict';

const btnStart = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
const inputs = document.querySelectorAll('input[type="text"]');
const cancel = document.getElementById('cancel');

function btn() {
    if (salaryAmount.value === ''){
        btnStart.disabled = true;
    } else {
        btnStart.disabled = false;
    }
}
btn();
salaryAmount.addEventListener("input", btn);

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function(){
        // console.log(this);
        btnStart.style.display = 'none';
        cancel.style.display = 'block';
        incomeAdd.setAttribute('disabled', '');
        expensesAdd.setAttribute('disabled', '');
        inputs.forEach(function(item){
            item.setAttribute('disabled', '');
        });

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.getStatusIncome();
    },

    reset: function(){
        cancel.style.display = 'none';
        btnStart.style.display = 'block';
        inputs.forEach(function(item){
            item.removeAttribute('disabled', '');
            item.value = "";
            periodSelect.value = 1;
            periodAmount.innerHTML = periodSelect.value;
        });
    },

    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        // periodSelect.addEventListener('input', appData.showResult);
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);

        incomeItems = document.querySelectorAll('.income-items');
        
        if (incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){

        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    // asking: function(){

    //     const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кредит, БЕНЗИН');
    //     appData.addExpenses = addExpenses.toLowerCase().split(',');

    //     const exp = appData.addExpenses.map(function(item) {
    //         item = item.trim();
    //         item = item.charAt(0).toUpperCase() + item.substr(1);
    //         return item;
    //     });
    //     console.log(exp.join(', '));

    //         appData.deposit = confirm('Есть ли у вас депозит в банке?');
    //         appData.getInfoDeposit();
    // },
    
    getExpensesMonth: function(){

        for (let item in this.expenses){
            this.expensesMonth += +this.expenses[item];
        }
        //return appData.expensesMonth; 
    },
    getBudget: function (){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: function (){
        return Math.ceil(targetAmount.value/this.budgetMonth);
        
    },
    getStatusIncome: function(){
        switch (true) {
            case this.budgetDay >= 1200:
            console.log('У вас высокий уровень дохода');
            break;
            case this.budgetDay >= 600:
            console.log('У вас средний уровень дохода');
            break;
            case this.budgetDay < 600:
            console.log('К сожалению у вас уровень дохода ниже среднего');
            break;
            default: console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do{
            this.percentDeposit = prompt('Какой годовой процент?', '10');
            }while(!isNumber(this.percentDeposit));
            do{
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }while(!isNumber(this.moneyDeposit));
        }
    },

    calcSavedMoney: function(){
        periodAmount.innerHTML = periodSelect.value;
        return this.budgetMonth * periodSelect.value;
    },
};

periodSelect.addEventListener('input', appData.showResult);

btnStart.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

expensesAdd.addEventListener('click', appData.addExpensesBlock);

incomeAdd.addEventListener('click', appData.addIncomeBlock);

console.log(appData.expenses);
appData.getStatusIncome();

// console.log('Расходы за месяц: ' + appData.getExpensesMonth());

// if (appData.getTargetMonth() < 0) {
// console.log('Цель не будет достигнута');
// } else {
// console.log(`За ${appData.getTargetMonth()} месяцев будет достигнута цель ${appData.mission} рублей/долларов/евро.`);
// };

// console.log(`Дневной бюджет ${Math.floor(appData.budgetDay)}`);

// console.log('Наша программа включает в себя данные:');
// for (let key in appData){
//     console.log('Свойство: ' + key + ' Значение: ' + appData[key]);
// }
