const url = 'https://api.dataforsyningen.dk/kommuner';

const ddKommuner = document.querySelector('#ddKommuner');
const pbFetchKommuner = document.querySelector('#pbFetchKommuner');
const urlList = document.querySelector('#urlList');
const inpSearch = document.querySelector('#inpSearch');
const pbSearch = document.querySelector('#pbSearch');

pbFetchKommuner.addEventListener('click', fetchKommuner);
ddKommuner.addEventListener('change', addUrlByUserChoice);
pbSearch.addEventListener('click', searchByName)


let kommuneOjbectList;


// #1 - Henter data og kalder på function #2.
async function fetchKommuner(){
    const response = await fetch(url);
    const data = await response.json();
    mapByNameAndUrl(data);
    addKommunerToList();
}


// #2 - Mapper dataen i objekter, som sættes i en global array "kommuneOjectList".
function mapByNameAndUrl(data) {
    kommuneOjbectList = data.map(kom => {
        return {
            name: kom.navn,
            url: kom.href
        }
    });
}


// #3 - Bliver kaldt af function #1 og laver "option" elementer og tilføjer objektets navn og href.
function addKommunerToList() {
    kommuneOjbectList.forEach(kom => {
        const element = document.createElement('option');
        element.textContent = kom.name;
        element.value = kom.url;

        ddKommuner.append(element);
    })
}


// #4 - User kan vælge punkt i dropdown menuen navnet + href vil blive tilføjet til en urlList.
function addUrlByUserChoice() {
    const nameSelected = this.options[this.selectedIndex].textContent;
    const urlSelected = this.value;
    const existInList = isNameInList(nameSelected);

    if(existInList === false) {
        const element = document.createElement('a');
        element.textContent = nameSelected;
        element.href = urlSelected;
        element.target = '_blank'
        urlList.append(element);

        const br =document.createElement('br');
        urlList.append(br);
    }


}

// #5 - User kan søge efter en kommune i array "kommuneOjectList"
function searchByName() {
    const inputName = inpSearch.value;
    const existInList = isNameInList(inputName);

    if(existInList === false) {
        const kommune = kommuneOjbectList.
        filter(kom1 => kom1.name.toLowerCase() === inputName.toLowerCase()).
        map(kom2 => kom2);

        const element = document.createElement('a');
        element.textContent = kommune[0].name;
        element.href = kommune[0].url;
        element.target = '_blank'
        urlList.append(element);

        const br =document.createElement('br');
        urlList.append(br);
    }


}

// #6 function bruges måde i function 4 og 5, for at tjekke om en kommune allerede er i listen.
function isNameInList(kommuneName) {
    let nameAlreadyInList = false;
    const kommuneNames = urlList.querySelectorAll('a');

    kommuneNames.forEach(komName => {
        if(komName.textContent.toLowerCase() === kommuneName.toLowerCase()) {
            nameAlreadyInList = true;
        }
    });

    return nameAlreadyInList;
}

