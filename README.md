# Sicilia Mia - BE Intern Task

## About

Form Server and Client for filled survey forms with dynamic Audio

## Task Owner

- [@greazleay](https://www.github.com/greazleay)

## Installation

cd client && cd server

```bash
  yarn
  # or
  npm install
```

## Running the app

```bash
# development
$ yarn dev
  # or
$ npm run dev
```

## API Reference

Routes available on the server are listed below:

host: http://localhost:4000

#### Audio Routes

##### Upload Audio

```http
  POST /audio/upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file`    | `Audio file` | **Required**. Audio File to upload |

##### Get Audio

```http
  GET /audio/:filename
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `filename`| `string` | **Required**. File name of Audio to fetch |

#### Survey Routes

##### Create Survey

```http
  POST /survey/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `country` | `string` | **Required**. Country of the user |
| `email`   | `string` | **Required**. Valid Email |
| `name`    | `string` | **Required**. User's full name |
| `ratings` | `array`  | **Required**. An Array of all ratings |

##### Get All Surveys

```http
  GET /survey/all-surveys
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`    | `none`   |    none                           |

##### Get A Single Survery

```http
  GET /survey/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the survey    |


## Front End

### Routes

Routes available on the client are listed below:

host: http://localhost:3000

#### Home
| Path | Description                       |
| :----| :-------------------------------- |
| `/`  | Home Page                         |

#### Submission Report
| Path            | Description            |
| :---------------| :--------------------- |
| `/submissions`  | Submission Report Page |
