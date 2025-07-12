document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.tab-bar__tab-link');

    // ایجاد Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                links.forEach(link => {
                    link.setAttribute('aria-current', link.getAttribute('href').substring(1) === id ? 'page' : 'false');
                });
            }
        });
    }, {threshold: 0.5});


    sections.forEach(section => {
        observer.observe(section);
    });

    const scrollButton = document.querySelector('.main-btn');
    scrollButton.addEventListener('click', function () {
        const portfolioSection = document.getElementById('portfolio');
        portfolioSection.scrollIntoView({behavior: 'smooth'});
    });


    function resetSkills() {
        document.querySelectorAll('.progress').forEach(progressBar => {
            progressBar.style.width = '0%';
        });
        document.querySelectorAll('.percent').forEach(percentElement => {
            percentElement.textContent = '0%';
        });
    }


    const skillsSection = document.querySelector('.skills-section');


    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // فعال کردن انیمیشن‌ها
                document.querySelectorAll('.progress').forEach(progressBar => {
                    progressBar.classList.add('animate');
                });
                Object.keys(skills).forEach(skill => {
                    animateSkillBar(skill,skills[skill]);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5});

    skillsObserver.observe(skillsSection);

    const skills = {
        html: 80,
        css: 70,
        js: 30,
        java: 60,
        c: 70,
        python: 50,
        machineLearning : 60,
        git: 70
    };

    //  انیمیشن نوارها
    function animateSkillBar(skill, percent) {
        const progress = document.querySelector(`.progress.${skill}`);
        const percentElement = document.querySelector(`.percent.${skill}`);
        let width = 0;
        const interval = setInterval(() => {
            if (width >= percent){
                clearInterval(interval);
            } else{
                width++;
                progress.style.width = `${width}%`;
                percentElement.textContent = `${width}%`;
            }
        }, 20);
    }

    resetSkills();
});
