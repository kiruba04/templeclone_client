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
      "templeName": "Sri Venkatesa Perumal Temple",
      "login": "Login",
      "signup": "Sign Up",
      "logout": "Logout",
      "event": "Events",
      "feedback": "Feedback",
      "homeheading1":"Location",
      "homecontent1":"The Melai Tirupathi temple is an abode of Lord Venkatesa Perumal, located in mondipalayam in Tirupur district of Tamil Nadu. The location of the temple is approximately 45 kilometers from the city of coimbatore, in Coimbatore-Sathyamangalam highway, 5 kms east of pasur vilage on the Annur-Sathy Highway.",
      "homecontent2":"The other possible routes are through Tirupur at a distance of 30km via Avinashi, or through Sathyamangalam at a distance of 27 km via Punjai Piuliampatti.",
      "homeheading2":"History",
      "homecontent3":"The temple was built over a Suyambu which was discovered by Kondamanayakkar approximately 300 years ago. At the time of discovering the Suyambu, he was living in the village of alathur, and a strong devotee to lord Venkatesa Perumal. In his dream on a fine day, Lord Venkatesa Perumal incepted the thought of his appearance on a specific day on the current location of the temple.",
      "historypara2":'Sri Venkatesa Perumal sits majestically in the middle of 4 streets. The "Dwajasthambam" can be viewed from the entrance. As well as the Bali Peedam and the Kodi Maram(flag post). If we move further ahead, we can see "Garuda Azhwar" praying to the Lord, facing the main deity. As we move forward, we reach the Maha Mandapam and the Ardah Mandapam. On entering, devotees gain the spiritual experience hearing the divine words "Om Namo Narayana" within their hearts. The main deity is in the form of a "Suyambu" in the Sanctum Sanctorum (Garbagraham). The Lord "Sri Venkatesa Perumal" facing eastward, giving his divine darisanam With the blessings of the Lord experience an inner calm and a flow of divine energy within. Devotees then come out to the inner "Prakaram" (corridor) of the temple. Moving clockwise, there is the sannidhi of "Venugopalasamy" and then on the south exit of the mandapam is "Chakrathazwar" facing east. After gaining the blessing of Him, one tracks back to the inner prakaram, is the sannidhi of "Anjanaiyar" (Sri Hanuman). After the darisanam of the Azhwars, (the twelve mystic saints) one gets the grace of "Thumbikai Azhwar"(Lord Ganesa). The sannindhi of "Alamelumangai Thayar" (Goddess Mahalakshmi) The Goddess having a graceful smile blesses us with her four hands. Next is the sannidhi of "Sudi kodutha Sudarkodi Andal" in a standing posture facing east showering us with her blessings. Near the "Andal" Sannidhi you will be blessed by darshan of lord venkatesapermal "Dasavadarams" family soth and lord. As one goes further into the Prakaram, devotees get the opportunity to pray to the "Lord s feet "(Thiruvadi). The traditional "Sorga Vaasal" which is opened every year on occasion "Vaikunta Ekadasi" has the sannindhi of "Vaikunta Narayanamurthi" along with his consort "Lakshmi Devi". As one proceeds forward, they reach the "Kodi Maram" after the darshan of "Sanishwarar".',
      "historyhead1":"TEMPLE SPECIALITY",
      "historypara3":'The temple is unique and special compared to other vaishnava temples, as the structure of "Lord Venkatesa Perumal s suyambu" resembled the shape of a banana flower, which is not a common aspect in vaishnav temples. Devotees who have taken vows to make offering to the lord of the seven hills can fullfill them in Mondipalayam in the event of their inability to go to thirupathi.',
      "historyhead2":"Sanctum Sanctorum (Garbagraham)",
      "historypara4":"The main deity Venkatesa Perumal is in the form of Swayambu resembled the shape of a banana flower. The vision of the Lord and his benign presence fill the devotees' heart with peace and calm. The presiding deity, (Utsava moorthy) Sri Venkatesa Perumal gives us his darshan along with his consorts, Sri Devi and Bhudevi",
      "historyhead3":"Thirumanjanam",
      "historypara5":"Thirumanjanam is performed for the mail deity (moolavar) on all saturdays at 7.00 A.M and on special days/festivals at the time fixed for the same. Thirumanjanam is performed for all the other deities/Azhwars on the 1st Friday of every tamil month at about 9.00 A.M. Devotees wishing to participate/contribute/donate for the same may contact the temple office.",
      "historyhead4":"TEMPLE MANAGEMENT",
      "historypara6":"Heriditary trustees alongwith officials of the HR & CE department of the Government of Tamilnadu with active support from the devotees manage the activities of the temple.",
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
      "Current Date": "Current Date"
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
      "templeName": "ஸ்ரீ வெங்கடேச பெருமாள் கோவில்",
      "login": "உள்நுழை",
      "signup": "பதிவுசெய்க",
      "logout": "வெளியேறு",
      "feedback": "கருத்து",
      "homeheading1":"அமைவிடம்",
      "homecontent1":"கோவை மாவட்டத்தில், கோவை சத்தி சாலையில் பசூர் என்ற ஊரில் இருந்து கிழக்கு 5 கிமீ தூரத்தில் அமைந்துள்ள புளியம்பட்டி சாலையில் தண்டுக்காரன்பாளையம் என்னும் ஊரிலிருந்து மேற்கு 5 கிமீ தூரத்தில் மேலத்திருப்பதி என அழைக்கப்படும் அருள்மிகு வெங்கடேச பெருமாள் திருக்கோவில் அமைந்துள்ளது.",
      "homecontent2":"கோவையிருந்து அன்னூர், பசூர் வழியாக 45 கிமீ பயணத்திலும், திருப்பூரிலிருந்து அவிநாசி வழியாக 30 கிமீ பயணத்திலும் சத்தியிலிருந்து புன்செய் புளியம்பட்டி, ஆலத்தூர் வழியாக 27 கிமீ பயணத்திலும் இத்திருக்கோயிலை அடையலாம்.",
      "homeheading2":"வரலாறு",
      "homecontent3":"கோவையை அடுத்துள்ள ஆலத்தூர் என்னும் கிராமத்தில் கம்மவார், மேதன மெட்லார் குலத்தில் மாதவ நாயக்கருக்கு கொண்டம நாயக்கர் என்ற மகன் இருந்தாா். அவர் திருப்பதி வெங்கடாசலபதியை நினைத்து அர்ச்சித்துக் கொண்டு தன் மனதிற்கு தோன்றியவாறு அவர் பூஜித்துக் கொண்டு வந்துள்ளாா்.",
      "historypara2":"மாடு மேய்த்துக்கொண்டிருந்த அவர் தன் பதினாறாவது வயதில் ஞானம் ஏற்பட்டு திருப்பதி வெங்கடாசலபதி இங்கு ஐக்கியமாகியிருந்து தன் மக்களிடம் தெரிவிக்கின்றார். இந்துக்களின் சகல பிரச்சனைகளும் இந்த புனித பூமியை சேவித்தால் அகன்றுவிடும் என்று உபதேசித்தார். இவர் தனது ஊரிலுள்ள சான்றோர்களை அழைத்துக் கொண்டு மொண்டிபாளையம் என்ற இடத்தை அடைந்தார். இவர்  நான்கு முழங்களாக சதுரமாக கோடு குறித்து அங்குள்ள மண்ணை அப்புற படச் செய்தார் . பின்பு நாராயணனை நினைத்து 'நாராயணா  , கோவிந்தா , மாதவா ' என வேண்டி புனித நீரை அந்த மணல் திட்டின் மீது தெளித்தார் . அப்போது அங்கிருந்த ஒரு பாறை வெளிப்பட்டது . அவர் அந்த பாறையை ஓங்கி அடித்தார் . அப்பொழுது அந்த பாறை இரண்டாக பிளந்தது. பின்பு அந்த பாறையை அப்புற படுத்திய போது, முன்பு தேவர்களால் பூசிக்கப்பெற்ற சாலிகரம்மமும், தாமிரக்கிண்ணமும், இருந்தன . இந்த சாலிக்ராமமே இப்பொழுது மூலவராக காட்சியளிக்கிறது .",
      "historyhead1":"தல சிறப்பு",
      "historypara3":'"வெங்கடேச பெருமாளின் சுயம்பு" வின் அமைப்பு வாழைப்பூவின் வடிவத்தை ஒத்திருப்பதால், மற்ற வைணவ கோயில்களுடன் ஒப்பிடும்போது இந்த கோயில் தனித்துவமானது மற்றும் சிறப்பு வாய்ந்தது. ஏழு மலை வெங்கடேசனை தரிசிக்க முடியாதவர்கள் தங்களது வேண்டுதலை மொண்டிபாளையத்தில் செலுத்தலாம்.',
      "historyhead2":"கருவறை (கர்ப்பக்கிரகம்)",
      "historypara4":"மூலவர் வெங்கடேச பெருமாள் சுயம்பு வடிவில் வாழைப் பூ வடிவில் இருக்கிறார். பகவானின் தரிசனமும் அவரது கருணை நிறைந்த இருப்பும் பக்தர்களின் இதயத்தை அமைதியால் நிரப்புகின்றன. மூலவர் (உற்சவ மூர்த்தி) ஸ்ரீ வேங்கடேச பெருமாள் தனது தேவிகளான ஸ்ரீ தேவி, பூதேவி ஆகியோருடன் நமக்கு காட்சி தருகிறார்.",
      "historyhead3":"திருமஞ்சனம்",
      "historypara5":"மூலவருக்கு அனைத்து சனிக்கிழமைகளிலும் காலை 7.00 மணிக்கும், விசேஷ நாட்களில் / பண்டிகைகளில் குறிப்பிட்ட நேரத்தில் மூலவருக்கும் திருமஞ்சனம் செய்யப்படுகிறது. ஒவ்வொரு தமிழ் மாதமும் முதல் வெள்ளிக்கிழமை காலை 9.00 மணியளவில் மற்ற அனைத்து தெய்வங்களுக்கும்/ஆழ்வங்களுக்கும் திருமஞ்சனம் நடக்கிறது. இதில் பங்கேற்க / பங்களிக்க / நன்கொடை அளிக்க விரும்பும் பக்தர்கள் கோவில் அலுவலகத்தை தொடர்பு கொள்ளலாம்.",
      "historyhead4":"ஆலய நிர்வாகம்",
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
      "Current Date": "தற்போதைய தேதி"
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
