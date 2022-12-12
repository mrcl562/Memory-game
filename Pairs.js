const container = document.querySelector("#card_container");
const dificulty = document.querySelector("#dificulty_buttons");
const chronometer = document.querySelector("#stopwatch");
var miliseconds_display = document.querySelector(".miliseconds");
var seconds_display = document.querySelector(".seconds");
var minutes_display = document.querySelector(".minutes");
var miliseconds = 0;
var seconds = 0;
var minutes = 0;
var pairs_found = 0;
var active_pairs;

const find_image = "media/find.png";
const front_image = "media/PlaceHolder.png"
const cardPair = []

//get the images sources
var images = [];
for(let i=1; i<=44; i++){
    images.push(`media/${i}.png`)
}

//sellect dificulty
//first part calls a pair looping as many times needed
function newElement(times){
    active_pairs = times;

    dificulty.style.display= "none";
    chronometer.style.display = "grid";

    for(let i=0; i<times; i++) new_caard_pair();
    card_shifter();
    start_pair_interval();
    start_stopwatch();
}

//second part generates a pair of elements containing an image element hidden
function new_caard_pair(){
    let random = Math.floor(Math.random() * 44)
    for(let i=0; i<2; i++){
        container
        .appendChild(Object.assign(document.createElement("div"),{classList: "card"}))
        .append(Object.assign(document.createElement("img"), {src:images[random], classList: "inner_img card_back"})
               ,Object.assign(document.createElement("img"), {src:front_image, classList:"inner_img card_front"}))
    }
}
//third part sorts the created elements to random spot
function card_shifter(){
        var divs = container.children;
        var frag = document.createDocumentFragment();
        while (divs.length) {
            frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
        }
        container.appendChild(frag);
}
//stopwatch function
const start_stopwatch = () =>{
    stopwatch = setInterval(() =>{
        if(seconds > 59){
            minutes++;
            seconds = 0;
        }
        if(miliseconds > 98){
            seconds++;
            miliseconds = 0;
        }
        miliseconds++;
        miliseconds_display.innerHTML = miliseconds > 9 ? `${miliseconds}` : `0${miliseconds}`;
        seconds_display.innerHTML = seconds > 9 ? `${seconds}` : `0${seconds}`;
        minutes_display.innerHTML = minutes > 9 ? `${minutes}` : `0${minutes}`;
    },10)
}

const clear_stopwatch = () =>{
    clearInterval(stopwatch);
    stopwatch = null;
}

//flip card event listener using inheritance 
container.addEventListener("click", (ev) =>{
    if(ev.target.tagName === "IMG" 
        && cardPair.length < 2
            && !ev.target.parentElement.getElementsByTagName("img")[1].src.match(find_image)
                && ev.target.parentElement.classList != "card flipped"){
                ev.target.parentElement.classList.toggle("flipped");
                cardPair.push(ev.target.parentElement);
                
            }
    }
)

//see if 2 cards had been flip
const start_pair_interval=()=>{
    pair_interval = setInterval(()=>{
        if (cardPair.length > 1){
            stop_pair_interval();
            check_pair();
        }
        if(pairs_found >= active_pairs){
            clear_stopwatch();
            stop_pair_interval();
        }
    }, 600);
}

const stop_pair_interval = () =>{
    clearInterval(pair_interval);
    pair_interval = null;
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