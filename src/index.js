import './assets/css/reset.css';
import './assets/sass/loyout.scss';
import './assets/sass/style.scss';
import 'lodash';

/*стили все сюда, либо в др js, а его уже сюда*/

fetch('./data/employees.json')
    /*парсим*/
    .then(response => response.json())
    /*выводим*/
    .then(console.log)
    /*ловим ошибку*/
    .catch(console.error);