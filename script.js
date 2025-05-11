// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const text = "Tiza Talla";
let i = 0;
function type() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    } else {
        typewriter.textContent += '_';
        setTimeout(() => {
            typewriter.textContent = text;
            setTimeout(type, 1000);
        }, 500);
    }
}
type();

// Starry Background with Shooting Stars and Clickable Sparkles
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random()
    });
}

const shootingStars = [];
function addShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 50 + 50,
        speed: Math.random() * 5 + 2,
        alpha: 1
    });
}
setInterval(addShootingStar, 3000);

const sparkles = [];
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 10; i++) {
        sparkles.push({
            x,
            y,
            radius: Math.random() * 3,
            alpha: 1,
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 4 - 2
        });
    }
});

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.alpha += Math.random() * 0.05 - 0.025;
        if (star.alpha < 0) star.alpha = 1;
        if (star.alpha > 1) star.alpha = 0;
    });
    shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length, star.y + star.length);
        ctx.strokeStyle = `rgba(0, 255, 136, ${star.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        star.x -= star.speed;
        star.y += star.speed;
        star.alpha -= 0.02;
        if (star.alpha <= 0) shootingStars.splice(index, 1);
    });
    sparkles.forEach((sparkle, index) => {
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${sparkle.alpha})`;
        ctx.fill();
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;
        sparkle.alpha -= 0.05;
        if (sparkle.alpha <= 0) sparkles.splice(index, 1);
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// Resize Canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.forEach(star => {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
    });
});

// Theme Switcher
const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', () => {
    const body = document.body;
    const isLight = body.getAttribute('data-theme') === 'light';
    console.log(isLight)
    body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeSwitcher.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
themeSwitcher.textContent = savedTheme === 'light' ? '🌙' : '☀️';

// Navigation Active State
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            card.style.display = filter === 'all' || filter === category ? 'block' : 'none';
        });
    });
});

// Project Modals
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalLink = document.getElementById('modal-link');
const closeModal = document.querySelector('.close');

const projectData = {
    'Palimpsest': {
        description: 'A clipboard history tracker with system tray integration, JSON persistence, and a user-friendly interface for managing copied text.',
        tech: 'Tech: Java, JavaFX 24, JSON',
        link: 'https://github.com/Kurocifer/Palimpsest'
    },
    'CarTrace': {
        description: 'A system for tracking vehicle locations and statuses, designed for real-time data processing and monitoring, and can be used for fleet management.',
        tech: 'Tech: JavaScript, React, Node.js, Express.js, MongoDB',
        link: 'https://github.com/Kurocifer/cartrace'
    },
    'AkefalosShare': {
        description: 'A decentralized cross platform desktop app for efficient peer-to-peer file transfers.',
        tech: 'Tech: Flutter, Dart',
        link: 'https://github.com/Kurocifer/AkefalosShare'
    },
    'Onboarder': {
        description: 'A guided workflow system to streamline user onboarding on Linux systems permitting seemless management of different user accounts.',
        tech: 'Tech: Bash',
        link: 'https://github.com/Kurocifer/Onboarder'
    },
    'Kodex': {
        description: 'A command-line tool to analyze programming languages in a directory, calculating file counts and percentages.',
        tech: 'Tech: Python',
        link: 'https://github.com/Kurocifer/kodex'
    },
    'JakushaChain': {
        description: 'A blockchain prototype exploring decentralized data management and transaction processing.',
        tech: 'Tech: Java',
        link: 'https://github.com/Kurocifer/JakushaChain'
    },
    'Java Breakout': {
        description: 'A classic Breakout game with paddle-ball mechanics, levels, and smooth gameplay.',
        tech: 'Tech: Java',
        link: 'https://github.com/Kurocifer/Java_Breakout'
    },
    'Sudoku Desktop': {
        description: 'A desktop Sudoku game with a user-friendly interface and puzzle-solving features.',
        tech: 'Tech: Java, JavaFX',
        link: 'https://github.com/Kurocifer/SudokuDesktop'
    },
    'LazyShop-API': {
        description: 'A robust backend for an e-commerce platform, managing products, users, and transactions.',
        tech: 'Tech: Java, Spring Boot',
        link: 'https://github.com/Kurocifer/LazyShop-API'
    },
    'Passdagon': {
        description: 'A secure tool for password management and generation, with a focus on encryption.',
        tech: 'Tech: Java',
        link: 'https://github.com/Kurocifer/Passdagon'
    },
    'Alien Invasion': {
        description: 'An arcade-style game where players shoot waves of alien invaders, featuring smooth controls and scoring.',
        tech: 'Tech: Python, Pygame',
        link: 'https://github.com/Kurocifer/alien_invasion'
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const data = projectData[title];
        modalTitle.textContent = title;
        modalDescription.textContent = data.description;
        modalTech.textContent = data.tech;
        modalLink.innerHTML = `GitHub: <a href="${data.link}" target="_blank">View Repository</a>`;
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Fade-In on Scroll
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
faders.forEach(fader => observer.observe(fader));