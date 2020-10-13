let money = 100000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 2000000;
let period = 12;
let budgetDay = money / 30; //дневной доход

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('Длина строки: ', addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей`);

console.log('Строка в нижнем регистре: ', addExpenses.toLowerCase());
let arr = addExpenses.split(',');
console.log(arr);

console.log(`Дневной доход ${budgetDay}`);