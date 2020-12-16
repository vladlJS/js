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
const cancel = document.getElementById('cancel');


const AppData = function(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.btn = function(){
    if (salaryAmount !== ''){
        btnStart.removeAttribute('disabled', '');
    }
};

AppData.prototype.start = function(){
    if (salaryAmount.value === ''){
        btnStart.setAttribute('disabled', '');
        return;
    }
        let inputs = document.querySelectorAll('input[type="text"]');
        btnStart.style.display = 'none';
        cancel.style.display = 'block';
        incomeAdd.setAttribute('disabled', '');
        expensesAdd.setAttribute('disabled', '');
        depositCheck.setAttribute('disabled', '');
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
};
AppData.prototype.reset = function(){
        let inputs = document.querySelectorAll('input[type="text"]');
        cancel.style.display = 'none';
        btnStart.style.display = 'block';
        incomeAdd.removeAttribute('disabled', '');
        expensesAdd.removeAttribute('disabled', '');
        depositCheck.removeAttribute('disabled', '');
        inputs.forEach(function(item){
            item.removeAttribute('disabled', '');
            item.value = "";
            periodSelect.value = 1;
            periodAmount.innerHTML = periodSelect.value;
        });
};
AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = _this.calcSavedMoney();
    });
};
AppData.prototype.addExpensesBlock = function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3){
            expensesAdd.style.display = 'none';
        }
};
AppData.prototype.addIncomeBlock = function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);

        incomeItems = document.querySelectorAll('.income-items');
        
        if (incomeItems.length === 3){
            incomeAdd.style.display = 'none';
        }
};
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
        }
    });
    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            _this.addExpenses.push(item);
        }
    });
}; 
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function(){
    for (let item in this.expenses){
        this.expensesMonth += +this.expenses[item];
    }
        //return appData.expensesMonth; 
};
AppData.prototype.getBudget = function (){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function (){
    return Math.ceil(targetAmount.value/this.budgetMonth);    
};
AppData.prototype.getStatusIncome = function(){
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
};
AppData.prototype.getInfoDeposit = function(){
    // if(this.deposit){
    //     do{
    //     this.percentDeposit = prompt('Какой годовой процент?', '10');
    //     }while(!isNumber(this.percentDeposit));
    //     do{
    //     this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    //     }while(!isNumber(this.moneyDeposit));
    // }
};
AppData.prototype.calcSavedMoney = function(){
    periodAmount.innerHTML = periodSelect.value;
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = new AppData();

AppData.prototype.eventListeners = function(){
    salaryAmount.addEventListener("input", appData.btn);
    periodSelect.addEventListener('input', appData.calcSavedMoney);
    btnStart.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIncomeBlock);
};

appData.eventListeners();
console.log(appData);

// console.log(appData.expenses);
// appData.getStatusIncome();

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