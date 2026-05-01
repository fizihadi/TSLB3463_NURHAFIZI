const vocabList = [
    {word: "SUN", sound: "s"}, {word: "APPLE", sound: "æ"},
    {word: "TENT", sound: "t"}, {word: "PEN", sound: "p"},
    {word: "INK", sound: "i"}, {word: "NET", sound: "n"},
    {word: "MAT", sound: "m"}, {word: "DOG", sound: "d"}
];

let currentIndex = 0;

function setupRound() {
    const current = vocabList[currentIndex];
    document.getElementById('word-display').innerText = "???"; // Reset display
    document.getElementById('message').innerText = "Ready for the next one?";
    document.getElementById('message').style.color = "#333";
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";

    const phonemes = ['s', 'a', 't', 'p', 'i', 'n', 'm', 'd'];
    
    // Mix 1 correct answer with 3 random wrong answers
    let choices = [current.sound];
    while(choices.length < 4) {
        let rand = phonemes[Math.floor(Math.random() * phonemes.length)];
        if(!choices.includes(rand)) choices.push(rand);
    }
    choices.sort(() => Math.random() - 0.5);

    choices.forEach(s => {
        const btn = document.createElement('button');
        btn.className = "opt-btn";
        btn.innerText = `/${s}/`;
        btn.onclick = () => checkAnswer(s, current.sound);
        grid.appendChild(btn);
    });
}

function playChallenge() {
    const current = vocabList[currentIndex];
    // Show text so they can read
    document.getElementById('word-display').innerText = current.word;
    // Play sound so they can listen (ensure files like 'sun.mp3' are in your audio folder)
    new Audio(`audio/${current.word.toLowerCase()}.mp3`).play();
    document.getElementById('message').innerText = "Look at the word and listen...";
}

function checkAnswer(selected, correct) {
    const feedback = document.getElementById('message');
    
    if(selected === correct) {
        feedback.innerText = "Great Job! ✨";
        feedback.style.color = "#2ecc71";
        currentIndex++;
        updateProgress();

        // Pause for a second then load next word
        setTimeout(() => {
            if(currentIndex < vocabList.length) {
                setupRound();
            } else {
                showSuccess();
            }
        }, 1200);
    } else {
        feedback.innerText = "Not quite! Look at the first letter.";
        feedback.style.color = "#e74c3c";
    }
}

function updateProgress() {
    const bar = document.getElementById('progress-bar');
    const percent = (currentIndex / vocabList.length) * 100;
    bar.style.width = percent + "%";
}

function showSuccess() {
    document.querySelector('.game-card').innerHTML = `
        <h2 style="color:#9b59b6">Stage 2 Master! 🔍</h2>
        <p>You can read and identify beginning sounds perfectly.</p>
        <a href="third.html" style="display:inline-block; margin-top:20px; padding:15px 30px; background:#2ecc71; color:white; text-decoration:none; border-radius:15px; font-weight:bold;">Go to Challenge 3</a>
    `;
}

// Start first round
setupRound();