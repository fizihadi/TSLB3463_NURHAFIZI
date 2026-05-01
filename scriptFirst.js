const phonemes = ['s', 'æ', 't', 'p', 'i', 'n', 'm', 'd'];
let currentTarget = "";
let score = 0;

function setupGame() {
    // Randomly pick a phoneme from the list
    currentTarget = phonemes[Math.floor(Math.random() * phonemes.length)];
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = ""; // Clear buttons

    // Create buttons for all 8 sounds
    phonemes.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'sound-btn';
        btn.innerText = `/${p}/`;
        btn.onclick = () => checkAnswer(p, btn);
        grid.appendChild(btn);
    });
}

function playCurrentSound() {
    // Plays audio files named s.mp3, a.mp3, etc.
    const audio = new Audio(`audio/${currentTarget}.mp3`);
    audio.play();
    document.getElementById('feedback-message').innerText = "Listening...";
    document.getElementById('feedback-message').style.color = "#333";
}

function checkAnswer(selected, btn) {
    const feedback = document.getElementById('feedback-message');
    
    if (selected === currentTarget) {
        score++;
        feedback.innerText = "Excellent! That is correct. ✨";
        feedback.style.color = "#2ecc71";
        document.getElementById('score').innerText = score;
        
        // Disable buttons briefly so they don't spam click
        document.querySelectorAll('.sound-btn').forEach(b => b.disabled = true);

        setTimeout(() => {
            if (score < 8) {
                setupGame();
            } else {
                finishChallenge();
            }
        }, 1500);
    } else {
        feedback.innerText = "Try again! Listen closely.";
        feedback.style.color = "#e74c3c";
    }
}

function finishChallenge() {
    document.querySelector('.game-card').innerHTML = `
        <h2>Well Done! 🎉</h2>
        <p>You recognized all 8 phonemes.</p>
        <a href="second.html" style="display:inline-block; margin-top:20px; padding:15px 30px; background:#2ecc71; color:white; text-decoration:none; border-radius:10px; font-weight:bold;">Next Challenge</a>
    `;
}

// Initialize the first round
setupGame();