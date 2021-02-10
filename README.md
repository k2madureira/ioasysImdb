# Ioasys 🎞

![imdb100](https://user-images.githubusercontent.com/26586585/102727061-1e2a0d00-4302-11eb-9b84-5300443c3348.png)

### Structure:

```
  ioasysImdb
    |_ public
        |_ coverage
    |_ src
        |_ config
              |_ auth
              |_ database
              |_ env
              |_ express
              |_ jest

        |_ controllers
              |_ genre | movie | report | score | session | users.controller.js

        |_ helpers
              |_ jobs
              |_ templates
              |_ messages.js

        |_ middlewares
              |_ ensureAdmin | ensureAuthenticated | error | validate.js

        |_ models
              |_ genre | genreMovie | movie | score | user.js

        |_ repositories
              |_ genre | genreMovie | movie | score | user.repository.js

        |_ routes
              |_ genres | movies | reports | scores | users.routes.js

        |_ services
              |_ genre [CRUD]
              |_ movie [CRUD]
              |_ reports [R]
              |_ score [C]
              |_ users [CRUD]

        |_ tests
              |_ integration
                    |_ genre | movies | reports | scores | users.test.js

        |_ utils
              |_ ApplicationError | catchAsync | compare | jsonwebtoken | logger | mailer | morgan | pagination | queue.js

        |_ validations
              |_ admin | genre | movie | report | score | user.validation.js

```

### Data schema files JSON:

![imdb](https://user-images.githubusercontent.com/26586585/107427970-bf626200-6b00-11eb-9721-e5944050e312.png)

### Docs 💾:

1. Code Coverage ( ioasysImdb/public/coverage/lcov-report/index.html )

### Setting up local environment 🏡:

1. Install **Yarn**;
2. Using terminal, navigate to the folder where the project was cloned and run:<br> **git clone https://github.com/k2madureira/ioasysImdb.git**
3. Using terminal, access the **ioasysImdb** folder and Run **yarn install**, to download all necessary dependencies;
4. Using terminal run **yarn dev**, to start the server on port **3333** and queue;
5. For testing, the **insomnia** software is recommended;
6. To perform the unit test **yarn test && yarn posttest**
7. Databases used **PostgreSQL + Redis**, with configuration in the **.env** file

### .ENV File 🛠:

- [ ] **PORT** (Port used by express)
- [ ] **JWT_SECRET** (Using some MD5 generation service, create a key that only you know.)
- [ ] **JWT_EXPIRES_IN** (Time token example 1d)

- [ ] **DB_HOST** (Your database host)
- [ ] **DB_USER** (Your database user)
- [ ] **DB_PASS** (Your database password)
- [ ] **DB_NAME** (Your database name)
- [ ] **DB_PORT** (Your database port, for PostgreSQL it is usually used at **5432**)

- [ ] **REDIS_HOST** (Your redis host)
- [ ] **REDIS_PORT** (Your redis port, usually used at **6379**)

- [ ] **MAIL_SERVICE** (Example -> gmail)
- [ ] **MAIL_HOST** (Example -> smtp.gmail.com])
- [ ] **MAIL_PORT** (Example -> 587)
- [ ] **MAIL_USER** (Mail user)
- [ ] **MAIL_PASS** (Mail password)
- [ ] **MAIL_SECURE** (true for 465, false for other ports)

### Tests 🎯:

- [x] **Jest**
- [x] **Code coverage**

### code formatter / Extensions 🔧:

- [x] **Eslint** (Airbnb)
- [x] **Eslint** (Visual Studio Code - Extension)
- [x] **Prettier**
- [x] **EditorConfig** (Visual Studio Code - Extension)

### Future improvements 🧱:

- [ ] Creation of actors, directors tables

### Endpoints 📌:

| Number | Type     | Route                  | Definition                      |
| ------ | -------- | ---------------------- | ------------------------------- |
| 0      | _Get_    | api/v1/users/**:id**   | Login                           |
| 1      | _Post_   | api/v1/users/login     | Login                           |
| 2      | _Post_   | api/v1/users/          | Create an user                  |
| 3      | _Put_    | api/v1/users/**id**    | Update an user                  |
| 4      | _Delete_ | api/v1/users/**:id**   | Disabled user                   |
| 5      | _Post_   | /api/v1/movies/        | Register new movie              |
| 6      | _Get_    | /api/v1/movies/        | List all movies                 |
| 7      | _Put_    | /api/v1/movies/**:id** | Update an movie using **id**    |
| 8      | _Get_    | /api/v1/movies/**:id** | Detail an movie using **id**    |
| 9      | _Post_   | /api/v1/scores/**:id** | score a movie using user **id** |
| 10     | _Get_    | /api/v1/reports/       | List top movies                 |
| 11     | _Post_   | /api/v1/genres/        | Create an genre                 |
| 12     | _Patch_  | /api/v1/genres/**:id** | Update an genre                 |
| 13     | _Delete_ | /api/v1/genres/**:id** | Delete an genre                 |
| 14     | _Get_    | /api/v1/genres/        | List all genre                  |

#### Exemples:

0. http://localhost:3333/api/v1/users/b5cef96e-6791-46a5-a97b-8b8ced7b69f6 **(GET)**

##### Response [JSON]

```
{
  "id": "b5cef96e-6791-46a5-a97b-8b8ced7b69f6",
  "name": "admin",
  "nickname": "admin",
  "email": "adm@adm.com",
  "admin": true,
  "disabled": false,
  "deletedAt": null,
  "createdAt": "2021-02-08T20:08:43.935Z",
  "updatedAt": "2021-02-08T20:08:43.935Z"
}
```

---

1. http://localhost:3333/api/v1/users/login **(POST)**

##### Request [ body: JSON]

```
{
	"email":"admin@gmail.com",
	"password": "123"
}
```

##### Response [JSON]

```
{
    "user": {
        "name": "Lenilson Madureira",
        "email": "admin@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDg1MDM1NTgsImV4cCI6MTYwODU4OTk1OCwic3ViIjoiMSJ9.bEu0P1Xqtcz9U4aonou-3Ejyr_DvX1l1Y5CdFO9plKw"
}
```

---

2. http://localhost:3333/api/v1/users/ **(POST)**

##### Request [ body: JSON]

```
{
	"name": "USER",
	"nickname": "USER",
	"email":"user1@user.com",
	"password": "123",
	"admin": false
}
```

##### Response [JSON]

```
{
  "message": "User successfully registered",
  "infos": {
    "id": 2,
    "name": "USER",
	  "nickname": "USER",
	  "email":"user1@user.com"
  }
}
```

---

3.  http://localhost:3333/api/v1/users/2 **(PUT)**

##### Request [ body: JSON]

```
{
	"name": "USER_UPDATED"
}
```

##### Response [JSON]

```
{
  "User": {
    "id": 2,
    "name": "USER_UPDATED",
	  "nickname": "USER",
	  "email":"user1@user.com"
  }
}
```

---

4. http://localhost:3333/api/v1/users/2 **(DELETE)**

##### Response [JSON]

```
{
  "success": "disabled"
}
```

---

5. http://localhost:3333/movie **(POST)**

##### Request [ body: JSON]

```
{
	"tt": "6857376",
	"title": "Palmer",
	"year": "2021",
	"director":"Fisher Stevens",
	"genre": ["acb7d53d-4e19-433f-8c3b-b15d3fe16772","f24cc6f7-1df0-4851-806b-086b3a2eb40a","5cdf3779-acd4-4eb1-8314-f47fe8072e8b"],
	"actors": "Justin Timberlake, Ryder Allen, Alisha Wainwright"
}
```

##### Response [JSON]

```
{
  "id": "ce3b81f5-ce1e-42d9-97b2-05e3482a9dd4",
  "tt": "6857376",
  "title": "Palmer",
  "year": "2021",
  "director": "Fisher Stevens",
  "actors": "Justin Timberlake, Ryder Allen, Alisha Wainwright",
  "updatedAt": "2021-02-04T15:34:36.815Z",
  "createdAt": "2021-02-04T15:34:36.815Z"
}
```

---

6.  http://localhost:3333/movie **(GET)**

##### Request [ query ]

```
title: ?
limit: 3
page: 1
```

##### Response [JSON]

```
{
  "movies": [
    {
      "id": "26265570-98cd-473f-a399-b3afff0edb45",
      "tt": "6878306",
      "title": "News of the World",
      "year": "2020",
      "director": "Paul Greengrass",
      "actors": " Tom Hanks, Helena Zengel, Tom Astor",
      "genres": [
        {
          "id": "f24cc6f7-1df0-4851-806b-086b3a2eb40a",
          "genre": "action"
        },
        {
          "id": "5cdf3779-acd4-4eb1-8314-f47fe8072e8b",
          "genre": "drama"
        },
        {
          "id": "acb7d53d-4e19-433f-8c3b-b15d3fe16772",
          "genre": "aventure"
        }
      ],
      "total_votes": 2,
      "average_votes": 3
    },
    {
      "id": "225dd34b-20dc-4105-bcc9-bbb902976a30",
      "tt": "1414",
      "title": "Gladiator",
      "year": "2001",
      "director": "Ridley Scott",
      "actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
      "genres": [
        {
          "id": "f24cc6f7-1df0-4851-806b-086b3a2eb40a",
          "genre": "action"
        },
        {
          "id": "acb7d53d-4e19-433f-8c3b-b15d3fe16772",
          "genre": "aventure"
        }
      ],
      "total_votes": 4,
      "average_votes": 4.5
    },
    {
      "id": "ce3b81f5-ce1e-42d9-97b2-05e3482a9dd4",
      "tt": "6857376",
      "title": "Palmer",
      "year": "2021",
      "director": "Fisher Stevens",
      "actors": "Justin Timberlake, Ryder Allen, Alisha Wainwright",
      "genres": [
        {
          "id": "f24cc6f7-1df0-4851-806b-086b3a2eb40a",
          "genre": "action"
        },
        {
          "id": "5cdf3779-acd4-4eb1-8314-f47fe8072e8b",
          "genre": "drama"
        },
        {
          "id": "acb7d53d-4e19-433f-8c3b-b15d3fe16772",
          "genre": "aventure"
        }
      ]
    },
    {
      "id": "5d8f94ec-1129-4d09-b9a4-6b04feb59fee",
      "tt": "10514222",
      "title": "Ma Rainey's Black Bottom",
      "year": "2020",
      "director": " George C. Wolfe",
      "actors": "Viola Davis, Chadwick Boseman, Glynn Turman ",
      "genres": [
        {
          "id": "f24cc6f7-1df0-4851-806b-086b3a2eb40a",
          "genre": "action"
        },
        {
          "id": "5cdf3779-acd4-4eb1-8314-f47fe8072e8b",
          "genre": "drama"
        },
        {
          "id": "acb7d53d-4e19-433f-8c3b-b15d3fe16772",
          "genre": "aventure"
        }
      ]
    }
  ],
  "pagination": {
    "movies": 4,
    "limit": 5,
    "totalPages": 1,
    "currentPage": 1
  }
}
```

---

7.  http://localhost:3333/api/v1/movies/225dd34b-20dc-4105-bcc9-bbb902976a30 **(PUT)**

##### Request [ body: JSON]

```
{
	"tt": "1414",
	"title": "Gladiator",
	"director":"Ridley Scott",
  "genre": ["acb7d53d-4e19-433f-8c3b-b15d3fe16772","f24cc6f7-1df0-4851-806b-086b3a2eb40a"],
	"actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen"
}
```

##### Response [JSON]

```
{
  "id": "225dd34b-20dc-4105-bcc9-bbb902976a30",
  "tt": "1414",
  "title": "Gladiator",
  "year": "2001",
  "director": "Ridley Scott",
  "actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
  "createdAt": "2021-02-03T14:35:04.655Z",
  "updatedAt": "2021-02-03T19:28:46.387Z"
}
```

---

8. http://localhost:3333/api/v1/movies/225dd34b-20dc-4105-bcc9-bbb902976a30 **(GET)**

##### Response [JSON]

```
{
  "id": "225dd34b-20dc-4105-bcc9-bbb902976a30",
  "tt": "1414",
  "title": "Gladiator",
  "year": "2001",
  "director": "Ridley Scott",
  "actors": "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
  "scores": [
    {
      "user_id": "b5cef96e-6791-46a5-a97b-8b8ced7b69f6",
      "score": 5
    },
    {
      "user_id": "b5cef96e-6791-46a5-a97b-8b8ced7b69f6",
      "score": 4
    },
    {
      "user_id": "b5cef96e-6791-46a5-a97b-8b8ced7b69f6",
      "score": 4
    },
    {
      "user_id": "b5cef96e-6791-46a5-a97b-8b8ced7b69f6",
      "score": 5
    }
  ],
  "genres": [
    {
      "id": "acb7d53d-4e19-433f-8c3b-b15d3fe16772",
      "genre": "aventure"
    },
    {
      "id": "f24cc6f7-1df0-4851-806b-086b3a2eb40a",
      "genre": "action"
    }
  ],
  "total_votes": 4,
  "average_votes": 4.5
}
```

---

9. http://localhost:3333/api/v1/scores/225dd34b-20dc-4105-bcc9-bbb902976a30 **(POST)**

##### Request [ body: JSON]

```
{
	"score": 2
}
```

##### Response [JSON]

```
{
  "success": "vote successfully registered"
}
```

---

10. http://localhost:3333/api/v1/reports/ **(POST)**

##### Request [ query ]

```
top: 3
page: 1
```

##### Response [JSON]

```
{
  "movies": [
    {
      "id": "225dd34b-20dc-4105-bcc9-bbb902976a30",
      "tt": "1414",
      "title": "Gladiator",
      "stars": "****",
      "average": 4.2,
      "votes": 5
    },
    {
      "id": "26265570-98cd-473f-a399-b3afff0edb45",
      "tt": "6878306",
      "title": "News of the World",
      "stars": "****",
      "average": 4,
      "votes": 2
    },
    {
      "id": "5d8f94ec-1129-4d09-b9a4-6b04feb59fee",
      "tt": "10514222",
      "title": "Ma Rainey's Black Bottom",
      "stars": "***",
      "average": 3.5,
      "votes": 2
    }
  ],
  "pagination": {
    "movies": 4,
    "top": 3,
    "totalPages": 2,
    "currentPage": 1
  }
}
```

---

11. http://localhost:3333/api/v1/genres/ **(POST)**

##### Request [ body: JSON]

```
{
 "genre": "Drama"
}
```

##### Response [JSON]

```
{
  "id": "5cdf3779-acd4-4eb1-8314-f47fe8072e8b",
  "deletedAt": null,
  "genre": "drama",
  "updatedAt": "2021-02-02T18:50:09.570Z",
  "createdAt": "2021-02-02T18:50:09.570Z"
}
```

---

12. http://localhost:3333/api/v1/genres/acb7d53d-4e19-433f-8c3b-b15d3fe16772 **(PATCH)**

##### Request [ body: JSON]

```
{
	"genre": "aventure"
}
```

##### Response [JSON]

```
{
  "id": "acb7d53d-4e19-433f-8c3b-b15d3fe16772",
  "genre": "aventure",
  "deletedAt": null,
  "createdAt": "2021-02-01T19:19:13.965Z",
  "updatedAt": "2021-02-02T12:14:57.989Z"
}
```

---

13. http://localhost:3333/api/v1/genres/acb7d53d-4e19-433f-8c3b-b15d3fe16772 **(DELETE)**

##### Response [JSON]

```
{
  "message": "Genre deleted with success."
}
```

---

14. http://localhost:3333/api/v1/genres/acb7d53d-4e19-433f-8c3b-b15d3fe16772 **(DELETE)**

##### Request [ query ]

```
genre: ?
limit: 3
page: 1
```

##### Response [JSON]

```
{
  "genres": [
    {
      "id": "acb7d53d-4e19-433f-8c3b-b15d3fe16772",
      "genre": "aventure"
    },
    {
      "id": "5d7bbc1e-7cb0-4eef-848f-5da496d82828",
      "genre": "animation"
    },
    {
      "id": "96cc13d9-4c0c-4045-8693-30236d9b2d85",
      "genre": "comedy"
    },
    {
      "id": "1d409e39-a488-44a5-8784-6911765077e1",
      "genre": "family"
    },
    {
      "id": "b4325fa1-a060-4d32-9316-a5ab9e5b4c73",
      "genre": "fantasy"
    }
  ],
  "pagination": {
    "genres": 8,
    "limit": 5,
    "totalPages": 2,
    "currentPage": 1
  }
}
```

---
