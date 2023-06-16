## Rijksmaster - Rijksmuseum Image search (AngularJS)

For this project I took an existing React project (https://github.com/EoghainOB/RijksMuseum) and tried the same in `Angular` for the first time. It incorporates the Rijksmuseum API and allows the user to search well known painters and their work in the input field with suggestions taken from a list of popular artists and their artwork. Users can also search for artwork by century. This queries the API and returns the results on a results page, showing the work along with the title of the piece and a link to the page of that piece of art on the Rijksmuseum website.

### Desktop
![RijksSearchDesktop](https://github.com/EoghainOB/RijksMaster_Angular/assets/110406695/3c78c34c-375d-44e0-baa1-c4651db76bcb)
![RijksResDesktop](https://github.com/EoghainOB/RijksMaster_Angular/assets/110406695/0f90c186-84d5-4159-8102-02e660615358)

### Mobile
<img width="300" src="https://github.com/EoghainOB/RijksMaster_Angular/assets/110406695/a525f62d-0e4a-4a75-a8b1-2a90802e05ab">
<img width="300" src="https://github.com/EoghainOB/RijksMaster_Angular/assets/110406695/b53f7801-841c-4ba4-9498-b02de3e50c7c">

## Installation
- Clone the repository using `git clone`
- Install the dependencies using `npm install`
- Run the server using `ng serve`
- It should show up on `http://localhost:4200`

## Technologies Used
I chose `Angular` and `Typescript` as I wanted to expand my knowledge of front-end frameworks having previously only focussed on `React`. For fetching the data from the API I used `Axios` instead of the built in fetch function as it has automatic JSON parsing and built in error handling.

<div>
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/>
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"/>
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
    <img height=40 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" />
</div>

## Notes
Normally I would have put the API key in a `env` file but for the sake of this task I left it in the endpoint URL
