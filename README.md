## Guestbook Application

### Prerequisites

- You must have the following tools installed:
    - Git
    - Docker

### Start the Docker ecosystem for a first time

Clone code from repo.

Go to the main directory with Dockerfile and run the following commands:

- `docker build -t <username>/my_project .` - create docker image

- `docker run -p 8080:8080 -d <your username>/my_project` - The `-p` flag redirects a public port to a private port
inside the container. Node application will listen on port 8080, so the private port should be 8080. Public port can be
different. Running the image with `-d` runs the container in detached mode, leaving the container running
in the background.

## Using the application

You can use the following endpoints with tools you like (for example Postman):

- `POST /submit` - where users can submit feedback about their stay in imaginary hotel
  
  Data that should be send by POST request in json format:
 
  ```
  {
    "authorName": "string",
    "body": "string",
    "dateCreated": "string"
  }
  ```
  
  `dateCreated` should be in one of the following formats: `DD-MM-YYYY, DD MM YYYY, DD.MM.YYYY, DD/MM/YYYY`
  
- `GET /feedback` - where administrator can read the responses based on filters like `fromDate`, `toDate`, `name`, `content`

  For example:
  
  `GET /feedback?fromDate=20.01.2010&name=John`

Important: This endpoint requires Basic authentication!

You can use swagger 2.0 by opening `localhost:8080/api-docs`. (These host and port are set by default in swagger.
If you plan to use different host and port, you should make some changes in `swagger.yaml` file)

## Unit testing

You can execute unit tests after entering the container:

- `docker exec -it <container id> /bin/bash`

- `npm run unitTest`
