'use strict';

const adv = document.querySelector('.adv'),
      books = document.querySelector('.books'),
      book = document.querySelectorAll('.book'),
      elems = document.querySelectorAll('li'),
      book6 = document.createElement('li');

books.prepend(book[5]);
books.prepend(book[3]);
books.prepend(book[4]);
books.prepend(book[0]);
books.prepend(book[1]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

book[4].childNodes[1].innerHTML = '<a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes" target="_blank">Книга 3. this и Прототипы Объектов</a>';

elems[3].after(elems[8]);
elems[3].after(elems[6]);
elems[9].after(elems[2]);

elems[47].after(elems[55]);
elems[50].after(elems[48]);
elems[53].after(elems[51]);

book6.textContent = 'Глава 8: За пределами ES6';
elems[25].append(book6);

console.log(elems);

adv.remove();