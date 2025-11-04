// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations for both English and Tamil
const resources = {
  en: {
    translation: {
      "home": "Home",
      "history": "History",
      "gallery": "Gallery",
      "festival": "Festival",
      "pooja": "Pooja",
      "contact": "Contact Us",
      "templeName": "Sri Nanammadevi, Sri Vijayanarayana Saudharallu temple",
      "login": "Login",
      "signup": "Sign Up",
      "logout": "Logout",
      "event": "Events",
      "feedback": "Feedback",
      "Pooja Register and Donations": "Pooja Register and Donations",
      "homeheading1":"Location",
      "homecontent1":"The Melai Tirupathi temple is an abode of Lord Venkatesa Perumal, located in mondipalayam in Tirupur district of Tamil Nadu. The location of the temple is approximately 45 kilometers from the city of coimbatore, in Coimbatore-Sathyamangalam highway, 5 kms east of pasur vilage on the Annur-Sathy Highway.",
      "homecontent2":"The other possible routes are through Tirupur at a distance of 30km via Avinashi, or through Sathyamangalam at a distance of 27 km via Punjai Piuliampatti.",
      "homeheading2":"History",
      "homecontent3":"The temple was built over a Suyambu which was discovered by Kondamanayakkar approximately 300 years ago. At the time of discovering the Suyambu, he was living in the village of alathur, and a strong devotee to lord Venkatesa Perumal. In his dream on a fine day, Lord Venkatesa Perumal incepted the thought of his appearance on a specific day on the current location of the temple.",
      "Gallery":"Gallery",
      "festivalhead1":"PURATTASI FESTIVAL",
      "festivalpara1":'This festival is celebrated with grandeur in the tamil month of Purattasi (during September/October months) for 6 consecutive Saturdays. People converge at the temple from various places across India and even overseas. During these days the temple presents a sea of humanity immersed in bhakthi for the Lord. These Saturdays at the temple begin as early as 4.00 AM with an "Abhishekam" or "Thirumanjanam" aradhanai for the Lord. The Maha Deeparadhanai is performed at noon. In the evening the Lord is taken along with His consorts "Sridevi" and "Bhudevi" on a majestic "Garuda vahanam" around the 4 streets of the temple in a tastefully decorated Pushpaka Pallaku.',
      "festivalpara2":'The unique feature of this is the bhaktas fulfilling their vows by carrying Rama panam (Arrow shape) in "meravanai". For generations people have been following this custom where they remit money in the name of their various family members and receive this "meravanai". They accompany the palanquin carrying this. On these days a special Hundi is placed here. It is believed that devotees who wish to make their offerings to Tirupathi Balaji but who are unable visit Tirupathi Tirumala may place their offerings in this Hundi to receive His blessings. The entire day is very busy with special programs. To facilate the tranportation for piligrims, several special buses ply from various points in and around Coimbatore, Tirupur, Sathyamangalam and near by places on these days.',
      "festivalhead2":"Temple Chariot festival",
      "festivalpara3":'This festival commences in the tamil month of "THAI" and the festival is held for 11 days. The temple chariot is taken around the four streets of the temple on the day of the "Punarpoosam" (punarvasa) star. Other days of the festival, in the evenings, the Lord along with the consorts is taken around the four streets of the temple on various vahanams (vehicles) such as "Anna Vahanam"(swan), "simha Vahanam" (Lion), "Hanumanatha Vahanam" (Hanuman), "Garuda Vahanam" (king of birds), "Pushpaka Vahanam", "Yanai Vahanam" (elephant), "Kudirai Vahanam" (horse), "sesha Vahanam", (Adhishesha-Lords serpent). Thirukalyana Uthsavam is performed on the day before the car festival and "Theppothsavam" (Pushkarni or temple tank float) is performed on the day after the car festival. The temple wears a very festive look and thousands of devotees shouting "Govinda", "Govinda", throng the temple to participate in this unique festival.',
      "poojahead1":"THIRUKALYANAM",
      "poojapara1":"Performing Thirukalyana Utsavam to the Lord in this temple is considered very special. It is held at the same time (10.30am to 12.00pm) as at Tirumala Tirupathi temple. The uniqueness is that, it is performed as a prayer (Venduthal) by the devotees throughtout the year. The ceremony is held amidst recitation of Vedic mantras. It is believed that Performing Kalyana Utsavam to the Lord here will bring immense peace and prosperity to the family of the devotees. A special mandapam has been constructed to perform the ritual, which can be booked through the temple office. It costs Rs.15000 for the ritual.",
      "poojahead2":"SUDARSHANA HOMAM",
      "poojapara2":'Performing Sudarshana Homam grants the performer health, wealth and prosperity. The performer seeks spiritual benefits, while performing the Homam as the Sudharshana has the attribute of "Papa Nashanam", i.e.,the destruction of sins. This is arguably the first step to be adopted in the realization of God (Lord Narayana). The Sudarshana Chakram grants Moksham to anyone who surrenders to it.',
      "poojapara3":'The temple has a special "yaaga Salai" which can be utilized to perform the Homam for desired individuals, who can contact the temple office. Other than that,devotees may register to perform Laksmi Narasimhar Homam and Lakhsmi Hyagreevar Homam',
      "poojahead3":"SATHYANARAYANA POOJA",
      "poojapara4":"On an occasion, Naradar went to Lord Sriman Narayanan to discuss the miseries in the world. Sri Satyanarayan informed Naradar that there is a fast, that can be performed by anyone. The fast would result in the fulfillment of his desires and also the liberation from the cycle of birth and death. Naradar informed about this fast to a poor, old and ailing lumberjack. Following Naradar's words, the lumberjack had all his wishes fulfilled, became prosperous, and ultimately attained salvation by following the Sri Satyanarayan fast and pooja.",
      "poojapara5":"The Satyanarayan fast is very effective in Kaliyuga and that whosoever read or heard this story would be rid of all sorrows and difficulties. In addition,it is widely said that there is a strong belief that the blessings obtained through the pooja would result with children for issuless couples seeking childrens.",
      "poojapara6":"This powerful Satyanaraya Pooja is performed on the occasion of full moon at 5 pm, every month through out the year. It is also done on special occasions and during times of achievements as an offering of gratitude to the Lord. These occasions include marriage, graduation, new job, and the purchase of a new home to name a few.",
      "poojahead4":"Bhajans",
      "poojapara7":"Every month on the 2nd and 4th Saturday (except in the tamil month of purattasi), bhajans are performed at the temple. They sing devoutly in praise of Sriman Narayanan, and devotees join in the religious fervour, this is followed by annadanam",
      "time":"Time",
      "charges":"Charges",
      "noofperson":"Number of person",
      "nopojaa":"No poojas available for the selected date.",
      "card1":'"Celebrate the Purattasi Saturdays and Thai Chariot Festival with grand rituals and vibrant processions filled with devotion."',
      "card2":'"Experience divine blessings through Thirukalyanam, Sudarshana Homam, Satyanarayana Pooja, and soulful bhajans at the temple."',
      "cardbtn":"More info",
      "feedbackform": "Feedback Form",
      "We are happy to serve you": "We are happy to serve you",
      "Please use the form below for enquiries": "Please use the form below for feedback",
      "Full Name": "Full Name",
      "Email Address": "Email Address",
      "Phone Number": "Phone Number",
      "Message": "Message",
      "Submit Feedback": "Submit Feedback",
      "Current Date": "Current Date",
      "historyContent": [
  {
    heading: "The Beginning (1894)",
    content: `In the Tamil year Jaya, corresponding to 1894, divine grace blessed Rangammal, daughter of Rathnalar Muthunayudu of Nagamanayakkanpalayam and wife of Rangasami Nayudu of Ondipudur. At the age of nine, she received a divine vision at what is now the temple site, where the clan deities Sri Nanamma Devi and Sri Endamma Devi appeared to her. Following this divine event, a shrine was built at that sacred spot, and worship began. This marked the origin of the temple.`
  },
  {
    heading: "The First Consecration (1955)",
    content: `In 1955, on the 15th day of the Tamil month of Thai, the temple was formally established and the first Kumbhabhishekam (consecration ceremony) was performed on land belonging to Pazhanisami Nayudu of Nagamanayakkanpalayam. The event was led by Venkatasami Nayudu’s son, Pappanayudu (Peelamedu) as Chairman and Kasthuri Nayudu’s son, Samanayudu (Nagamanayakkanpalayam) as Vice Chairman. That same year, the first annual festival was celebrated with great devotion.`
  },
  {
    heading: "Annual Festivals (1956–1966)",
    content: `From 1956 to 1966, annual festivals were held regularly in the Tamil month of Thai under the leadership of M. Ponnusami Nayudu of Peedampalli and other elders. Highlights include: 1956 – Manmatha (Thai 12–13); 1957 – Thunmugi (Thai 5–6); 1958 – Ervilambi (Thai 18–19); 1959 – Vilambi (Thai 10–11); 1960 – Vikari (Thai 27–28); 1961 – Sarvari (Thai 18–19); 1962 – Pillava (Thai 6–7); 1963 – Subhakrithu (Thai 26–27); 1964 – Sobhakrithu (Thai 11–12); 1965 – Krodhi (Thai 23–24); 1966 – Visuvaasa (Thai 22–23).`
  },
  {
    heading: "Maha Kumbhabhishekam (1967)",
    content: `After 12 years of continuous festivals, the 13th-year Maha Kumbhabhishekam was held in 1967, from March 19 to March 22 (Panguni 5–11). The ceremony included Vastu Shanti, Kalasa Sthapanam, Yagam, and Ashtabandhana rituals. President: P.C. Ponnusami Nayudu; Vice President: Rangasami Nayudu; Treasurer: Duraisami Nayudu; Secretary: Venkatasami Nayudu; Joint Secretary: Narayanasami Nayudu.`
  },
  {
    heading: "Annual Celebrations and Developments (1968–1978)",
    content: `The festivals continued every year with great devotion: 1968 – 14th; 1969 – 15th; 1970 – 16th; 1971 – 17th; 1972 – 18th; 1973 – 19th; 1974 – 20th; 1975 – 21st; 1976 – 22nd; 1977 – 23rd; 1978 – 24th.`
  },
  {
    heading: "Temple Renovation (1979)",
    content: `On December 15, 1979, the temple premises were renovated by M/s Vijayaraj & Co. at a cost of Rs. 39,761.92, with Rs. 500 for doors and windows. The balance of Rs. 8,261.92 was later paid by our ancestors. President: M.S. Venkatasami Nayudu; Secretary: K. Rajagopal.`
  },
  {
    heading: "Festivals and Growth (1980–1990)",
    content: `Festivals continued annually from 1980 onwards. 1992 marked the 38th festival, with a new management team: President: V.K. Ramasami; Secretary: Narayanamurthy; Treasurer: Balusami.`
  },
  {
    heading: "Temple Expansion and Mandapams (1992–2010)",
    content: `The temple expanded beautifully during this period. In 1998, a meditation hall was inaugurated; in 2001, the Venkatalakshmi Mandapam was dedicated. All annual Thai festivals were celebrated without fail.`
  },
  {
    heading: "Trust Formation and New Management (2020–2021)",
    content: `The Ratnalar Trust was registered on December 10, 2020. Trustees included Vijayakumar (President), Kuppuraj (Secretary), Rajendran (Treasurer), and others. The 67th Annual Festival took place on January 29–30, 2021.`
  },
  {
    heading: "Recent Festivals and Bhoomi Puja (2022–2025)",
    content: `Recent annual festivals were held as follows: 2022 – Jan 21–22 (68th); 2023 – Feb 3–4 (69th); 2024 – Jan 26–27 (70th); 2025 – Feb 7–8 (71st). On March 6, 2025, between 10 and 11 a.m., the Bhoomi Puja for the new temple building took place in the presence of elders.`
  },
  {
    heading: "Upcoming Festival (2026)",
    content: `The 72nd Annual Festival will be held on January 30–31, 2026 (Thai 16–17). Preparations are underway.`
  },
  {
    heading: "Conclusion",
    content: `From 1894 to 2026, the Sri Nanamma Devi Sri Vijaya Narayana Chowthralu Temple has remained a sacred center of devotion and unity. Through the efforts of generations, it continues to grow and bless devotees. May Sri Nanamma Devi and Sri Vijaya Narayana Chowthralu continue to shower divine grace upon all families. Om Namo Narayanaya.`
  }
],
      "Historys":"History",
      "Kammavar":"Kammavar",
      
    }
  },
  ta: {
    translation: {
      "home": "முகப்பு",
      "history": "வரலாறு",
      "gallery": "காட்சியகம்",
      "festival": "திருவிழா",
      "pooja": "பூஜை",
      "contact": "தொடர்பு",
      "event": "நிகழ்வு",
      "templeName": "ஸ்ரீ நனம்மதேவி, ஸ்ரீ விஜயநாராயண சௌதரல்லு கோயில்",
      "login": "உள் நுழை",
      "signup": "பதிவு செய்க",
      "logout": "வெளியேறு",
      "feedback": "கருத்து",
      "Pooja Register and Donations": "பூஜை பதிவு மற்றும் நன்கொடை",
      "homeheading1":"அமைவிடம்",
      "homecontent1":"கோவை மாவட்டத்தில், கோவை சத்தி சாலையில் பசூர் என்ற ஊரில் இருந்து கிழக்கு 5 கிமீ தூரத்தில் அமைந்துள்ள புளியம்பட்டி சாலையில் தண்டுக்காரன்பாளையம் என்னும் ஊரிலிருந்து மேற்கு 5 கிமீ தூரத்தில் மேலத்திருப்பதி என அழைக்கப்படும் அருள்மிகு வெங்கடேச பெருமாள் திருக்கோவில் அமைந்துள்ளது.",
      "homecontent2":"கோவையிருந்து அன்னூர், பசூர் வழியாக 45 கிமீ பயணத்திலும், திருப்பூரிலிருந்து அவிநாசி வழியாக 30 கிமீ பயணத்திலும் சத்தியிலிருந்து புன்செய் புளியம்பட்டி, ஆலத்தூர் வழியாக 27 கிமீ பயணத்திலும் இத்திருக்கோயிலை அடையலாம்.",
      "homeheading2":"வரலாறு",
      "homecontent3":"கோவையை அடுத்துள்ள ஆலத்தூர் என்னும் கிராமத்தில் கம்மவார், மேதன மெட்லார் குலத்தில் மாதவ நாயக்கருக்கு கொண்டம நாயக்கர் என்ற மகன் இருந்தாா். அவர் திருப்பதி வெங்கடாசலபதியை நினைத்து அர்ச்சித்துக் கொண்டு தன் மனதிற்கு தோன்றியவாறு அவர் பூஜித்துக் கொண்டு வந்துள்ளாா்.",
      "historypara6":"தமிழக அரசின் இந்து சமய அறங்காவலர்களும், இந்து சமய அறங்காவலர்களும், பக்தர்களின் தீவிர ஆதரவுடன் கோயிலின் செயல்பாடுகளை நிர்வகிக்கின்றனர்.",
      "Gallery":"காட்சியகம்",
      "festivalhead1":"புரட்டாசி திருவிழா",
      "festivalpara1":'தமிழ் மாதமான புரட்டாசி மாதத்தில் (செப்டம்பர்/அக்டோபர் மாதங்களில்) தொடர்ந்து 6 சனிக்கிழமைகள் இவ்விழா வெகு விமரிசையாக கொண்டாடப்படுகிறது. இந்தியாவின் பல்வேறு இடங்களிலிருந்தும், வெளிநாடுகளிலிருந்தும் மக்கள் இந்த கோவிலுக்கு வருகிறார்கள். இந்த நாட்களில் கோயில் இறைவனுக்காக பக்தியில் மூழ்கிய மனித சமுத்திரத்தை காட்சிப்படுத்துகிறது. இந்த சனிக்கிழமைகளில் அதிகாலை 4.00 மணிக்கே இறைவனுக்கு "அபிஷேகம்" அல்லது "திருமஞ்சனம்" ஆராதனையுடன் தொடங்குகிறது. நண்பகலில் மகா தீபாராதனை நடக்கிறது. மாலையில் சுவாமியை ஸ்ரீதேவி, பூதேவியுடன் அழகாக அலங்கரிக்கப்பட்ட புஷ்பக பல்லகத்தில் நான்கு தெருக்களிலும் கம்பீரமான கருட வாகனத்தில் எடுத்துச் செல்வார்கள்.',
      "festivalpara2":'பக்தர்கள் மேரவணையில் ராம பானத்தை (அம்பு வடிவம்) சுமந்து தங்கள் சபதத்தை நிறைவேற்றுவது இதன் தனிச்சிறப்பு. பல தலைமுறைகளாக மக்கள் இந்த வழக்கத்தை பின்பற்றி வருகின்றனர், அங்கு அவர்கள் தங்கள் குடும்ப உறுப்பினர்களின் பெயரில் பணம் செலுத்தி இந்த "மேரவனை" பெறுகிறார்கள். இதை சுமந்து செல்லும் பல்லக்குடன் அவர்களும் செல்கின்றனர். இந்த நாட்களில் இங்கு ஒரு சிறப்பு உண்டியல் வைக்கப்படுகிறது. திருப்பதி பாலாஜிக்கு காணிக்கை செலுத்த விரும்பிய பக்தர்கள், ஆனால் திருப்பதி திருமலைக்கு செல்ல முடியாதவர்கள் இந்த உண்டியில் தங்கள் காணிக்கைகளை வைத்து அவரது அருளைப் பெறலாம் என்பது ஐதீகம். நாள் முழுவதும் சிறப்பு நிகழ்ச்சிகளுடன் மிகவும் பிஸியாக இருக்கும். இந்த நாட்களில் கோவை, திருப்பூர், சத்தியமங்கலம் மற்றும் அருகிலுள்ள பல்வேறு இடங்களில் இருந்து பல சிறப்பு பேருந்துகள் இயக்கப்படுகின்றன.',
      "festivalhead2":"கோவில் தேர் திருவிழா",
      "festivalpara3":'இந்த விழா தமிழ் மாதமான "தாய்" மாதத்தில் தொடங்கி 11 நாட்கள் நடைபெறுகிறது. புனர்பூசம் நட்சத்திரத்தன்று கோயிலின் நான்கு வீதிகளையும் சுற்றி கோயில் தேர் எடுத்துச் செல்லப்படுகிறது. திருவிழாவின் மற்ற நாட்களில், மாலை நேரங்களில், "அன்ன வாகனம்" (அன்னம்), "சிம்ம வாகனம்" (சிங்கம்), "அனுமநாத வாகனம்" (அனுமன்), "கருட வாகனம்" (பறவைகளின் ராஜா), "புஷ்பக வாகனம்", "யானை வாகனம்" (யானை), "குதிரை" (குதிரை), "சேஷ வாகனம்", (ஆதிசேஷ-இறைவனின் பாம்பு) போன்ற பல்வேறு வாகனங்களில் கோயிலின் நான்கு தெருக்களையும் சுவாமி அழைத்துச் செல்வார். தேர்த்திருவிழாவிற்கு முந்தைய நாள் திருகல்யாண உற்சவமும், தேர்த்திருவிழாவிற்கு மறுநாள் "தெப்போற்சவம்" (புஷ்கர்ணி அல்லது கோயில் குள மிதவை) செய்யப்படுகிறது. கோயில் மிகவும் பண்டிகை தோற்றத்தை கொண்டுள்ளது மற்றும் ஆயிரக்கணக்கான பக்தர்கள் "கோவிந்தா", "கோவிந்தா" என்று கோஷமிடுகிறார்கள், இந்த தனித்துவமான திருவிழாவில் பங்கேற்க கோயிலில் திரண்டனர்.',
      "poojahead1":"திருக்கல்யானம்",
      "poojapara1":"இத்தலத்தில் இறைவனுக்கு திருக்கல்யாண உற்சவம் செய்வது மிகவும் விசேஷமாக கருதப்படுகிறது. இது திருமலை திருப்பதி கோவிலில் நடைபெறுவதைப் போலவே அதே நேரத்தில் (காலை 10.30 மணி முதல் மதியம் 12.00 மணி வரை) நடைபெறுகிறது. இது ஆண்டு முழுவதும் பக்தர்களால் ஒரு பிரார்த்தனையாக (வெந்துதல்) செய்யப்படுவது தனித்துவம். வேத மந்திரங்களை ஓதுவதற்கு மத்தியில் இந்த விழா நடைபெறுகிறது. இத்தல இறைவனுக்கு கல்யாண உற்சவம் செய்து வழிபட்டால் குடும்பத்தில் நிம்மதியும், செழிப்பும் பெருகும் என்பது ஐதீகம். இதற்காக சிறப்பு மண்டபம் கட்டப்பட்டு, கோவில் அலுவலகம் மூலம் முன்பதிவு செய்து கொள்ளலாம். சடங்கு செய்ய ரூ.15000 செலவாகிறது.",
      "poojahead2":"சுதர்சன ஹோமம்",
      "poojapara2":'சுதர்சன ஹோமம் செய்வது கலைஞருக்கு ஆரோக்கியம், செல்வம் மற்றும் செழிப்பை அளிக்கிறது. சுதர்ஷணம் "பாப நாசனம்" அதாவது பாவங்களை அழித்தல் என்ற குணத்தைக் கொண்டிருப்பதால், ஹோமம் செய்யும் போது கலைஞர் ஆன்மீக நன்மைகளை நாடுகிறார். இறைவனை (பகவான் நாராயணனை) உணர்தலில் கடைப்பிடிக்க வேண்டிய முதல் படி இதுவாகும். சுதர்சன சக்கரம் தன்னை சரணடைபவர்களுக்கு மோட்சம் அளிக்கிறது.',
      "poojapara3":'இந்த கோவிலில் சிறப்பு "யாக சாலை" உள்ளது, இது விரும்பியவர்களுக்கு ஹோமம் செய்ய பயன்படுத்தப்படலாம், அவர்கள் கோவில் அலுவலகத்தை தொடர்பு கொள்ளலாம். இது தவிர லக்ஷ்மி நரசிம்மர் ஹோமம், லட்சுமி ஹைக்ரீவர் ஹோமம் செய்ய பக்தர்கள் பதிவு செய்யலாம்',
      "poojahead3":"சத்யநாராயண பூஜை",
      "poojapara4":"ஒரு சமயம் நாரதர் ஸ்ரீமான் நாராயணனிடம் சென்று உலகத்தில் உள்ள துயரங்களைப் பற்றி விவாதித்தார். ஸ்ரீ சத்யநாராயணன் நாரதரிடம் விரதம் இருக்கிறது, அதை யார் வேண்டுமானாலும் செய்யலாம் என்று கூறினார். இந்த விரதத்தின் விளைவாக அவனது ஆசைகள் நிறைவேறுவதுடன், பிறப்பு, இறப்பு சுழற்சியிலிருந்து விடுதலையும் கிடைக்கும். இந்த உண்ணாவிரதத்தைப் பற்றி நாரதர் ஒரு ஏழை, வயதான, நோய்வாய்ப்பட்ட மரம் வெட்டும் தொழிலாளியிடம் தெரிவித்தார். நாரதரின் வார்த்தைகளைப் பின்பற்றி, மரம் வெட்டுபவர் தனது விருப்பங்கள் அனைத்தையும் நிறைவேற்றி, செல்வந்தராக மாறி, இறுதியில் ஸ்ரீ சத்யநாராயண விரதம் மற்றும் பூஜையைப் பின்பற்றி முக்தி அடைந்தார்.",
      "poojapara5":"கலியுகத்தில் சத்யநாராயண விரதம் மிகவும் பயனுள்ளதாக இருக்கும், இந்த கதையை யார் படித்தாலும் அல்லது கேட்டாலும் எல்லா துக்கங்களிலிருந்தும் கஷ்டங்களிலிருந்தும் விடுபடுவார்கள். மேலும், பூஜையின் மூலம் கிடைக்கும் ஆசீர்வாதங்கள் குழந்தை தேடும் தம்பதிகளுக்கு குழந்தை பாக்கியம் கிடைக்கும் என்ற வலுவான நம்பிக்கை பரவலாக கூறப்படுகிறது.",
      "poojapara6":"இந்த சக்திவாய்ந்த சத்யநாராய பூஜை ஆண்டு முழுவதும் ஒவ்வொரு மாதமும் பௌர்ணமியின் போது மாலை 5 மணிக்கு செய்யப்படுகிறது. இது சிறப்பு சந்தர்ப்பங்களிலும் சாதனைக் காலங்களிலும் இறைவனுக்கு நன்றி செலுத்தும் காணிக்கையாக செய்யப்படுகிறது. இந்த சந்தர்ப்பங்களில் திருமணம், பட்டப்படிப்பு, புதிய வேலை மற்றும் ஒரு புதிய வீட்டை வாங்குதல் ஆகியவை அடங்கும்.",
      "poojahead4":"பஜனைகள்",
      "poojapara7":"ஒவ்வொரு மாதமும் 2 மற்றும் 4 வது சனிக்கிழமைகளில் (தமிழ் மாதம் புரட்டாசி தவிர) கோயிலில் பஜனைகள் நடத்தப்படுகின்றன. ஸ்ரீமான் நாராயணனைப் போற்றி பக்தியுடன் பாடுகிறார்கள், பக்தர்கள் மத உற்சாகத்தில் திரள்கிறார்கள், அதைத் தொடர்ந்து அன்னதானம் நடைபெறுகிறது",
      "time":"நேரம்",
      "charges":"கட்டணங்கள்",
      "noofperson":"மக்கள் எண்ணிக்கை",
      "nopojaa":"தேர்ந்தெடுத்த தேதிக்கு பூஜைகள் எதுவும் கிடையாது.",
      "card1":'"கோயிலில் திருகல்யாணம், சுதர்சன ஹோமம், சத்தியநாராயண பூஜை மற்றும் ஆத்மார்த்தமான பஜனைகள் மூலம் தெய்வீக ஆசீர்வாதங்களை அனுபவியுங்கள்."',
      "card2":'"புரட்டாசி சனிக்கிழமைகளையும் தை ரத விழாவையும் பிரமாண்டமான சடங்குகள் மற்றும் பக்தி நிறைந்த துடிப்பான ஊர்வலங்களுடன் கொண்டாடுங்கள்."',
      "cardbtn":"மேலும் தகவல்",
      "feedbackform": "கருத்து படிவம்",
      "We are happy to serve you": "நாங்கள் உங்களுக்கு சேவை செய்ய மகிழ்படுகிறோம்",
      "Please use the form below for enquiries": "வினவல்களுக்கு கீழே உள்ள படிவத்தைப் பயன்படுத்தவும்",
      "Full Name": "முழு பெயர்",
      "Email Address": "மின்னஞ்சல் முகவரி",
      "Phone Number": "தொலைபேசி எண்",
      "Message": "செய்தி",
      "Submit Feedback": "கருத்தை சமர்ப்பிக்கவும்",
      "Current Date": "தற்போதைய தேதி",
      "historyContent": [
  {
    heading: "கோவில் கேரிடம் (1894)",
    content: `ேமிழ வருடங்களில் 28வது ஆக வரும் ஜய வருடம், ஆங்கில வருடம் 1894 ஆம் ஆண்டு, நாகமநாயக்கன்பாளையம் ரத்னாலார் முத்ேநாயுடுவின் மகளும், ஓண்டிப்புதூர் ரங்க ாமி நாயுடுவின் மளனவியுமான ரங்கமாளுக்கு ஒன்பது வயதின்சபாழுது அருள்வந்து, ேற்தபாது தேவஸ்ோனம் இருக்கும் இடத்தில் நானம்மா தேவி, ஏண்டம்மா என்னும் குலசேய்வங்களை காண்பித்து, அேன் பின் அதே இடத்தில் ாமி ச ய்துளவத்து தகாவில் கட்டப்பட்டு பூளஜ நளடசபற்றது.`
  },
  {
    heading: "மு ல் கும்போபிகே ம் (1955)",
    content: `1955 ஆம் ஆண்டு, ளே மாேம் 15 ஆம் தேதி, நாகமநாயக்கன்பாளையம் பழனி ாமி நாயுடு பூமியில் தகாயில் கட்டப்பட்டு ஸ்ோபன கும்பாபிதேகம் நளடசபற்றது.  சவங்கிட ாமி நாயுடு மகன் பாப்பாநாயுடு (பீைதமடு) ேளலவராகவும், கஸ்தூரி நாயுடு மகன்  ாமநாயுடு (நாகமநாயக்கன்பாளையம்) உபேளலவராகவும் இருந்ேனர்.  முேல் வருடாந்திர உற் வம் இதே ஆண்டில் நளடசபற்றது.`
  },
  {
    heading: "வருடோந்திர உற்சவங் ள் (1956–1966)",
    content: `1956 – மன்மே வருேம் – ளே மாேம் 12, 13: 2வது ஆண்டு உற் வம் (ேளலவர்: மு. சபான்னு ாமிநாயுடு (பீடம்பள்ளி) ...). 1957 – துன்முகி வருேம் – ளே மாேம் 5, 6: 3வது ஆண்டு; 1958 – ஏர்விம் பி வருேம் – ளே மாேம் 18, 19; 1959 – விைம்பி வருேம் – ளே மாேம் 10, 11; 1960 – விகாரி வருேம் – ளே மாேம் 27, 28; 1961 –  ார்வரி வருேம் – ளே மாேம் 18, 19; 1962 – பிலவ வருேம் – ளே மாேம் 6, 7; 1963 – சுபகிருது வருேம் – ளே மாேம் 26, 27; 1964 – த ாபகிருது வருேம் – ளே மாேம் 11, 12; 1965 – குதராதி வருேம் – ளே மாேம் 23, 24; 1966 – விசுவா  வருேம் – ளே மாேம் 22, 23.`
  },
  {
    heading: "மகாகும்பாபிஷேகம் (1967)",
    content: `1967 ஆம் ஆண்டு, 12 ஆண்டுகள் உற்சவம் முடிந்து, 13வது ஆண்டு மகாகும்பாபிஷேகம் நடைபபற்றது. பங்குனி மாதம் 5 முதல் 11 வடை (19-03-1967 முதல் 22-03-1967). வாஸ்து சாந்தி, கலசஸ்தாபனம், கலசபூடை, யாகம், அஸ்ைபந்தனம் சாத்தல் ஆகியவற்றுக்குப் பின் மகாகும்பாபிஷேகம் நடைபபற்றது. தடலவை: பி.சி. பபான்னுசாமிநாயுடு (பீைம்பள்ளி), துடணத்தடலவை: ைங்கசாமிநாயுடு (பாப்பநாயக்கன்பாடளயம்), பபாக்கிஸ்தாை: துடைசாமிநாயுடு (பீைம்பள்ளி), காைியதைிசி: புதுவீடு பவங்கிைசாமிநாயுடு (பீைம்பள்ளி), உபகாைியதைிசி: நாையணசாமிநாயுடு (பீளஷமடு).`
  },
  {
    heading: "வருடாந்திர உற்சவங்கள் (1968–1978)",
    content: `1968 – பிலவங்க வருேம் – டத 26, 27: 14வது ஆண்டு; 1969 – கீலக வருேம் – டத 25, 26: 15வது ஆண்டு; 1970 – பசௌமிய வருேம் – பங்குனி 11, 12: 16வது ஆண்டு; 1971 – சாதாைண வருேம் – பங்குனி 26, 27: 17வது ஆண்டு; 1972 – விஷைாதிகிருது வருேம் – டத 14, 15: 18வது ஆண்டு; 1973 – பைிதாபி வருேம் – டத 27, 28: 19வது ஆண்டு; 1974 – பிைமாதீச வருேம் – டத 19, 20: 20வது ஆண்டு; 1975 – ஆனந்த வருேம் – டத 25, 26: 21வது ஆண்டு; 1976 – இைை்சஸ வருேம் – டத 23, 24: 22வது ஆண்டு; 1977 – நள வருேம் – டத 15, 16: 23வது ஆண்டு; 1978 – நள வருேம் – டத 7, 8: 24வது ஆண்டு.`
  },
  {
    heading: "ஷகாவில் கட்டுமானம் (1979)",
    content: `15-12-1979 அன்று நமது ஷகாவில் வளாகம் M/s விையைாை் & ஷகா. அவைக்ளால் பமாதத்ம் ரூ. 39,761.92 பசலவில் கை்டி முடிக்கப்பை்ைது. கதவு, ைன்னல் பசலவு ரூ. 500. அந்நாளில் கைன் ரூ. 8,261.92 இருந்தது. முன்ஷனாைக்ள் இடத தாமாகச பசலுத்தினை. அவைக்ளுக்கு நமது மைியாடத வணக்கம். அப்பபாழுது தடலவை: M.S. பவங்கிைசாமிநாயுடு (பீைம்பள்ளி), காைியதைிசி: K. ைாைஷகாபால் (பை்ஷைல் ஷைாடு).`
  },
  {
    heading: "வருடாந்திர உற்சவங்கள் (1979–1990)",
    content: `1979 – டத 26, 27, 28 (08, 09, 10-02-1979): 25வது ஆண்டு உற்சவம். 1980 – டத 4, 5 (18, 19-01-1980): 26வது; 1981 – டத 10, 11 (23, 24-01-1981): 27வது; 1983 – டத 8, 9 (21, 22-01-1983): 29வது; 1984 – டத 6, 7 (20, 21-01-1984): 30வது; 1985 – டத 8, 9 (25, 26-01-1985): 31வது; 1992 – டத 9, 10, 11 (23, 24, 25-01-1992): 38வது ஆண்டு உற்சவம் (புதிய நிைவ்ாகம் பபாறுப்ஷபற்றது).`
  },
  {
    heading: "வருடாந்திர உற்சவங்கள் (1991–2010)",
    content: `1992 – டத 9, 10, 11 (23, 24, 25-01-1992): 38வது ஆண்டு உற்சவம். புதிய நிைவ்ாகிகள் – தடலவை: V.K. ைாமசாமி, பசயலாளை: நாைாயணமூைத்்தி, பபாருளாளை: பாலுசாமி. 1998 – டத 24, 25 (06, 07-02-1998): 44வது; 01-02-1998 – தியான மண்ைபம் கிைகப் பிைஷவசம் நடைபபற்றது. 1999 – 45வது; 2000 – 46வது; 2001 – 47வது (மண்ைபம் அைப்்பணிக்கப்பை்ைது 29-08-2001). 2002 – 48வது; 2003 – 49வது; 2004 – 50வது; 2005 – 51வது; 2006 – 52வது; 2007 – 53வது; 2008 – 54வது; 2009 – 55வது; 2010 – 56வது ஆண்டு உற்சவம்.`
  },
  {
    heading: "முக்கிய நிகழ்வுகள் (2000–2010)",
    content: `இந்த காலகை்ைத்தில் ஷகாவில் நிைவ்ாகம் சீைாக வளைச்ச்ி பபற்றது. புதிய மண்ைபங்கள் அடமக்கப்பை்டு, வருைாந்திை உற்சவங்கள் டத மாதத்தில் முடறயாக நடைபபற்றன. முன்ஷனாைக்ளின் முயற்சியால் ஷகாவில் வளைச்ச்ி பதாைைந்்தது.`
  },
  {
    heading: "வருடாந்திர உற்சவங்கள் (2011–2020)",
    content: `2011 – 57வது (21,22-01-2011); 2012 – 58வது (03,04-02-2012) மற்றும் 14-04-2012 அன்று ஸ்ரீ சண்டி ஷ ாமம்; 2013 – 59வது (25,26-01-2013) மற்றும் 14-04-2013 ஸ்ரீ ந்ருஸிம் ம் ாஷ ாமம்; 2014 – 60வது; 2015 – 61வது; 2016 – 62வது; 2017 – 63வது; 2018 – 64வது; 2019 – 65வது; 2020 – 66வது (07,08-02-2020).`
  },
  {
    heading: "டிரஸ்ட் பதிவு மற்றும் புதிய நிர்வாகம் (2020–2021)",
    content: `10-12-2020 அன்று டிரஸ்ட் பதிவு பசய்யப்பை்ைது. தடலவை: திரு. விையகுமாை, பசயலாளை: திரு. குப்பைாை், பபாருளாளை: திரு. ைாஷைந்திைன், டிரஸ்டர்கள்: திரு. துடைசாமி, திரு. பாலகிருே்ணன், திரு. பையக்குமாை, திரு. ைஷமே், திரு. பாலசந்திைன். 2021 – 67வது ஆண்டு உற்சவம் (29,30-01-2021).`
  },
  {
    heading: "சமீபத்திய உற்சவங்கள் (2022–2025)",
    content: `2022 – 68வது (21,22-01-2022): வசந்த மண்ைபம் (08-12-2021) உருவாக்கப்பட்டது. 2023 – 69வது (03,04-02-2023). 2024 – 70வது (26,27-01-2024). 2025 – 71வது (07,08-02-2025). 2025 மாசி 6 (மாசி 22) காடல 10 மணி முதல் 11 மணி வரை புதிய கை்டி பூமி பூடை சிறப்பாக நடைபெற்றது.`
  },
  {
    heading: "புதிய நிர்வாகம் (2025)",
    content: `ைத்னாலாை ்டிைஸ்டின் புதிய நிைவ்ாகம் பபாறுப்ஷபற்றது: தடலவை: திரு. குப்புைாை், பசயலாளை: திரு. பையக்குமாை, பபாருளாளை: திரு. பசௌந்தைை்ாைன், டிரஸ்டிகள்: திரு. நந்தஷகாபால், திரு. பாலகிருே்ணன், திரு. ைஷமே், திரு. தீலிபன். நிைவ்ாகம் புதிய கை்டிைப் பணிகள் விடைவில் முடிக்க நிதி உதவிக்கு அடழப்பு விடுத்தது.`
  },
  {
    heading: "வரவிருக்கும் உற்சவம் (2026)",
    content: `2026 – விசுவாச வருைம் – டத 16, 17 (30, 31-01-2026): 72வது ஆண்டு உற்சவம் நடைபபற உள்ளது. நிைவ்ாகத்தினை ்இந்த ஆண்டு உற்சவத்திற்கான ஏற்பாடுகடள சிறப்பாக முன்னடுப்பு வருகின்றனை. ஷகாவில் புதிய கை்டிைத்தின் பணி முன்ஷனற்றம் விறுவிறுப்பாக நடைபெறுகிறது.`
  },
  {
    heading: "முடிவுரர / (தேர்வு)",
    content: `ஸ்ரீ நானம்மா ஷதவி ஸ்ரீ விையநாைாயண பசௌதை்லு ஷதவஸ்தானம் 1894 ஆம் ஆண்டிலிருந்து இன்று வரை எங்கள் குலத்தின் ஆன்மிக தம்பமாக இருந்து வருகிறது. நூற்றாண்டுக்கு ஷமல் நீடித்த இந்த வைலாற்று ஷகாவில், பல தடலமுடறகளின் அன்பு, அைப்்பணிப்பு, ஒற்றுடம ஆகியவற்றின் அடையாளமாக திகழ்கிறது. இனி வரும் ஆண்டுகளிலும் நம் அடனவைின் பங்களிப்பால் இது ஷமலும் வளைச்ச்ி பபறை்டும். ஸ்ரீ நானம்மா ஷதவி மற்றும் ஸ்ரீ விையநாைாயண பசௌதை்லு எப்ஷபாதும் நம் குடும்பங்ககளக் காக்க அருள்புைிவாைாக! ஓம் நஷமா நாைாயணாய!`
  }
],
      "Historys":"வரலாறு",
      "Kammavar":"கம்மவர்"
    }
  }
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language if translation is missing
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
