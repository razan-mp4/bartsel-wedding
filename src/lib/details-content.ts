export type DetailsScheduleItem = {
  time: string
  title: string
  icon: 'hotel' | 'sparkles' | 'heart' | 'utensils'
}

export type DetailsContent = {
  title: string
  intro: string[]
  heroImage: string

  locationTitle: string
  locationName: string
  locationText: string
  mapEmbedUrl: string
  mapLink: string

  venueTitle: string
  venueName: string
  venueAddress: string
  venueText: string[]
  venueLinkLabel: string
  venueLink: string
  venueImages: string[]

  accommodationTitle: string
  accommodationText: string[]
  accommodationImages: string[]

  arrivalTitle: string
  arrivalText: string[]

  scheduleTitle: string
  scheduleItems: DetailsScheduleItem[]

  dressCodeTitle: string
  dressCodeText: string[]
  paletteLabel: string
  palette: string[]
  weatherNote: string
  dressCodeImages: string[]
}

export const detailsContent: Record<'en' | 'uk' | 'ru', DetailsContent> = {
  en: {
    title: 'The Details',
    intro: [
      'Here you will find everything you need to know about our wedding day.',
      'We have dreamed of a place where time slows down, where the world feels quiet, and every moment can be fully felt. We found that place in the mountains of Georgia.',
      'In Gudauri, surrounded by nature and sky, we will begin this new chapter of our lives.',
      'And it would mean so much to have you there with us.',
    ],
    heroImage: '/sections/details/gudauri-hero.webp',

    locationTitle: 'Location',
    locationName: 'Gudauri, Georgia',
    locationText: 'Nestled high in the mountains, surrounded by nature and open skies.',
    mapEmbedUrl: 'https://www.google.com/maps?q=Gudauri,Georgia&z=12&output=embed',
    mapLink: 'https://maps.google.com/?q=Gudauri,Georgia',

    venueTitle: 'Venue & Stay',
    venueName: 'Hotel Monte, Gudauri',
    venueAddress: 'Upper Gudauri, Near Post, 4702 Gudauri, Georgia',
    venueText: [
      'Our celebration and stay will take place at Hotel Monte in Gudauri.',
      'This mountain setting brings together quiet beauty, open views, and a calm atmosphere that feels deeply special to us.',
    ],
    venueLinkLabel: 'View Hotel',
    venueLink: 'https://hotelmonte.ge/',
    venueImages: [
      '/sections/details/venue-1.webp',
      '/sections/details/venue-2.webp',
      '/sections/details/venue-3.webp',
    ],

    accommodationTitle: 'Accommodation',
    accommodationText: [
      'We are delighted to host you and make your stay as comfortable as possible.',
      'The night from 6 September to 7 September 2026, including breakfast on the 7th, is fully covered for all our guests.',
      'This is our small gift to you, a heartfelt thank you for being part of our day.',
    ],
    accommodationImages: [
      '/sections/details/accommodation-1.webp',
      '/sections/details/accommodation-2.webp',
      '/sections/details/accommodation-3.webp',
    ],

    arrivalTitle: 'Arrival & Parking',
    arrivalText: [
      'Guests are kindly asked to arrive by 14:00 on 06/09/26.',
      'Free parking will be available at the venue.',
      'We recommend renting a car to make your journey easier and more flexible.',
      'If this is not possible, please let us know, and we will be happy to help arrange transportation.',
    ],

    scheduleTitle: 'Schedule',
    scheduleItems: [
      { time: '14:00 – 15:30', title: 'Guest arrival & hotel check-in', icon: 'hotel' },
      { time: '15:30 – 16:00', title: 'Welcome area', icon: 'sparkles' },
      { time: '16:00 – 17:00', title: 'Wedding ceremony', icon: 'heart' },
      { time: '17:00 – 22:00', title: 'Dinner', icon: 'utensils' },
    ],

    dressCodeTitle: 'Dress Code',
    dressCodeText: [
      'The visual atmosphere of this day means a lot to us. Every detail has been carefully thought through — including the colours, textures, and overall aesthetic.',
      'We would truly appreciate your support in bringing this vision to life through your outfit.',
      'For ladies: flowing, elegant silhouettes in soft, natural fabrics such as silk, satin, chiffon, or crepe.',
      'For gentlemen: classic black suits with a white shirt.',
      'Kindly avoid bright colours, bold prints, and strong contrasts.',
    ],
    paletteLabel: 'Colour palette',
    palette: ['#f1ece5', '#d9d0c3', '#9a8260', '#6d8436', '#384f25', '#4e3c3f', '#7d2b37'],
    weatherNote:
      'Weather note: The weather in the mountains can change quickly, so we recommend bringing a light jacket or wrap for the evening.',
    dressCodeImages: [
      '/sections/details/dresscode-1.png',
      '/sections/details/dresscode-2.png',
      '/sections/details/dresscode-3.png',
    ],
  },

  uk: {
    title: 'Деталі події',
    intro: [
      'Тут ви знайдете все, що потрібно знати про день нашого весілля.',
      'Ми мріяли про місце, де час сповільнюється, де світ стає тихішим, а кожну мить можна відчути по-справжньому. І ми знайшли таке місце в горах Грузії.',
      'У Гудаурі, серед природи, неба й тиші, ми розпочнемо новий розділ нашого життя.',
      'І для нас буде великою радістю, якщо ви будете там поруч із нами.',
    ],
    heroImage: '/sections/details/gudauri-hero.webp',

    locationTitle: 'Локація',
    locationName: 'Гудаурі, Грузія',
    locationText: 'Високо в горах, серед природи та відкритого неба.',
    mapEmbedUrl: 'https://www.google.com/maps?q=Gudauri,Georgia&z=12&output=embed',
    mapLink: 'https://maps.google.com/?q=Gudauri,Georgia',

    venueTitle: 'Місце події та проживання',
    venueName: 'Hotel Monte, Gudauri',
    venueAddress: 'Upper Gudauri, Near Post, 4702 Gudauri, Georgia',
    venueText: [
      'Святкування та проживання відбуватимуться в Hotel Monte у Гудаурі.',
      'Це місце поєднує в собі гірську красу, простір, тишу та ту атмосферу спокою, яка є для нас особливою.',
    ],
    venueLinkLabel: 'Переглянути готель',
    venueLink: 'https://hotelmonte.ge/',
    venueImages: [
      '/sections/details/venue-1.webp',
      '/sections/details/venue-2.webp',
      '/sections/details/venue-3.webp',
    ],

    accommodationTitle: 'Проживання',
    accommodationText: [
      'Ми з радістю хочемо подбати про ваш комфорт і зробити ваше перебування максимально приємним.',
      'Ніч з 6 на 7 вересня 2026 року, включно зі сніданком 7-го числа, повністю оплачується для всіх наших гостей.',
      'Це наш маленький подарунок і щира подяка за те, що ви будете частиною цього дня.',
    ],
    accommodationImages: [
      '/sections/details/accommodation-1.webp',
      '/sections/details/accommodation-2.webp',
      '/sections/details/accommodation-3.webp',
    ],

    arrivalTitle: 'Приїзд і паркування',
    arrivalText: [
      'Просимо гостей прибути до 14:00 06/09/26.',
      'На локації буде доступне безкоштовне паркування.',
      'Ми рекомендуємо орендувати авто, щоб ваша подорож була зручнішою та гнучкішою.',
      'Якщо це неможливо, будь ласка, повідомте нас, і ми з радістю допоможемо організувати транспорт.',
    ],

    scheduleTitle: 'Розклад',
    scheduleItems: [
      { time: '14:00 – 15:30', title: 'Збір гостей та заселення в готель', icon: 'hotel' },
      { time: '15:30 – 16:00', title: 'Welcome-зона', icon: 'sparkles' },
      { time: '16:00 – 17:00', title: 'Церемонія', icon: 'heart' },
      { time: '17:00 – 22:00', title: 'Вечеря', icon: 'utensils' },
    ],

    dressCodeTitle: 'Дрес-код',
    dressCodeText: [
      'Візуальна атмосфера цього дня дуже важлива для нас. Ми з любов’ю продумали кожну деталь — кольори, фактури й загальну естетику.',
      'Ми будемо щиро вдячні, якщо ваш образ допоможе підтримати це бачення.',
      'Для жінок: легкі, елегантні силуети з м’яких натуральних тканин — шовк, сатин, шифон або креп.',
      'Для чоловіків: класичні чорні костюми з білою сорочкою.',
      'Будь ласка, уникайте яскравих кольорів, активних принтів і сильних контрастів.',
    ],
    paletteLabel: 'Кольорова палітра',
    palette: ['#f1ece5', '#d9d0c3', '#9a8260', '#6d8436', '#384f25', '#4e3c3f', '#7d2b37'],
    weatherNote:
      'Нотатка про погоду: У горах погода може швидко змінюватися, тому радимо взяти легку куртку або накидку на вечір.',
    dressCodeImages: [
      '/sections/details/dresscode-1.png',
      '/sections/details/dresscode-2.png',
      '/sections/details/dresscode-3.png',
    ],
  },

  ru: {
    title: 'Детали события',
    intro: [
      'Здесь вы найдёте всё, что важно знать о дне нашей свадьбы.',
      'Мы мечтали о месте, где время замедляется, где мир становится тише, а каждое мгновение можно почувствовать по-настоящему. И мы нашли такое место в горах Грузии.',
      'В Гудаури, среди природы, неба и тишины, мы начнём новую главу нашей жизни.',
      'И для нас будет большой радостью, если вы будете рядом с нами в этот день.',
    ],
    heroImage: '/sections/details/gudauri-hero.webp',

    locationTitle: 'Локация',
    locationName: 'Гудаури, Грузия',
    locationText: 'Высоко в горах, среди природы и открытого неба.',
    mapEmbedUrl: 'https://www.google.com/maps?q=Gudauri,Georgia&z=12&output=embed',
    mapLink: 'https://maps.google.com/?q=Gudauri,Georgia',

    venueTitle: 'Место праздника и проживание',
    venueName: 'Hotel Monte, Gudauri',
    venueAddress: 'Upper Gudauri, Near Post, 4702 Gudauri, Georgia',
    venueText: [
      'Праздник и проживание будут проходить в Hotel Monte в Гудаури.',
      'Это место соединяет в себе горную красоту, простор, тишину и ту атмосферу спокойствия, которая особенно близка нашему сердцу.',
    ],
    venueLinkLabel: 'Посмотреть отель',
    venueLink: 'https://hotelmonte.ge/',
    venueImages: [
      '/sections/details/venue-1.webp',
      '/sections/details/venue-2.webp',
      '/sections/details/venue-3.webp',
    ],

    accommodationTitle: 'Проживание',
    accommodationText: [
      'Мы с радостью хотим позаботиться о вашем комфорте и сделать ваше пребывание максимально приятным.',
      'Ночь с 6 на 7 сентября 2026 года, включая завтрак 7-го числа, полностью оплачивается для всех наших гостей.',
      'Это наш маленький подарок и искренняя благодарность за то, что вы будете частью этого дня.',
    ],
    accommodationImages: [
      '/sections/details/accommodation-1.webp',
      '/sections/details/accommodation-2.webp',
      '/sections/details/accommodation-3.webp',
    ],

    arrivalTitle: 'Приезд и парковка',
    arrivalText: [
      'Просим гостей прибыть к 14:00 06/09/26.',
      'На месте будет доступна бесплатная парковка.',
      'Мы рекомендуем арендовать автомобиль, чтобы поездка была более удобной и гибкой.',
      'Если это невозможно, пожалуйста, сообщите нам, и мы с радостью поможем организовать транспорт.',
    ],

    scheduleTitle: 'Расписание',
    scheduleItems: [
      { time: '14:00 – 15:30', title: 'Сбор гостей и заселение в отель', icon: 'hotel' },
      { time: '15:30 – 16:00', title: 'Welcome-зона', icon: 'sparkles' },
      { time: '16:00 – 17:00', title: 'Церемония', icon: 'heart' },
      { time: '17:00 – 22:00', title: 'Ужин', icon: 'utensils' },
    ],

    dressCodeTitle: 'Дресс-код',
    dressCodeText: [
      'Визуальная атмосфера этого дня очень важна для нас. Мы с любовью продумали каждую деталь — цвета, фактуры и общую эстетику.',
      'Мы будем искренне благодарны, если ваш образ поможет поддержать это видение.',
      'Для дам: лёгкие, элегантные силуэты из мягких натуральных тканей — шёлк, сатин, шифон или креп.',
      'Для мужчин: классические чёрные костюмы с белой рубашкой.',
      'Пожалуйста, избегайте ярких цветов, активных принтов и сильных контрастов.',
    ],
    paletteLabel: 'Цветовая палитра',
    palette: ['#f1ece5', '#d9d0c3', '#9a8260', '#6d8436', '#384f25', '#4e3c3f', '#7d2b37'],
    weatherNote:
      'Заметка о погоде: В горах погода может быстро меняться, поэтому рекомендуем взять лёгкую куртку или накидку на вечер.',
    dressCodeImages: [
      '/sections/details/dresscode-1.png',
      '/sections/details/dresscode-2.png',
      '/sections/details/dresscode-3.png',
    ],
  },
}