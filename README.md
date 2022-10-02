# login_test

Тестовое задание

Необходимо создать масштабируемый SPA регистрации с двумя шагами и неизменным url.

Требуемые технологии:
ReactJS
Redux / React Context
Styled components / scc modules (можно что-то другое)
Любой css фреймворк 
Можно использовать TypeScript

Условия следующие:

1. Шапка и футер должны быть высотой не более 200px, содержать векторное лого и быть “приклеены” к верху и низу страницы соответственно.

2. Под шапкой должны находится хлебные крошки, показывающие текущий этап прохождения регистрации (SignUpInfo / PersonalInfo).

3. На элементах форм необходимо использовать controlled и uncontrolled компоненты.

4. Переход на следующий шаг должен быть после валидации, которая хранится в JSON Schema (см. ниже, это stub на предполагаемый ответ сервера при инициализации приложения).

5. Приложение должно работать при изменении JSON Schema (см. ниже).

6. После заполнения анкеты отобразить модальное окно с заполненной информацией.
