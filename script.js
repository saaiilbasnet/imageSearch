
const API_KEY = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchEl = document.getElementById("serchbox");
const ResultEl = document.getElementById("containerbox");
const showmoreEl = document.getElementById("smore");
const btnEl = document.getElementById("btn")

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = searchEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`

    const response = await fetch(url);
    const data = await response.json();

    if(page == 1){
        ResultEl.innerHTML = "";
    }

    const results = data.results;

    results.map((r)=>{
        const imageWarpper = document.createElement("div");
        imageWarpper.classList.add("search-result");
        const image = document.createElement("img")
        image.src = r.urls.small;
        image.alt = r.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = r.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = r.alt_description;

        imageWarpper.appendChild(image)
        imageWarpper.appendChild(imageLink)
        ResultEl.appendChild(imageWarpper)
    })

    page++;

    if(page>1){
        showmoreEl.style.display = "block";
    }
}

btnEl.addEventListener("click",(event)=>{
    event.preventDefault();
    searchImages()
    page = 1;
})

showmoreEl.addEventListener("click",()=>{
    searchImages()
})

