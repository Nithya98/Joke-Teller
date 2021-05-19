const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Disable or enable audio button 
function toggleButton(){
    button.disabled =!button.disabled;
}
// Passing jokes to VoiceRSS API 
function tellMe(joke){
    // VoiceRSS API
    VoiceRSS.speech({
        key: 'c58ed7e942924fdd914fa1bf04907ac9',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}
//Get jokes from Jokes api
async function getJokes(){
    let joke = '';
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`
        }
        else{
            joke = data.joke;
        }
        //diable button
        toggleButton();
        tellMe(joke);
    } catch (error) {
        console.log("Whoops.... error is ", error);
    }
}
//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
