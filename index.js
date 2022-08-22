//initialsiation of variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let masterSongName = document.getElementById('masterSongName')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))


let songs = [
    { songName: "Pasoori - Shae Gill", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Sulthan-KGF", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Raataan Lambiyan - Shershaah", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Gulabi Aankhen", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Ranjha - Shershaah", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Bang-bang", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handling play pause request
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//progressbar eventlistner
audioElement.addEventListener('timeupdate', () => {
    //update seek bar 
    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

})

const makeAllplay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllplay();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `songs/${songIndex + 1}.mp3`
        audioElement.currentTime = 0;
        //changing main paly-pause btns
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        audioElement.play();

    })
})


//coding next btn
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

//coding previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})