document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const floatingHearts = document.querySelectorAll('.f-heart');
    
    // Music state
    let isMusicPlaying = false;
    
    // Open the letter
    function openLetter() {
        envelope.classList.add('open');
        letter.classList.add('open');
        
        // Add confetti effect
        createConfetti();
        
        // Play sound if music is enabled
        if (isMusicPlaying) {
            const openSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-opening-envelope-1992.mp3');
            openSound.volume = 0.5;
            openSound.play();
        }
    }
    
    // Close the letter
    function closeLetter() {
        envelope.classList.remove('open');
        letter.classList.remove('open');
        
        // Play close sound if music is enabled
        if (isMusicPlaying) {
            const closeSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-paper-fold-1360.mp3');
            closeSound.volume = 0.5;
            closeSound.play();
        }
    }
    
    // Create confetti effect
    function createConfetti() {
        const colors = ['#ff3366', '#ff758c', '#ffb6c1', '#ffd166', '#ff9a76'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.innerHTML = '<i class="fas fa-heart"></i>';
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
            confetti.style.opacity = '0.9';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animation
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            // Remove confetti after animation
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }
    
    // Toggle music
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Play Music</span>';
            isMusicPlaying = false;
        } else {
            bgMusic.play().catch(e => {
                console.log("Autoplay prevented. User interaction required.");
                // If autoplay is prevented, change button text and wait for user interaction
                musicBtn.innerHTML = '<i class="fas fa-play"></i><span>Click to Play</span>';
            });
            musicBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
            isMusicPlaying = true;
        }
    }
    
    // Add interactive floating hearts
    function makeHeartsInteractive() {
        floatingHearts.forEach(heart => {
            heart.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.3)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            heart.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Add click effect to envelope
    function addEnvelopeEffect() {
        envelope.addEventListener('click', function() {
            this.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1.05)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%)';
            }, 200);
        });
    }
    
    // Event listeners
    envelope.addEventListener('click', openLetter);
    openBtn.addEventListener('click', openLetter);
    closeBtn.addEventListener('click', closeLetter);
    musicBtn.addEventListener('click', toggleMusic);
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'o' || e.key === 'O') {
            openLetter();
        } else if (e.key === 'c' || e.key === 'C') {
            closeLetter();
        } else if (e.key === 'm' || e.key === 'M') {
            toggleMusic();
        }
    });
    
    // Initialize effects
    makeHeartsInteractive();
    addEnvelopeEffect();
    
    // Start with envelope heartbeat animation
    const envelopeHeart = document.querySelector('.envelope-heart i');
    setInterval(() => {
        envelopeHeart.style.animation = 'none';
        setTimeout(() => {
            envelopeHeart.style.animation = 'heartbeat 1.5s infinite';
        }, 10);
    }, 15000);
    
    // Add a sweet message to console
    console.log("%c❤️ For Dariana ❤️", "color: #ff3366; font-size: 20px; font-weight: bold;");
    console.log("%cThis card was made with lots of love and JavaScript magic! 💌", "color: #ff758c; font-size: 14px;");
});