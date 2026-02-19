document.addEventListener('DOMContentLoaded', function() {
    const birthdayBtn = document.getElementById('birthdayBtn');
    const container = document.getElementById('container');
    let isActivated = false;
    let quizAnswered = false;

    birthdayBtn.addEventListener('click', function() {
        if (!isActivated) {
            isActivated = true;
            showQuiz();
        }
    });

    function showQuiz() {
        // Remove button
        birthdayBtn.style.display = 'none';

        // Change background
        document.body.classList.add('birthday-mode');
        container.classList.add('birthday-activated');

        // Clear container
        container.innerHTML = '';

        // Create quiz content
        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-container';

        const question = document.createElement('h1');
        question.className = 'quiz-title';
        question.textContent = 'Who is the sweetest and prettiest?';

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        // Option 1: Yue
        const yueBtn = document.createElement('button');
        yueBtn.className = 'quiz-btn';
        yueBtn.innerHTML = 'Yue 🐟';
        yueBtn.addEventListener('click', function() {
            if (!quizAnswered) {
                quizAnswered = true;
                showFinalMessage();
            }
        });

        // Option 2: Not Yue
        const notYueBtn = document.createElement('button');
        notYueBtn.className = 'quiz-btn';
        notYueBtn.innerHTML = 'Not Yue';
        let shrinkCount = 0;
        
        // Make button move away on hover or click attempt
        function moveButtonAway() {
            const randomX = (Math.random() - 0.5) * 300;
            const randomY = (Math.random() - 0.5) * 300;
            notYueBtn.classList.add('escape');
            notYueBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${Math.max(0.3, 1 - shrinkCount * 0.15)})`;
            setTimeout(() => {
                notYueBtn.classList.remove('escape');
            }, 500);
        }
        
        notYueBtn.addEventListener('mouseover', moveButtonAway);
        notYueBtn.addEventListener('mouseenter', moveButtonAway);
        notYueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            shrinkCount++;
            moveButtonAway();
        });

        optionsDiv.appendChild(yueBtn);
        optionsDiv.appendChild(notYueBtn);

        quizContainer.appendChild(question);
        quizContainer.appendChild(optionsDiv);

        container.appendChild(quizContainer);

        // Add osmanthus flowers immediately
        addOsmanthusFlowers();
    }

    function showFinalMessage() {
        // Clear quiz
        const quizContainer = document.querySelector('.quiz-container');
        if (quizContainer) quizContainer.remove();

        // Create final content
        const finalContent = document.createElement('div');
        finalContent.className = 'birthday-content';

        const finalMsg = document.createElement('h1');
        finalMsg.className = 'final-message';
        finalMsg.textContent = 'Correct! You are very smart';

        const title = document.createElement('h2');
        title.className = 'birthday-title';
        title.textContent = 'Happy Birthday Yueee!!';

        const celebration = document.createElement('div');
        celebration.className = 'celebration-emojis';
        celebration.style.fontSize = '4rem';
        celebration.style.marginTop = '10px';
        celebration.textContent = '🎉 🎉 🎉 🎉 🎉 🎉';

        finalContent.appendChild(finalMsg);
        finalContent.appendChild(title);
        finalContent.appendChild(celebration);

        container.appendChild(finalContent);

        // Create confetti celebration
        createConfetti();
    }

    function addOsmanthusFlowers() {
        const flowers = ['🏵️', '🌸', '🌼', '🌻', '🌷', '🌹', '🌺'];
        const flowerPositions = [
            { top: '2%', left: '1%' },
            { top: '8%', right: '2%' },
            { top: '25%', left: '2%' },
            { top: '35%', right: '3%' },
            { top: '15%', left: '12%' },
            { top: '60%', right: '6%' },
            { bottom: '25%', left: '6%' },
            { bottom: '30%', right: '3%' },
            { top: '75%', left: '18%' },
            { bottom: '15%', right: '12%' },
            { top: '45%', right: '10%' },
            { top: '5%', left: '22%' },
            { bottom: '40%', left: '10%' },
            { top: '50%', left: '4%' },
            { bottom: '8%', left: '28%' },
            { top: '18%', right: '15%' },
            { top: '70%', right: '2%' },
            { bottom: '50%', left: '15%' },
            { top: '55%', left: '8%' },
            { bottom: '12%', right: '20%' }
        ];

        flowerPositions.forEach((position, index) => {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[index % flowers.length];
            
            Object.assign(flower.style, position);
            flower.setAttribute('class', `flower flower-${index + 1}`);
            
            container.appendChild(flower);
        });
    }

    function createConfetti() {
        const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#FFB6C1', '#98FB98', '#DDA0DD', '#FFD700', '#FF1493', '#00FA9A', '#FF6347'];
        
        // Create massive confetti explosion all over screen
        for (let i = 0; i < 400; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 8 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
                confetti.style.pointerEvents = 'none';
                confetti.style.opacity = '1';
                confetti.style.boxShadow = '0 0 10px ' + colors[Math.floor(Math.random() * colors.length)];
                confetti.style.zIndex = '1000';
                
                // Random spawn position around entire screen
                let startX, startY, velocityX, velocityY;
                const spawnSide = Math.random();
                
                if (spawnSide < 0.25) {
                    // Top - fall down
                    startX = Math.random() * window.innerWidth;
                    startY = -10;
                    velocityX = (Math.random() - 0.5) * 4;
                    velocityY = Math.random() * 3 + 2;
                } else if (spawnSide < 0.5) {
                    // Bottom - fall up
                    startX = Math.random() * window.innerWidth;
                    startY = window.innerHeight + 10;
                    velocityX = (Math.random() - 0.5) * 4;
                    velocityY = -(Math.random() * 3 + 2);
                } else if (spawnSide < 0.75) {
                    // Left - move right
                    startX = -10;
                    startY = Math.random() * window.innerHeight;
                    velocityX = Math.random() * 3 + 2;
                    velocityY = (Math.random() - 0.5) * 4;
                } else {
                    // Right - move left
                    startX = window.innerWidth + 10;
                    startY = Math.random() * window.innerHeight;
                    velocityX = -(Math.random() * 3 + 2);
                    velocityY = (Math.random() - 0.5) * 4;
                }
                
                confetti.style.left = startX + 'px';
                confetti.style.top = startY + 'px';
                
                document.body.appendChild(confetti);

                // Natural falling/drifting animation
                let duration = Math.random() * 2 + 1.5;
                let startTime = Date.now();
                const spin = (Math.random() - 0.5) * 10;
                let rotation = 0;
                
                const animate = () => {
                    const elapsed = (Date.now() - startTime) / 1000;
                    const progress = elapsed / duration;
                    
                    if (progress < 1) {
                        // Move in natural direction with velocity and gravity
                        let currentX = startX + velocityX * elapsed * 50;
                        let currentY = startY + velocityY * elapsed * 50 + 20 * elapsed * elapsed;
                        rotation += spin;
                        
                        confetti.style.left = currentX + 'px';
                        confetti.style.top = currentY + 'px';
                        confetti.style.transform = 'rotate(' + rotation + 'deg)';
                        confetti.style.opacity = Math.max(0, 1 - progress * 0.5);
                        
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                };
                animate();
            }, i * 15);
        }
        
        // Create sparkle effects
        createSparkles();
    }
    
    function createSparkles() {
        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '3px';
            sparkle.style.height = '3px';
            sparkle.style.backgroundColor = '#FFD700';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.boxShadow = '0 0 8px #FFD700';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            sparkle.style.animationDelay = i * 0.05 + 's';
            
            container.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }
    }
});
