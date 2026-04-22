// ========================================
// GLOBAL STATE & VARIABLES
// ========================================

// Mock user data
let currentUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    level: 'Beginner',
    language: 'Spanish',
    joinDate: '2024-01-15'
};

// Mock registered users database
let registeredUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        language: 'Spanish',
        level: 'Beginner'
    }
];

// ========================================
// AUTHENTICATION - REGISTER
// ========================================

function handleRegister(event) {
    event.preventDefault();

    // Get form values
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const language = document.getElementById('language').value;
    const level = document.getElementById('level').value;

    // Validation
    if (!fullname || !email || !password || !language || !level) {
        alert('Please fill in all required fields');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Check if email already exists
    if (registeredUsers.some(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
        alert('Password must contain at least 1 uppercase letter and 1 number');
        return;
    }

    // Create new user
    const newUser = {
        id: registeredUsers.length + 1,
        name: fullname,
        email: email,
        password: password,
        language: language,
        level: level
    };

    // Save user
    registeredUsers.push(newUser);

    // Store in localStorage
    localStorage.setItem('users', JSON.stringify(registeredUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Success message
    alert('Account created successfully! Redirecting to dashboard...');

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// ========================================
// AUTHENTICATION - LOGIN
// ========================================

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    // Find user
    const user = registeredUsers.find(u => u.email === email);

    if (!user) {
        alert('Email not found');
        return;
    }

    if (user.password !== password) {
        alert('Incorrect password');
        return;
    }

    // Store user session
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberedEmail', email);
    }

    // Success message
    alert('Login successful! Redirecting to dashboard...');

    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// ========================================
// SOCIAL LOGIN
// ========================================

function loginWithGoogle() {
    // Simulate Google login
    alert('Google login would be implemented here with OAuth');
    // In real app, this would redirect to Google OAuth flow
}

function loginWithFacebook() {
    // Simulate Facebook login
    alert('Facebook login would be implemented here with OAuth');
    // In real app, this would redirect to Facebook OAuth flow
}

// ========================================
// LOGOUT
// ========================================

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        alert('Logged out successfully');
        window.location.href = 'index.html';
    }
}

// ========================================
// DASHBOARD FUNCTIONS
// ========================================

function loadUserDashboard() {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('currentUser');

    if (!savedUser) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    currentUser = JSON.parse(savedUser);

    // Update user info in sidebar
    const userNameEl = document.getElementById('userName');
    const userLevelEl = document.getElementById('userLevel');
    const userAvatarEl = document.querySelector('.user-avatar');

    if (userNameEl) userNameEl.textContent = currentUser.name;
    if (userLevelEl) userLevelEl.textContent = currentUser.level;
    if (userAvatarEl) userAvatarEl.textContent = getInitials(currentUser.name);
}

function getInitials(name) {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

// ========================================
// TAB SWITCHING
// ========================================

function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked menu item
    event.target.closest('.menu-item').classList.add('active');
}

// ========================================
// LESSON & PRACTICE FUNCTIONS
// ========================================

function startLesson() {
    alert('Starting lesson: Spanish: Present Tense Verbs\n\nThis would open an interactive lesson interface.');
    // In real app, this would open a lesson player
}

function practiceVocab() {
    alert('Opening vocabulary practice...\n\nYou will practice 10 new words with AI tutor.');
}

function takeQuiz() {
    alert('Starting quiz...\n\nYou will answer 15 questions.');
}

function reviewCards() {
    alert('Opening flashcards...\n\nReview your learning progress with spaced repetition.');
}

function continueCourse(course) {
    alert(`Continuing ${course} course...`);
    // In real app, this would load the course content
}

function startPractice(type) {
    const practices = {
        speaking: 'Speaking practice with AI tutor',
        listening: 'Listening to native speakers',
        writing: 'Writing exercises with feedback',
        vocab: 'Vocabulary flashcards'
    };

    alert(`Starting ${practices[type]}...`);
}

// ========================================
// REMEMBER ME FUNCTIONALITY
// ========================================

window.addEventListener('load', function() {
    const rememberMe = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('rememberedEmail');

    if (rememberMe && rememberedEmail) {
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) {
            emailInput.value = rememberedEmail;
        }
    }
});

// ========================================
// FORM VALIDATION
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// ========================================
// NAVIGATION ACTIVE STATE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// REAL-TIME FORM VALIDATION
// ========================================

function setupFormValidation() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (passwordInput) {
        passwordInput.addEventListener('change', function() {
            validatePasswordStrength(this.value);
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            if (passwordInput && this.value !== passwordInput.value) {
                alert('Passwords do not match');
            }
        });
    }
}

function validatePasswordStrength(password) {
    const strength = {
        weak: 0,
        medium: 1,
        strong: 2
    };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;

    const levels = ['Weak', 'Medium', 'Strong'];
    console.log(`Password strength: ${levels[score]}`);
}

// Initialize form validation on page load
document.addEventListener('DOMContentLoaded', setupFormValidation);

// ========================================
// ACHIEVEMENT ANIMATIONS
// ========================================

function animateAchievementBadge(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'pop 0.5s ease-in-out';
    }, 10);
}

// ========================================
// STATISTICS UPDATE
// ========================================

function updateStatistics() {
    // In real app, this would fetch updated stats from server
    const stats = {
        streak: 12,
        timeThisMonth: '24h 30m',
        lessonsCompleted: 47,
        pointsEarned: 2340
    };

    return stats;
}

// ========================================
// LOCAL STORAGE HELPERS
// ========================================

function saveUserProgress(progress) {
    const savedProgress = localStorage.getItem('userProgress') || '{}';
    const allProgress = JSON.parse(savedProgress);
    allProgress[currentUser.email] = progress;
    localStorage.setItem('userProgress', JSON.stringify(allProgress));
}

function getUserProgress() {
    const savedProgress = localStorage.getItem('userProgress') || '{}';
    const allProgress = JSON.parse(savedProgress);
    return allProgress[currentUser.email] || {};
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to submit forms
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        const form = document.querySelector('form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }

    // Escape to close modals (future implementation)
    if (event.key === 'Escape') {
        // Close modal logic here
    }
});

// ========================================
// RESPONSIVE MENU TOGGLE
// ========================================

function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', function() {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
});

// ========================================
// CONSOLE MESSAGES
// ========================================

console.log('%cWelcome to LinguaAI!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cLanguage Learning Made Easy', 'color: #764ba2; font-size: 14px;');
