export type TravelIconName =
  | 'plane'
  | 'car'
  | 'shield'
  | 'home'
  | 'currency'
  | 'route'
  | 'language'
  | 'weather'

export type TravelStaySectionItem = {
  title: string
  icon: TravelIconName
  paragraphs?: string[]
  bullets?: string[]
  links?: { label: string; href: string }[]
  areas?: {
    title: string
    description: string
  }[]
}

export type TravelStayContent = {
  title: string
  intro: string[]
  sections: TravelStaySectionItem[]
}

export const travelStayContent: Record<'en' | 'uk' | 'ru', TravelStayContent> = {
  en: {
    title: 'Travel & Stay',
    intro: [
      'Your journey to this day is already part of the story.',
      'We have gathered everything you may need — so that your travel feels effortless, calm, and beautifully planned from the very beginning.',
    ],
    sections: [
      {
        title: 'The Flight',
        icon: 'plane',
        paragraphs: [
          'The closest airport is Tbilisi International Airport (TBS).',
          'To find the best options, we recommend searching via Skyscanner, Google Flights, Kiwi.com, as well as low-cost airlines such as WizzAir and Ryanair.',
          'Flights with layovers are often significantly more affordable than direct routes, so we recommend considering these options when booking.',
          'Booking in advance usually allows for better prices and more convenient routes.',
        ],
        bullets: [
          'From the UK: £150–£300 (return)',
          'From Poland: £50–£150 (return)',
        ],
      },
      {
        title: 'The Drive',
        icon: 'car',
        paragraphs: [
          'To truly experience the beauty of Georgia, we recommend renting a car. It gives you the freedom to move at your own pace, surrounded by mountains and open landscapes.',
          'Prices usually start from £20 per day.',
          'We recommend picking up the car directly at the airport and choosing full insurance for a more relaxed and comfortable journey.',
        ],
        links: [
          {
            label: 'discovercars.com',
            href: 'https://www.discovercars.com/ru',
          },
        ],
      },
      {
        title: 'Travel Insurance',
        icon: 'shield',
        paragraphs: [
          'Travel insurance is officially required when entering Georgia, so we kindly ask all guests to arrange it in advance.',
          'The cost is usually around £5–10 per week.',
          'Beyond the formal requirement, it is most important for your own comfort and safety — especially if you plan to explore the mountains.',
        ],
        links: [
          {
            label: 'gpih.ge',
            href: 'https://www.gpih.ge/en/individual-insurance/travel-insurance/',
          },
        ],
      },
      {
        title: 'Where to Stay',
        icon: 'home',
        paragraphs: [
          'Tbilisi offers a unique blend of historic charm, quiet streets, and modern comfort.',
          'Prices usually start from £15 per night.',
          'We recommend the following areas:',
        ],
        areas: [
          {
            title: 'Old Tbilisi',
            description:
              'The historic heart of the city, with narrow streets, traditional architecture, and walking distance to most landmarks, restaurants, and views. Ideal if you would like to feel the atmosphere of the city and explore on foot.',
          },
          {
            title: 'Avlabari',
            description:
              'A central and convenient area just across the river from Old Tbilisi. Slightly quieter, with good transport connections and easy access to the main sights.',
          },
          {
            title: 'Vake',
            description:
              'A more modern and residential district. Calm, green, and comfortable, with cafés and parks. Best suited if you prefer a quieter stay away from the busy tourist centre.',
          },
        ],
        links: [
          {
            label: 'Booking.com',
            href: 'https://www.booking.com/Share-Md7yUr',
          },
          {
            label: 'Booking.com',
            href: 'https://www.booking.com/Share-f8mk5c',
          },
        ],
      },
      {
        title: 'Currency',
        icon: 'currency',
        paragraphs: [
          'The local currency is Georgian Lari (GEL).',
          '1 USD ≈ 2.7–2.9 GEL',
          'Cards are widely accepted in most places, though having a small amount of cash is recommended — especially outside the city centre.',
        ],
      },
      {
        title: 'Getting Around',
        icon: 'route',
        paragraphs: [
          'Moving around Tbilisi is simple and comfortable.',
          'We recommend using Bolt (main taxi app) and Yandex Go.',
          'Taxis are affordable, reliable, and usually the most convenient option.',
          'Public transport is also available, including metro and buses. It is inexpensive and works well within the city, though taxis are often the easier and more flexible choice.',
          'From the airport to the city centre, you can take:',
        ],
        bullets: [
          'Taxi (Bolt/Yandex) — the most comfortable option (approx. 20–30 minutes, around $10–15)',
          'Bus №337, which goes directly to the city centre',
        ],
      },
      {
        title: 'Language',
        icon: 'language',
        paragraphs: [
          'Georgian is the official language, but English and Russian are widely understood in most areas.',
        ],
      },
      {
        title: 'Atmosphere & Weather',
        icon: 'weather',
        paragraphs: [
          'Early September in Georgia is soft, warm, and comfortable.',
          'In Tbilisi, daytime temperatures are usually around 24–28°C, while evenings are slightly cooler.',
          'In Gudauri (mountains), temperatures are lower — around 15–20°C during the day and cooler in the evening.',
          'The weather in the mountains can change quickly, so we recommend bringing a light jacket or something warm.',
        ],
      },
    ],
  },

  uk: {
    title: 'Подорож і проживання',
    intro: [
      'Ваша дорога до цього дня вже є частиною цієї історії.',
      'Ми зібрали все необхідне, щоб ваша подорож була легкою, спокійною та продуманою до найменших деталей з самого початку.',
    ],
    sections: [
      {
        title: 'Переліт',
        icon: 'plane',
        paragraphs: [
          'Найближчий аеропорт — Tbilisi International Airport (TBS).',
          'Для пошуку найкращих варіантів рекомендуємо: Skyscanner, Google Flights, Kiwi.com, а також лоукости — WizzAir та Ryanair.',
          'Квитки з пересадками зазвичай значно дешевші, ніж прямі рейси.',
          'Рекомендуємо бронювати заздалегідь, щоб знайти найкращі ціни та маршрути.',
        ],
        bullets: [
          'З Великої Британії: £150–£300',
          'З Польщі: £50–£150',
        ],
      },
      {
        title: 'Оренда автомобіля',
        icon: 'car',
        paragraphs: [
          'Щоб по-справжньому відчути красу Грузії, рекомендуємо орендувати автомобіль. Це дає свободу рухатися у власному ритмі серед гір і відкритих пейзажів.',
          'Вартість — від £20 на день.',
          'Рекомендуємо брати авто прямо в аеропорту та обирати повне страхування для більш спокійної та комфортної подорожі.',
        ],
        links: [
          {
            label: 'discovercars.com',
            href: 'https://www.discovercars.com/ru',
          },
        ],
      },
      {
        title: 'Страхування',
        icon: 'shield',
        paragraphs: [
          'Страхування є обов’язковим при в’їзді до Грузії, тому просимо подбати про нього заздалегідь.',
          'Вартість — приблизно £5–10 на тиждень.',
          'Окрім формальності, це важливо для вашого комфорту та безпеки — особливо якщо ви плануєте подорожі в горах.',
        ],
        links: [
          {
            label: 'gpih.ge',
            href: 'https://www.gpih.ge/en/individual-insurance/travel-insurance/',
          },
        ],
      },
      {
        title: 'Проживання',
        icon: 'home',
        paragraphs: [
          'Тбілісі поєднує історичну атмосферу, затишні вулиці та сучасний комфорт.',
          'Вартість — від £15 за ніч.',
          'Рекомендуємо такі райони:',
        ],
        areas: [
          {
            title: 'Old Tbilisi',
            description:
              'Історичний центр міста з вузькими вуличками, старовинною архітектурою та пішою доступністю до основних локацій, ресторанів і панорам. Ідеально, якщо хочеться відчути атмосферу міста.',
          },
          {
            title: 'Avlabari',
            description:
              'Центральний район поруч зі Старим містом, трохи спокійніший. Зручне розташування, гарне транспортне сполучення та швидкий доступ до всіх основних місць.',
          },
          {
            title: 'Vake',
            description:
              'Сучасний і більш житловий район. Тихий, зелений, з парками та кафе. Підійде тим, хто хоче більш спокійного відпочинку подалі від туристичного центру.',
          },
        ],
        links: [
          {
            label: 'Booking.com',
            href: 'https://www.booking.com/Share-Md7yUr',
          },
          {
            label: 'Booking.com',
            href: 'https://www.booking.com/Share-f8mk5c',
          },
        ],
      },
      {
        title: 'Валюта',
        icon: 'currency',
        paragraphs: [
          'Місцева валюта — грузинський ларі (GEL).',
          '1 USD ≈ 2.7–2.9 GEL',
          'Картки приймають у більшості місць, але краще мати трохи готівки — особливо поза центром міста.',
        ],
      },
      {
        title: 'Пересування',
        icon: 'route',
        paragraphs: [
          'Пересуватися Тбілісі легко та зручно.',
          'Рекомендуємо користуватися Bolt та Yandex Go.',
          'Таксі доступне за ціною, надійне та найзручніше для пересування.',
          'У місті також є громадський транспорт — метро та автобуси. Він недорогий і добре працює, але для більшого комфорту часто зручніше обрати таксі.',
          'З аеропорту до центру міста можна дістатися:',
        ],
        bullets: [
          'Таксі (Bolt/Yandex) — найзручніший варіант (≈ 20–30 хв, приблизно $10–15)',
          'Автобус №337, який їде прямо до центру',
        ],
      },
      {
        title: 'Мова',
        icon: 'language',
        paragraphs: [
          'Офіційна мова — грузинська, але англійську та російську добре розуміють у більшості місць, особливо в містах і туристичних зонах.',
        ],
      },
      {
        title: 'Атмосфера та погода',
        icon: 'weather',
        paragraphs: [
          'На початку вересня в Грузії комфортна та приємна погода.',
          'У Тбілісі вдень зазвичай 24–28°C, а ввечері трохи прохолодніше.',
          'У Гудаурі (гори) температура нижча — приблизно 15–20°C вдень і прохолодніше ввечері.',
          'У горах погода може швидко змінюватися, тому радимо взяти легку куртку або щось тепле.',
        ],
      },
    ],
  },

  ru: {
    title: 'Путешествие и проживание',
    intro: [
      'Ваш путь к этому дню уже является частью этой истории.',
      'Мы собрали всё необходимое, чтобы Ваше путешествие было лёгким, спокойным и продуманным до мельчайших деталей с самого начала.',
    ],
    sections: [
      {
        title: 'Перелёт',
        icon: 'plane',
        paragraphs: [
          'Ближайший аэропорт — Tbilisi International Airport (TBS).',
          'Для поиска лучших вариантов рекомендуем: Skyscanner, Google Flights, Kiwi.com, а также лоукост-авиакомпании — WizzAir и Ryanair.',
          'Перелёты с пересадками обычно значительно дешевле прямых рейсов, поэтому стоит рассматривать такие варианты при бронировании.',
          'Рекомендуем бронировать заранее, чтобы найти наиболее удобные и выгодные варианты.',
        ],
        bullets: [
          'Из Великобритании: £150–£300',
          'Из Польши: £50–£150',
        ],
      },
      {
        title: 'Аренда автомобиля',
        icon: 'car',
        paragraphs: [
          'Чтобы по-настоящему прочувствовать красоту Грузии, мы рекомендуем арендовать автомобиль.',
          'Стоимость — от £20 в день.',
          'Рекомендуем забирать автомобиль прямо в аэропорту и выбирать полную страховку для более спокойной и комфортной поездки.',
        ],
        links: [
          {
            label: 'discovercars.com',
            href: 'https://www.discovercars.com/ru',
          },
        ],
      },
      {
        title: 'Страхование',
        icon: 'shield',
        paragraphs: [
          'Страхование обязательно при въезде в Грузию, поэтому просим оформить его заранее.',
          'Стоимость — примерно £5–10 в неделю.',
          'Помимо формального требования, это важно для вашего комфорта и безопасности — особенно если вы планируете поездки в горы.',
        ],
        links: [
          {
            label: 'gpih.ge',
            href: 'https://www.gpih.ge/en/individual-insurance/travel-insurance/',
          },
        ],
      },
      {
        title: 'Проживание',
        icon: 'home',
        paragraphs: [
          'Тбилиси сочетает в себе историческую атмосферу, уютные улицы и современный комфорт.',
          'Стоимость — от £15 за ночь.',
          'Рекомендуем следующие районы:',
        ],
        areas: [
          {
            title: 'Old Tbilisi',
            description:
              'Исторический центр города с узкими улицами, старинной архитектурой и шаговой доступностью к основным достопримечательностям, ресторанам и видам. Отличный выбор, если хочется прочувствовать атмосферу города.',
          },
          {
            title: 'Avlabari',
            description:
              'Центральный район рядом со Старым городом, но более спокойный. Удобное расположение, хорошая транспортная доступность и быстрый доступ к основным локациям.',
          },
          {
            title: 'Vake',
            description:
              'Более современный и жилой район. Тихий, зелёный, с парками и кафе. Подойдёт тем, кто предпочитает более спокойное размещение вдали от туристического центра.',
          },
        ],
        links: [
          {
            label: 'Booking.com',
            href: 'https://www.booking.com/Share-Md7yUr',
          },
          {
            label: 'Booking.com',
            href: 'https://www.booking.com/Share-f8mk5c',
          },
        ],
      },
      {
        title: 'Валюта',
        icon: 'currency',
        paragraphs: [
          'Местная валюта — грузинский лари (GEL).',
          '1 USD ≈ 2.7–2.9 GEL',
          'Банковские карты принимаются в большинстве мест, однако рекомендуется иметь немного наличных — особенно вне центра города.',
        ],
      },
      {
        title: 'Передвижение',
        icon: 'route',
        paragraphs: [
          'Передвигаться по Тбилиси легко и удобно.',
          'Рекомендуем использовать Bolt и Yandex Go.',
          'Такси доступное по цене, надёжное и наиболее удобное для перемещения.',
          'В городе также есть общественный транспорт — метро и автобусы. Он недорогой и хорошо работает, однако для комфорта чаще выбирают такси.',
          'Из аэропорта в центр города можно добраться:',
        ],
        bullets: [
          'На такси (Bolt/Yandex) — самый удобный вариант (≈ 20–30 минут, примерно $10–15)',
          'Автобус №337, который следует прямо в центр',
        ],
      },
      {
        title: 'Язык',
        icon: 'language',
        paragraphs: [
          'Официальный язык — грузинский, однако английский и русский широко понимают в большинстве мест, особенно в городах и туристических зонах.',
        ],
      },
      {
        title: 'Атмосфера и погода',
        icon: 'weather',
        paragraphs: [
          'В начале сентября в Грузии комфортная и приятная погода.',
          'В Тбилиси днём обычно 24–28°C, вечером становится немного прохладнее.',
          'В Гудаури (горы) температура ниже — примерно 15–20°C днём и прохладнее вечером.',
          'В горах погода может быстро меняться, поэтому рекомендуем взять лёгкую куртку или что-то тёплое.',
        ],
      },
    ],
  },
}