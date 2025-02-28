document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('checkoutForm');
    const cardNumberField = document.getElementById('card_number');
    const cardTypeImage = document.getElementById('card-type-image');
    const expiryDateField = document.getElementById('expiry_date');
    const countryField = document.getElementById('country');
    const phoneField = document.getElementById('phone');

    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
        }
    });

    const cardNumberInput = document.getElementById('card_number');

    cardNumberInput.addEventListener('input', function(event) {
        let input = event.target.value.replace(/\s+/g, ''); // Remove any existing spaces
        if (input.length > 16) input = input.slice(0, 16); // Limit input to 16 digits
        event.target.value = input.match(/.{1,4}/g)?.join(' ') || input; // Insert spaces after every 4 digits
    });

    // Add automatic "/" after entering the month in the date field
    const expiryDateInput = document.getElementById('expiry_date');
    expiryDateInput.addEventListener('input', function(event) {
        let input = event.target.value.replace(/\D/g, ''); // Remove non-digits
        if (input.length > 4) input = input.slice(0, 4); // Limit to 4 digits
        event.target.value = input.match(/.{1,2}/g)?.join('/') || input; // Add '/' after MM

        // Automatically move focus to CVV field if input is complete
        if (input.length === 4) {
            document.getElementById('cvv').focus();
        }
    });

    const cvvInput = document.getElementById('cvv');
        cvvInput.addEventListener('input', function(event) {
            let input = event.target.value.replace(/\D/g, ''); // Remove non-digits
            if (input.length > 3) input = input.slice(0, 3); // Limit to 3 digits
            event.target.value = input; // Update input field
        });
  
        // Show the appropriate card image based on card number
    cardNumberField.addEventListener('input', function() {
        if (cardNumberField.value.startsWith('4')) {
            cardTypeImage.src = 'static/images/visa-new-20215093.jpg';
            cardTypeImage.style.display = 'block';
        } else if (cardNumberField.value.startsWith('5')) {
            cardTypeImage.src = 'static/images/Mastercard-logo.svg.png';
            cardTypeImage.style.display = 'block';
        } else {
            cardTypeImage.style.display = 'none';
        }
    });

    // Automatically update phone number prefix based on selected country
    countryField.addEventListener('change', function() {
        const countryCode = {
            'United States': '+1',
            'Canada': '+1',
            'United Kingdom': '+44',
            'Australia': '+61',
            'Afghanistan': '+93',
    'Albania': '+355',
    'Algeria': '+213',
    'Andorra': '+376',
    'Angola': '+244',
    'Argentina': '+54',
    'Armenia': '+374',
   
    'Austria': '+43',
    'Azerbaijan': '+994',
    'Bahamas': '+1-242',
    'Bahrain': '+973',
    'Bangladesh': '+880',
    'Barbados': '+1-246',
    'Belarus': '+375',
    'Belgium': '+32',
    'Belize': '+501',
    'Benin': '+229',
    'Bhutan': '+975',
    'Bolivia': '+591',
    'Bosnia and Herzegovina': '+387',
    'Botswana': '+267',
    'Brazil': '+55',
    'Brunei': '+673',
    'Bulgaria': '+359',
    'Burkina Faso': '+226',
    'Burundi': '+257',
    'Cambodia': '+855',
    'Cameroon': '+237',
    'Cape Verde': '+238',
    'Central African Republic': '+236',
    'Chad': '+235',
    'Chile': '+56',
    'China': '+86',
    'Colombia': '+57',
    'Comoros': '+269',
    'Congo, Democratic Republic of the': '+243',
    'Congo, Republic of the': '+242',
    'Costa Rica': '+506',
    'Croatia': '+385',
    'Cuba': '+53',
    'Cyprus': '+357',
    'Czech Republic': '+420',
    'Denmark': '+45',
    'Djibouti': '+253',
    'Dominica': '+1-767',
    'Dominican Republic': '+1-809',
    'Ecuador': '+593',
    'Egypt': '+20',
    'El Salvador': '+503',
    'Equatorial Guinea': '+240',
    'Eritrea': '+291',
    'Estonia': '+372',
    'Eswatini': '+268',
    'Ethiopia': '+251',
    'Fiji': '+679',
    'Finland': '+358',
    'France': '+33',
    'Gabon': '+241',
    'Gambia': '+220',
    'Georgia': '+995',
    'Germany': '+49',
    'Ghana': '+233',
    'Greece': '+30',
    'Grenada': '+1-473',
    'Guatemala': '+502',
    'Guinea': '+224',
    'Guinea-Bissau': '+245',
    'Guyana': '+592',
    'Haiti': '+509',
    'Honduras': '+504',
    'Hungary': '+36',
    'Iceland': '+354',
    'India': '+91',
    'Indonesia': '+62',
    'Iran': '+98',
    'Iraq': '+964',
    'Ireland': '+353',
    'Israel': '+972',
    'Italy': '+39',
    'Jamaica': '+1-876',
    'Japan': '+81',
    'Jordan': '+962',
    'Kazakhstan': '+7',
    'Kenya': '+254',
    'Kiribati': '+686',
    'Korea, North': '+850',
    'Korea, South': '+82',
    'Kosovo': '+383',
    'Kuwait': '+965',
    'Kyrgyzstan': '+996',
    'Laos': '+856',
    'Latvia': '+371',
    'Lebanon': '+961',
    'Lesotho': '+266',
    'Liberia': '+231',
    'Libya': '+218',
    'Liechtenstein': '+423',
    'Lithuania': '+370',
    'Luxembourg': '+352',
    'Madagascar': '+261',
    'Malawi': '+265',
    'Malaysia': '+60',
    'Maldives': '+960',
    'Mali': '+223',
    'Malta': '+356',
    'Marshall Islands': '+692',
    'Mauritania': '+222',
    'Mauritius': '+230',
    'Mexico': '+52',
    'Micronesia': '+691',
    'Moldova': '+373',
    'Monaco': '+377',
    'Mongolia': '+976',
    'Montenegro': '+382',
    'Morocco': '+212',
    'Mozambique': '+258',
    'Myanmar': '+95',
    'Namibia': '+264',
    'Nauru': '+674',
    'Nepal': '+977',
    'Netherlands': '+31',
    'New Zealand': '+64',
    'Nicaragua': '+505',
    'Niger': '+227',
    'Nigeria': '+234',
    'North Macedonia': '+389',
    'Norway': '+47',
    'Oman': '+968',
    'Pakistan': '+92',
    'Palau': '+680',
    'Panama': '+507',
    'Papua New Guinea': '+675',
    'Paraguay': '+595',
    'Peru': '+51',
    'Philippines': '+63',
    'Poland': '+48',
    'Portugal': '+351',
    'Qatar': '+974',
    'Romania': '+40',
    'Russia': '+7',
    'Rwanda': '+250',
    'Saint Kitts and Nevis': '+1-869',
    'Saint Lucia': '+1-758',
    'Saint Vincent and the Grenadines': '+1-784',
    'Samoa': '+685',
    'San Marino': '+378',
    'Sao Tome and Principe': '+239',
    'Saudi Arabia': '+966',
    'Senegal': '+221',
    'Serbia': '+381',
    'Seychelles': '+248',
    'Sierra Leone': '+232',
    'Singapore': '+65',
    'Slovakia': '+421',
    'Slovenia': '+386',
    'Solomon Islands': '+677',
    'Somalia': '+252',
    'South Africa': '+27',
    'South Sudan': '+211',
    'Spain': '+34',
    'Sri Lanka': '+94',
    'Sudan': '+249',
    'Suriname': '+597',
    'Sweden': '+46',
    'Switzerland': '+41',
    'Syria': '+963',
    'Taiwan': '+886',
    'Tajikistan': '+992',
    'Tanzania': '+255',
    'Thailand': '+66',
    'Timor-Leste': '+670',
    'Turkey': '+90',
    'Turkmenistan': '+993',
    'Tuvalu': '+688',
    'Uganda': '+256',
    'Ukraine': '+380',
    'United Arab Emirates': '+971',
    'Uruguay': '+598',
    'Uzbekistan': '+998',
    'Vanuatu': '+678',
    'Vatican City': '+379',
    'Venezuela': '+58',
    'Vietnam': '+84',
    'Yemen': '+967',
    'Zambia': '+260',
    'Zimbabwe': '+263'
            // Add more countries and codes as needed
        };
        phoneField.value = countryCode[countryField.value] || '';
    });

    // Fetch and display product information (dummy data for example)
    const productInfo = {
        imageUrl: 'static/images/firstImage.png',
       
    };
    const selectedTier = localStorage.getItem('selectedTier');
    const selectedGender = localStorage.getItem('selectedGender');
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedPrice = localStorage.getItem('selectedPrice');
    const productInfoContainer = document.getElementById('product-info');
    productInfoContainer.innerHTML = `
        <img src="${productInfo.imageUrl}" alt="${productInfo.name}" style="width:100px; height:auto; border-radius:10px;">
        <h3>${selectedTier}</h3>
        <h3>For: ${selectedGender}</h3>
        <h3>Color: ${selectedColor}</h3>
        <p><strong>Total Price: $${selectedPrice}</strong></p
    `;

    // Populate country field with options (dummy data for example)
    const countries = ['Select','United States', 'Canada', 'United Kingdom', 'Australia', 
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Argentina',
        'Armenia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Cape Verde',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo, Democratic Republic of the',
        'Congo, Republic of the',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini',
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Korea, North',
        'Korea, South',
        'Kosovo',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe'];
    countryField.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
});

