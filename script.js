// Personal Dashboard JavaScript

// ============================================
// SKILLS DATA - Customize with your own skills
// ============================================
const skills = [
    { name: 'JavaScript', level: 88, category: 'Programming' },
    { name: 'React.js', level: 82, category: 'Frontend' },
    { name: 'Node.js', level: 78, category: 'Backend' },
    { name: 'Python', level: 85, category: 'Programming' },
    { name: 'HTML/CSS', level: 92, category: 'Frontend' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'MySQL', level: 80, category: 'Database' },
    { name: 'Git/GitHub', level: 86, category: 'Tools' },
    { name: 'Java', level: 83, category: 'Programming' },
    { name: 'C++', level: 79, category: 'Programming' },
    { name: 'Data Structures', level: 87, category: 'Core CS' },
    { name: 'Algorithms', level: 84, category: 'Core CS' }
];

// ============================================
// PROJECTS DATA - Add your own projects here
// ============================================
const projects = [
    {
        title: 'Smart Campus Management System (Final Year Project)',
        description: 'A comprehensive web-based platform for managing university operations including student enrollment, attendance tracking, grade management, and communication between faculty and students.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
        problem: 'Universities struggle with managing large amounts of student data, attendance records, and communication across different departments, leading to inefficiencies and poor coordination.',
        proposition: 'An integrated platform that streamlines all campus operations with real-time updates, automated attendance using QR codes, and instant notifications for students and faculty.',
        competitors: 'Blackboard, Canvas LMS, Moodle',
        link: 'https://github.com/yourusername/smart-campus',
        demo: 'https://smart-campus-demo.netlify.app',
        category: 'web'
    },
    {
        title: 'Real-Time Chat Application',
        description: 'A full-stack chat application with features like group chats, file sharing, emoji support, and real-time message notifications using WebSocket technology.',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
        problem: 'Many existing chat applications are either too complex or lack essential features like real-time updates and file sharing.',
        proposition: 'A lightweight, fast, and user-friendly chat app with all essential features and end-to-end message delivery confirmation.',
        competitors: 'WhatsApp Web, Telegram Web, Discord',
        link: 'https://github.com/yourusername/chat-app',
        demo: 'https://chat-app-demo.netlify.app',
        category: 'web'
    }
];

// ============================================
// RENDER SKILLS FUNCTION
// ============================================
function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    
    if (!skillsList) return; // Exit if element doesn't exist
    
    skillsList.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" data-level="${skill.level}"></div>
            </div>
        </div>
    `).join('');

    // Animate progress bars after a short delay
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.width = fill.dataset.level + '%';
        });
    }, 100);
}

// ============================================
// RENDER PROJECTS FUNCTION
// ============================================
function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return; // Exit if element doesn't exist
    
    const filtered = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    projectsGrid.innerHTML = filtered.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Problem Statement:</strong> ${project.problem}</p>
            <p><strong>Unique Proposition:</strong> ${project.proposition}</p>
            <p><strong>Competitors:</strong> ${project.competitors}</p>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.link}" class="project-link" target="_blank">GitHub Repository</a>
                <a href="${project.demo}" class="project-link" target="_blank">Live Demo</a>
            </div>
        </div>
    `).join('');
}

// ============================================
// PROJECT FILTER FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize skills and projects on their respective pages
    renderSkills();
    renderProjects();
    
    // Filter buttons for projects page
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Render filtered projects
            renderProjects(e.target.dataset.filter);
        });
    });
    
    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Name validation - at least 2 characters
            const name = document.getElementById('name');
            const nameGroup = name.closest('.form-group');
            if (name.value.trim().length < 2) {
                nameGroup.classList.add('error');
                isValid = false;
            } else {
                nameGroup.classList.remove('error');
            }

            // Email validation - proper email format
            const email = document.getElementById('email');
            const emailGroup = email.closest('.form-group');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                emailGroup.classList.add('error');
                isValid = false;
            } else {
                emailGroup.classList.remove('error');
            }

            // Message validation - at least 10 characters
            const message = document.getElementById('message');
            const messageGroup = message.closest('.form-group');
            if (message.value.trim().length < 10) {
                messageGroup.classList.add('error');
                isValid = false;
            } else {
                messageGroup.classList.remove('error');
            }

            // If all validations pass
            if (isValid) {
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
        
        // Real-time validation on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (input.value.trim().length > 0) {
                    group.classList.remove('error');
                }
            });
        });
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});