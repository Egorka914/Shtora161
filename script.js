// ========== НАСТРОЙКА EMAILJS ==========
    // ⚠️ ВАЖНО: Замените эти значения на свои после регистрации на https://www.emailjs.com/
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: "ВАШ_PUBLIC_KEY",     // Public Key из кабинета EmailJS
        SERVICE_ID: "service_ваш_id",     // Service ID (создается при добавлении почты)
        TEMPLATE_ID: "template_ваш_id"    // Template ID (создается при создании шаблона письма)
    };
    
    // Инициализация EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Маска телефона
    const phoneInput = document.getElementById('userPhone');
    if(phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = this.value.replace(/\D/g, '').substring(0, 11);
            let formatted = '+7 ';
            if(x.length > 1) formatted += '(' + x.substring(1, 4);
            if(x.length >= 5) formatted += ') ' + x.substring(4, 7);
            if(x.length >= 8) formatted += '-' + x.substring(7, 9);
            if(x.length >= 10) formatted += '-' + x.substring(9, 11);
            this.value = formatted;
        });
    }
    
    // Показать уведомление
    function showToast(message) {
        const toast = document.getElementById('toastMsg');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }
    
    // Отправка формы через EmailJS
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value.trim();
        const phone = document.getElementById('userPhone').value.trim();
        const message = document.getElementById('userMessage').value.trim();
        
        if(!name || !phone) {
            showToast('❌ Пожалуйста, заполните имя и телефон');
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Отправка...';
        
        // Формируем текст письма
        const templateParams = {
            to_email: 'samo.remont.pk@mail.ru',
            user_name: name,
            user_phone: phone,
            user_message: message || 'Без комментария',
            site_name: 'Velvet & Grace - Шторы на заказ'
        };
        
        try {
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );
            
            console.log('Email отправлен:', response);
            showToast('✅ Заявка отправлена! Я перезвоню вам в ближайшее время.');
            form.reset();
            if(phoneInput) phoneInput.value = '+7 ';
            
        } catch(error) {
            console.error('Ошибка:', error);
            showToast('❌ Ошибка отправки. Пожалуйста, попробуйте позже или позвоните по телефону.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '📩 Отправить заявку';
        }
    });
    
    // Копирование номера телефона
    document.getElementById('copyPhoneBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('+7 (495) 123-45-67');
        showToast('📋 Номер телефона скопирован!');
    });
    
    // Анимация открытия штор
    setTimeout(() => {
        const leftPanel = document.getElementById('curtainLeft');
        const rightPanel = document.getElementById('curtainRight');
        const overlay = document.getElementById('curtainOverlay');
        if(leftPanel && rightPanel) {
            leftPanel.style.transform = 'translateX(-100%)';
            rightPanel.style.transform = 'translateX(100%)';
            setTimeout(() => { if(overlay) overlay.style.display = 'none'; }, 1900);
        }
    }, 500);
    
    // Курсор
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        if(cursor) cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        if(cursorDot) cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    const clickables = document.querySelectorAll('a, button, .btn, .card-flip, .swiper-slide, .faq-q, .glass-btn');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursor) { cursor.style.width = '48px'; cursor.style.height = '48px'; cursor.style.backgroundColor = 'rgba(158,138,127,0.2)'; }
        });
        el.addEventListener('mouseleave', () => {
            if(cursor) { cursor.style.width = '28px'; cursor.style.height = '28px'; cursor.style.backgroundColor = 'rgba(158,138,127,0.1)'; }
        });
    });
    
    // Навигация
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    
    document.querySelectorAll('.nav-link, #ctaMainBtn, .btn-detail').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if(href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Swiper
    new Swiper('.portfolioSwiper', {
        effect: 'coverflow', grabCursor: true, centeredSlides: true, slidesPerView: 'auto',
        coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
        loop: true, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
    
    // Счетчики
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const update = () => {
            current += increment;
            if(current < target) { el.innerText = Math.floor(current); requestAnimationFrame(update); }
            else el.innerText = target;
        };
        update();
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) { animateCounter(e.target); observer.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
    
    // GSAP
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".premium-card, .flip-container, .step-card, .review-card, .faq-glow").forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%", once: true }, opacity: 0, y: 70, duration: 0.7, ease: "power3.out" });
    });
    gsap.from(".hero h1", { duration: 1.2, y: 150, opacity: 0, ease: "back.out(1.2)" });
    gsap.from(".hero p", { duration: 1, x: -80, opacity: 0, delay: 0.4 });
    gsap.from("#ctaMainBtn", { duration: 0.8, scale: 0, opacity: 0, delay: 0.7, ease: "elastic.out(1,0.5)" });
    
    // Аккордеон
    document.querySelectorAll('.faq-q').forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.parentElement.querySelector('.faq-a');
            const icon = q.querySelector('i');
            if(answer.style.display === 'none' || !answer.style.display) {
                answer.style.display = 'block';
                if(icon) icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.display = 'none';
                if(icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Инструкция по настройке EmailJS в консоли
    console.log('%c📧 ПОДРОБНАЯ ИНСТРУКЦИЯ ПО НАСТРОЙКЕ EMAILJS ДЛЯ ПОЛУЧЕНИЯ ЗАЯВОК НА ПОЧТУ', 'color: #9e8a7f; font-size: 14px; font-weight: bold;');
    console.log('%cШАГ 1: Зарегистрируйтесь на https://www.emailjs.com/ (бесплатно, 2 минуты)', 'color: #414141');
    console.log('%cШАГ 2: В разделе "Email Services" нажмите "Add New Service" → выберите "Mail.ru" → подключите вашу почту samo.remont.pk@mail.ru', 'color: #414141');
    console.log('%cШАГ 3: Перейдите в "Email Templates" → "Create New Template"', 'color: #414141');
    console.log('%cШАГ 4: В поле Subject напишите: "Новая заявка с сайта Velvet & Grace"', 'color: #414141');
    console.log('%cШАГ 5: В поле Content вставьте:', 'color: #414141');
    console.log('%c📩 НОВАЯ ЗАЯВКА С САЙТА\n\n👤 Имя: {{user_name}}\n📞 Телефон: {{user_phone}}\n💬 Комментарий: {{user_message}}\n🌐 Сайт: {{site_name}}\n\nВремя заявки: {{#each time}}{{/each}}', 'color: #2a5c8a');
    console.log('%cШАГ 6: Сохраните шаблон и скопируйте Template ID', 'color: #414141');
    console.log('%cШАГ 7: В разделе "Account" → "API Keys" скопируйте Public Key', 'color: #414141');
    console.log('%cШАГ 8: Вставьте ключи в переменные EMAILJS_CONFIG в коде (строки 660-663)', 'color: #9e8a7f; font-weight: bold;');
    console.log('%cПосле настройки все заявки будут приходить на почту samo.remont.pk@mail.ru!', 'color: #2e7d32; font-size: 14px; font-weight: bold;');