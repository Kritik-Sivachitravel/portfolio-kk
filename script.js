// --- Preloader Logic with Floating Binary ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const binaryContainer = document.getElementById('binary-background');
    const numberOfBits = 200; // Increased from 100 for a denser effect

    // Function to create and add the floating bits
    function createBinaryBits() {
        for (let i = 0; i < numberOfBits; i++) {
            const bit = document.createElement('span');
            bit.textContent = Math.round(Math.random()).toString(); // Randomly '0' or '1'

            // Randomize properties for a more active look
            bit.style.left = `${Math.random() * 100}vw`;
            bit.style.fontSize = `${Math.random() * 15 + 10}px`; // Size between 10px and 25px
            bit.style.animationDuration = `${Math.random() * 5 + 3}s`; // Faster duration: 3s to 8s
            bit.style.animationDelay = `${Math.random() * 3}s`; // Shorter delay to start faster

            binaryContainer.appendChild(bit);
        }
    }

    createBinaryBits();

    // Hide preloader after the main glitch animation is mostly done
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2800); // 2.8 seconds
});
document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Flip Card Effect ---
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });
});
// --- Connecting Node Network Animation ---
const canvas = document.getElementById('node-network-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    const setupCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight; // Changed this line
    };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * 0.5 - 0.25;
            this.vy = Math.random() * 0.5 - 0.25;
            this.radius = 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(192, 132, 252, 0.5)'; // Purple dot color
            ctx.fill();
        }
    }

    const createParticles = () => {
        particles = [];
        const numberOfParticles = window.innerWidth > 768 ? 100 : 40;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    };

    const connectParticles = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(192, 132, 252, ${1 - distance / 120})`; // Fades with distance
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    };

    setupCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        setupCanvas();
        createParticles();
    });
}