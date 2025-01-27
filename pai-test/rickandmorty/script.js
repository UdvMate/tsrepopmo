const api = "https://rickandmortyapi.com/api/location"; //link to api
let locations = []; //array to store all desired objects

const GetLocations = (url) =>  { //starts request using the given link, so the xhr can use the link and get it from () 
    const xhr = new XMLHttpRequest(); //declares request as xhrr
    xhr.open('GET', url); //xhr starts the request getting the link from ()
    xhr.onload = () => { //"When the server sends back a reply, here's what I want to do with it."
        if(xhr.status === 200) { //200 = success -> if succesful...
            let response = JSON.parse(xhr.responseText); //the declared 'response' variable will become xhr's response converted by 'JSON.parse' into text
            locations.push(...response.results); //puts everything in loactions, the response get seperated into seperate objects by...
            if(response.info.next) { //if there is a next page in the api
                GetLocations(response.info.next);//all the data on the page gets pushed to 'locations', and continues to the next one
            }
            else{
                AppearLocationsOnHtml(locations); //else it's done and it shows all the collected data on the html based on the 'AppearLocationsOnHtml' function
            }
        }
    }
    xhr.send(); //sends request
}

const AppearLocationsOnHtml = (array) => { // 'AppearLocationsOnHtml' starts with array
    let container = document.getElementById('container'); //container is the div w/ the id container
    container.innerHTML = ''; //empties 'container'
    array.forEach(location => { //for each element of array
        let div = document.createElement('div'); //new div inside div
        div.classList.add('card'); //new card in div
        //following html gets added in the card
        div.innerHTML = `
            <div class="card-body">
                <h4 class="card-title">${location.name}</h4>
                <h5 class="card-title">${location.type}</h5>
                <h5 class="card-title"><img src="${location.image}"></h5>
            </div>
        `
        container.appendChild(div); //adds div to 'container'
    });


}

document.getElementById('searchBtn').addEventListener('click', () => { //when searchBtn button gets clicked on
    console.log('Search'); //debug
    let filteredLocations = locations.filter(location => { //filtered locations are
        return location.name.toLowerCase().includes(document.getElementById('input').value); //those locations where location name (lowercased) includes input value
    });
    console.log(filteredLocations); //debug
    AppearLocationsOnHtml(filteredLocations); //filtered locations are shown
})

const init = () => { //starting of program
    GetLocations(api); //starts GetLocations w/ given api
    console.log(locations); //debug
}

init(); //starts init