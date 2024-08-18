document.addEventListener('DOMContentLoaded', () => {
    const boxStylesImages = [
        "static/images/one.png",
        "static/images/gifts.png",
        "static/images/gifts2.png",
        "static/images/firstImage.png",
        "static/images/secondImage.png",
        "static/images/thirdImage.png",
        "static/images/fourthImage.png"
    ];
    const itemsImages = [
        "static/images/product1.png",
        "static/images/product2.png",
        "static/images/product3.png",
        "static/images/product5.png",
        "static/images/product6.png",
        "static/images/Designer.jpeg",
        "static/images/product7.png",
        "static/images/product8.png"
    ];
    let currentIndex = 0;
    let activeSection = localStorage.getItem('activeSection') || 'boxStyles';

    // Set the default text for Choose Color button if not set
    const chooseColorButton = document.getElementById('choose-color');
    const savedColor = localStorage.getItem('selectedColor');
    
    // Ensure "Any" is not set by default if there's no saved color
    if (savedColor && savedColor !== "Any") {
        chooseColorButton.textContent = savedColor;
    } else {
        chooseColorButton.textContent = "Choose Color";
    }

    // Handle Box Styles button click
    document.getElementById('box-styles').addEventListener('click', function() {
        currentIndex = 0;
        activeSection = 'boxStyles';
        localStorage.setItem('activeSection', activeSection);
        document.getElementById('main-image').src = boxStylesImages[currentIndex];
    });

    

    // Handle Items button click
    document.getElementById('show-items').addEventListener('click', function() {
        currentIndex = 0;
        activeSection = 'items';
        localStorage.setItem('activeSection', activeSection);
        document.getElementById('main-image').src = itemsImages[currentIndex];
    });

    // Handle Next button click
    document.querySelector('.next').addEventListener('click', function() {
        currentIndex++;
        if (activeSection === 'boxStyles') {
            if (currentIndex >= boxStylesImages.length) currentIndex = 0;
            document.getElementById('main-image').src = boxStylesImages[currentIndex];
        } else if (activeSection === 'items') {
            if (currentIndex >= itemsImages.length) currentIndex = 0;
            document.getElementById('main-image').src = itemsImages[currentIndex];
        }
        localStorage.setItem('currentIndex', currentIndex);
    });

    // Handle Prev button click
    document.querySelector('.prev').addEventListener('click', function() {
        currentIndex--;
        if (activeSection === 'boxStyles') {
            if (currentIndex < 0) currentIndex = boxStylesImages.length - 1;
            document.getElementById('main-image').src = boxStylesImages[currentIndex];
        } else if (currentIndex < 0) {
            currentIndex = itemsImages.length - 1;
            document.getElementById('main-image').src = itemsImages[currentIndex];
        }
        localStorage.setItem('currentIndex', currentIndex);
    });

    // Handle Tier and Gender Selection
    const tierButtons = document.querySelectorAll('.tier-btn');
    const genderButtons = document.querySelectorAll('.gender-btn');
    let basePrice = 15;

    tierButtons.forEach(button => {
        button.addEventListener('click', () => {
            tierButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            basePrice = parseFloat(button.getAttribute('data-price'));
            updatePrice();
            const selectedTier = button.textContent;
            localStorage.setItem('selectedTier', selectedTier);
        });
    });

    genderButtons.forEach(button => {
        button.addEventListener('click', () => {
            genderButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedGender = button.textContent;
            localStorage.setItem('selectedGender', selectedGender);
        });
    });

    // Handle Color and Letter Selection
    const colorPicker = document.getElementById('color-picker');
    const addLetterButton = document.getElementById('add-letter');
    const letterPopup = document.getElementById('letter-popup');

    chooseColorButton.addEventListener('click', () => {
        const rect = chooseColorButton.getBoundingClientRect();
        colorPicker.style.top = `${rect.bottom + window.scrollY}px`;
        colorPicker.style.left = `${rect.left + window.scrollX}px`;
        colorPicker.style.display = colorPicker.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelectorAll(".color-option").forEach(option => {
        option.addEventListener("click", () => {
            const selectedColor = option.dataset.color;
            chooseColorButton.textContent = selectedColor === "Any" ? "Choose Color" : selectedColor;
            colorPicker.style.display = "none";
            localStorage.setItem('selectedColor', selectedColor === "Any" ? "" : selectedColor);
        });
    });

    addLetterButton.addEventListener('click', () => {
        letterPopup.style.display = 'block';
        addLetterButton.classList.add('active');
    });

    document.getElementById('close-letter-popup').addEventListener('click', () => {
        letterPopup.style.display = 'none';
    });

    // Handle Random Design Button
    const randomDesignButton = document.getElementById('random-design');
    randomDesignButton.addEventListener('click', () => {
        randomDesignButton.classList.toggle('active');
        localStorage.setItem('randomDesignActive', randomDesignButton.classList.contains('active'));
    });

    // Handle Banner Close
    document.getElementById('close-popup').addEventListener('click', function() {
        document.getElementById('banner').style.display = 'none';
    });

    // Update Price
    function updatePrice() {
        const selectedTier = document.querySelector('.tier-btn.active');
        const selectedTierPrice = selectedTier ? parseFloat(selectedTier.getAttribute('data-price')) : 0;
        document.getElementById('price').textContent = selectedTierPrice.toFixed(2);
        localStorage.setItem('selectedPrice', selectedTierPrice.toFixed(2));
    }

       // Age Slider functionality
       const ageSlider = document.getElementById('age-slider');
       const ageValueDisplay = document.getElementById('age-value');
   
       ageSlider.addEventListener('input', function() {
           ageValueDisplay.textContent = this.value;
       });
});

const button = document.querySelector('.category-button');
const options = document.querySelector('.category-options');
const optionLinks = document.querySelectorAll('.category-options a');

button.addEventListener('click', () => {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
});

optionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        button.textContent = link.getAttribute('data-value');
        options.style.display = 'none';
    });
});

document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !options.contains(e.target)) {
        options.style.display = 'none';
    }
});