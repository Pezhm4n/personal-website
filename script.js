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
    }, {threshold: 0.5}); // تغییر این مقدار به نیاز خود

    // مشاهده هر بخش
    sections.forEach(section => {
        observer.observe(section);
    });

    // اسکرول به بخش
    const scrollButton = document.querySelector('.main-btn');
    scrollButton.addEventListener('click', function () {
        const contactSection = document.getElementById('samples');
        contactSection.scrollIntoView({behavior: 'smooth'});
    });

    // تنظیم اولیه نوارها و درصدها به صفر
    function resetSkills() {
        document.querySelectorAll('.progress').forEach(progressBar => {
            progressBar.style.width = '0%';
        });
        document.querySelectorAll('.percent').forEach(percentElement => {
            percentElement.textContent = '0%';
        });
    }

    // انتخاب عنصر skills-section
    const skillsSection = document.querySelector('.skills-section');

    // تعریف یک observer با callback که انیمیشن‌ها را فعال می‌کند
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // فعال کردن انیمیشن‌ها
                document.querySelectorAll('.progress').forEach(progressBar => {
                    progressBar.classList.add('animate');
                });
                // اعمال انیمیشن‌ها به هر مهارت
                Object.keys(skills).forEach(skill => {
                    animateSkillBar(skill, skills[skill]);
                });
                // توقف نظارت پس از اجرا شدن انیمیشن‌ها
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.5}); // فعال شدن observer زمانی که 50% از بخش قابل مشاهده است

    // شروع به نظارت بر بخش مهارت‌ها
    skillsObserver.observe(skillsSection);

    const skills = {
        html: 90,
        css: 70,
        js: 20,
        java: 70,
        c: 80,
        graphic: 60
    };

    // تابعی برای انیمیشن نوار مهارت‌ها
    function animateSkillBar(skill, percent) {
        const progress = document.querySelector(`.progress.${skill}`);
        const percentElement = document.querySelector(`.percent.${skill}`);
        let width = 0;
        const interval = setInterval(() => {
            if (width >= percent) {
                clearInterval(interval);
            } else {
                width++;
                progress.style.width = `${width}%`;
                percentElement.textContent = `${width}%`;
            }
        }, 20); // تنظیم مدت زمان با تغییر این مقدار
    }

    // تنظیم اولیه نوارها و درصدها به صفر
    resetSkills();
});
