const query = "https://rickandmortyapi.com/api/character";
const allCharacters = []
let shownCharacters = []
const targetTable = document.getElementById("target-table");
const inputField = document.getElementById("input-field");
async function loadCharactersViaFetchFirstSolution(){//function syntax asyncron
    let res = await fetch(query).then(data => data.json())
    allCharacters.push(...res.results)
    res = await fetch(query+"?page=2").then(data => data.json())
    allCharacters.push(...res.results)
    //és így tovább
}

async function loadCharactersViaFetchSecondSolution() {
    let maxPages = 42;//ez az érték be van égetve
    let res = await fetch(query + '?page=1').then(data=>data.json());
    allCharacters.push(...res.results)
    for(let i=2;i<=maxPages;i++){
        res = await fetch(query+`?page=${i}`).then(data => data.json())
        allCharacters.push(...res.results)
    }
    console.log(allCharacters)
}
async function loadCharactersViaFetchThirdSolution() {//ez már dinamikus megoldás
    let res = await fetch(query + '?page=1').then(data=>data.json());
    allCharacters.push(...res.results)
    let maxPages = res.info.pages;
    for(let i=2;i<=maxPages;i++){
        res = await fetch(query+`?page=${i}`).then(data => data.json())
        allCharacters.push(...res.results)
    }
}

async function loadCharactersViaFetchBestSolution(){
    let res = await fetch(query).then(data => data.json());
    allCharacters.push(...res.results);
    while(res.info.next && allCharacters.length < 100){//Optimalizáció miatt 100-ra lecsökkentve
        res = await fetch(res.info.next).then(data => data.json());
        allCharacters.push(...res.results);
    }
}

async function loadCharactersViaFetchBestSolutionRecursive(url){
    let res = await fetch(url).then(data => data.json());
    allCharacters.push(...res.results);
    if(res.info.next){
        await loadCharactersViaFetchBestSolutionRecursive(res.info.next)
    }
    else {
        console.log(allCharacters)
    }
}
const fn1 = async () => {//arrow syntax asyncron
    console.log('Ez a fgv arrow syntax-ot használ')
}

function printShownCharacters(){
    targetTable.innerHTML = `
    <thead>
        <th>Name</th>
        row.classList.add('character')
        <th>Species</th>
        <th>Image</th>
    </thead>`;
    shownCharacters.forEach((c) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <h1>${c.name}</h1>
            <p>${c.species}</p>
            <img src=${c.image} />
        `
        row.classList.add('character')
        targetTable.appendChild(row)
    })
}

function filterFn(){
    const searchedText = inputField.value.toLowerCase();
    shownCharacters = allCharacters.filter((c) => {
        return c.name.toLowerCase().includes(searchedText) || c.species.toLowerCase().includes(searchedText)
    })
    printShownCharacters();
}

async function init(){
    //await loadCharactersViaFetchFirstSolution();//így ne
    //await loadCharactersViaFetchSecondSolution();//még ez sem jó
    //await loadCharactersViaFetchThirdSolution(); //max pontos válasz már
    await loadCharactersViaFetchBestSolution();
    shownCharacters = allCharacters;
    //await loadCharactersViaFetchBestSolutionRecursive(query)
    console.log(allCharacters)
    printShownCharacters();
}

init();