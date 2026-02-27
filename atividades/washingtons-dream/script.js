let player;
let transcript = document.getElementById("transcript");
let lines = document.querySelectorAll(".line");
let currentIndex = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '500',
        width: '100%',
        videoId: 'JYqfVE-fykk'
    });

    setInterval(syncTranscript, 400);
}

function syncTranscript() {
    if (!player || !player.getCurrentTime) return;

    let currentTime = player.getCurrentTime();

    lines.forEach((line, index) => {
        let start = parseFloat(line.dataset.start);

        if (currentTime >= start) {
            currentIndex = index;
        }
    });

    updateTeleprompter();
}

function updateTeleprompter() {
    lines.forEach(line => line.classList.remove("active"));
    lines[currentIndex].classList.add("active");

    let offset = lines[currentIndex].offsetTop - 150;

    transcript.style.transform = `translateY(-${offset}px)`;
}
