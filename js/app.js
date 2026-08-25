// ===== ГЕОВЫЗОВ 2026 — ВЕБ-КВИЗ =====
// Основной модуль приложения

class GeoQuiz {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.timer = null;
        this.timerValue = 60;
        this.hintShown = false;
        this.hintTimer = null;
        this.isAutoPlay = false;

        // Звуки (Web Audio API)
        this.audioCtx = null;
        this.initAudio();

        // Инициализация
        this.buildSlides();
        this.bindEvents();
        this.showSlide(0);
    }

    // ===== АУДИО =====
    initAudio() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log("Web Audio API не поддерживается");
        }
    }

    playTick() {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.frequency.value = 800;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);
        osc.start(this.audioCtx.currentTime);
        osc.stop(this.audioCtx.currentTime + 0.1);
    }

    playTimeUpSound() {
        if (!this.audioCtx) return;
        // Протяжный звук окончания времени (3 нисходящих тона)
        const now = this.audioCtx.currentTime;
        [523, 440, 349].forEach((freq, i) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.frequency.value = freq;
            osc.type = 'sawtooth';
            gain.gain.setValueAtTime(0.12, now + i * 0.25);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.25 + 0.4);
            osc.start(now + i * 0.25);
            osc.stop(now + i * 0.25 + 0.4);
        });
        // Дополнительный низкий тон
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.frequency.value = 220;
        osc.type = 'sawtooth';
        gain.gain.setValueAtTime(0.15, now + 0.75);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        osc.start(now + 0.75);
        osc.stop(now + 1.5);
    }

    playHintSound() {
        if (!this.audioCtx) return;
        // Мягкая мелодия (два тона)
        [440, 554].forEach((freq, i) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + i * 0.15 + 0.3);
            osc.start(this.audioCtx.currentTime + i * 0.15);
            osc.stop(this.audioCtx.currentTime + i * 0.15 + 0.3);
        });
    }

    playSectionSound() {
        if (!this.audioCtx) return;
        // Короткая фанфара
        [523, 659, 784].forEach((freq, i) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.frequency.value = freq;
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + i * 0.12 + 0.2);
            osc.start(this.audioCtx.currentTime + i * 0.12);
            osc.stop(this.audioCtx.currentTime + i * 0.12 + 0.2);
        });
    }

    // ===== ПОСТРОЕНИЕ СЛАЙДОВ =====
    buildSlides() {
        const { rounds, questions } = QUIZ_DATA;

        // Титульный
        this.slides.push({ type: 'start' });

        // Правила
        this.slides.push({ type: 'rules' });

        // Раунды (без ответов)
        let currentRound = null;
        const roundAnswers = {}; // Собираем ответы по раундам
        let breakInserted = false;

        questions.forEach(q => {
            const round = rounds.find(r => r.id === q.round);

            // Секция (если новый раунд)
            if (q.round !== currentRound) {
                currentRound = q.round;

                // Вставляем экран «Перерыв» после Раунда 3 (Микс)
                if (q.round === 'R4' && !breakInserted) {
                    this.slides.push({ type: 'break' });
                    breakInserted = true;
                }

                this.slides.push({
                    type: 'section',
                    round: round,
                    roundNum: rounds.indexOf(round) + 1
                });
                roundAnswers[q.round] = [];
            }

            // Вопрос
            this.slides.push({
                type: 'question',
                data: q,
                round: round
            });

            // Собираем ответы
            roundAnswers[q.round].push(q);
        });

        // Ответы по раундам — В КОНЦЕ
        rounds.forEach(round => {
            if (roundAnswers[round.id] && roundAnswers[round.id].length > 0) {
                this.slides.push({
                    type: 'answers',
                    round: round,
                    questions: roundAnswers[round.id]
                });
            }
        });

        // Итоги
        this.slides.push({ type: 'final' });
    }

    // ===== ПОКАЗ СЛАЙДА =====
    showSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        this.stopTimer();
        this.currentSlide = index;
        const slide = this.slides[index];

        // Скрываем все экраны
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

        // Показываем нужный
        switch(slide.type) {
            case 'start':
                document.getElementById('start-screen').classList.add('active');
                break;
            case 'rules':
                document.getElementById('rules-screen').classList.add('active');
                break;
            case 'section':
                this.showSection(slide);
                break;
            case 'break':
                document.getElementById('break-screen').classList.add('active');
                this.playSectionSound();
                break;
            case 'question':
                this.showQuestion(slide);
                break;
            case 'answers':
                this.showAnswers(slide);
                break;
            case 'final':
                document.getElementById('final-screen').classList.add('active');
                break;
        }
    }

    // ===== СЕКЦИЯ =====
    showSection(slide) {
        const el = document.getElementById('section-screen');
        document.getElementById('section-title-ru').textContent = slide.round.nameRu;
        document.getElementById('section-title-en').textContent = slide.round.nameEn;
        document.getElementById('round-number').textContent = slide.roundNum;
        el.style.background = slide.round.color;
        el.classList.add('active');
        this.playSectionSound();
    }

    // ===== ВОПРОС =====
    showQuestion(slide) {
        const q = slide.data;
        const screen = document.getElementById('question-screen');
        screen.classList.add('active');

        // Шапка
        document.getElementById('q-round-name').textContent = slide.round.nameRu;
        document.getElementById('q-round-name-en').textContent = `/ ${slide.round.nameEn}`;
        document.getElementById('q-number').textContent = q.id;

        // Вопросы
        document.getElementById('q-text-ru').textContent = q.qRu;
        document.getElementById('q-text-en').textContent = q.qEn;

        // Подсказки (скрыты)
        const hintRu = document.getElementById('hint-ru');
        const hintEn = document.getElementById('hint-en');
        hintRu.classList.remove('visible');
        hintEn.classList.remove('visible');
        document.getElementById('hint-text-ru').textContent = q.hintRu;
        document.getElementById('hint-text-en').textContent = q.hintEn;
        this.hintShown = false;

        // Варианты ответов (RU) — перемешанные
        const optRu = document.getElementById('options-ru');
        optRu.innerHTML = '';
        const shuffledRu = this.shuffleOptions(q.optsRu);
        q._shuffledRu = shuffledRu; // Сохраняем для проверки
        shuffledRu.forEach(opt => {
            const div = document.createElement('div');
            div.className = 'q-option';
            div.innerHTML = `<span class="q-option-letter">${opt.l}</span><span class="q-option-text">${opt.t}</span>`;
            optRu.appendChild(div);
        });

        // Варианты ответов (EN) — перемешанные
        const optEn = document.getElementById('options-en');
        optEn.innerHTML = '';
        const shuffledEn = this.shuffleOptions(q.optsEn);
        q._shuffledEn = shuffledEn;
        shuffledEn.forEach(opt => {
            const div = document.createElement('div');
            div.className = 'q-option';
            div.innerHTML = `<span class="q-option-letter">${opt.l}</span><span class="q-option-text">${opt.t}</span>`;
            optEn.appendChild(div);
        });

        // Картинка (SVG)
        this.drawImage(q.image);

        // Подпись
        const captions = {
            anticline: "Антиклиналь / Anticline",
            porosity: "Пористость / Porosity",
            impedance: "Импеданс / Impedance",
            prms: "PRMS / PRMS",
            geosteering: "Геонавигация / Geosteering",
            sp: "Каротаж SP / SP Log",
            facies: "Фация / Facies",
            horizontal: "Горизонт. скважина / Horizontal Well",
            pressure: "АВПД / Overpressure",
            reservoir: "Коллектор / Reservoir",
            mohs: "Шкала Мооса / Mohs Scale",
            folds: "Складки / Folds",
            geochem: "Геохим. ореол / Geochemical Halo",
            panning: "Шлих / Panning",
            faults: "Разломы / Faults",
            fossils: "Ископаемые / Fossils",
            aquifer: "Водоносный горизонт / Aquifer",
            radiometry: "Радиометрия / Radiometry",
            crystals: "Сингонии / Crystal Systems",
            metamorphism: "Метаморфизм / Metamorphism",
            stratigraphy: "Стратиграфия / Stratigraphy",
            igneous: "Магматические породы / Igneous Rocks",
            timescale: "Геохронология / Timescale",
            tectonics: "Тектоника плит / Plate Tectonics",
            atmosphere: "Атмосфера / Atmosphere",
            core: "Керн / Core Sample",
            sakhalin: "Сахалин / Sakhalin",
            geo2025: "ГеоВызов 2025 / GeoChallenge 2025",
            urals: "Урал / Urals",
            gis: "ГИС / Well Logging",
            feldspar: "Полевой шпат / Feldspar",
            // Раунд 4: Мой мир
            maputo: "Мапуту, Мозамбик / Maputo, Mozambique",
            susa: "Сузы, Иран / Susa, Iran",
            yangtze: "Янцзы, Китай / Yangtze, China",
            tenochtitlan: "Теночтитлан, Мексика / Tenochtitlan, Mexico",
            svytiaz: "Озеро Свитьязь, Беларусь / Lake Svytiaz, Belarus",
            victoria: "Водопады Виктории / Victoria Falls",
            mesopotamia: "Междуречье, Ирак / Mesopotamia, Iraq",
            pamir: "Пик Исмоили Самани, Таджикистан / Ismoil Somoni, Tajikistan",
            sahara: "Сахара, Алжир / Sahara, Algeria",
            bauxite: "Бокситы, Гвинея / Bauxite, Guinea",
            // Раунд 5: Вместе
            tacos: "Тако, Мексика / Tacos, Mexico",
            nowruz: "Навруз, Иран / Nowruz, Iran",
            mansaf: "Мансаф, Палестина / Mansaf, Palestine",
            baobab: "Баобаб, Мали / Baobab, Mali",
            zimbabwe_dollar: "Зимбабвийский доллар / Zimbabwean Dollar",
            hermitage: "Эрмитаж, Россия / Hermitage, Russia",
            great_wall: "Великая Китайская стена / Great Wall of China",
            djembe: "Джембе, Гвинея / Djembe, Guinea",
            bialowieza: "Беловежская пуща, Беларусь / Białowieża Forest, Belarus"
        };
        document.getElementById('q-image-caption').textContent = captions[q.image] || q.image;

        // Таймер и инфо (в центре под картинкой)
        const roundQuestions = QUIZ_DATA.questions.filter(x => x.round === q.round);
        const numInRound = roundQuestions.indexOf(q) + 1;
        document.getElementById('footer-q-num').textContent = `${q.id} / ${roundQuestions.length}`;
        document.getElementById('footer-round').textContent = slide.round.nameRu;
        document.getElementById('footer-round-en').textContent = `/ ${slide.round.nameEn}`;

        // Запуск таймера
        this.startTimer();

        // Подсказка до подсказки
        document.getElementById('hint-countdown').textContent = 'Подсказка через: 30 сек';

        // Скрываем overlay
        this.hideTimeUpOverlay();
    }

    // ===== ТАЙМЕР =====
    startTimer() {
        this.timerValue = 60;
        this.hintShown = false;
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timerValue--;
            this.updateTimerDisplay();

            // Тикаем каждую секунду (кроме последней)
            if (this.timerValue > 0) {
                this.playTick();
            }

            // Подсказка через 30 сек
            if (this.timerValue === 30 && !this.hintShown) {
                this.showHint();
            }

            // Конец времени
            if (this.timerValue <= 0) {
                this.stopTimer();
                this.playTimeUpSound();
                this.showTimeUpOverlay();
                // Автопереход через 2.5 сек
                setTimeout(() => {
                    this.hideTimeUpOverlay();
                    this.next();
                }, 2500);
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimerDisplay() {
        const text = document.getElementById('timer-text');
        const progress = document.getElementById('timer-progress');
        const hintCountdown = document.getElementById('hint-countdown');

        text.textContent = this.timerValue;

        // Круговой прогресс ( circumference = 2 * π * r = 283 )
        const offset = 283 - (this.timerValue / 60) * 283;
        progress.style.strokeDashoffset = offset;

        // Цвет
        progress.classList.remove('warning', 'danger');
        text.classList.remove('danger');
        if (this.timerValue <= 10) {
            progress.classList.add('danger');
            text.classList.add('danger');
        } else if (this.timerValue <= 30) {
            progress.classList.add('warning');
        }

        // Обратный отсчёт до подсказки
        if (this.timerValue > 30) {
            document.getElementById('hint-countdown').textContent = `Подсказка через: ${this.timerValue - 30} сек`;
            document.getElementById('hint-countdown-en').textContent = `/ Hint in: ${this.timerValue - 30} sec`;
        } else if (!this.hintShown) {
            document.getElementById('hint-countdown').textContent = '💡 Подсказка!';
            document.getElementById('hint-countdown-en').textContent = '/ Hint!';
        } else {
            document.getElementById('hint-countdown').textContent = '';
            document.getElementById('hint-countdown-en').textContent = '';
        }
    }

    // ===== ПОДСКАЗКА =====
    showHint() {
        this.hintShown = true;
        document.getElementById('hint-ru').classList.add('visible');
        document.getElementById('hint-en').classList.add('visible');
        this.playHintSound();
        document.getElementById('hint-countdown').textContent = '💡 Подсказка открыта!';
        document.getElementById('hint-countdown-en').textContent = '/ Hint revealed!';
    }

    // ===== ВРЕМЯ ВЫШЛО =====
    showTimeUpOverlay() {
        document.getElementById('time-up-overlay').classList.add('active');
    }

    hideTimeUpOverlay() {
        document.getElementById('time-up-overlay').classList.remove('active');
    }

    // ===== КАРТИНКИ (SVG) =====
    shuffleOptions(options) {
        // Fisher-Yates shuffle
        const arr = [...options];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    drawImage(key) {
        const container = document.getElementById('q-image');

        // Попробуем загрузить PNG файл
        const pngPath = `img/${key}.png`;

        // Создаём временный Image для проверки существования файла
        const testImg = new Image();
        testImg.onload = () => {
            // PNG существует — загружаем его
            container.innerHTML = `<img src="${pngPath}" style="width:100%; height:100%; object-fit:contain;">`;
        };
        testImg.onerror = () => {
            // PNG не найден — используем SVG
            container.innerHTML = this.getSvgImage(key);
        };
        testImg.src = pngPath;
    }

    getSvgImage(key) {
        const svgImages = {
            anticline: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5f5"/>
                <path d="M50 200 Q200 50 350 200" stroke="#8B4513" stroke-width="20" fill="none"/>
                <path d="M50 220 Q200 70 350 220" stroke="#A0522D" stroke-width="20" fill="none"/>
                <path d="M50 240 Q200 90 350 240" stroke="#CD853F" stroke-width="20" fill="none"/>
                <path d="M50 260 Q200 110 350 260" stroke="#DEB887" stroke-width="20" fill="none"/>
                <text x="200" y="40" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">Антиклиналь / Anticline</text>
                <text x="200" y="290" text-anchor="middle" font-size="12" fill="#666">Ядро — древние породы</text></svg>`,
            porosity: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5f5"/>
                <text x="200" y="30" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">Пористость / Porosity</text>
                <circle cx="80" cy="100" r="25" fill="#8B7355" stroke="#654321"/>
                <circle cx="130" cy="90" r="25" fill="#8B7355" stroke="#654321"/>
                <circle cx="105" cy="140" r="25" fill="#8B7355" stroke="#654321"/>
                <circle cx="250" cy="100" r="20" fill="#8B7355" stroke="#654321"/>
                <circle cx="290" cy="85" r="20" fill="#8B7355" stroke="#654321"/>
                <circle cx="270" cy="130" r="20" fill="#8B7355" stroke="#654321"/>
                <circle cx="310" cy="120" r="20" fill="#8B7355" stroke="#654321"/>
                <text x="105" y="200" text-anchor="middle" font-size="12" fill="#333">Низкая ~5%</text>
                <text x="280" y="200" text-anchor="middle" font-size="12" fill="#333">Высокая ~35%</text>
                <circle cx="250" cy="160" r="8" fill="#87CEEB" stroke="#3498DB"/>
                <circle cx="310" cy="150" r="8" fill="#87CEEB" stroke="#3498DB"/>
                <text x="280" y="240" text-anchor="middle" font-size="11" fill="#666">Синие = поры</text></svg>`,
            impedance: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/>
                <text x="200" y="80" text-anchor="middle" font-size="48" fill="#1a1a2e" font-weight="bold">AI = ρ × V</text>
                <text x="200" y="140" text-anchor="middle" font-size="18" fill="#444">Акустический импеданс</text>
                <text x="200" y="170" text-anchor="middle" font-size="16" fill="#666">Acoustic Impedance</text>
                <text x="200" y="220" text-anchor="middle" font-size="14" fill="#888">Плотность × Скорость звука</text>
                <text x="200" y="250" text-anchor="middle" font-size="14" fill="#888">Density × Velocity</text></svg>`,
            prms: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5f5"/>
                <text x="200" y="30" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">PRMS Классификация</text>
                <polygon points="200,60 350,180 50,180" fill="#E74C3C" stroke="white" stroke-width="2"/>
                <text x="200" y="140" text-anchor="middle" font-size="14" fill="white" font-weight="bold">Possible (3P)</text>
                <polygon points="200,80 320,170 80,170" fill="#3498DB" stroke="white" stroke-width="2"/>
                <text x="200" y="155" text-anchor="middle" font-size="12" fill="white" font-weight="bold">Probable (2P)</text>
                <polygon points="200,100 270,165 130,165" fill="#2ECC71" stroke="white" stroke-width="2"/>
                <text x="200" y="145" text-anchor="middle" font-size="10" fill="white" font-weight="bold">Proved (1P)</text>
                <text x="120" y="220" text-anchor="middle" font-size="11" fill="#2ECC71" font-weight="bold">1P Доказанные</text>
                <text x="200" y="220" text-anchor="middle" font-size="11" fill="#3498DB" font-weight="bold">2P Вероятные</text>
                <text x="280" y="220" text-anchor="middle" font-size="11" fill="#E74C3C" font-weight="bold">3P Возможные</text></svg>`,
            geosteering: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5f5"/>
                <rect x="20" y="50" width="360" height="80" fill="#D2B48C" stroke="#333"/>
                <rect x="20" y="130" width="360" height="100" fill="#F4A460" stroke="#333"/>
                <rect x="20" y="230" width="360" height="50" fill="#8B7355" stroke="#333"/>
                <text x="350" y="90" text-anchor="end" font-size="11" fill="#333">Плотная / Dense</text>
                <text x="350" y="185" text-anchor="end" font-size="12" fill="#333" font-weight="bold">Пласт / Target</text>
                <line x1="50" y1="170" x2="300" y2="170" stroke="black" stroke-width="4"/>
                <polygon points="310,165 320,170 310,175" fill="red"/>
                <text x="200" y="290" text-anchor="middle" font-size="11" fill="#666">Геонавигация / Geosteering</text></svg>`,
            sp: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5f5"/>
                <text x="200" y="30" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">Каротаж SP / SP Log</text>
                <line x1="80" y1="50" x2="80" y2="270" stroke="#333" stroke-width="2"/>
                <line x1="80" y1="50" x2="350" y2="50" stroke="#333" stroke-width="2"/>
                <polyline points="200,70 200,100 120,130 200,160 200,190 100,220 200,250" fill="none" stroke="#3333CC" stroke-width="3"/>
                <text x="120" y="145" text-anchor="middle" font-size="10" fill="red">← Пласт</text>
                <text x="100" y="235" text-anchor="middle" font-size="10" fill="red">← Пласт</text></svg>`,

            // ===== РАУНД 4: МОЙ МИР =====
            maputo: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e3f2fd"/>
                <rect x="50" y="20" width="300" height="80" fill="#009639" rx="5"/>
                <rect x="50" y="45" width="300" height="10" fill="#000"/>
                <rect x="50" y="60" width="300" height="10" fill="#FFCE00"/>
                <text x="200" y="130" text-anchor="middle" font-size="20" fill="#333" font-weight="bold">🇿🇼 МОЗАМБИК</text>
                <text x="200" y="160" text-anchor="middle" font-size="16" fill="#666">Столица: МАПУТУ / Capital: MAPUTO</text>
                <text x="200" y="200" text-anchor="middle" font-size="14" fill="#888">Индийский океан / Indian Ocean</text>
                <circle cx="320" cy="220" r="30" fill="#87CEEB" opacity="0.5"/>
                <text x="320" y="225" text-anchor="middle" font-size="16">🌊</text></svg>`,

            susa: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#fdf5e6"/>
                <polygon points="200,30 150,100 250,100" fill="#DAA520" stroke="#8B4513" stroke-width="2"/>
                <rect x="160" y="100" width="80" height="60" fill="#CD853F"/>
                <rect x="180" y="110" width="15" height="20" fill="#8B4513"/>
                <rect x="205" y="110" width="15" height="20" fill="#8B4513"/>
                <text x="200" y="200" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇮🇷 СУЗЫ / SUSA</text>
                <text x="200" y="230" text-anchor="middle" font-size="14" fill="#666">~3200 до н.э. / ~3200 BC</text>
                <text x="200" y="260" text-anchor="middle" font-size="12" fill="#888">Один из старейших городов мира</text></svg>`,

            yangtze: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e8f4f8"/>
                <path d="M0,150 Q100,100 200,130 T400,120" fill="none" stroke="#4682B4" stroke-width="8"/>
                <text x="200" y="40" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇨🇳 ЯНЦЗЫ / YANGTZE</text>
                <text x="200" y="70" text-anchor="middle" font-size="14" fill="#666">Самая длинная река Азии</text>
                <text x="200" y="220" text-anchor="middle" font-size="24" fill="#4682B4" font-weight="bold">~6 300 км</text></svg>`,

            tenochtitlan: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#fff8dc"/>
                <rect x="120" y="80" width="160" height="100" fill="#CD853F" stroke="#8B4513" stroke-width="2"/>
                <polygon points="120,80 200,30 280,80" fill="#DAA520" stroke="#8B4513" stroke-width="2"/>
                <text x="200" y="210" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇲🇽 ТЕНОЧТИТЛАН</text>
                <text x="200" y="240" text-anchor="middle" font-size="14" fill="#666">Столица ацтеков / Aztec Capital</text></svg>`,

            svytiaz: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e0f0e0"/>
                <ellipse cx="200" cy="150" rx="150" ry="80" fill="#4682B4" opacity="0.7"/>
                <text x="200" y="40" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇧🇾 СВИТЬЯЗЬ / SVYTAZ</text>
                <text x="200" y="155" text-anchor="middle" font-size="16" fill="white" font-weight="bold">54 м</text>
                <text x="200" y="260" text-anchor="middle" font-size="14" fill="#333">Самое глубокое озеро Беларуси</text></svg>`,

            victoria: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e8f4f8"/>
                <rect x="50" y="50" width="300" height="80" fill="#4682B4"/>
                <path d="M50,130 Q100,180 150,130 Q200,180 250,130 Q300,180 350,130" fill="none" stroke="white" stroke-width="3"/>
                <text x="200" y="40" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">🇿🇼 ВОДОПАДЫ ВИКТОРИИ</text>
                <text x="200" y="230" text-anchor="middle" font-size="14" fill="#333">Victoria Falls</text>
                <text x="200" y="260" text-anchor="middle" font-size="12" fill="#666">Зимбабве-Замбия / Zimbabwe-Zambia</text></svg>`,

            mesopotamia: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#fdf5e6"/>
                <rect x="150" y="30" width="100" height="200" fill="#DEB887" stroke="#8B4513" stroke-width="2"/>
                <path d="M160,50 Q170,150 160,220" fill="none" stroke="#4682B4" stroke-width="3"/>
                <path d="M240,50 Q230,150 240,220" fill="none" stroke="#4682B4" stroke-width="3"/>
                <text x="200" y="260" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇮🇶 ИРАК / IRAQ</text>
                <text x="200" y="285" text-anchor="middle" font-size="12" fill="#666">Междуречье / Mesopotamia</text></svg>`,

            pamir: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e8e8f0"/>
                <polygon points="200,30 100,200 300,200" fill="#696969"/>
                <polygon points="200,30 150,120 250,120" fill="white" opacity="0.8"/>
                <text x="200" y="40" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">🇹🇯 ПИК ИСМОИЛИ СОМАНИ</text>
                <text x="200" y="240" text-anchor="middle" font-size="20" fill="#333" font-weight="bold">7 495 м</text>
                <text x="200" y="270" text-anchor="middle" font-size="12" fill="#666">Высшая точка Центральной Азии</text></svg>`,

            sahara: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f4a460"/>
                <path d="M0,200 Q100,150 200,180 T400,160" fill="#DAA520" stroke="#CD853F" stroke-width="2"/>
                <circle cx="320" cy="60" r="30" fill="#FFD700" opacity="0.8"/>
                <text x="200" y="40" text-anchor="middle" font-size="18" fill="#8B4513" font-weight="bold">🇩🇿 САХАРА / SAHARA</text>
                <text x="200" y="260" text-anchor="middle" font-size="16" fill="#8B4513" font-weight="bold">~9 млн км²</text></svg>`,

            bauxite: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5dc"/>
                <circle cx="200" cy="130" r="50" fill="#8B4513" stroke="#654321" stroke-width="3"/>
                <circle cx="185" cy="120" r="8" fill="#A0522D"/>
                <circle cx="210" cy="115" r="6" fill="#A0522D"/>
                <circle cx="195" cy="140" r="7" fill="#A0522D"/>
                <text x="200" y="210" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇬🇳 БОКСИТЫ / BAUXITE</text>
                <text x="200" y="240" text-anchor="middle" font-size="14" fill="#666">Гвинея / Guinea — 25% запасов</text></svg>`,

            // ===== РАУНД 5: ВМЕСТЕ =====
            tacos: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#fff8dc"/>
                <path d="M100,150 Q200,80 300,150" fill="#DEB887" stroke="#8B4513" stroke-width="2"/>
                <circle cx="160" cy="130" r="8" fill="#228B22"/>
                <circle cx="190" cy="125" r="6" fill="#FF6347"/>
                <circle cx="220" cy="128" r="7" fill="#FFD700"/>
                <circle cx="250" cy="132" r="6" fill="#228B22"/>
                <text x="200" y="200" text-anchor="middle" font-size="22" fill="#333" font-weight="bold">🇲🇽 ТАКО / TACOS</text>
                <text x="200" y="235" text-anchor="middle" font-size="14" fill="#666">Объект ЮНЕСКО / UNESCO Heritage</text></svg>`,

            nowruz: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0fff0"/>
                <rect x="100" y="100" width="200" height="120" fill="#8B4513" rx="5"/>
                <circle cx="150" cy="130" r="12" fill="#FFD700"/>
                <circle cx="200" cy="120" r="10" fill="#90EE90"/>
                <circle cx="250" cy="130" r="8" fill="#87CEEB"/>
                <text x="200" y="40" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇮🇷 НАВРУЗ / NOWRUZ</text>
                <text x="200" y="70" text-anchor="middle" font-size="14" fill="#666">21 марта / March 21</text>
                <text x="200" y="260" text-anchor="middle" font-size="14" fill="#333">3000+ лет традиции</text></svg>`,

            mansaf: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#fffef0"/>
                <ellipse cx="200" cy="160" rx="120" ry="70" fill="#FFFACD" stroke="#DAA520" stroke-width="3"/>
                <circle cx="180" cy="145" r="8" fill="#8B4513"/>
                <circle cx="200" cy="140" r="7" fill="#8B4513"/>
                <circle cx="220" cy="145" r="8" fill="#8B4513"/>
                <text x="200" y="35" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇵🇸 МАНСАФ / MANSAF</text>
                <text x="200" y="260" text-anchor="middle" font-size="14" fill="#333">Баранина в йогурте / Lamb in yogurt</text></svg>`,

            baobab: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5dc"/>
                <rect x="175" y="120" width="50" height="100" fill="#8B4513"/>
                <circle cx="200" cy="100" r="60" fill="#228B22" opacity="0.8"/>
                <text x="200" y="250" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇲🇱 БАОБАБ / BAOBAB</text>
                <text x="200" y="275" text-anchor="middle" font-size="14" fill="#666">«Дерево жизни» / «Tree of life»</text></svg>`,

            zimbabwe_dollar: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/>
                <rect x="50" y="60" width="300" height="150" fill="#f5f5dc" stroke="#8B4513" stroke-width="3" rx="10"/>
                <text x="200" y="140" text-anchor="middle" font-size="32" fill="#8B4513" font-weight="bold">$100</text>
                <text x="200" y="170" text-anchor="middle" font-size="16" fill="#8B4513">TRILLION</text>
                <text x="200" y="240" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">🇿🇼 100 ТРИЛЛИОНОВ</text>
                <text x="200" y="270" text-anchor="middle" font-size="12" fill="#666">Рекордная инфляция 2008</text></svg>`,

            hermitage: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e8e8f0"/>
                <rect x="50" y="100" width="300" height="120" fill="#DEB887" stroke="#8B4513" stroke-width="2"/>
                <rect x="70" y="80" width="40" height="30" fill="#CD853F"/>
                <rect x="130" y="80" width="40" height="30" fill="#CD853F"/>
                <rect x="230" y="80" width="40" height="30" fill="#CD853F"/>
                <rect x="290" y="80" width="40" height="30" fill="#CD853F"/>
                <rect x="170" y="70" width="60" height="40" fill="#DAA520"/>
                <text x="200" y="250" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇷🇺 ЭРМИТАЖ / HERMITAGE</text>
                <text x="200" y="280" text-anchor="middle" font-size="14" fill="#666">Санкт-Петербург</text></svg>`,

            great_wall: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e8f0e8"/>
                <path d="M0,200 Q50,180 100,190 Q150,200 200,180 Q250,160 300,170 Q350,180 400,160" fill="none" stroke="#8B4513" stroke-width="8"/>
                <rect x="90" y="170" width="20" height="30" fill="#CD853F" stroke="#8B4513"/>
                <rect x="190" y="155" width="20" height="35" fill="#CD853F" stroke="#8B4513"/>
                <text x="200" y="40" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇨🇳 ВЕЛИКАЯ СТЕНА</text>
                <text x="200" y="250" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">~21 000 км</text>
                <text x="200" y="280" text-anchor="middle" font-size="12" fill="#666">2000+ лет строительства</text></svg>`,

            djembe: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f0e0"/>
                <path d="M180,80 L170,200 L230,200 L220,80 Z" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <ellipse cx="200" cy="80" rx="25" ry="10" fill="#DEB887" stroke="#654321" stroke-width="2"/>
                <ellipse cx="200" cy="200" rx="35" ry="12" fill="#654321"/>
                <text x="200" y="250" text-anchor="middle" font-size="18" fill="#333" font-weight="bold">🇬🇳 ДЖЕМБЕ / DJEMBE</text>
                <text x="200" y="280" text-anchor="middle" font-size="14" fill="#666">Африканский барабан / African drum</text></svg>`,

            bialowieza: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#e8f5e9"/>
                <rect x="0" y="180" width="400" height="120" fill="#228B22" opacity="0.3"/>
                <polygon points="60,180 80,100 100,180" fill="#2E8B57"/>
                <polygon points="120,180 150,80 180,180" fill="#228B22"/>
                <polygon points="200,180 230,90 260,180" fill="#2E8B57"/>
                <polygon points="280,180 310,70 340,180" fill="#228B22"/>
                <text x="200" y="40" text-anchor="middle" font-size="16" fill="#333" font-weight="bold">🇧🇾 БЕЛОВЕЖСКАЯ ПУЩА</text>
                <text x="200" y="65" text-anchor="middle" font-size="14" fill="#666">Białowieża Forest — ЮНЕСКО 🦬</text>
                <text x="200" y="260" text-anchor="middle" font-size="14" fill="#333">Крупнейший заповедник Европы</text></svg>`,

            default: `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#f5f5f5"/>
                <text x="200" y="150" text-anchor="middle" font-size="16" fill="#888">📊 ${key}</text></svg>`
        };
        return svgImages[key] || svgImages.default;
    }

    // ===== ОТВЕТЫ =====
    showAnswers(slide) {
        const screen = document.getElementById('answers-screen');
        document.getElementById('answers-title').textContent = `ОТВЕТЫ / ANSWERS: ${slide.round.nameRu} / ${slide.round.nameEn}`;

        const tbody = document.getElementById('answers-body');
        tbody.innerHTML = '';

        slide.questions.forEach(q => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${q.id}</strong></td>
                <td>
                    <div>${q.qRu}</div>
                    <div class="answers-en">${q.qEn}</div>
                </td>
                <td class="correct">${q.answer}</td>
                <td>
                    <div>${q.hintRu}</div>
                    <div class="answers-en">${q.hintEn}</div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        screen.classList.add('active');
    }

    // ===== НАВИГАЦИЯ =====
    next() {
        if (this.currentSlide < this.slides.length - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    prev() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // ===== СОБЫТИЯ =====
    bindEvents() {
        // Клавиатура
        document.addEventListener('keydown', (e) => {
            // Активируем аудио при первом клике
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.next();
                    break;
                case 'ArrowLeft':
                case 'Backspace':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'f':
                case 'F':
                    this.toggleFullscreen();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        });

        // Кнопки навигации
        document.getElementById('btn-next').addEventListener('click', () => this.next());
        document.getElementById('btn-prev').addEventListener('click', () => this.prev());
        document.getElementById('btn-fullscreen').addEventListener('click', () => this.toggleFullscreen());

        // Клик мышкой (вперёд/назад по зонам)
        document.addEventListener('click', (e) => {
            if (this.audioCtx && this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            // Не реагируем на кнопки навигации
            if (e.target.closest('.nav-controls')) return;

            const x = e.clientX / window.innerWidth;
            if (x > 0.7) this.next();
            else if (x < 0.3) this.prev();
        });
    }
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', () => {
    window.quiz = new GeoQuiz();
});
