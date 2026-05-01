const wordList = [
    {w: "SIP", s: "s"}, {w: "AT", s: "a"},
    {w: "APPLE", s: "a"}, {w: "SAT", s: "s"},
    {w: "TAP", s: "t"}, {w: "PIN", s: "p"},
    {w: "PAN", s: "p"}, {w: "TIP", s: "t"},
    {w: "IGLOO", s: "i"}, {w: "NIP", s: "n"},
    {w: "NAP", s: "n"}, {w: "IN", s: "i"},
    {w: "MAT", s: "m"}, {w: "DIG", s: "d"},
    {w: "DAD", s: "d"}, {w: "MAP", s: "m"}
];

let score = 0;

function initGame() {
    const pool = document.getElementById('pool');
    wordList.forEach((item, index) => {
        const tile = document.createElement('div');
        tile.className = 'word-tile';
        tile.innerText = item.w;
        tile.draggable = true;
        tile.id = "tile-" + index;
        tile.setAttribute('data-s', item.s);

        // When drag starts
        tile.ondragstart = (ev) => {
            ev.dataTransfer.setData("textID", ev.target.id);
            // Optional: Play audio when they pick up the word
            new Audio(`audio/${item.w.toLowerCase()}.mp3`).play();
        };

        pool.appendChild(tile);
    });
}

function allowDrop(ev) {
    ev.preventDefault(); // Required to allow dropping
}

function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("textID");
    const tile = document.getElementById(id);
    const bucket = ev.target.closest('.bucket');

    if (bucket) {
        const tileSound = tile.getAttribute('data-s');
        const bucketSound = bucket.getAttribute('data-sound');

        if (tileSound === bucketSound) {
            // Correct Sort
            bucket.appendChild(tile);
            tile.draggable = false;
            tile.style.background = "#2ecc71";
            tile.style.border = "none";
            tile.style.color = "white";
            score++;
            document.getElementById('score').innerText = score;
            document.getElementById('message').innerText = "Correct! Well done.";
            document.getElementById('message').style.color = "#2ecc71";

            if (score === 16) {
                showWin();
            }
        } else {
            // Wrong Sort
            document.getElementById('message').innerText = "Wrong bucket! Try again.";
            document.getElementById('message').style.color = "#e74c3c";
        }
    }
}

function showWin() {
    document.querySelector('.game-card').innerHTML = `
        <h1 style="color:#2ecc71">Lesson Complete! 🏆</h1>
        <p>You sorted all 16 words correctly.</p>
        <a href="index.html" class="nav-btn" style="background:#9b59b6; color:white; display:inline-block; padding:15px 30px; margin-top:20px;">Return Home</a>
    `;
}

initGame();