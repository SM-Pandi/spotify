const songs = [
    {
        id: 1,
        title: "Ennai Kollathey",
        artist: "Geethan Oxon",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=300",
        src: "https://res.cloudinary.com/dwtnx6chh/video/upload/v1779443419/Ennai_Kollathey-SenSongsMp3.Co_pru5t9.mp3"
    },
    {
        id: 2,
        title: "Ennavale Ennai",
        artist: "Unnikrishnan",
        cover: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=300",
        src: "https://res.cloudinary.com/dwtnx6chh/video/upload/v1779443418/Ennavale_Ennai_-_Kuttynet.in_piyo5y.mp3"
    },
    {
        id: 3,
        title: "Oru Kuchi Oru Kulfi",
        artist: "Hiphop Tamizha",
        cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f02901?auto=format&fit=crop&q=80&w=300",
        src: "https://res.cloudinary.com/dwtnx6chh/video/upload/v1779443415/Kalakalappu_2___Oru_Kuchi_Oru_Kulfi_Video_Song___Hiphop_Tamizha___Jiiva__Jai__Sh_elkagh.mp3"
    },
    {
        id: 4,
        title: "Kannu Kulla Nikkura",
        artist: "Album Song",
        cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300",
        src: "https://res.cloudinary.com/dwtnx6chh/video/upload/v1779443409/Kannu_kulla__nikura_school_cute_love___school_love_album_song___tamil_album_song_yjd6y2.mp3"
    },
    {
        id: 5,
        title: "Adiye Pulla",
        artist: "Album Song",
        cover: "https://images.unsplash.com/photo-1485872299829-c673f5194813?auto=format&fit=crop&q=80&w=300",
        src: "https://res.cloudinary.com/dwtnx6chh/video/upload/v1779443402/Adeiyae_pula_e8mny2.mp3"
    },
    {
        id: 6,
        title: "En Kanmani Unna Pakkama",
        artist: "Album Song",
        cover: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=300",
        src: "https://res.cloudinary.com/dwtnx6chh/video/upload/v1779443396/En_kanmani_unna_pakkama_album_songs_-MIX_new_tamil_love_album_mrvrbt.mp3"
    }
];

const songListContainer = document.getElementById('song-list');
const playerCover = document.getElementById('player-cover');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');

const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');

const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

let audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

// Initialize app
function init() {
    renderSongs();
    loadSong(songs[currentSongIndex]);
}

// Render songs to the grid
function renderSongs() {
    songListContainer.innerHTML = '';
    songs.forEach((song, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${song.cover}" alt="${song.title}">
                <button class="play-hover-btn" onclick="playSpecificSong(${index}, event)">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="card-title">${song.title}</div>
            <div class="card-desc">${song.artist}</div>
        `;
        
        // Add click event to whole card to load and play
        card.addEventListener('click', () => {
             playSpecificSong(index);
        });

        songListContainer.appendChild(card);
    });
}

// Load a song into the player
function loadSong(song) {
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerCover.src = song.cover;
    audio.src = song.src;
}

// Play a specific song
window.playSpecificSong = function(index, event) {
    if(event) {
        event.stopPropagation(); // prevent card click if button clicked
    }
    currentSongIndex = index;
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Play song
function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

// Pause song
function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

// Toggle Play/Pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
});

// Next song
nextBtn.addEventListener('click', () => {
    nextSong();
});

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}

// Format time utility
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audio;
    
    // Update text
    currentTimeEl.textContent = formatTime(currentTime);
    if(duration) {
       totalTimeEl.textContent = formatTime(duration);
    }

    // Update slider
    if (!isNaN(duration) && duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        
        // Update CSS variable for the gradient background
        progressBar.style.setProperty('--value', `${progressPercent}%`);
        progressBar.style.background = `linear-gradient(to right, var(--text-highlight) ${progressPercent}%, #535353 ${progressPercent}%)`;

        if(progressBar.matches(':hover')){
             progressBar.style.background = `linear-gradient(to right, var(--brand-color) ${progressPercent}%, #535353 ${progressPercent}%)`;
        }
    }
});

// Hover effect for progress bar dynamic color
progressBar.addEventListener('mouseenter', () => {
    const val = progressBar.value;
    progressBar.style.background = `linear-gradient(to right, var(--brand-color) ${val}%, #535353 ${val}%)`;
});
progressBar.addEventListener('mouseleave', () => {
    const val = progressBar.value;
    progressBar.style.background = `linear-gradient(to right, var(--text-highlight) ${val}%, #535353 ${val}%)`;
});


// Set progress on click
progressBar.addEventListener('input', (e) => {
    const value = e.target.value;
    const duration = audio.duration;
    if(!isNaN(duration)) {
        audio.currentTime = (value / 100) * duration;
    }
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    
    // Update gradient background
    volumeSlider.style.background = `linear-gradient(to right, var(--text-highlight) ${value}%, #535353 ${value}%)`;

    if(volumeSlider.matches(':hover')){
        volumeSlider.style.background = `linear-gradient(to right, var(--brand-color) ${value}%, #535353 ${value}%)`;
    }

    // Update icon
    if (value == 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (value < 50) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
});

// Hover effect for volume slider dynamic color
volumeSlider.addEventListener('mouseenter', () => {
    const val = volumeSlider.value;
    volumeSlider.style.background = `linear-gradient(to right, var(--brand-color) ${val}%, #535353 ${val}%)`;
});
volumeSlider.addEventListener('mouseleave', () => {
    const val = volumeSlider.value;
    volumeSlider.style.background = `linear-gradient(to right, var(--text-highlight) ${val}%, #535353 ${val}%)`;
});

// Auto play next song when current ends
audio.addEventListener('ended', nextSong);

// Load duration once metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

// Initialize
init();
