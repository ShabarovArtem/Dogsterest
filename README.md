# Test task

## Установка

````bash
  $ git clone https://github.com/ShabarovArtem/Dogsterest
  $ cd Dogsterest
````

## Запуск

#### local
````bash
  $ yarn install
  $ yarn start
````
#### docker-compose
````bash
  $ docker compose up -d
````

#### Примеры работы
#### Методы Get
Без параметров:

URL `http://localhost:8080/dogPost`

С параметрами:

URL `http://localhost:8080/dogPost?skip=0&limit=2`

С помощью Query Params задаём

skip - сколько кол. записей пропустить (смещение в списке)

limit - сколько кол. записей вернуть

Ответ:
```json
[
  {
    "id": "fa4bd070-f043-4d84-87b9-cbc88c25f079",
    "fileName": "00186969-c51d-462b-948b-30a7e1735908.jpg",
    "url": "https://random.dog/00186969-c51d-462b-948b-30a7e1735908.jpg",
    "likes": 0
  },
  {
    "id": "e56fce11-f966-40bb-a19f-8c43559eaf52",
    "fileName": "00564ba3-e5cb-4b2b-8d97-c65a9ef26c23.png",
    "url": "https://random.dog/00564ba3-e5cb-4b2b-8d97-c65a9ef26c23.png",
    "likes": 0
  }
]
```
Поиск по id:

URL `http://localhost:8080/dogPost/fa4bd070-f043-4d84-87b9-cbc88c25f079`

#### Методы Post

Добавить лайк:

URL `http://localhost:8080/dogPost/fa4bd070-f043-4d84-87b9-cbc88c25f079/like`

Убавить лайк:

URL `http://localhost:8080/dogPost/fa4bd070-f043-4d84-87b9-cbc88c25f079/unlike`




