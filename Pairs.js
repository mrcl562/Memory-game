const container = document.querySelector("#card_container");
const dificulty = document.querySelector("#dificulty_buttons");
const chronometer = document.querySelector("#chronometer");
var miliseconds_display = document.querySelector(".miliseconds");
var seconds_display = document.querySelector(".seconds");
var minutes_display = document.querySelector(".minutes");
var miliseconds = 0;
var seconds = 0;
var minutes = 0;
var pairs_found = 0;


const find_image = "media/find.png";
const front_image = "media/PlaceHolder.png"
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
    chronometer.style.display = "grid";
    for(let i=0; i<times; i++)new_pair();
    sortRandom();
    start_pair_interval();
    start_chronometer();
}

//second part generates a pair of elements containing an image element hidden
function new_pair(){
    let random = Math.floor(Math.random() * 44)
    for(let i=0; i<2; i++){
        container
        .appendChild(Object.assign(document.createElement("div"),{classList: "card"}))
        .append(Object.assign(document.createElement("img"), {src:images[random], classList: "inner_img card_back"})
                ,Object.assign(document.createElement("img"), {src:front_image, classList:"inner_img card_front"}))
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
//stopwatch countdonwn
const start_chronometer = () =>{
    chrono = setInterval(() =>{
        if(seconds > 59){
            minutes++;
            seconds = 0;
        }
        if(miliseconds > 99){
            seconds++;
            miliseconds = 0;
        }
        miliseconds++;
        miliseconds_display.textContent = `${miliseconds}`;
        seconds_display.textContent = `${seconds}`;
        minutes_display.textContent = `${minutes}`;
    },9)
}
        

const stop_chronometer = () =>{
    clearInterval(chrono);
    chrono = null;
}


//flip card function 
container.addEventListener("click", (ev) =>{
    if(ev.target.tagName === "IMG" 
        && cardPair.length < 2){
            if(!ev.target.parentElement.getElementsByTagName("img")[1].src.match(find_image)){
                ev.target.parentElement.classList.toggle("flipped");
                cardPair.push(ev.target.parentElement);
            }
    }
})

//see if 2 cards had been flip
const start_pair_interval=()=>{
    checkTest = setInterval(()=>{
        if (cardPair.length > 1){
            stop_pair_interval();
            check_pair();
        }
        if(pairs_found >= 2){
            stop_chronometer();
            stop_pair_interval();
        }
    }, 600);
}

const stop_pair_interval = () =>{
    clearInterval(checkTest);
    checkTest = null;
}

//checks if a pair is found 
const check_pair = () =>{
    if(cardPair[0].getElementsByTagName("img")[0].src.match(cardPair[1].getElementsByTagName("img")[0].src)){
        correct_pair();
        }
    pair_card_flip();
    start_pair_interval();
}

function correct_pair(){
    cardPair.forEach(card => {
        card.getElementsByTagName("img")[1].src = find_image;
    }) 
    pairs_found++;
}

function pair_card_flip(){
    setTimeout(() => {
        cardPair.forEach(card => card.classList.toggle("flipped"))
        cardPair.splice(0, cardPair.length);
    }, 600)
}