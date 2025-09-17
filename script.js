// Language Translations
const translations = {
    en: {
        heroTitle: "Your Gateway to West African Opportunities",
        heroDesc: "Connect with experts, discover unique products, and plan your journey across West Africa, starting with Sierra Leone.",
        servicesTitle: "Find Experts & Skilled Workers",
        languageMessage: "Language selection will update key content. Full localization coming soon."
    },
    fr: {
        heroTitle: "Votre Porte d'Entrée vers les Opportunités d'Afrique de l'Ouest",
        heroDesc: "Connectez-vous avec des experts, découvrez des produits uniques et planifiez votre voyage à travers l'Afrique de l'Ouest, en commençant par la Sierra Leone.",
        servicesTitle: "Trouvez des Experts et des Travailleurs Qualifiés",
        languageMessage: "La sélection de la langue mettra à jour le contenu clé. Localisation complète à venir."
    }
    // Add more as needed
};

// Language Selector
const languageSelect = document.getElementById('language-select');
const languageMessage = document.getElementById('language-message');
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');
const servicesTitle = document.getElementById('services-title');

if (languageSelect) {
    languageSelect.addEventListener('change', (event) => {
        const lang = event.target.value;
        const trans = translations[lang] || translations.en;
        if (heroTitle) heroTitle.textContent = trans.heroTitle;
        if (heroDesc) heroDesc.textContent = trans.heroDesc;
        if (servicesTitle) servicesTitle.textContent = trans.servicesTitle;
        languageMessage.textContent = trans.languageMessage;
    });
}

// Currency Converter (No-Key API)
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const convertedAmountDisplay = document.getElementById('converted-amount');
const converterMessage = document.getElementById('converter-message');
const loadingSpinner = document.getElementById('loading-spinner');

const API_BASE_URL = 'https://open.er-api.com/v6/latest/';

const mockRates = {
    'SLL': { 'USD': 0.000045, 'EUR': 0.000042, 'NGN': 0.068, 'GHS': 0.00067, 'XOF': 0.027, 'SLL': 1 },
    'USD': { 'SLL': 22000, 'EUR': 0.93, 'NGN': 1500, 'GHS': 15, 'XOF': 600, 'USD': 1 },
    'EUR': { 'SLL': 23500, 'USD': 1.07, 'NGN': 1600, 'GHS': 16.5, 'XOF': 650, 'EUR': 1 },
    'NGN': { 'SLL': 14.7, 'USD': 0.00067, 'EUR': 0.00062, 'GHS': 0.01, 'XOF': 0.4, 'NGN': 1 },
    'GHS': { 'SLL': 1500, 'USD': 0.067, 'EUR': 0.06, 'NGN': 100, 'XOF': 40, 'GHS': 1 },
    'XOF': { 'SLL': 37, 'USD': 0.0016, 'EUR': 0.0015, 'NGN': 2.5, 'GHS': 0.025, 'XOF': 1 }
};

if (convertBtn) {
    convertBtn.addEventListener('click', async () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            convertedAmountDisplay.textContent = 'Please enter a valid positive amount.';
            converterMessage.textContent = 'Invalid input.';
            return;
        }

        if (fromCurrency === toCurrency) {
            convertedAmountDisplay.textContent = `Converted Amount: ${amount.toFixed(2)} ${toCurrency}`;
            converterMessage.textContent = 'Same currency – no conversion needed.';
            return;
        }

        loadingSpinner.classList.remove('hidden');
        convertBtn.disabled = true;
        convertedAmountDisplay.textContent = 'Converting...';

        try {
            const apiUrl = `${API_BASE_URL}${fromCurrency}`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API request failed.');
            const data = await response.json();
            const rate = data.rates[toCurrency];
            if (!rate) throw new Error('Rate not found.');
            const convertedAmount = amount * rate;
            convertedAmountDisplay.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
            converterMessage.textContent = 'Exchange rates from open.er-api.com (daily updates).';
        } catch (error) {
            console.error(error);
            const rate = mockRates[fromCurrency]?.[toCurrency] ?? null;
            if (rate !== null) {
                const convertedAmount = amount * rate;
                convertedAmountDisplay.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
                converterMessage.textContent = 'Using illustrative rates (API error – check network).';
            } else {
                convertedAmountDisplay.textContent = 'Error: Conversion unavailable.';
                converterMessage.textContent = 'Please try again.';
            }
        } finally {
            loadingSpinner.classList.add('hidden');
            convertBtn.disabled = false;
        }
    });

    // Initial conversion
    convertBtn.click();
}