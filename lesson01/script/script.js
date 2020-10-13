'use strickt'

let money = 100000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 2000000;
let period = 12;
let budgetDay = money / 30; //дневной доход
let expenses1, expenses2, amount1, amount2, budgetMonth;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('Длина строки: ', addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей`);

console.log('Строка в нижнем регистре: ', addExpenses.toLowerCase());
let arr = addExpenses.split(',');
console.log(arr);

console.log(`Дневной доход ${budgetDay}`);

// Третий урок
money = prompt('Ваш месячный доход?');
console.log(money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.split(','));
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(deposit);
expenses1 = prompt('Введите обязательную статью расходов');
console.log(expenses1);
amount1 = +prompt('Во сколько это обойдётся?');
console.log(+amount1);
expenses2 = prompt('Введите обязательную статью расходов');
console.log(expenses2);
amount2 = +prompt('Во сколько это обойдётся?');
console.log(amount2);
budgetMonth = money - (amount1 + amount2); //оставшийся бюджет на месяц.
console.log(budgetMonth);
console.log(`За ${Math.ceil(mission/budgetMonth)} месяцев будет достигнута цель ${mission} рублей/долларов/евро.`);
budgetDay = budgetMonth / 30; //дневной бюджет
console.log(`Дневной бюджет ${Math.floor(budgetDay)}`);

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