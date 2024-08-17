Техническое задание:

Доработать приложение App, чтобы в отрисованном списке были реальные отзывы, автор книги и автор отзыва.

Данные об отзывах и пользователях можно получить при помощи асинхронных функций getUsers, getReviews.

Функция getBooks возвращает Promise<Book[]>

Функция getUsers возвращает Promise<User[]>

Функция getReviews возвращает Promise<Review[]>

В объектах реализующих интерфейс Book указаны только uuid
пользователей и обзоров.

В объектах реализующих интерфейс BookInformation, ReviewInformation
указана полная информация об пользователе и обзоре.
