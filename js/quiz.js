// Данные квиза ГеоВызов 2026
const QUIZ_DATA = {
    rounds: [
        { id: "R1", nameRu: "Раунд 1: Нефть и газ", nameEn: "Round 1: Oil & Gas", color: "#27467f" },
        { id: "R2", nameRu: "Раунд 2: Рудная геология", nameEn: "Round 2: Ore Geology", color: "#8b0000" },
        { id: "R3", nameRu: "Раунд 3: Микс", nameEn: "Round 3: Mix", color: "#006400" },
        { id: "R4", nameRu: "Раунд 4: Мой мир", nameEn: "Round 4: My World", color: "#1565C0" },
        { id: "R5", nameRu: "Раунд 5: Вместе", nameEn: "Round 5: Together", color: "#6A1B9A" },
        { id: "TB", nameRu: "Тай-брейк", nameEn: "Tie-break", color: "#4a0080" }
    ],

    questions: [
        // ===== РАУНД 1: НЕФТЬ И ГАЗ =====
        {
            id: "Q1", round: "R1",
            qRu: "Какой тип геологической ловушки изображён на схеме?",
            qEn: "What type of geological trap is shown in the diagram?",
            optsRu: [{l:"A",t:"Антиклиналь"},{l:"B",t:"Синклиналь"},{l:"C",t:"Сброс"},{l:"D",t:"Стратиграфическая"}],
            optsEn: [{l:"A",t:"Anticline"},{l:"B",t:"Syncline"},{l:"C",t:"Fault"},{l:"D",t:"Stratigraphic"}],
            answer: "A",
            hintRu: "Посмотрите на выпуклую форму слоёв — свод",
            hintEn: "Look at the convex shape of the layers — an arch",
            image: "round1/Q1"
        },
        {
            id: "Q2", round: "R1",
            qRu: "Что такое коэффициент пористости (φ)?",
            qEn: "What is porosity (φ)?",
            optsRu: [{l:"A",t:"Доля пустот в породе"},{l:"B",t:"Способность пропускать флюид"},{l:"C",t:"Плотность породы"},{l:"D",t:"Содержание глины"}],
            optsEn: [{l:"A",t:"Void fraction in rock"},{l:"B",t:"Fluid permeability"},{l:"C",t:"Rock density"},{l:"D",t:"Clay content"}],
            answer: "A",
            hintRu: "Пористость — это ёмкость, проницаемость — пропускная способность",
            hintEn: "Porosity is storage capacity, permeability is flow capacity",
            image: "round1/Q2"
        },
        {
            id: "Q3", round: "R1",
            qRu: "В сейсморазведке акустический импеданс — это произведение:",
            qEn: "In seismic exploration, acoustic impedance is the product of:",
            optsRu: [{l:"A",t:"Плотности и пористости"},{l:"B",t:"Плотности и скорости"},{l:"C",t:"Скорости и частоты"},{l:"D",t:"Плотности и вязкости"}],
            optsEn: [{l:"A",t:"Density and porosity"},{l:"B",t:"Density and velocity"},{l:"C",t:"Velocity and frequency"},{l:"D",t:"Density and viscosity"}],
            answer: "B",
            hintRu: "AI = ρ × V, где ρ — плотность, V — скорость",
            hintEn: "AI = ρ × V, where ρ is density, V is velocity",
            image: "round1/Q3"
        },
        {
            id: "Q4", round: "R1",
            qRu: "Какой элемент нефтегазовой системы обеспечивает миграцию углеводородов?",
            qEn: "Which element of the petroleum system ensures hydrocarbon migration?",
            optsRu: [{l:"A",t:"Покрышка"},{l:"B",t:"Коллектор"},{l:"C",t:"Путь миграции"},{l:"D",t:"Источник"}],
            optsEn: [{l:"A",t:"Cap rock"},{l:"B",t:"Reservoir"},{l:"C",t:"Migration pathway"},{l:"D",t:"Source rock"}],
            answer: "C",
            hintRu: "Без пути миграции УВ не доберутся до ловушки",
            hintEn: "Without a migration pathway, hydrocarbons won't reach the trap",
            image: "round1/Q4"
        },
        {
            id: "Q5", round: "R1",
            qRu: "При геонавигации основная задача — это:",
            qEn: "In geosteering, the main task is:",
            optsRu: [{l:"A",t:"Найти нефть"},{l:"B",t:"Провести ствол в целевом пласте"},{l:"C",t:"Увеличить скорость бурения"},{l:"D",t:"Снизить стоимость"}],
            optsEn: [{l:"A",t:"Find oil"},{l:"B",t:"Keep wellbore in target zone"},{l:"C",t:"Increase drilling speed"},{l:"D",t:"Reduce cost"}],
            answer: "B",
            hintRu: "Геонавигация = навигация по геологическим целям",
            hintEn: "Geosteering = navigation to geological targets",
            image: "round1/Q5"
        },
        {
            id: "Q6", round: "R1",
            qRu: "Метод каротажа ГК (гамма-каротаж) измеряет:",
            qEn: "What does GR (Gamma Ray) log measure:",
            optsRu: [{l:"A",t:"Радиоактивность"},{l:"B",t:"Естественный электрический потенциал"},{l:"C",t:"Скорость звука"},{l:"D",t:"Плотность"}],
            optsEn: [{l:"A",t:"Radioactivity"},{l:"B",t:"Natural electric potential"},{l:"C",t:"Sound velocity"},{l:"D",t:"Density"}],
            answer: "A",
            hintRu: "ГК регистрирует естественную радиоактивность пород (уран, торий, калий)",
            hintEn: "GR measures natural radioactivity of rocks (uranium, thorium, potassium)",
            image: "round1/Q6"
        },
        {
            id: "Q7", round: "R1",
            qRu: "Что такое фация в геологии?",
            qEn: "What is a facies in geology?",
            optsRu: [{l:"A",t:"Тип минерала"},{l:"B",t:"Совокупность признаков осадочной породы"},{l:"C",t:"Структура руды"},{l:"D",t:"Тип разлома"}],
            optsEn: [{l:"A",t:"Mineral type"},{l:"B",t:"Set of sedimentary rock features"},{l:"C",t:"Ore structure"},{l:"D",t:"Fault type"}],
            answer: "B",
            hintRu: "Фация отражает условия осадконакопления",
            hintEn: "Facies reflects depositional environment conditions",
            image: "round1/Q7"
        },
        {
            id: "Q8", round: "R1",
            qRu: "Горизонтальная скважина позволяет:",
            qEn: "A horizontal well allows:",
            optsRu: [{l:"A",t:"Бурить быстрее"},{l:"B",t:"Увеличить площадь контакта с пластом"},{l:"C",t:"Снизить стоимость бурения"},{l:"D",t:"Уменьшить количество скважин"}],
            optsEn: [{l:"A",t:"Drill faster"},{l:"B",t:"Increase reservoir contact area"},{l:"C",t:"Reduce drilling cost"},{l:"D",t:"Reduce number of wells"}],
            answer: "B",
            hintRu: "Чем длиннее ствол в пласте — тем больше приток",
            hintEn: "The longer the borehole in the reservoir — the higher the inflow",
            image: "round1/Q8"
        },
        {
            id: "Q9", round: "R1",
            qRu: "Зона АВПД — это зона:",
            qEn: "Overpressure zone means:",
            optsRu: [{l:"A",t:"Высокой температуры"},{l:"B",t:"Аномально высокого пластового давления"},{l:"C",t:"Высокой пористости"},{l:"D",t:"Высокой солёности"}],
            optsEn: [{l:"A",t:"High temperature"},{l:"B",t:"Abnormally high formation pressure"},{l:"C",t:"High porosity"},{l:"D",t:"High salinity"}],
            answer: "B",
            hintRu: "Давление в пласте выше гидростатического",
            hintEn: "Formation pressure exceeds hydrostatic pressure",
            image: "round1/Q9"
        },
        {
            id: "Q10", round: "R1",
            qRu: "Терригенный коллектор состоит преимущественно из:",
            qEn: "A terrigenous reservoir mainly consists of:",
            optsRu: [{l:"A",t:"Карбонатов"},{l:"B",t:"Обломочных пород"},{l:"C",t:"Эвапоритов"},{l:"D",t:"Вулканитов"}],
            optsEn: [{l:"A",t:"Carbonates"},{l:"B",t:"Clastic rocks"},{l:"C",t:"Evaporites"},{l:"D",t:"Volcanics"}],
            answer: "B",
            hintRu: "Терригенный = обломочный (песчаники, алевролиты)",
            hintEn: "Terrigenous = clastic (sandstones, siltstones)",
            image: "round1/Q10"
        },

        // ===== РАУНД 2: РУДНАЯ ГЕОЛОГИЯ =====
        {
            id: "Q11", round: "R2",
            qRu: "Какой минерал имеет твёрдость 8 по шкале Мооса?",
            qEn: "Which mineral has hardness 8 on the Mohs scale?",
            optsRu: [{l:"A",t:"Корунд"},{l:"B",t:"Алмаз"},{l:"C",t:"Топаз"},{l:"D",t:"Кварц"}],
            optsEn: [{l:"A",t:"Corundum"},{l:"B",t:"Diamond"},{l:"C",t:"Topaz"},{l:"D",t:"Quartz"}],
            answer: "C",
            hintRu: "Шкала Мооса: тальк(1) → алмаз(10)",
            hintEn: "Mohs scale: talc(1) → diamond(10)",
            image: "round2/Q11"
        },
        {
            id: "Q12", round: "R2",
            qRu: "Какая складка изображена на схеме?",
            qEn: "What fold type is shown in the diagram?",
            optsRu: [{l:"A",t:"Антиклиналь"},{l:"B",t:"Синклиналь"},{l:"C",t:"Моноклиналь"},{l:"D",t:"Изоклиналь"}],
            optsEn: [{l:"A",t:"Anticline"},{l:"B",t:"Syncline"},{l:"C",t:"Monocline"},{l:"D",t:"Isocline"}],
            answer: "A",
            hintRu: "Ядро антиклинали — древние породы",
            hintEn: "Anticline core — older rocks",
            image: "round2/Q12"
        },
        {
            id: "Q13", round: "R2",
            qRu: "Что такое первичный геохимический ореол?",
            qEn: "What is a primary geochemical halo?",
            optsRu: [{l:"A",t:"Область выветривания"},{l:"B",t:"Зона вокруг рудного тела с повышенным содержанием элементов"},{l:"C",t:"Ореол растительности"},{l:"D",t:"Зона разгрузки подземных вод"}],
            optsEn: [{l:"A",t:"Weathering zone"},{l:"B",t:"Zone around ore body with elevated element concentrations"},{l:"C",t:"Vegetation halo"},{l:"D",t:"Groundwater discharge zone"}],
            answer: "B",
            hintRu: "Формируется вместе с рудным телом (гидротермальные процессы)",
            hintEn: "Forms together with the ore body (hydrothermal processes)",
            image: "round2/Q13"
        },
        {
            id: "Q14", round: "R2",
            qRu: "Шлиховое опробование — это метод поисков:",
            qEn: "Panning/sampling is a prospecting method for:",
            optsRu: [{l:"A",t:"Нефти и газа"},{l:"B",t:"Тяжёлых минералов-индикаторов"},{l:"C",t:"Подземных вод"},{l:"D",t:"Строительных материалов"}],
            optsEn: [{l:"A",t:"Oil and gas"},{l:"B",t:"Heavy indicator minerals"},{l:"C",t:"Groundwater"},{l:"D",t:"Construction materials"}],
            answer: "B",
            hintRu: "Шлих — тяжёлый минеральный остаток после промывки",
            hintEn: "Panned concentrate — heavy mineral residue after washing",
            image: "round2/Q14"
        },
        {
            id: "Q15", round: "R2",
            qRu: "Какой тип разлома образуется при растяжении?",
            qEn: "What fault type forms under tension?",
            optsRu: [{l:"A",t:"Взброс"},{l:"B",t:"Сброс"},{l:"C",t:"Сдвиг"},{l:"D",t:"Надвиг"}],
            optsEn: [{l:"A",t:"Thrust"},{l:"B",t:"Normal"},{l:"C",t:"Strike-slip"},{l:"D",t:"Reverse"}],
            answer: "B",
            hintRu: "При растяжении один блок опускается относительно другого",
            hintEn: "Under tension one block moves down relative to the other",
            image: "round2/Q15"
        },
        {
            id: "Q16", round: "R2",
            qRu: "Руководящие ископаемые используются для:",
            qEn: "Index fossils are used for:",
            optsRu: [{l:"A",t:"Определения возраста пород"},{l:"B",t:"Поиска руд"},{l:"C",t:"Оценки пористости"},{l:"D",t:"Картирования разломов"}],
            optsEn: [{l:"A",t:"Determining rock age"},{l:"B",t:"Searching for ores"},{l:"C",t:"Assessing porosity"},{l:"D",t:"Mapping faults"}],
            answer: "A",
            hintRu: "Характерны для узкого стратиграфического интервала",
            hintEn: "Characteristic of a narrow stratigraphic interval",
            image: "round2/Q16"
        },
        {
            id: "Q17", round: "R2",
            qRu: "Водоносный горизонт — это:",
            qEn: "An aquifer is:",
            optsRu: [{l:"A",t:"Слой глины"},{l:"B",t:"Водопроницаемый пласт, содержащий подземные воды"},{l:"C",t:"Озеро"},{l:"D",t:"Река"}],
            optsEn: [{l:"A",t:"Clay layer"},{l:"B",t:"Water-bearing permeable formation"},{l:"C",t:"Lake"},{l:"D",t:"River"}],
            answer: "B",
            hintRu: "Порода, способная отдавать подземные воды",
            hintEn: "Rock capable of yielding groundwater",
            image: "round2/Q17"
        },
        {
            id: "Q18", round: "R2",
            qRu: "В радиометрии активность источника измеряется в:",
            qEn: "In radiometry, source activity is measured in:",
            optsRu: [{l:"A",t:"Зивертах"},{l:"B",t:"Беккерелях"},{l:"C",t:"Греях"},{l:"D",t:"Теслах"}],
            optsEn: [{l:"A",t:"Sieverts"},{l:"B",t:"Becquerels"},{l:"C",t:"Grays"},{l:"D",t:"Teslas"}],
            answer: "B",
            hintRu: "Беккерель (Бк) — единица активности, 1 распад/сек",
            hintEn: "Becquerel (Bq) — unit of activity, 1 decay/sec",
            image: "round2/Q18"
        },
        {
            id: "Q19", round: "R2",
            qRu: "Сколько сингоний в кристаллографии?",
            qEn: "How many crystal systems are there in crystallography?",
            optsRu: [{l:"A",t:"5"},{l:"B",t:"6"},{l:"C",t:"7"},{l:"D",t:"8"}],
            optsEn: [{l:"A",t:"5"},{l:"B",t:"6"},{l:"C",t:"7"},{l:"D",t:"8"}],
            answer: "C",
            hintRu: "Кубическая, тетрагональная, гексагональная, тригональная, ромбическая, моноклинная, триклинная",
            hintEn: "Cubic, tetragonal, hexagonal, trigonal, orthorhombic, monoclinic, triclinic",
            image: "round2/Q19"
        },
        {
            id: "Q20", round: "R2",
            qRu: "Метаморфизм — это:",
            qEn: "Metamorphism is:",
            optsRu: [{l:"A",t:"Разрушение пород"},{l:"B",t:"Изменение пород под действием T и P"},{l:"C",t:"Осаждение минералов"},{l:"D",t:"Выветривание"}],
            optsEn: [{l:"A",t:"Rock destruction"},{l:"B",t:"Rock alteration by T and P"},{l:"C",t:"Mineral precipitation"},{l:"D",t:"Weathering"}],
            answer: "B",
            hintRu: "Метаморфизм происходит в твёрдом состоянии без плавления",
            hintEn: "Metamorphism occurs in solid state without melting",
            image: "round2/Q20"
        },

        // ===== РАУНД 3: МИКС =====
        {
            id: "Q21", round: "R3",
            qRu: "Стратиграфия — это наука о:",
            qEn: "Stratigraphy is the study of:",
            optsRu: [{l:"A",t:"Слоях горных пород и их последовательности"},{l:"B",t:"Минералах"},{l:"C",t:"Землетрясениях"},{l:"D",t:"Подземных водах"}],
            optsEn: [{l:"A",t:"Rock layers and their sequence"},{l:"B",t:"Minerals"},{l:"C",t:"Earthquakes"},{l:"D",t:"Groundwater"}],
            answer: "A",
            hintRu: "Стратум = слой (лат.)",
            hintEn: "Stratum = layer (Latin)",
            image: "round3/Q21"
        },
        {
            id: "Q22", round: "R3",
            qRu: "Какая порода является магматической?",
            qEn: "Which rock is igneous?",
            optsRu: [{l:"A",t:"Известняк"},{l:"B",t:"Гранит"},{l:"C",t:"Песчаник"},{l:"D",t:"Сланец"}],
            optsEn: [{l:"A",t:"Limestone"},{l:"B",t:"Granite"},{l:"C",t:"Sandstone"},{l:"D",t:"Shale"}],
            answer: "B",
            hintRu: "Магматические породы образуются из расплава",
            hintEn: "Igneous rocks form from magma/melt",
            image: "round3/Q22"
        },
        {
            id: "Q23", round: "R3",
            qRu: "Самая длинная эра фанерозоя — это:",
            qEn: "The longest era of the Phanerozoic is:",
            optsRu: [{l:"A",t:"Палеозой"},{l:"B",t:"Мезозой"},{l:"C",t:"Кайнозой"},{l:"D",t:"Протерозой"}],
            optsEn: [{l:"A",t:"Paleozoic"},{l:"B",t:"Mesozoic"},{l:"C",t:"Cenozoic"},{l:"D",t:"Proterozoic"}],
            answer: "A",
            hintRu: "Палеозой длился ~290 млн лет (542–252 млн лет назад)",
            hintEn: "Paleozoic lasted ~290 Ma (542–252 Ma ago)",
            image: "round3/Q23"
        },
        {
            id: "Q24", round: "R3",
            qRu: "Теория тектоники плит объясняет:",
            qEn: "Plate tectonics theory explains:",
            optsRu: [{l:"A",t:"Образование минералов"},{l:"B",t:"Движение литосферных плит"},{l:"C",t:"Химический состав пород"},{l:"D",t:"Циркуляцию подземных вод"}],
            optsEn: [{l:"A",t:"Mineral formation"},{l:"B",t:"Lithospheric plate movement"},{l:"C",t:"Rock chemistry"},{l:"D",t:"Groundwater circulation"}],
            answer: "B",
            hintRu: "Литосфера разделена на плиты, движущиеся по астеносфере",
            hintEn: "Lithosphere is divided into plates moving on the asthenosphere",
            image: "round3/Q24"
        },
        {
            id: "Q25", round: "R3",
            qRu: "Какой газ преобладает в атмосфере Земли?",
            qEn: "Which gas dominates Earth's atmosphere?",
            optsRu: [{l:"A",t:"Кислород"},{l:"B",t:"Азот"},{l:"C",t:"Углекислый газ"},{l:"D",t:"Аргон"}],
            optsEn: [{l:"A",t:"Oxygen"},{l:"B",t:"Nitrogen"},{l:"C",t:"Carbon dioxide"},{l:"D",t:"Argon"}],
            answer: "B",
            hintRu: "Атмосфера: N₂ ~78%, O₂ ~21%",
            hintEn: "Atmosphere: N₂ ~78%, O₂ ~21%",
            image: "round3/Q25"
        },
        {
            id: "Q26", round: "R3",
            qRu: "Что такое керн?",
            qEn: "What is a core sample?",
            optsRu: [{l:"A",t:"Образец породы из скважины"},{l:"B",t:"Тип бурового раствора"},{l:"C",t:"Вид каротажа"},{l:"D",t:"Геофизический прибор"}],
            optsEn: [{l:"A",t:"Rock sample from wellbore"},{l:"B",t:"Drilling mud type"},{l:"C",t:"Logging method"},{l:"D",t:"Geophysical tool"}],
            answer: "A",
            hintRu: "Керн — цилиндрический образец горной породы",
            hintEn: "Core — a cylindrical sample of rock",
            image: "round3/Q26"
        },
        {
            id: "Q27", round: "R3",
            qRu: "Назовите самое большое месторождение нефти в мире по запасам?",
            qEn: "Name the largest oil field in the world by reserves?",
            optsRu: [{l:"A",t:"Гавар"},{l:"B",t:"Бурган"},{l:"C",t:"Кантарель"},{l:"D",t:"Самотлор"}],
            optsEn: [{l:"A",t:"Ghawar"},{l:"B",t:"Burgan"},{l:"C",t:"Cantarell"},{l:"D",t:"Samotlor"}],
            answer: "A",
            hintRu: "Крупнейшее — в Саудовской Аравии, далее Кувейт, затем Мексика и Россия",
            hintEn: "Largest is in Saudi Arabia, then Kuwait, Mexico and Russia",
            image: "round3/Q27"
        },
        {
            id: "Q28", round: "R3",
            qRu: "ГеоВызов 2025 прошёл:",
            qEn: "GeoChallenge 2025 was held in:",
            optsRu: [{l:"A",t:"В Москве"},{l:"B",t:"В Уфе"},{l:"C",t:"В Новосибирске"},{l:"D",t:"В Санкт-Петербурге"}],
            optsEn: [{l:"A",t:"Moscow"},{l:"B",t:"Ufa"},{l:"C",t:"Novosibirsk"},{l:"D",t:"St. Petersburg"}],
            answer: "B",
            hintRu: "III чемпионат прошёл в одной из Республик России...",
            hintEn: "3rd championship was held in one of the Republic of Russia...",
            image: "round3/Q28"
        },

        // ===== РАУНД 4: МОЙ МИР (География, культура) =====
        {
            id: "G1", round: "R4",
            qRu: "Столица Мозамбика?",
            qEn: "What is the capital of Mozambique?",
            optsRu: [{l:"A",t:"Мапуту"},{l:"B",t:"Луанда"},{l:"C",t:"Найроби"},{l:"D",t:"Дар-эс-Салам"}],
            optsEn: [{l:"A",t:"Maputo"},{l:"B",t:"Luanda"},{l:"C",t:"Nairobi"},{l:"D",t:"Dar es Salaam"}],
            answer: "A",
            hintRu: "Столица на побережье Индийского океана",
            hintEn: "Capital on the Indian Ocean coast",
            image: "round4/G1"
        },
        {
            id: "G2", round: "R4",
            qRu: "Как называется древний город в Иране — один из старейших в мире (основан ~3200 до н.э.)?",
            qEn: "What is the ancient city in Iran — one of the oldest in the world (founded ~3200 BC)?",
            optsRu: [{l:"A",t:"Тегеран"},{l:"B",t:"Шираз"},{l:"C",t:"Сузы"},{l:"D",t:"Исфахан"}],
            optsEn: [{l:"A",t:"Tehran"},{l:"B",t:"Shiraz"},{l:"C",t:"Susa"},{l:"D",t:"Isfahan"}],
            answer: "C",
            hintRu: "Древняя столица Элама, Хузестан",
            hintEn: "Ancient capital of Elam, Khuzestan",
            image: "round4/G2"
        },
        {
            id: "G3", round: "R4",
            qRu: "Какая река является самой длинной в Азии?",
            qEn: "Which river is the longest in Asia?",
            optsRu: [{l:"A",t:"Меконг"},{l:"B",t:"Янцзы"},{l:"C",t:"Хуанхэ"},{l:"D",t:"Обь"}],
            optsEn: [{l:"A",t:"Mekong"},{l:"B",t:"Yangtze"},{l:"C",t:"Yellow River"},{l:"D",t:"Ob"}],
            answer: "B",
            hintRu: "Длина ~6300 км, протекает через Китай",
            hintEn: "Length ~6300 km, flows through China",
            image: "round4/G3"
        },
        {
            id: "G4", round: "R4",
            qRu: "Какая древняя цивилизация построила город Теночтитлан на территории современной Мексики?",
            qEn: "Which ancient civilization built Tenochtitlan in modern Mexico?",
            optsRu: [{l:"A",t:"Ацтеки"},{l:"B",t:"Майя"},{l:"C",t:"Инки"},{l:"D",t:"Ольмеки"}],
            optsEn: [{l:"A",t:"Aztecs"},{l:"B",t:"Maya"},{l:"C",t:"Incas"},{l:"D",t:"Olmecs"}],
            answer: "A",
            hintRu: "Столица ацтеков — на острове в озере Тескоко",
            hintEn: "Aztec capital — on an island in Lake Texcoco",
            image: "round4/G4"
        },
        {
            id: "G5", round: "R4",
            qRu: "Какое озеро является самым глубоким в Беларуси?",
            qEn: "Which lake is the deepest in Belarus?",
            optsRu: [{l:"A",t:"Нарочь"},{l:"B",t:"Дрисвяты"},{l:"C",t:"Свитьязь"},{l:"D",t:"Долгое"}],
            optsEn: [{l:"A",t:"Naroch"},{l:"B",t:"Drisvyaty"},{l:"C",t:"Svytiaz"},{l:"D",t:"Dolgoe"}],
            answer: "D",
            hintRu: "Глубина ~54 м, «белорусское море»",
            hintEn: "Depth ~54 m, «Belarusian sea»",
            image: "round4/G5"
        },
        {
            id: "G6", round: "R4",
            qRu: "Какие водопады расположены на границе Зимбабве?",
            qEn: "Which waterfalls are located on the border of Zimbabwe?",
            optsRu: [{l:"A",t:"Виктория"},{l:"B",t:"Игуасу"},{l:"C",t:"Ньяга"},{l:"D",t:"Анхель"}],
            optsEn: [{l:"A",t:"Victoria"},{l:"B",t:"Iguazu"},{l:"C",t:"Niagara"},{l:"D",t:"Angel"}],
            answer: "A",
            hintRu: "Крупнейшие водопады в Африке по площади",
            hintEn: "Largest waterfalls in Africa by area",
            image: "round4/G6"
        },
        {
            id: "G7", round: "R4",
            qRu: "Междуречье Тигра и Евфрата расположены на территории какой страны?",
            qEn: "The Tigris-Euphrates river valley is located in which country?",
            optsRu: [{l:"A",t:"Иран"},{l:"B",t:"Ирак"},{l:"C",t:"Сирия"},{l:"D",t:"Турция"}],
            optsEn: [{l:"A",t:"Iran"},{l:"B",t:"Iraq"},{l:"C",t:"Syria"},{l:"D",t:"Turkey"}],
            answer: "B",
            hintRu: "Древняя Месопотамия — «колыбель цивилизации»",
            hintEn: "Ancient Mesopotamia — «cradle of civilization»",
            image: "round4/G7"
        },
        {
            id: "G8", round: "R4",
            qRu: "Какая гора является самой высокой в Таджикистане?",
            qEn: "Which mountain is the highest in Tajikistan?",
            optsRu: [{l:"A",t:"Хан-Тенгри"},{l:"B",t:"Пик Исмоили Самани"},{l:"C",t:"Эльбрус"},{l:"D",t:"Хребет Памир"}],
            optsEn: [{l:"A",t:"Khan Tengri"},{l:"B",t:"Ismoil Somoni Peak"},{l:"C",t:"Elbrus"},{l:"D",t:"Pamir Range"}],
            answer: "B",
            hintRu: "Высота 7495 м, был Пик Коммунизма",
            hintEn: "Height 7495 m, formerly Communism Peak",
            image: "round4/G8"
        },
        {
            id: "G9", round: "R4",
            qRu: "Какая пустыня занимает большую часть территории Алжира?",
            qEn: "Which desert covers most of Algeria's territory?",
            optsRu: [{l:"A",t:"Калахари"},{l:"B",t:"Намиб"},{l:"C",t:"Сахара"},{l:"D",t:"Гоби"}],
            optsEn: [{l:"A",t:"Kalahari"},{l:"B",t:"Namib"},{l:"C",t:"Sahara"},{l:"D",t:"Gobi"}],
            answer: "C",
            hintRu: "Крупнейшая жаркая пустыня мира",
            hintEn: "World's largest hot desert",
            image: "round4/G9"
        },
        {
            id: "G10", round: "R4",
            qRu: "Какое полезное ископаемое является главным экспортным ресурсом Гвинеи (около 25% мировых запасов)?",
            qEn: "Which resource is Guinea's main export (~25% of world reserves)?",
            optsRu: [{l:"A",t:"Нефть"},{l:"B",t:"Бокситы"},{l:"C",t:"Алмазы"},{l:"D",t:"Золото"}],
            optsEn: [{l:"A",t:"Oil"},{l:"B",t:"Bauxite"},{l:"C",t:"Diamonds"},{l:"D",t:"Gold"}],
            answer: "B",
            hintRu: "Гвинея — один из крупнейших мировых производителей",
            hintEn: "Guinea is one of the world's largest producers",
            image: "round4/G10"
        },
        {
            id: "G11", round: "R4",
            qRu: "Какой город Узбекистана является объектом ЮНЕСКО и расположен на Великом шёлковом пути?",
            qEn: "Which Uzbekistan city is a UNESCO site on the Silk Road?",
            optsRu: [{l:"A",t:"Бухара"},{l:"B",t:"Самарканд"},{l:"C",t:"Ташкент"},{l:"D",t:"Нукус"}],
            optsEn: [{l:"A",t:"Bukhara"},{l:"B",t:"Samarkand"},{l:"C",t:"Tashkent"},{l:"D",t:"Nukus"}],
            answer: "B",
            hintRu: "Один из старейших городов мира (~2750 лет), Регистан",
            hintEn: "One of the oldest cities in the world (~2750 years), Registan",
            image: "round4/G11"
        },
        {
            id: "G12", round: "R4",
            qRu: "Какая священная гора расположена в Палестине и является одним из важнейших религиозных мест?",
            qEn: "Which sacred mountain is located in Palestine and is one of the most important religious sites?",
            optsRu: [{l:"A",t:"Синай"},{l:"B",t:"Оливковая гора"},{l:"C",t:"Кармель"},{l:"D",t:"Ермон"}],
            optsEn: [{l:"A",t:"Sinai"},{l:"B",t:"Mount of Olives"},{l:"C",t:"Mount Carmel"},{l:"D",t:"Mount Hermon"}],
            answer: "B",
            hintRu: "Гора Елеонская",
            hintEn: "Eleon Mount",
            image: "round4/G12"
        },
        {
            id: "G13", round: "R4",
            qRu: "Какая птица изображена на гербе Мали?",
            qEn: "Which bird is depicted on the coat of arms of Mali?",
            optsRu: [{l:"A",t:"Воробей"},{l:"B",t:"Орел"},{l:"C",t:"Голубь"},{l:"D",t:"Фламинго"}],
            optsEn: [{l:"A",t:"Sparrow"},{l:"B",t:"Eagle"},{l:"C",t:"Dove"},{l:"D",t:"Flamingo"}],
            answer: "A",
            hintRu: "Птица из малийского фольклора, символизирует мир",
            hintEn: "Bird from Malian folklore, symbolizes peace",
            image: "round4/G13"
        },
        {
            id: "G14", round: "R4",
            qRu: "Какое озеро является самым глубоким в России и в мире?",
            qEn: "Which lake is the deepest in Russia and in the world?",
            optsRu: [{l:"A",t:"Байкал"},{l:"B",t:"Ладожское"},{l:"C",t:"Онежское"},{l:"D",t:"Чудское"}],
            optsEn: [{l:"A",t:"Baikal"},{l:"B",t:"Ladoga"},{l:"C",t:"Onega"},{l:"D",t:"Peipus"}],
            answer: "A",
            hintRu: "Глубина 1642 м, содержит ~20% мировых запасов пресной воды",
            hintEn: "Depth 1642 m, contains ~20% of world's fresh water reserves",
            image: "round4/G14"
        },

        // ===== РАУНД 5: ВМЕСТЕ (Традиции, кухня, дружба) =====
        {
            id: "F1", round: "R5",
            qRu: "Какое блюдо является национальным символом Мексики и внесено в список ЮНЕСКО?",
            qEn: "Which dish is a national symbol of Mexico and is listed by UNESCO?",
            optsRu: [{l:"A",t:"Паста"},{l:"B",t:"Тако"},{l:"C",t:"Суши"},{l:"D",t:"Плов"}],
            optsEn: [{l:"A",t:"Pasta"},{l:"B",t:"Tacos"},{l:"C",t:"Sushi"},{l:"D",t:"Pilaf"}],
            answer: "B",
            hintRu: "Мексиканская кухня — объект нематериального наследия ЮНЕСКО",
            hintEn: "Mexican cuisine — UNESCO Intangible Cultural Heritage",
            image: "round5/F1"
        },
        {
            id: "F2", round: "R5",
            qRu: "Какой традиционный иранский праздник отмечается в ночь перед Новым годом (21 марта)?",
            qEn: "Which traditional Iranian holiday is celebrated on the eve of New Year (March 21)?",
            optsRu: [{l:"A",t:"Навруз"},{l:"B",t:"Рамадан"},{l:"C",t:"Диуали"},{l:"D",t:"Холи"}],
            optsEn: [{l:"A",t:"Nowruz"},{l:"B",t:"Ramadan"},{l:"C",t:"Diwali"},{l:"D",t:"Holi"}],
            answer: "A",
            hintRu: "День весеннего равноденствия, отмечается 3000+ лет",
            hintEn: "Spring equinox day, celebrated for 3000+ years",
            image: "round5/F2"
        },
        {
            id: "F3", round: "R5",
            qRu: "Что такое «мансаф» — традиционное блюдо, которое готовят в Палестине?",
            qEn: "What is «mansaf» — a traditional dish prepared in Palestine?",
            optsRu: [{l:"A",t:"Суп"},{l:"B",t:"Блюдо из баранины в йогурте"},{l:"C",t:"Салат"},{l:"D",t:"Десерт"}],
            optsEn: [{l:"A",t:"Soup"},{l:"B",t:"Lamb in yogurt"},{l:"C",t:"Salad"},{l:"D",t:"Dessert"}],
            answer: "B",
            hintRu: "Считается главным блюдом гостеприимства",
            hintEn: "Considered the main dish of hospitality",
            image: "round5/F3"
        },
        {
            id: "F4", round: "R5",
            qRu: "Какое дерево является символом Мали и считается «деревом жизни»?",
            qEn: "Which tree is the symbol of Mali and is called the «tree of life»?",
            optsRu: [{l:"A",t:"Пальма"},{l:"B",t:"Баобаб"},{l:"C",t:"Кедр"},{l:"D",t:"Бамбук"}],
            optsEn: [{l:"A",t:"Palm"},{l:"B",t:"Baobab"},{l:"C",t:"Cedar"},{l:"D",t:"Bamboo"}],
            answer: "B",
            hintRu: "Одни из самых долгоживущих деревьев (1000+ лет)",
            hintEn: "Some of the most long-living trees (1000+ years)",
            image: "round5/F4"
        },
        {
            id: "F5", round: "R5",
            qRu: "Какой древний город в Зимбабве является объектом ЮНЕСКО?",
            qEn: "Which ancient city in Zimbabwe is a UNESCO World Heritage Site?",
            optsRu: [{l:"A",t:"Большой Зимбабве"},{l:"B",t:"Мапунгубве"},{l:"C",t:"Зимбабве-Буффало"},{l:"D",t:"Кхами"}],
            optsEn: [{l:"A",t:"Great Zimbabwe"},{l:"B",t:"Mapungubwe"},{l:"C",t:"Zimbabwe Buffalo"},{l:"D",t:"Khami"}],
            answer: "A",
            hintRu: "Древний город XI-XV вв., каменная кладка без раствора",
            hintEn: "Ancient city XI-XV century, stone construction without mortar",
            image: "round5/F5"
        },
        {
            id: "F6", round: "R5",
            qRu: "Какой русский город является «культурной столицей» и известен Эрмитажем?",
            qEn: "Which Russian city is the «cultural capital» and is famous for the Hermitage?",
            optsRu: [{l:"A",t:"Москва"},{l:"B",t:"Санкт-Петербург"},{l:"C",t:"Казань"},{l:"D",t:"Новосибирск"}],
            optsEn: [{l:"A",t:"Moscow"},{l:"B",t:"Saint Petersburg"},{l:"C",t:"Kazan"},{l:"D",t:"Novosibirsk"}],
            answer: "B",
            hintRu: "Город на Неве, основанный Петром I",
            hintEn: "City on the Neva, founded by Peter I",
            image: "round5/F6"
        },
        {
            id: "F7", round: "R5",
            qRu: "Сколько Великой Китайской стены в километрах (приблизительно)?",
            qEn: "How long is the Great Wall of China in kilometers (approximately)?",
            optsRu: [{l:"A",t:"~5 000 км"},{l:"B",t:"~10 000 км"},{l:"C",t:"~21 000 км"},{l:"D",t:"~50 000 км"}],
            optsEn: [{l:"A",t:"~5,000 km"},{l:"B",t:"~10,000 km"},{l:"C",t:"~21,000 km"},{l:"D",t:"~50,000 km"}],
            answer: "C",
            hintRu: "Строилась более 2000 лет, 13 разных династий",
            hintEn: "Built for over 2000 years, 13 different dynasties",
            image: "round5/F7"
        },
        {
            id: "F8", round: "R5",
            qRu: "Что означает слово «Месопотамия» (родина цивилизации, расположенной на территории Ирака)?",
            qEn: "What does «Mesopotamia» mean (the birthplace of civilization located in Iraq)?",
            optsRu: [{l:"A",t:"Страна солнца"},{l:"B",t:"Междуречье"},{l:"C",t:"Плодородный полумесяц"},{l:"D",t:"Земля пророков"}],
            optsEn: [{l:"A",t:"Land of the sun"},{l:"B",t:"Between rivers"},{l:"C",t:"Fertile crescent"},{l:"D",t:"Land of prophets"}],
            answer: "B",
            hintRu: "От греческого meso (между) + potamos (река)",
            hintEn: "From Greek meso (between) + potamos (river)",
            image: "round5/F8"
        },
        {
            id: "F9", round: "R5",
            qRu: "Какой музыкальный инструмент родом из Западной Африки (включая Гвинею) и стал символом африканской культуры?",
            qEn: "Which musical instrument is from West Africa (including Guinea) and became a symbol of African culture?",
            optsRu: [{l:"A",t:"Гитара"},{l:"B",t:"Барабан джембе"},{l:"C",t:"Скрипка"},{l:"D",t:"Флейта"}],
            optsEn: [{l:"A",t:"Guitar"},{l:"B",t:"Djembe drum"},{l:"C",t:"Violin"},{l:"D",t:"Flute"}],
            answer: "B",
            hintRu: "Джембе — «мир должен услышать голос Африки»",
            hintEn: "Djembe — «the world should hear Africa's voice»",
            image: "round5/F9"
        },
        {
            id: "F10", round: "R5",
            qRu: "Какой крупнейший заповедник в Европе расположен на территории Беларуси?",
            qEn: "Which largest nature reserve in Europe is located in Belarus?",
            optsRu: [{l:"A",t:"Беловежская пуща"},{l:"B",t:"Смоленское Поозерье"},{l:"C",t:"Припятский"},{l:"D",t:"Налибокская пуща"}],
            optsEn: [{l:"A",t:"Białowieża Forest"},{l:"B",t:"Smolensk Lakeland"},{l:"C",t:"Pripyat"},{l:"D",t:"Naliboki Forest"}],
            answer: "A",
            hintRu: "Объект ЮНЕСКО, место обитания зубров",
            hintEn: "UNESCO site, home to European bison",
            image: "round5/F10"
        },
        {
            id: "F11", round: "R5",
            qRu: "Какое блюдо является национальным символом Узбекистана?",
            qEn: "Which dish is the national symbol of Uzbekistan?",
            optsRu: [{l:"A",t:"Бешбармак"},{l:"B",t:"Шашлык"},{l:"C",t:"Плов"},{l:"D",t:"Хинкали"}],
            optsEn: [{l:"A",t:"Beshbarmak"},{l:"B",t:"Shashlik"},{l:"C",t:"Plov"},{l:"D",t:"Khinkali"}],
            answer: "C",
            hintRu: "Блюдо из риса с мясом, морковью и специями",
            hintEn: "Rice dish with meat, carrots and spices",
            image: "round5/F11"
        },
        {
            
            id: "F12", round: "R5",
            qRu: "Какой океан омывает побережье Мозамбика?",
            qEn: "Which ocean washes the coast of Mozambique?",
            optsRu: [{l:"A",t:"Атлантический"},{l:"B",t:"Тихий"},{l:"C",t:"Индийский"},{l:"D",t:"Северный Ледовитый"}],
            optsEn: [{l:"A",t:"Atlantic"},{l:"B",t:"Pacific"},{l:"C",t:"Indian"},{l:"D",t:"Arctic"}],
            answer: "C",
            hintRu: "Мозамбик расположен на восточном побережье Африки",
            hintEn: "Mozambique is located on the eastern coast of Africa",
            image: "round5/F12"
        },
        {
            id: "F13", round: "R5",
            qRu: "Какой традиционный таджикский напиток подают с восточными сладостями типа кандалот?",
            qEn: "Which traditional Tajik drink is served hot with eastern sweets of the kind known as kandalot?",
            optsRu: [{l:"A",t:"Кофе"},{l:"B",t:"Зелёный чай"},{l:"C",t:"Кумыс"},{l:"D",t:"Кофе с молоком"}],
            optsEn: [{l:"A",t:"Coffee"},{l:"B",t:"Green tea"},{l:"C",t:"Kumis"},{l:"D",t:"Coffee with milk"}],
            answer: "B",
            hintRu: "Традиция чаепития в Таджикистане — важная часть культуры",
            hintEn: "Tea drinking tradition in Tajikistan is an important part of culture",
            image: "round5/F13"
        },
        {
            id: "F14", round: "R5",
            qRu: "Какой исторический квартал в Алжире является объектом ЮНЕСКО?",
            qEn: "Which historic quarter in Algiers is a UNESCO World Heritage Site?",
            optsRu: [{l:"A",t:"Медина"},{l:"B",t:"Касба"},{l:"C",t:"Сук"},{l:"D",t:"Пальмира"}],
            optsEn: [{l:"A",t:"Medina"},{l:"B",t:"Casbah"},{l:"C",t:"Souk"},{l:"D",t:"Palmyra"}],
            answer: "B",
            hintRu: "Крепость XVI века, построенная османами",
            hintEn: "16th-century fortress built by the Ottomans",
            image: "round5/F14"
        },

        // ===== ТАЙ-БРЕЙК (Общие темы) =====
        {
            id: "TB1", round: "TB",
            qRu: "Сколько стран-участниц в данном квизе?",
            qEn: "How many participating countries are in this quiz?",
            optsRu: [{l:"A",t:"16"},{l:"B",t:"10"},{l:"C",t:"12"},{l:"D",t:"14"}],
            optsEn: [{l:"A",t:"16"},{l:"B",t:"10"},{l:"C",t:"12"},{l:"D",t:"14"}],
            answer: "C",
            hintRu: "Россия, Мозамбик, Узбекистан, Иран, Ирак, Палестина, Китай, Беларусь, Таджикистан, Зимбабве, Мали, Гвинея, Алжир, Мексика",
            hintEn: "Russia, Mozambique, Uzbekistan, Iran, Iraq, Palestine, China, Belarus, Tajikistan, Zimbabwe, Mali, Guinea, Algeria, Mexico",
            image: "tiebreak/TB1"
        },
        {
            id: "TB2", round: "TB",
            qRu: "Какой континент представлен наибольшим числом стран в данном квизе?",
            qEn: "Which continent is represented by the most countries in this quiz?",
            optsRu: [{l:"A",t:"Евразия"},{l:"B",t:"Африка"},{l:"C",t:"Северная Америка"},{l:"D",t:"Южная Америка"}],
            optsEn: [{l:"A",t:"Eurasia"},{l:"B",t:"Africa"},{l:"C",t:"North America"},{l:"D",t:"South America"}],
            answer: "B",
            hintRu: "Мозамбик, Зимбабве, Мали, Гвинея, Алжир (5 стран)",
            hintEn: "Mozambique, Zimbabwe, Mali, Guinea, Algeria (5 countries)",
            image: "tiebreak/TB2"
        },
        {
            id: "TB3", round: "TB",
            qRu: "Какая страна-участница является крупнейшей по территории в мире?",
            qEn: "Which participating country is the largest by area in the world?",
            optsRu: [{l:"A",t:"Китай"},{l:"B",t:"США"},{l:"C",t:"Россия"},{l:"D",t:"Канада"}],
            optsEn: [{l:"A",t:"China"},{l:"B",t:"USA"},{l:"C",t:"Russia"},{l:"D",t:"Canada"}],
            answer: "C",
            hintRu: "Россия — 17,1 млн км², крупнейшая страна мира",
            hintEn: "Russia — 17.1 million km², largest country in the world",
            image: "tiebreak/TB3"
        }
    ]
};
