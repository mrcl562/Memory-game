const container = document.querySelector("#card_container");
const dificulty = document.querySelector("#buttons");
const cardPair = []

//get the images sources
var images = [];
for(let i=1; i<=44; i++){
    images.push(`media/${i}.png`)
}

//function to sellect dificulty, creates the quantity of elements needed
//first part calls a pair looping as many times needed
const newElement = (times) =>{
    dificulty.style.display= "none";
    for(let i=0; i<times; i++)new_pair();
    sortRandom();
    startInterval();
}

//second part generates a pair of elements containing an image element hidden
function new_pair(){
    let random = Math.floor(Math.random() * 44)
    for(let i=0; i<2; i++){
        container
        .appendChild(Object.assign(document.createElement("div"),{classList: "card"}))
        .append(Object.assign(document.createElement("img"), {src:images[random], classList: "inner_img card_back"}),Object.assign(document.createElement("img"), {src:"media/PlaceHolder.png", classList:"inner_img card_front"}))
    }
}
//third part sorts the created elements to random spot
function sortRandom(){
        var divs = container.children;
        var frag = document.createDocumentFragment();
        while (divs.length) {
            frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
        }
        container.appendChild(frag);
}

//we add an event listener to the container and inherits to all the elements 
//It targets the inner image andthe div element
container.addEventListener("click", (ev) =>{
    if(ev.target.tagName === "IMG" 
        && cardPair.length < 2){
            if(!ev.target.parentElement.getElementsByTagName("img")[1].src.match("media/find.png")){
                ev.target.parentElement.classList.toggle("flipped");
                cardPair.push(ev.target.parentElement);
            }
    }
})

//function to evaluate if you found the pairs
//see if 2 cards has been flip

const startInterval=()=>{
    checkTest = setInterval(()=>{
        if (cardPair.length > 1){
            check_pair();
            stopInterval();
        }
    }, 600);
}

const stopInterval = () =>{
    clearInterval(checkTest);
    checkTest = null;
}

//checks if a pair is found 
const check_pair = () =>{
    if(cardPair[0].getElementsByTagName("img")[0].src.match(cardPair[1].getElementsByTagName("img")[0].src)){
        correct_pair();
        }
    pair_card_flip();
    startInterval();
}

function correct_pair(){
    cardPair.forEach(card => {
        card.getElementsByTagName("img")[1].src = "media/find.png";
    }) 
}

function pair_card_flip(){
    setTimeout(() => {
        cardPair.forEach(card => card.classList.toggle("flipped"))
        cardPair.splice(0, cardPair.length);
    }, 600)
}












