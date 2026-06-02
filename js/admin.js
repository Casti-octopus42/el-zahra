/**
 * EL-ZAHRA FERTILITY CLINIC - ADMINISTRATION PANEL LOGIC
 * Manages appointments database, sales orders, stock inventory, CMS blog, multi-currency stats, and CSV export.
 */

window.EL_ZAHRA_ADMIN = {
    passcode: "zahra2026",
    isLoggedIn: false,
    
    // INITIALISATION & DATABASES
    init: function() {
        this.seedInitialData();
        this.renderStats();
        this.renderAppointments();
        this.renderOrders();
        this.renderInventory();
        
        // Initialiser la section des traitements médicaux
        if (window.EL_ZAHRA_MEDICAL) {
            window.EL_ZAHRA_MEDICAL.renderAdminMedicalRequests();
            window.EL_ZAHRA_MEDICAL.renderAdminMedicalStats();
        }
        this.updateTabLabels();
        this.renderAuditHistory();
        this.runAutomaticBackup();
    },

    // PRE-PEUPLER LES BASES DE DONNÉES AVEC DES DONNÉES ULTRA-RÉALISTES SI VIDES
    seedInitialData: function() {
        // 1. Base des Rendez-vous
        if (!localStorage.getItem("el_zahra_appointments")) {
            const sampleAppointments = [
                {
                    id: "apt-1",
                    name: "Yasmin Benali",
                    phone: "0661234567",
                    age: 32,
                    motif: "female-infertility",
                    motifLabel: { ar: "علاج العقم عند النساء", fr: "Infertilité Féminine" },
                    date: "2026-05-25",
                    timeSlot: "time_morning",
                    status: "confirmed",
                    createdAt: "2026-05-20T10:30:00Z"
                },
                {
                    id: "apt-2",
                    name: "Karim Kaci",
                    phone: "0770987654",
                    age: 38,
                    motif: "male-infertility",
                    motifLabel: { ar: "علاج العقم الرجالي", fr: "Infertilité Masculine" },
                    date: "2026-05-26",
                    timeSlot: "time_afternoon",
                    status: "pending",
                    createdAt: "2026-05-22T14:15:00Z"
                },
                {
                    id: "apt-3",
                    name: "Fatma Merzoug",
                    phone: "0552468135",
                    age: 29,
                    motif: "pcos-treatment",
                    motifLabel: { ar: "علاج تكيس المبايض", fr: "Syndrome des Ovaires Polykystiques (SOPK)" },
                    date: "2026-05-28",
                    timeSlot: "time_morning",
                    status: "pending",
                    createdAt: "2026-05-23T09:00:00Z"
                },
                {
                    id: "apt-4",
                    name: "Amel Bouaziz",
                    phone: "0664567890",
                    age: 34,
                    motif: "laser-rejuvenation",
                    motifLabel: { ar: "علاج وتضييق المنطقة الحساسة بالليزر", fr: "Laser Intime & Resserrement" },
                    date: "2026-05-24",
                    timeSlot: "time_afternoon",
                    status: "confirmed",
                    createdAt: "2026-05-21T11:45:00Z"
                }
            ];
            localStorage.setItem("el_zahra_appointments", JSON.stringify(sampleAppointments));
        }

        // 2. Base des Commandes E-Commerce
        if (!localStorage.getItem("el_zahra_orders")) {
            const sampleOrders = [
                {
                    id: "ORD-9281",
                    name: "Fatiha Bahloul",
                    phone: "0665998877",
                    age: 31,
                    wilayaId: 5, // Batna
                    wilayaName: { ar: "باتنة", fr: "Batna" },
                    address: "Cité 1000 logements, Batna",
                    shippingType: "home",
                    shippingFee: 0,
                    paymentMethod: "cod",
                    couponApplied: "ZAHRA2026",
                    discount: 975, // 15% de 6500
                    subtotal: 6500,
                    total: 5525,
                    currency: "DZD",
                    status: "delivered",
                    products: [
                        { id: "fertility-women", title: "Fertily-Fém Premium", qty: 1, price: 6500 }
                    ],
                    createdAt: "2026-05-18T16:22:00Z"
                },
                {
                    id: "ORD-7362",
                    name: "Amine Touati",
                    phone: "0771554433",
                    age: 36,
                    wilayaId: 16, // Alger
                    wilayaName: { ar: "الجزائر العاصمة", fr: "Alger" },
                    address: "Hydra, Alger",
                    shippingType: "home",
                    shippingFee: 650,
                    paymentMethod: "satim",
                    couponApplied: "",
                    discount: 0,
                    subtotal: 7200,
                    total: 7850,
                    currency: "DZD",
                    status: "shipped",
                    products: [
                        { id: "fertility-men", title: "SpermActif Pro", qty: 1, price: 7200 }
                    ],
                    createdAt: "2026-05-21T08:10:00Z"
                },
                {
                    id: "ORD-3029",
                    name: "Sarah Miller (Patient International)",
                    phone: "+33612345678",
                    age: 33,
                    wilayaId: 0,
                    wilayaName: { ar: "فرنسا", fr: "France" },
                    address: "12 Rue de Rivoli, Paris",
                    shippingType: "home",
                    shippingFee: 15,
                    paymentMethod: "intl",
                    couponApplied: "ZAHRA2026",
                    discount: 10.5,
                    subtotal: 70, // Converti
                    total: 74.5,
                    currency: "EUR",
                    status: "confirmed",
                    products: [
                        { id: "fertility-women", title: "Fertily-Fém Premium", qty: 1, price: 35 },
                        { id: "laser-cream", title: "GynaSoothe Post-Laser", qty: 1, price: 35 }
                    ],
                    createdAt: "2026-05-22T19:40:00Z"
                }
            ];
            localStorage.setItem("el_zahra_orders", JSON.stringify(sampleOrders));
        }

        // 3. Base des Stocks & Produits
        if (!localStorage.getItem("el_zahra_products")) {
            const productDb = {};
            window.EL_ZAHRA_DATA.products.forEach(p => {
                productDb[p.id] = {
                    id: p.id,
                    priceBaseDZD: p.priceBaseDZD,
                    stock: p.stock
                };
            });
            localStorage.setItem("el_zahra_products", JSON.stringify(productDb));
        } else {
            // Synchroniser les données d'origine avec le localStorage
            const storedProds = JSON.parse(localStorage.getItem("el_zahra_products"));
            window.EL_ZAHRA_DATA.products.forEach(p => {
                if (storedProds[p.id]) {
                    p.priceBaseDZD = storedProds[p.id].priceBaseDZD;
                    p.stock = storedProds[p.id].stock;
                }
            });
        }
    },

    // AFFICHER ET CALCULER LES ANALYTIQUES DU TABLEAU DE BORD
    renderStats: function() {
        const appointments = JSON.parse(localStorage.getItem("el_zahra_appointments") || "[]");
        const orders = JSON.parse(localStorage.getItem("el_zahra_orders") || "[]");
        const lang = window.EL_ZAHRA_APP ? window.EL_ZAHRA_APP.currentLang : "ar";
        
        // 1. Chiffre d'Affaires total converti
        let totalDZD = 0;
        let totalEUR = 0;
        let totalUSD = 0;

        orders.forEach(order => {
            if (order.status !== "cancelled") {
                const total = parseFloat(order.total);
                if (order.currency === "DZD") {
                    totalDZD += total;
                    totalEUR += total / 200; // Taux de conversion fictif stable
                    totalUSD += total / 185;
                } else if (order.currency === "EUR") {
                    totalDZD += total * 200;
                    totalEUR += total;
                    totalUSD += total * 1.08;
                } else if (order.currency === "USD") {
                    totalDZD += total * 185;
                    totalEUR += total / 1.08;
                    totalUSD += total;
                }
            }
        });

        // 1.2 Consolider avec les paiements de traitement médical confirmés
        const medicalRequests = JSON.parse(localStorage.getItem("el_zahra_medical_requests") || "[]");
        medicalRequests.forEach(req => {
            if (req.status === "confirmed" && req.payment && req.payment.status === "paid") {
                const total = parseFloat(req.payment.amount);
                const currency = req.payment.currency;
                if (currency === "DZD") {
                    totalDZD += total;
                    totalEUR += total / 200;
                    totalUSD += total / 185;
                } else if (currency === "EUR") {
                    totalDZD += total * 200;
                    totalEUR += total;
                    totalUSD += total * 1.08;
                } else if (currency === "USD") {
                    totalDZD += total * 185;
                    totalEUR += total / 1.08;
                    totalUSD += total;
                }
            }
        });

        // Mettre à jour les éléments d'affichage des statistiques
        const revDZD = document.getElementById("admin-stat-rev-dzd");
        const revEUR = document.getElementById("admin-stat-rev-eur");
        const revUSD = document.getElementById("admin-stat-rev-usd");
        if (revDZD) revDZD.innerText = `${Math.round(totalDZD).toLocaleString()} DZD`;
        if (revEUR) revEUR.innerText = `${Math.round(totalEUR).toLocaleString()} EUR`;
        if (revUSD) revUSD.innerText = `${Math.round(totalUSD).toLocaleString()} USD`;

        // 2. Taux d'acceptation des rendez-vous
        const totalApts = appointments.length;
        const acceptedApts = appointments.filter(a => a.status === "confirmed").length;
        const rate = totalApts > 0 ? Math.round((acceptedApts / totalApts) * 100) : 100;
        const aptRateEl = document.getElementById("admin-stat-apt-rate");
        if (aptRateEl) aptRateEl.innerText = `${rate}%`;

        // 3. Total des réservations de la clinique
        const totalAptCountEl = document.getElementById("admin-stat-total-apts");
        if (totalAptCountEl) totalAptCountEl.innerText = totalApts;

        // 4. Traitement phare le plus demandé
        const treatmentCounts = {};
        appointments.forEach(apt => {
            treatmentCounts[apt.motif] = (treatmentCounts[apt.motif] || 0) + 1;
        });
        let popularMotif = "female-infertility";
        let maxCount = 0;
        for (const [key, val] of Object.entries(treatmentCounts)) {
            if (val > maxCount) {
                maxCount = val;
                popularMotif = key;
            }
        }
        
        const popularService = window.EL_ZAHRA_DATA.services.find(s => s.id === popularMotif);
        const popularEl = document.getElementById("admin-stat-popular-treatment");
        if (popularEl && popularService) {
            popularEl.innerText = popularService.title[lang];
        }
    },

    // GENERER LA LISTE DES RENDEZ-VOUS SUR LE TABLEAU DE BORD
    renderAppointments: function() {
        const appointments = JSON.parse(localStorage.getItem("el_zahra_appointments") || "[]");
        const lang = window.EL_ZAHRA_APP ? window.EL_ZAHRA_APP.currentLang : "ar";
        const tableBody = document.getElementById("admin-appointments-table-body");
        
        if (!tableBody) return;
        tableBody.innerHTML = "";

        if (appointments.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);">Aucun rendez-vous enregistré</td></tr>`;
            return;
        }

        // Trier par date décroissante
        appointments.sort((a, b) => new Date(b.date) - new Date(a.date));

        appointments.forEach(apt => {
            const row = document.createElement("tr");
            
            // Badge statut
            let badgeClass = "badge-pending";
            let statusText = lang === "ar" ? "قيد الانتظار" : "En attente";
            if (apt.status === "confirmed") {
                badgeClass = "badge-confirmed";
                statusText = lang === "ar" ? "مؤكد" : "Confirmé";
            } else if (apt.status === "cancelled") {
                badgeClass = "badge-cancelled";
                statusText = lang === "ar" ? "ملغي" : "Annulé";
            }

            const timeSlotText = apt.timeSlot === "time_morning" ? 
                (lang === "ar" ? "صباحاً" : "Matin") : (lang === "ar" ? "مساءً" : "Après-midi");

            const motifName = apt.motifLabel ? apt.motifLabel[lang] : apt.motif;

            row.innerHTML = `
                <td><strong>${apt.name}</strong></td>
                <td>${apt.phone}<br><span style="font-size:0.75rem;color:var(--text-muted);">${apt.age} ${lang === "ar" ? "سنة" : "ans"}</span></td>
                <td>${apt.date}<br><span style="font-size:0.75rem;color:var(--text-muted);">${timeSlotText}</span></td>
                <td><span style="font-size:0.85rem;">${motifName}</span></td>
                <td><span class="patient-badge ${badgeClass}">${statusText}</span></td>
                <td>
                    <div class="admin-action-btns">
                        ${apt.status === "pending" ? `<button class="admin-mini-btn btn-confirm" onclick="window.EL_ZAHRA_ADMIN.changeAppointmentStatus('${apt.id}', 'confirmed')">${lang === "ar" ? "تأكيد" : "Confirmer"}</button>` : ""}
                        ${apt.status !== "cancelled" ? `<button class="admin-mini-btn btn-cancel" onclick="window.EL_ZAHRA_ADMIN.changeAppointmentStatus('${apt.id}', 'cancelled')">${lang === "ar" ? "إلغاء" : "Annuler"}</button>` : ""}
                        <button class="admin-mini-btn btn-delete" onclick="window.EL_ZAHRA_ADMIN.deleteAppointment('${apt.id}')">${lang === "ar" ? "حذف" : "Supprimer"}</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    },

    // CHANGER LE STATUT D'UN RENDEZ-VOUS
    changeAppointmentStatus: function(id, status) {
        const appointments = JSON.parse(localStorage.getItem("el_zahra_appointments") || "[]");
        const index = appointments.findIndex(a => a.id === id);
        if (index !== -1) {
            appointments[index].status = status;
            localStorage.setItem("el_zahra_appointments", JSON.stringify(appointments));
            this.renderAppointments();
            this.renderStats();
        }
    },

    // SUPPRIMER UN RENDEZ-VOUS
    deleteAppointment: function(id) {
        if (!confirm("Voulez-vous vraiment supprimer cette fiche patient ?")) return;
        let appointments = JSON.parse(localStorage.getItem("el_zahra_appointments") || "[]");
        appointments = appointments.filter(a => a.id !== id);
        localStorage.setItem("el_zahra_appointments", JSON.stringify(appointments));
        this.renderAppointments();
        this.renderStats();
    },

    // GENERER LA LISTE DES COMMANDES CLIENTS SUR LE TABLEAU DE BORD
    renderOrders: function() {
        const orders = JSON.parse(localStorage.getItem("el_zahra_orders") || "[]");
        const lang = window.EL_ZAHRA_APP ? window.EL_ZAHRA_APP.currentLang : "ar";
        const tableBody = document.getElementById("admin-orders-table-body");
        
        if (!tableBody) return;
        tableBody.innerHTML = "";

        if (orders.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);">Aucune commande enregistrée</td></tr>`;
            return;
        }

        // Trier par date décroissante
        orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        orders.forEach(order => {
            const row = document.createElement("tr");

            // Traduction des statuts
            let badgeClass = "badge-pending";
            let statusText = lang === "ar" ? "قيد الانتظار" : "En attente";
            if (order.status === "confirmed") {
                badgeClass = "badge-confirmed";
                statusText = lang === "ar" ? "مؤكد" : "Confirmé";
            } else if (order.status === "shipped") {
                badgeClass = "badge-confirmed";
                statusText = lang === "ar" ? "تم الشحن" : "Expédié";
            } else if (order.status === "delivered") {
                badgeClass = "badge-confirmed";
                statusText = lang === "ar" ? "تم التسليم" : "Livré";
            } else if (order.status === "cancelled") {
                badgeClass = "badge-cancelled";
                statusText = lang === "ar" ? "ملغي" : "Annulé";
            }

            // Traduction méthode de paiement
            let payText = order.paymentMethod;
            if (order.paymentMethod === "cod") payText = lang === "ar" ? "الدفع عند الاستلام" : "Cabinet/COD";
            else if (order.paymentMethod === "ccp") payText = lang === "ar" ? "حوالة CCP" : "CCP Baridi";
            else if (order.paymentMethod === "satim") payText = lang === "ar" ? "بطاقة ذهبية / CIB" : "SATIM/CIB";
            else if (order.paymentMethod === "intl") payText = lang === "ar" ? "دفع دولي" : "Intl Stripe";

            // Liste abrégée des articles
            const productsList = order.products.map(p => `${p.title} (x${p.qty})`).join(", ");

            // Destination Wilaya
            const wilayaText = order.wilayaName ? order.wilayaName[lang] : "Batna";

            row.innerHTML = `
                <td><strong>#${order.id}</strong></td>
                <td><strong>${order.name}</strong><br><span style="font-size:0.75rem;color:var(--text-muted);">${order.phone}</span></td>
                <td><span style="font-size:0.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px;display:block;">${productsList}</span></td>
                <td><strong>${Math.round(order.total).toLocaleString()} ${order.currency === "DZD" ? (lang === "ar" ? "دج" : "DA") : order.currency}</strong></td>
                <td><span style="font-size:0.85rem;">${payText}</span></td>
                <td>${wilayaText}<br><span style="font-size:0.75rem;color:var(--text-muted);">${order.shippingType === "home" ? (lang === "ar" ? "توصيل منزلي" : "À domicile") : (lang === "ar" ? "مكتب شحن" : "Point relais")}</span></td>
                <td><span class="patient-badge ${badgeClass}">${statusText}</span></td>
                <td>
                    <div class="admin-action-btns">
                        ${order.status === "pending" ? `<button class="admin-mini-btn btn-confirm" onclick="window.EL_ZAHRA_ADMIN.changeOrderStatus('${order.id}', 'confirmed')">${lang === "ar" ? "تأكيد" : "Confirmer"}</button>` : ""}
                        ${order.status === "confirmed" ? `<button class="admin-mini-btn btn-confirm" style="background:#3B82F6;" onclick="window.EL_ZAHRA_ADMIN.changeOrderStatus('${order.id}', 'shipped')">${lang === "ar" ? "شحن" : "Expédier"}</button>` : ""}
                        ${order.status === "shipped" ? `<button class="admin-mini-btn btn-confirm" style="background:#10B981;" onclick="window.EL_ZAHRA_ADMIN.changeOrderStatus('${order.id}', 'delivered')">${lang === "ar" ? "تسليم" : "Livrer"}</button>` : ""}
                        ${order.status !== "cancelled" && order.status !== "delivered" ? `<button class="admin-mini-btn btn-cancel" onclick="window.EL_ZAHRA_ADMIN.changeOrderStatus('${order.id}', 'cancelled')">${lang === "ar" ? "إلغاء" : "Annuler"}</button>` : ""}
                        <button class="admin-mini-btn btn-delete" onclick="window.EL_ZAHRA_ADMIN.deleteOrder('${order.id}')">${lang === "ar" ? "حذف" : "Supprimer"}</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    },

    // MODIFIER LE STATUT D'UNE COMMANDE BOUTIQUE
    changeOrderStatus: function(id, status) {
        const orders = JSON.parse(localStorage.getItem("el_zahra_orders") || "[]");
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index].status = status;
            localStorage.setItem("el_zahra_orders", JSON.stringify(orders));
            this.renderOrders();
            this.renderStats();
        }
    },

    // SUPPRIMER UNE COMMANDE
    deleteOrder: function(id) {
        if (!confirm("Voulez-vous supprimer définitivement cette fiche de commande ?")) return;
        let orders = JSON.parse(localStorage.getItem("el_zahra_orders") || "[]");
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem("el_zahra_orders", JSON.stringify(orders));
        this.renderOrders();
        this.renderStats();
    },

    // GENERER L'INVENTAIRE ET PERMETTRE LA MODIFICATION DES STOCKS & PRIX (CMS BOUTIQUE)
    renderInventory: function() {
        const productsDb = JSON.parse(localStorage.getItem("el_zahra_products") || "{}");
        const lang = window.EL_ZAHRA_APP ? window.EL_ZAHRA_APP.currentLang : "ar";
        const tableBody = document.getElementById("admin-inventory-table-body");
        
        if (!tableBody) return;
        tableBody.innerHTML = "";

        window.EL_ZAHRA_DATA.products.forEach(p => {
            const dbData = productsDb[p.id] || { priceBaseDZD: p.priceBaseDZD, stock: p.stock };
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><strong>${p.title[lang]}</strong></td>
                <td>
                    <input type="number" class="inventory-input" style="width:100px;padding:6px;border-radius:4px;border:1px solid var(--border-color);" 
                        value="${dbData.priceBaseDZD}" id="inv-price-${p.id}"> DZD
                </td>
                <td>
                    <input type="number" class="inventory-input" style="width:80px;padding:6px;border-radius:4px;border:1px solid var(--border-color);" 
                        value="${dbData.stock}" id="inv-stock-${p.id}">
                </td>
                <td>
                    <button class="btn btn-primary" style="padding:6px 12px;font-size:0.75rem;border-radius:6px;" 
                        onclick="window.EL_ZAHRA_ADMIN.saveProductChanges('${p.id}')">
                        ${lang === "ar" ? "حفظ التغييرات" : "Mettre à jour"}
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    },

    // SAUVEGARDER LES NOUVELLES INFOS DU PRODUIT (STOCK ET PRIX)
    saveProductChanges: function(id) {
        const priceInput = document.getElementById(`inv-price-${id}`);
        const stockInput = document.getElementById(`inv-stock-${id}`);
        
        if (!priceInput || !stockInput) return;

        const newPrice = parseFloat(priceInput.value);
        const newStock = parseInt(stockInput.value);

        if (isNaN(newPrice) || isNaN(newStock)) {
            alert("Erreur: Les valeurs saisies ne sont pas valides.");
            return;
        }

        const productsDb = JSON.parse(localStorage.getItem("el_zahra_products") || "{}");
        productsDb[id] = { id: id, priceBaseDZD: newPrice, stock: newStock };
        localStorage.setItem("el_zahra_products", JSON.stringify(productsDb));

        // Mettre à jour l'objet d'origine en cours d'exécution
        const prod = window.EL_ZAHRA_DATA.products.find(p => p.id === id);
        if (prod) {
            prod.priceBaseDZD = newPrice;
            prod.stock = newStock;
        }

        alert("Produit mis à jour dans le catalogue avec succès !");
        
        // Rafraîchir les affichages
        this.renderInventory();
        if (window.EL_ZAHRA_APP) {
            window.EL_ZAHRA_APP.renderProducts();
        }
    },

    // CMS DE PUBLICATION DE BLOG MÉDICAL (SEO DYNAMIQUE)
    publishBlogPost: function(event) {
        event.preventDefault();
        const titleAr = document.getElementById("cms-title-ar").value;
        const titleFr = document.getElementById("cms-title-fr").value;
        const catAr = document.getElementById("cms-category-ar").value;
        const catFr = document.getElementById("cms-category-fr").value;
        const sumAr = document.getElementById("cms-summary-ar").value;
        const sumFr = document.getElementById("cms-summary-fr").value;
        const contAr = document.getElementById("cms-content-ar").value;
        const contFr = document.getElementById("cms-content-fr").value;

        if (!titleAr || !titleFr || !contAr || !contFr) {
            alert("Veuillez remplir au moins les titres et contenus dans les deux langues.");
            return;
        }

        // Créer un nouvel article
        const newPost = {
            id: `blog-${Date.now()}`,
            title: { ar: titleAr, fr: titleFr },
            category: { ar: catAr, fr: catFr },
            date: { ar: "اليوم", fr: "Aujourd'hui" },
            readTime: { ar: "5 دقائق", fr: "5 min de lecture" },
            summary: { ar: sumAr, fr: sumFr },
            content: { ar: contAr, fr: contFr },
            img: "assets/clinic_lobby.png" // Image par défaut de la clinique
        };

        // Ajouter en tête de liste de données globales
        window.EL_ZAHRA_DATA.blogPosts.unshift(newPost);
        
        // Sauvegarder dans localStorage pour la persistance locale des articles CMS
        let customPosts = JSON.parse(localStorage.getItem("el_zahra_custom_blog") || "[]");
        customPosts.unshift(newPost);
        localStorage.setItem("el_zahra_custom_blog", JSON.stringify(customPosts));

        alert("Article médical SEO publié avec succès sur le site !");

        // Nettoyer le formulaire
        document.getElementById("cms-blog-form").reset();

        // Re-rendre le blog
        if (window.EL_ZAHRA_APP) {
            window.EL_ZAHRA_APP.renderBlog();
        }
    },

    // CHARGER LES ARTICLES DE BLOG PERSISTÉS DEPUIS LE LOCALSTORAGE DANS L'APP
    loadCustomBlogPosts: function() {
        const customPosts = JSON.parse(localStorage.getItem("el_zahra_custom_blog") || "[]");
        customPosts.forEach(post => {
            // Éviter les doublons
            if (!window.EL_ZAHRA_DATA.blogPosts.find(b => b.id === post.id)) {
                window.EL_ZAHRA_DATA.blogPosts.unshift(post);
            }
        });
    },

    // TRANSPORTER ET EXPORTER LES DONNÉES EN CSV (EXCELLENT POUR LE CLIENT)
    exportToCSV: function(type) {
        let csvContent = "data:text/csv;charset=utf-8,";
        const lang = window.EL_ZAHRA_APP ? window.EL_ZAHRA_APP.currentLang : "ar";

        if (type === "appointments") {
            const appointments = JSON.parse(localStorage.getItem("el_zahra_appointments") || "[]");
            csvContent += "ID,Nom Patient,Telephone,Age,Motif,Date,Fenetre,Statut\n";
            appointments.forEach(a => {
                csvContent += `"${a.id}","${a.name}","${a.phone}",${a.age},"${a.motifLabel ? a.motifLabel[lang] : a.motif}","${a.date}","${a.timeSlot}","${a.status}"\n`;
            });
            this.downloadCSV(csvContent, `rendez_vous_el_zahra_${Date.now()}.csv`);
        } else if (type === "orders") {
            const orders = JSON.parse(localStorage.getItem("el_zahra_orders") || "[]");
            csvContent += "ID Commande,Client,Telephone,Age,Wilaya,Adresse,Livraison,Total,Devise,Paiement,Statut,Date\n";
            orders.forEach(o => {
                csvContent += `"${o.id}","${o.name}","${o.phone}",${o.age},"${o.wilayaName ? o.wilayaName[lang] : o.wilayaId}","${o.address}","${o.shippingType}",${o.total},"${o.currency}","${o.paymentMethod}","${o.status}","${o.createdAt}"\n`;
            });
            this.downloadCSV(csvContent, `ventes_boutique_el_zahra_${Date.now()}.csv`);
        }
    },

    downloadCSV: function(content, filename) {
        const encodedUri = encodeURI(content);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // ROUTEUR DES ONGLETS DE L'ESPACE PRATICIEN
    switchTab: function(tabId, element) {
        // Masquer toutes les sections d'onglets
        const contentTabs = document.querySelectorAll('.admin-tab-content');
        contentTabs.forEach(tab => tab.style.display = 'none');

        // Afficher l'onglet actif
        const activeTab = document.getElementById(`admin-tab-${tabId}`);
        if (activeTab) activeTab.style.display = 'block';

        // Nettoyer les styles de tous les onglets
        const categoryTags = document.querySelectorAll('.category-tag');
        categoryTags.forEach(tag => {
            tag.classList.remove('active');
            tag.style.background = '';
            tag.style.color = '';
            tag.style.borderColor = '';
        });

        // Appliquer le style actif
        if (element) {
            element.classList.add('active');
            element.style.background = 'linear-gradient(135deg, var(--primary), #2B4E9A)';
            element.style.color = 'white';
            element.style.borderColor = 'var(--primary)';
        }

        // Charger ou rafraîchir les données spécifiques
        if (tabId === 'medical') {
            if (window.EL_ZAHRA_MEDICAL) {
                window.EL_ZAHRA_MEDICAL.renderAdminMedicalRequests();
                window.EL_ZAHRA_MEDICAL.renderAdminMedicalStats();
            }
        } else if (tabId === 'apts') {
            this.renderAppointments();
        } else if (tabId === 'orders') {
            this.renderOrders();
        } else if (tabId === 'inventory') {
            this.renderInventory();
        }
    },

    // TRADUCTION DES ONGLETS ET COMPTEURS DYNAMIQUES EN ROUGE
    updateTabLabels: function() {
        const lang = window.EL_ZAHRA_APP ? window.EL_ZAHRA_APP.currentLang : "ar";
        const medicalRequests = JSON.parse(localStorage.getItem("el_zahra_medical_requests") || "[]");
        const appointments = JSON.parse(localStorage.getItem("el_zahra_appointments") || "[]");
        const orders = JSON.parse(localStorage.getItem("el_zahra_orders") || "[]");

        const pendingMed = medicalRequests.filter(r => r.status === 'pending').length;
        const pendingApt = appointments.filter(a => a.status === 'pending').length;
        const pendingOrd = orders.filter(o => o.status === 'pending').length;

        const tabMedical = document.getElementById("tab-btn-medical");
        const tabApts = document.getElementById("tab-btn-apts");
        const tabOrders = document.getElementById("tab-btn-orders");

        if (tabMedical) {
            tabMedical.innerHTML = lang === "ar" ? 
                `🏥 طلبات العلاج الطبي <span class="tab-badge" style="background:#EF4444;color:white;padding:2px 7px;border-radius:10px;font-size:0.75rem;margin-inline-start:6px;font-weight:700;">${pendingMed}</span>` : 
                `🏥 Dossiers Médicaux <span class="tab-badge" style="background:#EF4444;color:white;padding:2px 7px;border-radius:10px;font-size:0.75rem;margin-inline-start:6px;font-weight:700;">${pendingMed}</span>`;
        }
        if (tabApts) {
            tabApts.innerHTML = lang === "ar" ? 
                `طلبات المواعيد الطبية <span class="tab-badge" style="background:#F59E0B;color:white;padding:2px 7px;border-radius:10px;font-size:0.75rem;margin-inline-start:6px;font-weight:700;">${pendingApt}</span>` : 
                `Rendez-vous Clinique <span class="tab-badge" style="background:#F59E0B;color:white;padding:2px 7px;border-radius:10px;font-size:0.75rem;margin-inline-start:6px;font-weight:700;">${pendingApt}</span>`;
        }
        if (tabOrders) {
            tabOrders.innerHTML = lang === "ar" ? 
                `طلبات المبيعات والشحن <span class="tab-badge" style="background:#3B82F6;color:white;padding:2px 7px;border-radius:10px;font-size:0.75rem;margin-inline-start:6px;font-weight:700;">${pendingOrd}</span>` : 
                `Commandes Boutique <span class="tab-badge" style="background:#3B82F6;color:white;padding:2px 7px;border-radius:10px;font-size:0.75rem;margin-inline-start:6px;font-weight:700;">${pendingOrd}</span>`;
        }
    },

    // EXPORTER TOUS LES DOSSIERS MÉDICAUX ET COMPTES EN CSV
    exportMedicalRequestsCSV: function() {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID Dossier,Reference Patient,Nom Patient,Age,Genre,Pays,WhatsApp,Email,Traitement Demande,Statut,Notes Medicales,Prix Devis,Devise,Statut Paiement,Transaction Ref\n";
        
        const requests = JSON.parse(localStorage.getItem("el_zahra_medical_requests") || "[]");
        requests.forEach(r => {
            const treatmentLabel = window.EL_ZAHRA_MEDICAL ? window.EL_ZAHRA_MEDICAL.getTreatmentLabel(r.medical.treatmentType) : r.medical.treatmentType;
            const price = r.quote ? r.quote.price : 0;
            const currency = r.quote ? r.quote.currency : "";
            const payStatus = r.payment ? r.payment.status : "unpaid";
            const txn = r.payment ? r.payment.transactionRef : "";
            const notes = r.adminNotes ? r.adminNotes.replace(/"/g, '""') : "";
            
            csvContent += `"${r.id}","${r.patientRef}","${r.patient.fullName}",${r.patient.age},"${r.patient.gender}","${r.patient.country}","${r.patient.whatsapp}","${r.patient.email}","${treatmentLabel}","${r.status}","${notes}",${price},"${currency}","${payStatus}","${txn}"\n`;
        });
        
        this.downloadCSV(csvContent, `demandes_medicales_el_zahra_${Date.now()}.csv`);
        this.logAction("Export CSV", "Exportation de tous les dossiers de demandes médicales.");
    },

    // ACTIVATION DES SAUVEGARDES AUTOMATIQUES (SÉCURITÉ CONFORMITÉ)
    runAutomaticBackup: function() {
        const backupData = {
            requests: localStorage.getItem('el_zahra_medical_requests'),
            appointments: localStorage.getItem('el_zahra_appointments'),
            orders: localStorage.getItem('el_zahra_orders'),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('el_zahra_auto_backup', JSON.stringify(backupData));
        console.log('🛡️ Sécurité Clinique : Sauvegarde automatique locale effectuée.');
    },

    // JOURNAL D'AUDIT SÉCURISÉ (AUDIT TRAIL)
    logAction: function(action, details) {
        const logs = JSON.parse(localStorage.getItem('el_zahra_action_history') || '[]');
        logs.unshift({
            timestamp: new Date().toISOString(),
            user: this.isLoggedIn ? 'Praticien / Secrétaire' : 'Patient',
            action: action,
            details: details
        });
        localStorage.setItem('el_zahra_action_history', JSON.stringify(logs.slice(0, 100)));
        this.renderAuditHistory();
        this.runAutomaticBackup(); // Lancer sauvegarde automatique après chaque action clé
    },

    // AFFICHER LE JOURNAL D'AUDIT DANS LE DASHBOARD
    renderAuditHistory: function() {
        const container = document.getElementById('admin-audit-logs-tbody');
        if (!container) return;
        
        const logs = JSON.parse(localStorage.getItem('el_zahra_action_history') || '[]');
        container.innerHTML = '';

        if (logs.length === 0) {
            container.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:20px;">لا توجد إجراءات مسجلة بعد.</td></tr>`;
            return;
        }

        logs.forEach(log => {
            const dateStr = new Date(log.timestamp).toLocaleString('fr-DZ');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="font-family:monospace;font-size:0.75rem;">${dateStr}</td>
                <td><strong style="color:var(--primary);">${log.user}</strong></td>
                <td><span style="background:rgba(30,58,138,0.06);color:var(--primary);padding:3px 8px;border-radius:4px;font-size:0.75rem;font-weight:700;">${log.action}</span></td>
                <td style="font-size:0.8rem;color:var(--text-muted);">${log.details}</td>
            `;
            container.appendChild(row);
        });
    }
};
