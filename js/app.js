/**
 * EL-ZAHRA FERTILITY CLINIC - CORE APPLICATION ENGINE
 * Coordinates translations router, UI rendering, Shopping Cart, Payments Checkout, Booking & WhatsApp Assistant.
 */

window.EL_ZAHRA_APP = {
    currentLang: "ar", // Langue par défaut
    currentCurrency: "DZD", // Devise par défaut
    exchangeRates: { DZD: 1, EUR: 0.005, USD: 0.0054 }, // Taux fixes: 1 EUR = 200 DA, 1 USD = 185 DA
    cart: [],
    appliedCoupon: null,
    discountRate: 0.15, // Code promo de 15%
    
    // INITIALISATION DE L'APPLICATION
    init: function() {
        // Charger les articles personnalisés depuis l'admin dans le catalogue
        if (window.EL_ZAHRA_ADMIN) {
            window.EL_ZAHRA_ADMIN.loadCustomBlogPosts();
        }

        if (window.EL_ZAHRA_MEDICAL) {
            window.EL_ZAHRA_MEDICAL.init();
        }

        this.setupRouter();
        this.setupTheme();
        this.setupEventListeners();
        this.renderServices();
        this.renderProducts();
        this.renderBlog();
        this.renderFAQs();
        this.setupWilayasDropdown();
        this.updateCartCount();
        this.renderCart();
        
        // Cacher les sections admin au départ
        document.getElementById("admin-section").style.display = "none";

        // Intercepter les requêtes de liens partagés
        if (window.EL_ZAHRA_MEDICAL) {
            window.EL_ZAHRA_MEDICAL.checkSharedLink();
        }
    },

    // 1. ROUTAGE ET LANGUES (URL HASH-BASED ROUTING: #/ar ou #/fr)
    setupRouter: function() {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#/fr") {
                this.currentLang = "fr";
            } else {
                this.currentLang = "ar";
                window.location.hash = "#/ar"; // Redirection par défaut
            }
            this.applyLanguage();
        };

        window.addEventListener("hashchange", handleHashChange);
        handleHashChange(); // Executer au chargement
    },

    applyLanguage: function() {
        const langData = window.EL_ZAHRA_DATA.translations[this.currentLang];
        document.documentElement.lang = this.currentLang;
        document.body.dir = langData.dir_rtl;
        
        // Parcourir tous les éléments ayant un attribut data-i18n
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (langData[key]) {
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    el.placeholder = langData[key];
                } else {
                    el.innerHTML = langData[key];
                }
            }
        });

        // Mettre à jour l'étiquette de langue de la barre de navigation
        const langToggleLabel = document.getElementById("lang-toggle-label");
        if (langToggleLabel) {
            langToggleLabel.innerText = this.currentLang === "ar" ? "Français" : "العربية";
        }

        // Re-rendre les listes dynamiques pour appliquer la langue
        this.renderServices();
        this.renderProducts();
        this.renderBlog();
        this.renderFAQs();
        this.setupWilayasDropdown();
        this.renderCart();
        this.setupWhatsAppAssistant();

        if (window.EL_ZAHRA_ADMIN && window.EL_ZAHRA_ADMIN.isLoggedIn) {
            window.EL_ZAHRA_ADMIN.renderAppointments();
            window.EL_ZAHRA_ADMIN.renderOrders();
            window.EL_ZAHRA_ADMIN.renderInventory();
            window.EL_ZAHRA_ADMIN.renderStats();
        }
    },

    // 2. GESTION DU THEME CLAIR / SOMBRE
    setupTheme: function() {
        const currentTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", currentTheme);
        this.updateThemeButtonIcon(currentTheme);
    },

    toggleTheme: function() {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        this.updateThemeButtonIcon(newTheme);
    },

    updateThemeButtonIcon: function(theme) {
        const btn = document.getElementById("theme-btn-icon");
        if (!btn) return;
        if (theme === "dark") {
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.16 5.1a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 1 1-1.06 1.06L6.16 6.16a.75.75 0 0 1 0-1.06ZM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM19 12a7 7 0 1 1-7-7 7 7 0 0 1 7 7ZM17.84 5.1a.75.75 0 0 1 0 1.06l-1.59 1.59a.75.75 0 1 1-1.06-1.06l1.59-1.59a.75.75 0 0 1 1.06 0ZM2.25 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM18.75 12a.75.75 0 0 1 .75-.75H21.75a.75.75 0 0 1 0 1.5H19.5a.75.75 0 0 1-.75-.75ZM6.16 17.84a.75.75 0 0 1 1.06-1.06l1.59 1.59a.75.75 0 1 1-1.06 1.06l-1.59-1.59a.75.75 0 0 1 0-1.06ZM17.84 17.84a.75.75 0 0 1 0-1.06l1.59 1.59a.75.75 0 0 1-1.06 1.06l-1.59-1.59a.75.75 0 0 1 0-1.06ZM12 18.75a.75.75 0 0 1 .75.75V21.75a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75Z" />
                </svg>
            `; // Soleil pour repasser en mode clair
        } else {
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 1 1-16.915-11.97a.75.75 0 0 1 .819-.162Z" clip-rule="evenodd" />
                </svg>
            `; // Lune pour passer en mode sombre
        }
    },

    // 3. ECOUTEURS D'ÉVÉNEMENTS
    setupEventListeners: function() {
        // Toggle de langue
        const langToggle = document.getElementById("lang-toggle");
        if (langToggle) {
            langToggle.addEventListener("click", () => {
                const targetHash = this.currentLang === "ar" ? "#/fr" : "#/ar";
                window.location.hash = targetHash;
            });
        }

        // Toggle de thème
        const themeBtn = document.getElementById("theme-btn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => this.toggleTheme());
        }

        // Floating Navbar scroll effect
        window.addEventListener("scroll", () => {
            const navbar = document.querySelector(".navbar");
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });

        // Mobile Nav Toggle
        const navToggle = document.getElementById("nav-toggle");
        const navLinks = document.querySelector(".nav-links");
        if (navToggle) {
            navToggle.addEventListener("click", () => {
                navLinks.classList.toggle("active");
                navToggle.classList.toggle("active");
            });
        }

        // Close Mobile Menu on Link Click
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                if (navToggle) {
                    navToggle.classList.remove("active");
                }
            });
        });

        // Currency Switcher Dropdown
        const currencyBtn = document.getElementById("currency-btn");
        const currencyDropdown = document.getElementById("currency-dropdown");
        if (currencyBtn) {
            currencyBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                currencyDropdown.classList.toggle("active");
            });
        }
        document.addEventListener("click", () => {
            if (currencyDropdown) currencyDropdown.classList.remove("active");
        });

        // Cart Drawer Control
        const cartToggleBtn = document.getElementById("cart-toggle-btn");
        const cartOverlay = document.getElementById("cart-overlay");
        const cartDrawer = document.getElementById("cart-drawer");
        const cartCloseBtn = document.getElementById("cart-close-btn");

        if (cartToggleBtn) cartToggleBtn.addEventListener("click", () => {
            cartOverlay.classList.add("active");
            cartDrawer.classList.add("active");
        });

        const closeCart = () => {
            cartOverlay.classList.remove("active");
            cartDrawer.classList.remove("active");
        };

        if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
        if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

        // Checkout Modal Close
        const checkoutOverlay = document.getElementById("checkout-overlay");
        const checkoutCloseBtn = document.getElementById("checkout-close-btn");
        if (checkoutCloseBtn) checkoutCloseBtn.addEventListener("click", () => {
            checkoutOverlay.classList.remove("active");
        });

        // Coupon apply button
        const couponBtn = document.getElementById("coupon-apply-btn");
        if (couponBtn) {
            couponBtn.addEventListener("click", () => this.applyCouponCode());
        }

        // WhatsApp Floating widget toggle
        const waFloat = document.getElementById("whatsapp-float-btn");
        const waBox = document.getElementById("whatsapp-chat-box");
        const waClose = document.getElementById("chat-box-close");
        if (waFloat) waFloat.addEventListener("click", () => {
            waBox.classList.toggle("active");
        });
        if (waClose) waClose.addEventListener("click", () => {
            waBox.classList.remove("active");
        });

        // Admin Trigger button (secret path in footer)
        const adminTrigger = document.getElementById("admin-trigger");
        if (adminTrigger) {
            adminTrigger.addEventListener("click", () => this.handleAdminAccess());
        }

        const adminLogout = document.getElementById("admin-logout");
        if (adminLogout) {
            adminLogout.addEventListener("click", () => this.logoutAdmin());
        }
    },

    // 4. RENDRE LA SECTION DES SERVICES MÉDICAUX
    renderServices: function() {
        const container = document.getElementById("services-grid-container");
        if (!container) return;
        container.innerHTML = "";

        window.EL_ZAHRA_DATA.services.forEach(serv => {
            const card = document.createElement("div");
            card.className = "service-card glass";
            
            const title = serv.title[this.currentLang];
            const desc = serv.description[this.currentLang];
            const cat = serv.category[this.currentLang];
            
            card.innerHTML = `
                <div class="service-img-container">
                    <img src="${serv.img}" alt="${title}">
                    <span class="service-category">${cat}</span>
                </div>
                <div class="service-card-body">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <div class="service-card-footer">
                        <span class="read-more-btn" onclick="window.EL_ZAHRA_APP.openServiceDetails('${serv.id}')">
                            <span data-i18n="btn_details">${this.currentLang === "ar" ? "التفاصيل الطبية" : "Détails Médicaux"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/></svg>
                        </span>
                        <button class="service-reserve-mini" onclick="window.EL_ZAHRA_APP.prefillBooking('${serv.id}')" title="${this.currentLang === "ar" ? "حجز" : "Réserver"}">
                            📅
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    // OUVRIR LE MODAL DÉTAILLÉ D'UN SERVICE MÉDICAL
    openServiceDetails: function(id) {
        const serv = window.EL_ZAHRA_DATA.services.find(s => s.id === id);
        if (!serv) return;

        const overlay = document.getElementById("service-modal-overlay");
        const titleEl = document.getElementById("modal-service-title");
        const imgEl = document.getElementById("modal-service-img");
        const descEl = document.getElementById("modal-service-description");
        const advList = document.getElementById("modal-advantages-list");
        const faqAcc = document.getElementById("modal-faq-accordion");
        const reserveBtn = document.getElementById("modal-reserve-btn");

        if (!overlay) return;

        // Remplir les données
        titleEl.innerText = serv.title[this.currentLang];
        imgEl.src = serv.img;
        descEl.innerText = serv.fullDescription[this.currentLang];

        // Mettre à jour l'intitulé de la section avantages
        document.getElementById("modal-advantages-title").innerText = this.currentLang === "ar" ? "مزايا العلاج في عيادتنا :" : "Avantages du traitement :";
        document.getElementById("modal-faq-title").innerText = this.currentLang === "ar" ? "الأسئلة الشائعة حول العلاج :" : "FAQ spécifiques :";

        // Avantages
        advList.innerHTML = "";
        serv.advantages[this.currentLang].forEach(adv => {
            const li = document.createElement("li");
            li.innerText = adv;
            advList.appendChild(li);
        });

        // FAQ spécifique
        faqAcc.innerHTML = "";
        serv.faqs.forEach((faq, index) => {
            const item = document.createElement("div");
            item.className = "m-faq-item";
            item.innerHTML = `
                <div class="m-faq-header" onclick="this.parentElement.classList.toggle('active')">
                    <strong>${faq.q[this.currentLang]}</strong>
                    <span>+</span>
                </div>
                <div class="m-faq-body">
                    <p>${faq.a[this.currentLang]}</p>
                </div>
            `;
            faqAcc.appendChild(item);
        });

        // Bouton de réservation
        reserveBtn.onclick = () => {
            overlay.classList.remove("active");
            this.prefillBooking(id);
        };
        reserveBtn.innerText = this.currentLang === "ar" ? "حجز استشارة الآن" : "Réserver une consultation";

        // Fermer le modal
        document.getElementById("modal-close-btn").onclick = () => {
            overlay.classList.remove("active");
        };

        overlay.classList.add("active");
    },

    // PRE-REMPLIR LE FORMULAIRE DE RESÉRVATION DE RDV DEPUIS UN SERVICE
    prefillBooking: function(serviceId) {
        const select = document.getElementById("booking-motif");
        if (select) {
            select.value = serviceId;
        }
        document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    },

    // 5. RENDRE LE CATALOGUE E-COMMERCE
    renderProducts: function() {
        const container = document.getElementById("shop-grid-container");
        if (!container) return;
        container.innerHTML = "";

        // Synchroniser le prix et le stock depuis localStorage s'il existe
        const productsDb = JSON.parse(localStorage.getItem("el_zahra_products") || "{}");

        window.EL_ZAHRA_DATA.products.forEach(prod => {
            const card = document.createElement("div");
            card.className = "product-card";

            const title = prod.title[this.currentLang];
            const desc = prod.desc[this.currentLang];
            
            // Prix converti
            const dbData = productsDb[prod.id] || { priceBaseDZD: prod.priceBaseDZD, stock: prod.stock };
            const convertedPrice = this.getFormattedPrice(dbData.priceBaseDZD);
            const inStock = dbData.stock > 0;

            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${prod.img}" alt="${title}">
                    <span class="product-stock-badge ${inStock ? '' : 'out-of-stock'}">
                        ${inStock ? (this.currentLang === 'ar' ? 'متوفر' : 'En Stock') : (this.currentLang === 'ar' ? 'نفذ' : 'Rupture')}
                    </span>
                </div>
                <div class="product-body">
                    <h3 class="product-title">${title}</h3>
                    <p class="product-desc">${desc}</p>
                    <div class="product-price">
                        ${convertedPrice}
                    </div>
                    <button class="btn-add-cart" ${inStock ? '' : 'disabled'} onclick="window.EL_ZAHRA_APP.addToCart('${prod.id}')">
                        🛒 <span data-i18n="btn_add_cart">${this.currentLang === 'ar' ? 'إضافة إلى السلة' : 'Ajouter au Panier'}</span>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    // 6. GESTION DU PANIER D'ACHAT (BOUTIQUE)
    addToCart: function(id) {
        const prod = window.EL_ZAHRA_DATA.products.find(p => p.id === id);
        if (!prod) return;

        // Vérifier stock
        const productsDb = JSON.parse(localStorage.getItem("el_zahra_products") || "{}");
        const stockData = productsDb[id] || { stock: prod.stock };
        if (stockData.stock <= 0) {
            alert(this.currentLang === "ar" ? "هذا المنتج نفذ من المخزن حالياً." : "Ce produit est en rupture de stock.");
            return;
        }

        const existingItem = this.cart.find(item => item.id === id);
        if (existingItem) {
            if (existingItem.qty < stockData.stock) {
                existingItem.qty++;
            } else {
                alert(this.currentLang === "ar" ? "لقد وصلت للحد الأقصى للمخزون المتوفر." : "Vous avez atteint la limite de stock disponible.");
                return;
            }
        } else {
            this.cart.push({
                id: prod.id,
                title: prod.title[this.currentLang],
                priceDZD: prod.priceBaseDZD,
                img: prod.img,
                qty: 1
            });
        }

        this.updateCartCount();
        this.renderCart();
        
        // Ouvrir automatiquement le panier coulissant pour confirmer l'ajout
        document.getElementById("cart-overlay").classList.add("active");
        document.getElementById("cart-drawer").classList.add("active");
    },

    updateCartCount: function() {
        const count = this.cart.reduce((acc, item) => acc + item.qty, 0);
        const badges = document.querySelectorAll(".cart-badge");
        badges.forEach(b => b.innerText = count);
    },

    changeCartQty: function(id, delta) {
        const item = this.cart.find(i => i.id === id);
        if (!item) return;

        const productsDb = JSON.parse(localStorage.getItem("el_zahra_products") || "{}");
        const stock = productsDb[id] ? productsDb[id].stock : 10;

        if (delta > 0 && item.qty >= stock) {
            alert(this.currentLang === "ar" ? "المخزون غير كافٍ." : "Stock insuffisant.");
            return;
        }

        item.qty += delta;
        if (item.qty <= 0) {
            this.cart = this.cart.filter(i => i.id !== id);
        }

        this.updateCartCount();
        this.renderCart();
    },

    removeFromCart: function(id) {
        this.cart = this.cart.filter(i => i.id !== id);
        this.updateCartCount();
        this.renderCart();
    },

    // CHANGER LA DEVISE MONÉTAIRE DU SITE
    changeCurrency: function(curr) {
        this.currentCurrency = curr;
        
        // Mettre à jour l'intitulé du bouton
        const btn = document.getElementById("currency-btn");
        if (btn) btn.innerText = curr;

        // Rafraîchir les produits, le panier, et le checkout
        this.renderProducts();
        this.renderCart();
    },

    // OBTENIR UN PRIX FORMATE SELON LA DEVISE ACTIVE
    getFormattedPrice: function(priceInDZD) {
        const rate = this.exchangeRates[this.currentCurrency];
        const converted = priceInDZD * rate;
        
        if (this.currentCurrency === "EUR") {
            return `${Math.round(converted * 100) / 100} <span class="currency">€</span>`;
        } else if (this.currentCurrency === "USD") {
            return `${Math.round(converted * 100) / 100} <span class="currency">$</span>`;
        }
        return `${Math.round(priceInDZD).toLocaleString()} <span class="currency">${this.currentLang === "ar" ? "دج" : "DA"}</span>`;
    },

    // FORMATER LE PRIX EN TEXTE SANS HTML (EXCELLENT POUR LES FACTURES)
    getRawFormattedPrice: function(priceInDZD) {
        const rate = this.exchangeRates[this.currentCurrency];
        const converted = priceInDZD * rate;
        
        if (this.currentCurrency === "EUR") return `${Math.round(converted * 100) / 100} EUR`;
        if (this.currentCurrency === "USD") return `${Math.round(converted * 100) / 100} USD`;
        return `${Math.round(priceInDZD).toLocaleString()} ${this.currentLang === "ar" ? "دج" : "DA"}`;
    },

    // RENDRE LES ÉLÉMENTS DU PANIER COULISSANT
    renderCart: function() {
        const container = document.getElementById("cart-items-container");
        if (!container) return;
        container.innerHTML = "";

        if (this.cart.length === 0) {
            container.innerHTML = `<p class="cart-empty-message" data-i18n="cart_empty">${this.currentLang === 'ar' ? 'سلة المشتriat فارغة حالياً.' : 'Votre panier est vide pour le moment.'}</p>`;
            document.getElementById("btn-checkout").style.display = "none";
            this.updateCartSummary(0);
            return;
        }

        document.getElementById("btn-checkout").style.display = "block";

        let subtotalDZD = 0;

        this.cart.forEach(item => {
            subtotalDZD += item.priceDZD * item.qty;
            const itemRow = document.createElement("div");
            itemRow.className = "cart-item";
            
            const formattedPrice = this.getFormattedPrice(item.priceDZD);

            itemRow.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>${formattedPrice}</p>
                </div>
                <div class="cart-item-qty">
                    <button class="cart-qty-btn" onclick="window.EL_ZAHRA_APP.changeCartQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="cart-qty-btn" onclick="window.EL_ZAHRA_APP.changeCartQty('${item.id}', 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="window.EL_ZAHRA_APP.removeFromCart('${item.id}')">✕</button>
            `;
            container.appendChild(itemRow);
        });

        this.updateCartSummary(subtotalDZD);
    },

    updateCartSummary: function(subtotalDZD) {
        const subtotalEl = document.getElementById("cart-subtotal-val");
        const discountEl = document.getElementById("cart-discount-val");
        const totalEl = document.getElementById("cart-total-val");

        // Calculs
        let discountDZD = 0;
        if (this.appliedCoupon === "ZAHRA2026") {
            discountDZD = subtotalDZD * this.discountRate;
        }

        const totalDZD = subtotalDZD - discountDZD;

        if (subtotalEl) subtotalEl.innerHTML = this.getFormattedPrice(subtotalDZD);
        if (discountEl) discountEl.innerHTML = `-${this.getFormattedPrice(discountDZD)}`;
        if (totalEl) totalEl.innerHTML = this.getFormattedPrice(totalDZD);

        // Sauvegarder pour le checkout
        this.subtotalDZD = subtotalDZD;
        this.discountDZD = discountDZD;
        this.totalDZD = totalDZD;
    },

    // APPLIQUER UN COUPON DE RÉDUCTION
    applyCouponCode: function() {
        const input = document.getElementById("coupon-input");
        const msg = document.getElementById("coupon-message");
        if (!input) return;

        const code = input.value.trim().toUpperCase();

        if (code === "ZAHRA2026") {
            this.appliedCoupon = code;
            msg.innerText = this.currentLang === "ar" ? "تم تطبيق خصم 15% بنجاح!" : "Coupon de 15% appliqué avec succès !";
            msg.style.color = "#10B981";
            this.renderCart();
        } else {
            this.appliedCoupon = null;
            msg.innerText = this.currentLang === "ar" ? "كود الخصم غير صحيح." : "Code promo invalide.";
            msg.style.color = "#EF4444";
            this.renderCart();
        }
    },

    // 7. EXPÉDITION DANS LES 58 WILAYAS D'ALGÉRIE (CHECKOUT)
    setupWilayasDropdown: function() {
        const select = document.getElementById("checkout-wilaya");
        if (!select) return;
        select.innerHTML = "";

        // Option par défaut
        const defOpt = document.createElement("option");
        defOpt.value = "";
        defOpt.innerText = this.currentLang === "ar" ? "اختر ولاية التوصيل..." : "Sélectionnez votre Wilaya...";
        select.appendChild(defOpt);

        window.EL_ZAHRA_DATA.wilayas.forEach(w => {
            const opt = document.createElement("option");
            opt.value = w.id;
            
            const num = w.id < 10 ? `0${w.id}` : w.id;
            opt.innerText = `${num} - ${w.name[this.currentLang]}`;
            select.appendChild(opt);
        });

        // Recalculer les frais de port quand la Wilaya change
        select.onchange = () => this.calculateShipping();
        
        const typeSelect = document.getElementById("checkout-shipping-type");
        if (typeSelect) {
            typeSelect.onchange = () => this.calculateShipping();
        }
    },

    calculateShipping: function() {
        const wilayaSelect = document.getElementById("checkout-wilaya");
        const typeSelect = document.getElementById("checkout-shipping-type");
        const shipFeeEl = document.getElementById("checkout-summary-shipping");
        const totalEl = document.getElementById("checkout-summary-total");

        if (!wilayaSelect || !typeSelect || !shipFeeEl || !totalEl) return;

        const wilayaId = parseInt(wilayaSelect.value);
        const shippingType = typeSelect.value; // 'home' ou 'office'

        let feeDZD = 0;

        if (wilayaId && wilayaId !== 5) { // Batna (5) est gratuit
            const wil = window.EL_ZAHRA_DATA.wilayas.find(w => w.id === wilayaId);
            if (wil) {
                feeDZD = shippingType === "home" ? wil.feeHome : wil.feePoint;
            }
        }

        this.shippingFeeDZD = feeDZD;
        this.grandTotalDZD = this.totalDZD + feeDZD;

        // Mettre à jour l'affichage
        shipFeeEl.innerHTML = this.getFormattedPrice(feeDZD);
        totalEl.innerHTML = this.getFormattedPrice(this.grandTotalDZD);
    },

    // ACCÉDER AU PROCESSUS DE CHECKOUT (OUVRIR LE MODAL)
    openCheckout: function() {
        // Fermer le panier d'abord
        document.getElementById("cart-overlay").classList.remove("active");
        document.getElementById("cart-drawer").classList.remove("active");

        const checkoutOverlay = document.getElementById("checkout-overlay");
        if (!checkoutOverlay) return;

        // Initialiser les frais
        this.shippingFeeDZD = 0;
        this.grandTotalDZD = this.totalDZD;

        // Préparer le résumé du checkout
        const itemsList = document.getElementById("checkout-items-list");
        itemsList.innerHTML = "";

        this.cart.forEach(item => {
            const row = document.createElement("div");
            row.className = "checkout-item-row";
            row.innerHTML = `
                <span>${item.title} <strong>x${item.qty}</strong></span>
                <span>${this.getFormattedPrice(item.priceDZD * item.qty)}</span>
            `;
            itemsList.appendChild(row);
        });

        // Sommaire final
        document.getElementById("checkout-summary-subtotal").innerHTML = this.getFormattedPrice(this.subtotalDZD);
        document.getElementById("checkout-summary-discount").innerHTML = `-${this.getFormattedPrice(this.discountDZD)}`;
        document.getElementById("checkout-summary-shipping").innerHTML = this.getFormattedPrice(0);
        document.getElementById("checkout-summary-total").innerHTML = this.getFormattedPrice(this.grandTotalDZD);

        // Configurer les modes de paiement
        this.selectPaymentMethod("cod");

        checkoutOverlay.classList.add("active");
    },

    selectPaymentMethod: function(method) {
        this.paymentMethod = method;

        // Activer la carte visuelle
        document.querySelectorAll(".pay-method-card").forEach(card => {
            card.classList.remove("active");
        });
        document.getElementById(`pay-card-${method}`).classList.add("active");

        // Activer le sous-formulaire approprié
        document.querySelectorAll(".pay-details-subform").forEach(form => {
            form.classList.remove("active");
        });

        const subform = document.getElementById(`pay-form-${method}`);
        if (subform) subform.classList.add("active");

        // Gérer le bouton de paiement
        const payBtn = document.getElementById("checkout-pay-btn");
        if (payBtn) {
            if (method === "intl") {
                payBtn.style.display = "none";
                document.getElementById("pay-form-intl-btn-wrapper").style.display = "block";
            } else {
                payBtn.style.display = "block";
                document.getElementById("pay-form-intl-btn-wrapper").style.display = "none";
            }
        }
    },

    // CONFIRMER LA COMMANDE E-COMMERCE (SOUMISSION ET MOCK)
    submitOrder: function(event) {
        if (event) event.preventDefault();

        const name = document.getElementById("checkout-name").value.trim();
        const phone = document.getElementById("checkout-phone").value.trim();
        const age = document.getElementById("checkout-age").value.trim();
        const wilayaId = parseInt(document.getElementById("checkout-wilaya").value);
        const address = document.getElementById("checkout-address").value.trim();
        const shippingType = document.getElementById("checkout-shipping-type").value;

        if (!name || !phone || !wilayaId || !address) {
            alert(this.currentLang === "ar" ? "يرجى ملء جميع الحقول المطلوبة." : "Veuillez remplir tous les champs obligatoires.");
            return;
        }

        // Validation du format du téléphone algérien
        const algerianPhoneRegex = /^(05|06|07)[0-9]{8}$/;
        if (phone.startsWith("0") && !algerianPhoneRegex.test(phone)) {
            alert(this.currentLang === "ar" ? "رقم الهاتف غير صحيح. يجب أن يتكون من 10 أرقام ويبدأ بـ 05 أو 06 أو 07." : "Le numéro de téléphone est incorrect. Il doit comporter 10 chiffres et commencer par 05, 06 ou 07.");
            return;
        }

        // Gérer la simulation OTP pour les cartes SATIM
        if (this.paymentMethod === "satim") {
            const cardNum = document.getElementById("satim-card-num-input").value;
            const cardName = document.getElementById("satim-card-name-input").value;
            if (!cardNum || !cardName) {
                alert(this.currentLang === "ar" ? "يرجى ملء معلومات البطاقة." : "Veuillez remplir les informations de carte.");
                return;
            }
            
            // Ouvrir l'authentification OTP
            this.openOTPSimulation(name, phone, wilayaId, address, shippingType, age);
            return;
        }

        // Terminer la commande pour les autres méthodes (COD, CCP, Stripe)
        this.finalizeOrder(name, phone, wilayaId, address, shippingType, age);
    },

    openOTPSimulation: function(name, phone, wilayaId, address, shippingType, age) {
        const otpOverlay = document.getElementById("otp-modal-overlay");
        const optClose = document.getElementById("otp-close-btn");
        const optConfirm = document.getElementById("otp-confirm-btn");
        const inputs = document.querySelectorAll(".otp-inputs input");

        if (!otpOverlay) return;

        // Vider les inputs
        inputs.forEach(i => i.value = "");

        inputs.forEach((input, index) => {
            input.oninput = (e) => {
                if (e.target.value.length >= 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            };
        });

        optConfirm.onclick = () => {
            otpOverlay.classList.remove("active");
            this.finalizeOrder(name, phone, wilayaId, address, shippingType, age);
        };

        optClose.onclick = () => otpOverlay.classList.remove("active");
        otpOverlay.classList.add("active");
        inputs[0].focus();
    },

    finalizeOrder: function(name, phone, wilayaId, address, shippingType, age) {
        const wilaya = window.EL_ZAHRA_DATA.wilayas.find(w => w.id === wilayaId) || { name: { ar: "باتنة", fr: "Batna" } };
        const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

        const newOrder = {
            id: orderId,
            name: name,
            phone: phone,
            age: age ? parseInt(age) : 30,
            wilayaId: wilayaId,
            wilayaName: wilaya.name,
            address: address,
            shippingType: shippingType,
            shippingFee: this.shippingFeeDZD,
            paymentMethod: this.paymentMethod,
            couponApplied: this.appliedCoupon || "",
            discount: this.discountDZD,
            subtotal: this.subtotalDZD,
            total: this.grandTotalDZD,
            currency: this.currentCurrency,
            status: "pending",
            products: this.cart.map(item => ({
                id: item.id,
                title: item.title,
                qty: item.qty,
                price: item.priceDZD
            })),
            createdAt: new Date().toISOString()
        };

        // Sauvegarder dans localStorage
        const orders = JSON.parse(localStorage.getItem("el_zahra_orders") || "[]");
        orders.unshift(newOrder);
        localStorage.setItem("el_zahra_orders", JSON.stringify(orders));

        // Décrémenter les stocks physiques
        const productsDb = JSON.parse(localStorage.getItem("el_zahra_products") || "{}");
        this.cart.forEach(item => {
            if (productsDb[item.id]) {
                productsDb[item.id].stock = Math.max(0, productsDb[item.id].stock - item.qty);
            }
        });
        localStorage.setItem("el_zahra_products", JSON.stringify(productsDb));

        // Mettre à jour l'affichage de la boutique
        this.renderProducts();

        // Vider le panier
        this.cart = [];
        this.appliedCoupon = null;
        this.updateCartCount();
        this.renderCart();

        // Fermer le checkout modal
        document.getElementById("checkout-overlay").classList.remove("active");

        // Ouvrir le succès et générer la facture médicale
        this.showPurchaseSuccess(newOrder);

        // Mettre à jour l'admin
        if (window.EL_ZAHRA_ADMIN) {
            window.EL_ZAHRA_ADMIN.renderOrders();
            window.EL_ZAHRA_ADMIN.renderStats();
        }
    },

    showPurchaseSuccess: function(order) {
        const modal = document.getElementById("purchase-success-modal");
        const close = document.getElementById("success-close-btn");
        const dlBtn = document.getElementById("download-invoice-btn");

        if (!modal) return;

        dlBtn.onclick = () => this.generateInvoicePDF(order);

        close.onclick = () => {
            modal.classList.remove("active");
        };

        modal.classList.add("active");
    },

    // 8. CRÉER ET TÉLÉCHARGER LA FACTURE MÉDICALE EN FORMAT VISUEL IMPRIMABLE
    generateInvoicePDF: function(order) {
        const overlay = document.getElementById("invoice-modal-overlay");
        const box = document.getElementById("invoice-box-content");

        if (!overlay || !box) return;

        const lang = this.currentLang;
        const currencyText = order.currency === "DZD" ? (lang === "ar" ? "دج" : "DA") : order.currency;

        const tableRows = order.products.map((p, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td><strong>${p.title}</strong></td>
                <td>${Math.round(p.price).toLocaleString()} ${currencyText}</td>
                <td>${p.qty}</td>
                <td><strong>${Math.round(p.price * p.qty).toLocaleString()} ${currencyText}</strong></td>
            </tr>
        `).join("");

        const wilayaText = order.wilayaName ? order.wilayaName[lang] : "Batna";

        // Template de la Facture Premium
        box.innerHTML = `
            <div class="invoice-header-row">
                <div class="invoice-clinic-details">
                    <h2>عيادة الزهراء - Clinique El-Zahra</h2>
                    <p><strong>Dr. Hakima Betira</strong> | أخصائية أمراض النساء والخصوبة</p>
                    <p>طريق تازولت بجانب مسجد عمر بن العاص، باتنة</p>
                    <p>Tél : 0665666960 / 0664795367</p>
                </div>
                <div class="invoice-meta-details">
                    <h3>${lang === 'ar' ? 'فاتورة طبية' : 'FACTURE MÉDICALE'}</h3>
                    <p><strong>ID:</strong> #${order.id}</p>
                    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            
            <div class="invoice-info-grid">
                <div class="invoice-bill-to">
                    <h4>${lang === 'ar' ? 'معلومات المريضة / الزبون' : 'INFORMATIONS PATIENTE / CLIENT'}</h4>
                    <p><strong>${order.name}</strong></p>
                    <p>Tél: ${order.phone} | Âge: ${order.age} ans</p>
                    <p>Adresse: ${order.address}, ${wilayaText}</p>
                </div>
            </div>

            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>${lang === 'ar' ? 'المنتج / المستلزم' : 'Produit / Article'}</th>
                        <th>${lang === 'ar' ? 'سعر الوحدة' : 'Prix Unitaire'}</th>
                        <th>${lang === 'ar' ? 'الكمية' : 'Quantité'}</th>
                        <th>${lang === 'ar' ? 'الإجمالي' : 'Total'}</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>

            <div class="invoice-total-section">
                <div class="invoice-total-line">
                    <span>${lang === 'ar' ? 'المجموع الفرعي :' : 'Sous-total :'}</span>
                    <span>${Math.round(order.subtotal).toLocaleString()} ${currencyText}</span>
                </div>
                <div class="invoice-total-line">
                    <span>${lang === 'ar' ? 'الخصم (الكوبون) :' : 'Réduction (Coupon) :'}</span>
                    <span>-${Math.round(order.discount).toLocaleString()} ${currencyText}</span>
                </div>
                <div class="invoice-total-line">
                    <span>${lang === 'ar' ? 'تكاليف التوصيل :' : "Frais d'expédition :"}</span>
                    <span>${Math.round(order.shippingFee).toLocaleString()} ${currencyText}</span>
                </div>
                <div class="invoice-total-line grand-total">
                    <span>${lang === 'ar' ? 'المجموع الكلي :' : 'Total Général :'}</span>
                    <span>${Math.round(order.total).toLocaleString()} ${currencyText}</span>
                </div>
            </div>

            <div class="invoice-footer-note">
                <p>${lang === 'ar' ? 'شكراً لثقتكم في عيادة الزهراء. نتمنى لكم دوام الصحة والعافية.' : 'Merci pour votre confiance en la Clinique El-Zahra. Nous vous souhaitons une excellente santé.'}</p>
                <p style="font-size:0.7rem;margin-top:8px;color:#94A3B8;">Document certifié conforme émis par la Clinique El-Zahra, Batna, Algérie.</p>
            </div>
        `;

        // Bouton d'impression
        document.getElementById("invoice-print-btn").onclick = () => {
            window.print();
        };

        // Fermeture
        document.getElementById("invoice-close-btn").onclick = () => {
            overlay.classList.remove("active");
        };

        overlay.classList.add("active");
    },

    // 9. FORMULAIRE DE RENDEZ-VOUS EN LIGNE + SIMULATION SMS
    submitBooking: function(event) {
        if (event) event.preventDefault();

        const name = document.getElementById("booking-name").value.trim();
        const phone = document.getElementById("booking-phone").value.trim();
        const age = document.getElementById("booking-age").value.trim();
        const motif = document.getElementById("booking-motif").value;
        const date = document.getElementById("booking-date").value;
        const timeSlot = document.getElementById("booking-time-slot").value;

        if (!name || !phone || !date || !motif) {
            alert(this.currentLang === "ar" ? "يرجى ملء الفراغات الأساسية لحجز الموعد." : "Veuillez remplir tous les champs de réservation requis.");
            return;
        }

        // Enregistrer en BDD locale
        const selectedMotif = window.EL_ZAHRA_DATA.services.find(s => s.id === motif);
        const aptId = `apt-${Math.floor(100 + Math.random() * 900)}`;

        const newApt = {
            id: aptId,
            name: name,
            phone: phone,
            age: age ? parseInt(age) : 30,
            motif: motif,
            motifLabel: selectedMotif ? selectedMotif.title : { ar: motif, fr: motif },
            date: date,
            timeSlot: timeSlot,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        const appointments = JSON.parse(localStorage.getItem("el_zahra_appointments") || "[]");
        appointments.unshift(newApt);
        localStorage.setItem("el_zahra_appointments", JSON.stringify(appointments));

        // Afficher l'aperçu du SMS de confirmation
        this.renderSMSConfirmation(name, date, timeSlot);

        // Vider le formulaire
        document.getElementById("booking-form").reset();

        // Mettre à jour l'admin
        if (window.EL_ZAHRA_ADMIN) {
            window.EL_ZAHRA_ADMIN.renderAppointments();
            window.EL_ZAHRA_ADMIN.renderStats();
        }
    },

    renderSMSConfirmation: function(name, date, timeSlot) {
        const timeText = timeSlot === "time_morning" ? 
            (this.currentLang === "ar" ? "صباحاً" : "Matin") : (this.currentLang === "ar" ? "مساءً" : "Après-midi");
        
        // Texte structuré du SMS
        let smsText = this.currentLang === "ar" ? 
            `مرحباً ${name}، لقد تم تسجيل طلب موعدك بنجاح في عيادة الزهراء للدكتورة بتيرة في باتنة ليوم ${date} (${timeText}). سنقوم بالاتصال بك قريباً لتثبيته. شكراً لثقتكم.` :
            `Bonjour ${name}, votre demande de RDV a ete enregistree avec succes a la Clinique El-Zahra du Dr. Betira (Batna) pour le ${date} (${timeText}). Nous vous appellerons sous peu pour validation. Merci.`;

        const bubble = document.getElementById("sms-bubble-content");
        if (bubble) {
            bubble.innerText = smsText;
        }

        // Afficher le modal de confirmation de rendez-vous
        const successModal = document.getElementById("booking-success-modal");
        const close = document.getElementById("booking-success-close-btn");
        
        if (successModal) {
            successModal.classList.add("active");
            close.onclick = () => successModal.classList.remove("active");
        }
    },

    // REDIRECTION ET ENVOI DE MESSAGE DE RDV SUR WHATSAPP API DIRECTE
    sendBookingWhatsApp: function() {
        const name = document.getElementById("booking-name").value.trim();
        const phone = document.getElementById("booking-phone").value.trim();
        const motifVal = document.getElementById("booking-motif").value;
        const date = document.getElementById("booking-date").value;
        const timeSlot = document.getElementById("booking-time-slot").value;

        if (!name || !phone || !date || !motifVal) {
            alert(this.currentLang === "ar" ? "يرجى ملء معلومات الاستمارة قبل إرسال الرسالة." : "Veuillez remplir l'estime avant d'envoyer sur WhatsApp.");
            return;
        }

        const service = window.EL_ZAHRA_DATA.services.find(s => s.id === motifVal);
        const motifText = service ? service.title[this.currentLang] : motifVal;

        const timeText = timeSlot === "time_morning" ? 
            (this.currentLang === "ar" ? "صباحاً (08:00 - 12:00)" : "Matin (08h00 - 12h00)") : 
            (this.currentLang === "ar" ? "مساءً (13:00 - 17:00)" : "Après-midi (13h00 - 17h00)");

        // Composer le message en Arabe ou Français
        const message = this.currentLang === "ar" ?
            `السلام عليكم عيادة الزهراء، أرغب في حجز موعد طبي:\n\n• الاسم الكامل: ${name}\n• الهاتف: ${phone}\n• سبب العلاج: ${motifText}\n• التاريخ المقترح: ${date}\n• الفترة المفضلة: ${timeText}\n\nشكراً لكم.` :
            `Bonjour Clinique El-Zahra, je souhaite réserver une consultation :\n\n• Nom Complet: ${name}\n• Tél: ${phone}\n• Traitement: ${motifText}\n• Date Souhaitée: ${date}\n• Créneau: ${timeText}\n\nMerci.`;

        const waUrl = `https://wa.me/213665666960?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank");

        // Enregistrer également en BDD pour garder une trace
        this.submitBooking(null);
    },

    // 10. RENDRE LA SECTION DU BLOG MÉDICAL (FILTRES ET RECHERCHE)
    renderBlog: function(filterTag = "all", searchQuery = "") {
        const grid = document.getElementById("blog-grid-container");
        if (!grid) return;
        grid.innerHTML = "";

        // Rendre les boutons de filtres catégorie au premier rendu
        this.renderBlogCategories(filterTag);

        const posts = window.EL_ZAHRA_DATA.blogPosts;
        let filtered = posts;

        // 1. Filtrer par tag catégorie
        if (filterTag !== "all") {
            filtered = filtered.filter(p => p.category[this.currentLang] === filterTag || p.category.fr === filterTag || p.category.ar === filterTag);
        }

        // 2. Filtrer par barre de recherche
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p => 
                p.title[this.currentLang].toLowerCase().includes(query) || 
                p.summary[this.currentLang].toLowerCase().includes(query) ||
                p.content[this.currentLang].toLowerCase().includes(query)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: span 3; text-align:center; padding: 40px; color:var(--text-muted);">${this.currentLang === 'ar' ? 'لا توجد مقالات تطابق هذا البحث حالياً.' : 'Aucun article ne correspond à votre recherche.'}</div>`;
            return;
        }

        filtered.forEach(post => {
            const card = document.createElement("article");
            card.className = "blog-card glass";

            const title = post.title[this.currentLang];
            const cat = post.category[this.currentLang];
            const date = post.date[this.currentLang];
            const read = post.readTime[this.currentLang];
            const sum = post.summary[this.currentLang];

            card.innerHTML = `
                <div class="blog-card-img">
                    <img src="${post.img}" alt="${title}">
                    <span class="blog-card-category">${cat}</span>
                </div>
                <div class="blog-card-body">
                    <div class="blog-meta">
                        <span>📅 ${date}</span>
                        <span>⏱ ${read}</span>
                    </div>
                    <h3>${title}</h3>
                    <p>${sum}</p>
                    <div class="blog-card-footer">
                        <span class="read-more-btn" onclick="window.EL_ZAHRA_APP.openBlogPost('${post.id}')">
                            <span data-i18n="btn_details">${this.currentLang === 'ar' ? 'اقرأ المقال بالكامل' : "Lire l'article"}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/></svg>
                        </span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    renderBlogCategories: function(activeTag) {
        const catContainer = document.getElementById("blog-categories-tags");
        if (!catContainer) return;
        catContainer.innerHTML = "";

        // Récupérer toutes les catégories uniques
        const categories = new Set();
        window.EL_ZAHRA_DATA.blogPosts.forEach(p => {
            categories.add(p.category[this.currentLang]);
        });

        // Tag "Tous"
        const allTag = document.createElement("span");
        allTag.className = `category-tag ${activeTag === 'all' ? 'active' : ''}`;
        allTag.innerText = this.currentLang === "ar" ? "الكل" : "Tous";
        allTag.onclick = () => this.renderBlog("all", document.getElementById("blog-search-input").value);
        catContainer.appendChild(allTag);

        categories.forEach(cat => {
            const tag = document.createElement("span");
            tag.className = `category-tag ${activeTag === cat ? 'active' : ''}`;
            tag.innerText = cat;
            tag.onclick = () => this.renderBlog(cat, document.getElementById("blog-search-input").value);
            catContainer.appendChild(tag);
        });

        // Configurer la recherche temps réel
        const searchInput = document.getElementById("blog-search-input");
        if (searchInput) {
            searchInput.oninput = (e) => {
                const active = catContainer.querySelector(".category-tag.active");
                const activeCat = active ? (active.innerText === "Tous" || active.innerText === "الكل" ? "all" : active.innerText) : "all";
                this.renderBlog(activeCat, e.target.value);
            };
        }
    },

    // AFFICHER LE CONTENU DE L'ARTICLE DE BLOG EN PLEIN ÉCRAN
    openBlogPost: function(id) {
        const post = window.EL_ZAHRA_DATA.blogPosts.find(p => p.id === id);
        if (!post) return;

        const overlay = document.getElementById("service-modal-overlay");
        const titleEl = document.getElementById("modal-service-title");
        const imgEl = document.getElementById("modal-service-img");
        const descEl = document.getElementById("modal-service-description");
        const advList = document.getElementById("modal-advantages-list");
        const faqAcc = document.getElementById("modal-faq-accordion");
        const reserveBtn = document.getElementById("modal-reserve-btn");

        if (!overlay) return;

        titleEl.innerText = post.title[this.currentLang];
        imgEl.src = post.img;
        
        // Remplacer les retours à la ligne par du HTML
        descEl.innerHTML = `<div style="font-size:1.05rem;line-height:1.8;color:var(--text-main);white-space:pre-wrap;text-align:justify;">${post.content[this.currentLang]}</div>`;

        // Masquer les sections avantages/faqs spécifiques aux traitements
        document.getElementById("modal-advantages-title").innerText = "";
        document.getElementById("modal-faq-title").innerText = "";
        advList.innerHTML = "";
        faqAcc.innerHTML = "";

        // Configurer le CTA pour réserver depuis l'article de fertilité
        reserveBtn.onclick = () => {
            overlay.classList.remove("active");
            document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
        };
        reserveBtn.innerText = this.currentLang === "ar" ? "حجز موعد استشارة مع الدكتورة" : "Prendre RDV avec le Docteur";

        overlay.classList.add("active");
    },

    // 11. RENDRE LA SECTION DES QUESTIONS GENERALES DE LA CLINIQUE (ACCORDEON)
    renderFAQs: function() {
        const container = document.getElementById("faq-accordion-container");
        if (!container) return;
        container.innerHTML = "";

        window.EL_ZAHRA_DATA.faqs.forEach(faq => {
            const item = document.createElement("div");
            item.className = "faq-item glass";

            item.innerHTML = `
                <div class="faq-header" onclick="this.parentElement.classList.toggle('active')">
                    <h3>${faq.q[this.currentLang]}</h3>
                    <span class="faq-toggle-icon">+</span>
                </div>
                <div class="faq-body">
                    <p>${faq.a[this.currentLang]}</p>
                </div>
            `;
            container.appendChild(item);
        });
    },

    // 12. FLOATING WHATSAPP CHAT ASSISTANT INTELLIGENT
    setupWhatsAppAssistant: function() {
        const chatBody = document.getElementById("chat-box-body");
        const qrContainer = document.getElementById("chat-quick-replies");
        const sendBtn = document.getElementById("chat-send-btn");
        const chatInput = document.getElementById("chat-input");

        if (!chatBody) return;

        // Vider et réinitialiser le message d'accueil
        chatBody.innerHTML = `
            <div class="chat-bubble chat-bubble-received">
                <p>${window.EL_ZAHRA_DATA.translations[this.currentLang].whatsapp_welcome}</p>
                <div class="chat-bubble-time">08:00</div>
            </div>
        `;

        // Charger les boutons de questions rapides
        if (qrContainer) {
            qrContainer.innerHTML = `
                <button class="qr-btn" onclick="window.EL_ZAHRA_APP.triggerWhatsAppReply(1)">${window.EL_ZAHRA_DATA.translations[this.currentLang].whatsapp_q1}</button>
                <button class="qr-btn" onclick="window.EL_ZAHRA_APP.triggerWhatsAppReply(2)">${window.EL_ZAHRA_DATA.translations[this.currentLang].whatsapp_q2}</button>
                <button class="qr-btn" onclick="window.EL_ZAHRA_APP.triggerWhatsAppReply(3)">${window.EL_ZAHRA_DATA.translations[this.currentLang].whatsapp_q3}</button>
            `;
        }

        const handleSendInput = () => {
            const text = chatInput.value.trim();
            if (text === "") return;

            // Ajouter le message envoyé
            this.appendChatBubble(text, "sent");
            chatInput.value = "";

            // Réponse générique automatique chaleureuse après 1 seconde
            setTimeout(() => {
                const response = this.currentLang === "ar" ? 
                    "شكراً لرسالتكِ الطيبة. الدكتورة بتيرة وسكرتيرة العيادة على استعداد للتواصل معكِ مباشرة على الواتساب الفعلي. يرجى الضغط هنا للمتابعة الفورية: https://wa.me/213665666960" :
                    "Merci pour votre message chaleureux. Le Dr. Betira et le secrétariat médical sont à votre entière disposition sur le WhatsApp réel. Veuillez cliquer sur ce lien pour échanger en direct : https://wa.me/213665666960";
                
                this.appendChatBubble(response, "received");
            }, 1000);
        };

        if (sendBtn) {
            sendBtn.onclick = handleSendInput;
        }
        if (chatInput) {
            chatInput.onkeypress = (e) => {
                if (e.key === "Enter") handleSendInput();
            };
        }
    },

    triggerWhatsAppReply: function(questionNum) {
        const langData = window.EL_ZAHRA_DATA.translations[this.currentLang];
        const qText = langData[`whatsapp_q${questionNum}`];
        const aText = langData[`whatsapp_a${questionNum}`];

        // 1. Ajouter le message de la question
        this.appendChatBubble(qText, "sent");

        // 2. Répondre après 800ms
        setTimeout(() => {
            this.appendChatBubble(aText, "received");
            
            // Proposer de basculer vers le vrai secrétaire WhatsApp après la réponse
            setTimeout(() => {
                const textPromo = this.currentLang === "ar" ? 
                    "💬 للحديث مباشرة مع سكرتيرة الدكتورة بتيرة الآن اضغطِ هنا: <a href='https://wa.me/213665666960' target='_blank' style='color:var(--secondary);font-weight:700;'>تحدثي معنا مباشرة</a>" :
                    "💬 Pour échanger directement avec la secrétaire du Dr. Betira, cliquez ici : <a href='https://wa.me/213665666960' target='_blank' style='color:var(--secondary);font-weight:700;'>Discuter en direct</a>";
                this.appendChatBubble(textPromo, "received");
            }, 1000);

        }, 800);
    },

    appendChatBubble: function(text, sender) {
        const chatBody = document.getElementById("chat-box-body");
        if (!chatBody) return;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble chat-bubble-${sender}`;
        
        bubble.innerHTML = `
            <p>${text}</p>
            <div class="chat-bubble-time">${time}</div>
        `;
        chatBody.appendChild(bubble);

        // Scroll vers le bas
        chatBody.scrollTop = chatBody.scrollHeight;
    },

    // 13. CONTRÔLE DE L'ESPACE D'ADMINISTRATION MÉDICALE
    handleAdminAccess: function() {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        
        // Créer un overlay modal temporaire pour la saisie du mot de passe
        const modal = document.createElement("div");
        modal.className = "modal-overlay active";
        modal.id = "admin-password-modal";

        modal.innerHTML = `
            <div class="modal-content pw-modal-content glass" style="padding:0;">
                <div class="pw-modal-body">
                    <button class="modal-close" style="top:15px;right:15px;" onclick="document.body.removeChild(document.getElementById('admin-password-modal'))">✕</button>
                    <h3 data-i18n="footer_admin_trigger">${this.currentLang === 'ar' ? 'بوابة الإدارة الطبية' : 'Espace Praticien'}</h3>
                    <p>${this.currentLang === 'ar' ? 'يرجى إدخال رمز الأمان السري للدخول :' : 'Veuillez saisir le code de sécurité praticien :'}</p>
                    <input type="password" id="admin-passcode-input" placeholder="••••">
                    <div class="pw-error" id="admin-passcode-error">${this.currentLang === 'ar' ? 'رمز الأمان غير صحيح!' : 'Code de sécurité incorrect !'}</div>
                    <button class="btn btn-primary" onclick="window.EL_ZAHRA_APP.verifyAdminPasscode()">${this.currentLang === 'ar' ? 'دخول' : 'Se Connecter'}</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Autofocus & Enter submission
        const input = document.getElementById("admin-passcode-input");
        if (input) {
            input.focus();
            input.onkeypress = (e) => {
                if (e.key === "Enter") this.verifyAdminPasscode();
            };
        }
    },

    verifyAdminPasscode: function() {
        const input = document.getElementById("admin-passcode-input");
        const error = document.getElementById("admin-passcode-error");
        
        if (!input) return;

        if (input.value === window.EL_ZAHRA_ADMIN.passcode) {
            // Déverrouiller et fermer modal
            document.body.removeChild(document.getElementById("admin-password-modal"));
            this.unlockAdminPortal();
        } else {
            error.style.display = "block";
            input.value = "";
            input.focus();
        }
    },

    unlockAdminPortal: function() {
        window.EL_ZAHRA_ADMIN.isLoggedIn = true;
        
        // Afficher l'admin et cacher le site web public
        document.getElementById("public-website-view").style.display = "none";
        
        const adminSec = document.getElementById("admin-section");
        adminSec.style.display = "block";
        adminSec.scrollIntoView({ behavior: "smooth" });

        // Initialiser les widgets administratifs
        window.EL_ZAHRA_ADMIN.init();

        // Bind CMS Blog submit button
        const cmsForm = document.getElementById("cms-blog-form");
        if (cmsForm) {
            cmsForm.onsubmit = (e) => window.EL_ZAHRA_ADMIN.publishBlogPost(e);
        }
    },

    logoutAdmin: function() {
        window.EL_ZAHRA_ADMIN.isLoggedIn = false;
        
        // Masquer l'admin et ré-afficher le site
        document.getElementById("admin-section").style.display = "none";
        document.getElementById("public-website-view").style.display = "block";
        
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

// INITIALISER AU CHARGEMENT DE LA PAGE
document.addEventListener("DOMContentLoaded", () => {
    window.EL_ZAHRA_APP.init();
});
