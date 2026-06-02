/**
 * EL-ZAHRA FERTILITY CLINIC
 * MEDICAL TREATMENT REQUEST SYSTEM — Conditional Payment Workflow
 * ================================================================
 * Workflow:
 *  1. Patient submits a medical treatment request form
 *  2. Dossier appears in Admin panel for review
 *  3. Admin validates, adds notes, generates a quote (devis)
 *  4. Patient receives notification and can pay ONLY after validation
 */

window.EL_ZAHRA_MEDICAL = {

    // ─────────────────────────────────────────────────────────────
    //  DATA STORAGE KEYS
    // ─────────────────────────────────────────────────────────────
    STORAGE_KEY_REQUESTS: 'el_zahra_medical_requests',
    STORAGE_KEY_PATIENT_SESSION: 'el_zahra_patient_session',

    // ─────────────────────────────────────────────────────────────
    //  STATUS DEFINITIONS
    // ─────────────────────────────────────────────────────────────
    statuses: {
        pending:         { ar: 'قيد الانتظار',    fr: 'En attente',       color: '#F59E0B', icon: '⏳' },
        analyzing:       { ar: 'قيد الدراسة',     fr: 'En analyse',       color: '#3B82F6', icon: '🔬' },
        accepted:        { ar: 'مقبول',           fr: 'Accepté',          color: '#10B981', icon: '✅' },
        refused:         { ar: 'مرفوض',           fr: 'Refusé',           color: '#EF4444', icon: '❌' },
        quote_sent:      { ar: 'تم إرسال الديفز',  fr: 'Devis envoyé',    color: '#8B5CF6', icon: '📋' },
        payment_pending: { ar: 'في انتظار الدفع',  fr: 'Paiement en attente', color: '#F97316', icon: '💳' },
        confirmed:       { ar: 'مؤكد ومدفوع',     fr: 'Confirmé',         color: '#059669', icon: '🎉' },
    },

    // ─────────────────────────────────────────────────────────────
    //  INITIALISATION
    // ─────────────────────────────────────────────────────────────
    init: function () {
        this.seedSampleData();
        this.setupEventListeners();
        this.checkPatientSession();
        this.setupFileUpload();
    },

    // ─────────────────────────────────────────────────────────────
    //  SAMPLE DATA
    // ─────────────────────────────────────────────────────────────
    seedSampleData: function () {
        if (!localStorage.getItem(this.STORAGE_KEY_REQUESTS)) {
            const samples = [
                {
                    id: 'MR-001',
                    createdAt: '2026-05-20T09:00:00Z',
                    status: 'confirmed',
                    patientRef: 'PAT-2891',
                    patient: {
                        fullName: 'ياسمين بن علي',
                        age: 32,
                        gender: 'female',
                        country: 'الجزائر',
                        whatsapp: '+213661234567',
                        email: 'yasmin.benali@email.com'
                    },
                    medical: {
                        treatmentType: 'female-infertility',
                        symptoms: 'عدم الحمل لمدة 3 سنوات مع انتظام الدورة الشهرية',
                        history: 'لا يوجد تاريخ مرضي سابق. هرمونات طبيعية.',
                        previousTreatments: 'تم تجربة تحفيز البويضات مرة واحدة بدون نجاح',
                        problemDuration: '3 سنوات'
                    },
                    documents: [],
                    adminNotes: 'المريضة مناسبة للعلاج بالحقن المجهري IVF. الهرمونات ممتازة.',
                    quote: {
                        recommendedTreatment: 'تلقيح اصطناعي IUI + تحفيز هرموني',
                        medications: 'Gonal-F 75 UI x2 ampoules, Ovitrelle 250mcg',
                        sessions: 2,
                        consultations: 3,
                        duration: '3-4 أسابيع',
                        price: 85000,
                        currency: 'DZD',
                        notes: 'السعر يشمل جميع الاستشارات والتحاليل الأولية.',
                        generatedAt: '2026-05-22T11:00:00Z'
                    },
                    payment: {
                        status: 'paid',
                        method: 'cib',
                        amount: 85000,
                        currency: 'DZD',
                        paidAt: '2026-05-23T14:30:00Z',
                        transactionRef: 'TXN-9827462'
                    }
                },
                {
                    id: 'MR-002',
                    createdAt: '2026-05-22T14:30:00Z',
                    status: 'quote_sent',
                    patientRef: 'PAT-3012',
                    patient: {
                        fullName: 'كريم قاسي',
                        age: 38,
                        gender: 'male',
                        country: 'الجزائر',
                        whatsapp: '+213770987654',
                        email: 'karim.kaci@email.com'
                    },
                    medical: {
                        treatmentType: 'male-infertility',
                        symptoms: 'نتائج تحليل الحيوانات المنوية سيئة: حركة ضعيفة جداً',
                        history: 'دوالي الخصية درجة 2',
                        previousTreatments: 'لا شيء',
                        problemDuration: '2 سنوات'
                    },
                    documents: [],
                    adminNotes: 'يحتاج إلى برنامج تحسين جودة الحيوانات المنوية قبل IVF.',
                    quote: {
                        recommendedTreatment: 'برنامج تحسين الحيوانات المنوية + ICSI',
                        medications: 'Profertil x3 mois, Antioxydants spéciaux',
                        sessions: 1,
                        consultations: 4,
                        duration: '3-6 أشهر',
                        price: 120000,
                        currency: 'DZD',
                        notes: 'قد يلزم إجراء TESA في حالة عدم وجود حيوانات منوية طبيعية.',
                        generatedAt: '2026-05-24T10:00:00Z'
                    },
                    payment: null
                },
                {
                    id: 'MR-003',
                    createdAt: '2026-05-23T10:15:00Z',
                    status: 'analyzing',
                    patientRef: 'PAT-3088',
                    patient: {
                        fullName: 'فاطمة مرزوق',
                        age: 29,
                        gender: 'female',
                        country: 'الجزائر',
                        whatsapp: '+213552468135',
                        email: 'fatma.merzoug@email.com'
                    },
                    medical: {
                        treatmentType: 'pcos',
                        symptoms: 'دورة شهرية غير منتظمة، زيادة في الوزن، شعر زائد',
                        history: 'تشخيص متلازمة المبيض المتعدد الكيسات منذ سنتين',
                        previousTreatments: 'Metformin منذ 6 أشهر بدون نتيجة كافية',
                        problemDuration: '2 سنوات'
                    },
                    documents: [],
                    adminNotes: '',
                    quote: null,
                    payment: null
                },
                {
                    id: 'MR-004',
                    createdAt: '2026-05-24T08:00:00Z',
                    status: 'pending',
                    patientRef: 'PAT-3099',
                    patient: {
                        fullName: 'Sarah Miller',
                        age: 35,
                        gender: 'female',
                        country: 'France',
                        whatsapp: '+33612345678',
                        email: 'sarah.miller@email.com'
                    },
                    medical: {
                        treatmentType: 'recurrent-miscarriage',
                        symptoms: '3 fausses couches avant 10 semaines, douleurs pelviennes',
                        history: 'Thrombophilie légère, anticorps antiphospholipides positifs',
                        previousTreatments: 'Aspirine bébé, Progestérone',
                        problemDuration: '4 ans'
                    },
                    documents: [],
                    adminNotes: '',
                    quote: null,
                    payment: null
                }
            ];
            localStorage.setItem(this.STORAGE_KEY_REQUESTS, JSON.stringify(samples));
        }
    },

    // ─────────────────────────────────────────────────────────────
    //  GET / SAVE REQUESTS
    // ─────────────────────────────────────────────────────────────
    getRequests: function () {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_REQUESTS) || '[]');
    },

    saveRequests: function (requests) {
        localStorage.setItem(this.STORAGE_KEY_REQUESTS, JSON.stringify(requests));
    },

    getRequestById: function (id) {
        return this.getRequests().find(r => r.id === id) || null;
    },

    updateRequest: function (id, updates) {
        const requests = this.getRequests();
        const idx = requests.findIndex(r => r.id === id);
        if (idx !== -1) {
            requests[idx] = { ...requests[idx], ...updates };
            this.saveRequests(requests);
            return requests[idx];
        }
        return null;
    },

    // ─────────────────────────────────────────────────────────────
    //  FORM SUBMISSION (PATIENT SIDE)
    // ─────────────────────────────────────────────────────────────
    submitMedicalRequest: function (event) {
        event.preventDefault();

        const btn = document.getElementById('mr-submit-btn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span class="mr-spinner"></span> جاري الإرسال...';
        }

        // Collect form data
        const fullName     = document.getElementById('mr-fullname').value.trim();
        const age          = parseInt(document.getElementById('mr-age').value);
        const gender       = document.getElementById('mr-gender').value;
        const country      = document.getElementById('mr-country').value.trim();
        const whatsapp     = document.getElementById('mr-whatsapp').value.trim();
        const email        = document.getElementById('mr-email').value.trim();
        const treatType    = document.getElementById('mr-treatment-type').value;
        const symptoms     = document.getElementById('mr-symptoms').value.trim();
        const history      = document.getElementById('mr-history').value.trim();
        const prevTreat    = document.getElementById('mr-previous-treatments').value.trim();
        const duration     = document.getElementById('mr-duration').value.trim();

        // Generate unique IDs
        const reqId      = 'MR-' + Date.now().toString().slice(-5);
        const patientRef = 'PAT-' + Math.floor(Math.random() * 9000 + 1000);

        const newRequest = {
            id: reqId,
            createdAt: new Date().toISOString(),
            status: 'pending',
            patientRef: patientRef,
            patient: { fullName, age, gender, country, whatsapp, email },
            medical: { treatmentType: treatType, symptoms, history, previousTreatments: prevTreat, problemDuration: duration },
            documents: [...this.uploadedFiles], // Fix: Save actual uploaded documents list
            adminNotes: '',
            quote: null,
            payment: null
        };

        setTimeout(() => {
            const requests = this.getRequests();
            requests.unshift(newRequest);
            this.saveRequests(requests);

            // Save patient session for portal access
            const session = { patientRef, requestId: reqId, email, name: fullName, createdAt: newRequest.createdAt };
            localStorage.setItem(this.STORAGE_KEY_PATIENT_SESSION, JSON.stringify(session));

            // Log action in audit history
            if (window.EL_ZAHRA_ADMIN) {
                window.EL_ZAHRA_ADMIN.logAction("Soumission Demande", `Nouvelle demande de traitement créée par ${fullName} (ID: ${reqId}).`);
                window.EL_ZAHRA_ADMIN.updateTabLabels();
            }

            // Show success
            this.showRequestSuccess(reqId, patientRef, email);

            // Clear uploaded files state
            this.uploadedFiles = [];
            const preview = document.getElementById('mr-file-preview');
            if (preview) preview.innerHTML = '';

            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'إرسال الطلب الطبي ✓';
            }
        }, 1500);
    },

    showRequestSuccess: function (reqId, patientRef, email) {
        const overlay = document.getElementById('mr-success-overlay');
        if (!overlay) return;
        document.getElementById('mr-success-ref').textContent  = reqId;
        document.getElementById('mr-success-pat').textContent  = patientRef;
        document.getElementById('mr-success-email').textContent = email;
        overlay.classList.add('active');
        document.getElementById('medical-request-form').reset();
    },

    // ─────────────────────────────────────────────────────────────
    //  FILE UPLOAD SIMULATION
    // ─────────────────────────────────────────────────────────────
    setupFileUpload: function () {
        const dropzone = document.getElementById('mr-dropzone');
        const fileInput = document.getElementById('mr-file-input');
        if (!dropzone || !fileInput) return;

        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
        fileInput.addEventListener('change', () => this.handleFiles(fileInput.files));
    },

    uploadedFiles: [],

    handleFiles: function (files) {
        const preview = document.getElementById('mr-file-preview');
        if (!preview) return;
        Array.from(files).forEach(file => {
            this.uploadedFiles.push({ name: file.name, size: file.size, type: file.type });
            const item = document.createElement('div');
            item.className = 'mr-file-item';
            const ext = file.name.split('.').pop().toUpperCase();
            const icon = ['PDF'].includes(ext) ? '📄' : ['JPG','PNG','JPEG'].includes(ext) ? '🖼️' : '📎';
            item.innerHTML = `
                <span class="mr-file-icon">${icon}</span>
                <span class="mr-file-name">${file.name}</span>
                <span class="mr-file-size">${(file.size / 1024).toFixed(0)} KB</span>
                <button type="button" class="mr-file-remove" onclick="this.parentElement.remove()">✕</button>
            `;
            preview.appendChild(item);
        });
    },

    // ─────────────────────────────────────────────────────────────
    //  PATIENT PORTAL
    // ─────────────────────────────────────────────────────────────
    checkPatientSession: function () {
        const session = JSON.parse(localStorage.getItem(this.STORAGE_KEY_PATIENT_SESSION) || 'null');
        if (session) {
            const badge = document.getElementById('portal-session-badge');
            if (badge) {
                badge.style.display = 'flex';
                badge.querySelector('.portal-badge-name').textContent = session.name;
            }
        }
    },

    // ROUTEUR D'ACCÈS DIRECT PAR LIEN PARTAGÉ (EMAIL/WHATSAPP) AVEC TÉLÉCHARGEMENT CONDITIONNEL
    checkSharedLink: function() {
        const params = new URLSearchParams(window.location.search);
        const reqId = params.get('requestId') || params.get('request');
        const email = params.get('email');
        const download = params.get('download') === 'true';

        if (reqId && email) {
            const requests = this.getRequests();
            const found = requests.find(r => 
                (r.id.toUpperCase() === reqId.toUpperCase() || r.patientRef.toUpperCase() === reqId.toUpperCase()) &&
                r.patient.email.toLowerCase() === email.toLowerCase()
            );

            if (found) {
                // Connexion automatique du patient
                const session = {
                    patientRef: found.patientRef,
                    requestId: found.id,
                    email: found.patient.email,
                    name: found.patient.fullName,
                    createdAt: found.createdAt
                };
                localStorage.setItem(this.STORAGE_KEY_PATIENT_SESSION, JSON.stringify(session));
                
                // Mettre à jour l'état dans la Navbar
                this.checkPatientSession();
                
                // Charger le portail patient
                this.loadPatientPortal(found.id);
                
                // Faire défiler l'écran vers le portail
                setTimeout(() => {
                    const portalSection = document.getElementById('patient-portal');
                    if (portalSection) {
                        portalSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);

                // Si téléchargement immédiat demandé
                if (download) {
                    const lang = window.EL_ZAHRA_APP ? window.EL_ZAHRA_APP.currentLang : "ar";
                    setTimeout(() => {
                        if (found.status === 'confirmed') {
                            alert(lang === 'ar' ? '🎉 تم التحقق من الدفع! جاري تحميل ملف العلاج الطبي...' : '🎉 Paiement vérifié ! Téléchargement de votre dossier médical...');
                            this.downloadTreatmentPlan(found.id, 'doc');
                        } else if (['quote_sent', 'payment_pending'].includes(found.status)) {
                            alert(lang === 'ar' ? '⚠️ يرجى إتمام الدفع لتتمكن من تحميل ملف العلاج.' : '⚠️ Veuillez effectuer le paiement pour déverrouiller le téléchargement du traitement.');
                            const paySec = document.getElementById('pp-payment-section');
                            if (paySec) paySec.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            alert(lang === 'ar' ? '🔬 ملفك الطبي قيد الدراسة حالياً من قِبَل الدكتورة بتيرة.' : '🔬 Votre dossier est en cours d\'analyse. Le téléchargement sera disponible après validation et paiement.');
                        }
                    }, 1200);
                }
            }
        }
    },

    openPatientPortal: function () {
        const session = JSON.parse(localStorage.getItem(this.STORAGE_KEY_PATIENT_SESSION) || 'null');
        if (session) {
            this.loadPatientPortal(session.requestId);
        } else {
            document.getElementById('portal-login-modal').classList.add('active');
        }
    },

    loginToPortal: function (event) {
        if (event) event.preventDefault();
        const ref   = document.getElementById('portal-login-ref').value.trim().toUpperCase();
        const email = document.getElementById('portal-login-email').value.trim().toLowerCase();

        const requests = this.getRequests();
        const found = requests.find(r =>
            (r.id.toUpperCase() === ref || r.patientRef.toUpperCase() === ref) &&
            r.patient.email.toLowerCase() === email
        );

        if (found) {
            const session = {
                patientRef: found.patientRef,
                requestId: found.id,
                email: found.patient.email,
                name: found.patient.fullName,
                createdAt: found.createdAt
            };
            localStorage.setItem(this.STORAGE_KEY_PATIENT_SESSION, JSON.stringify(session));
            document.getElementById('portal-login-modal').classList.remove('active');
            this.loadPatientPortal(found.id);
        } else {
            const errEl = document.getElementById('portal-login-error');
            if (errEl) {
                errEl.textContent = '❌ المرجع أو البريد الإلكتروني غير صحيح. يرجى المحاولة مرة أخرى.';
                errEl.style.display = 'block';
            }
        }
    },

    logoutPortal: function () {
        localStorage.removeItem(this.STORAGE_KEY_PATIENT_SESSION);
        document.getElementById('patient-portal-view').style.display = 'none';
        document.getElementById('portal-session-badge').style.display = 'none';
        const badge = document.getElementById('portal-session-badge');
        if (badge) badge.style.display = 'none';
    },

    loadPatientPortal: function (requestId) {
        const req = this.getRequestById(requestId);
        if (!req) return;

        const portalView = document.getElementById('patient-portal-view');
        if (!portalView) return;

        // Show portal section
        portalView.style.display = 'block';
        portalView.scrollIntoView({ behavior: 'smooth' });

        // Fill patient info
        document.getElementById('pp-patient-name').textContent  = req.patient.fullName;
        document.getElementById('pp-patient-ref').textContent   = req.patientRef;
        document.getElementById('pp-request-id').textContent    = req.id;
        document.getElementById('pp-request-date').textContent  = new Date(req.createdAt).toLocaleDateString('ar-DZ');
        document.getElementById('pp-treatment-type').textContent = this.getTreatmentLabel(req.medical.treatmentType);

        // Status badge
        const statusInfo = this.statuses[req.status] || this.statuses.pending;
        const statusEl = document.getElementById('pp-status-badge');
        if (statusEl) {
            statusEl.textContent = `${statusInfo.icon} ${statusInfo.ar}`;
            statusEl.style.background = statusInfo.color + '22';
            statusEl.style.color = statusInfo.color;
            statusEl.style.borderColor = statusInfo.color + '44';
        }

        // Timeline
        this.renderPortalTimeline(req.status);

        // Quote section
        const quoteSection = document.getElementById('pp-quote-section');
        if (req.quote && quoteSection) {
            quoteSection.style.display = 'block';
            document.getElementById('pp-quote-treatment').textContent = req.quote.recommendedTreatment;
            document.getElementById('pp-quote-medications').textContent = req.quote.medications || 'لا يوجد';
            document.getElementById('pp-quote-sessions').textContent = req.quote.sessions;
            document.getElementById('pp-quote-consultations').textContent = req.quote.consultations;
            document.getElementById('pp-quote-duration').textContent = req.quote.duration;
            document.getElementById('pp-quote-price').textContent =
                `${Number(req.quote.price).toLocaleString()} ${req.quote.currency}`;
            document.getElementById('pp-quote-notes').textContent = req.quote.notes || '';
        } else if (quoteSection) {
            quoteSection.style.display = 'none';
        }

        // Payment section — only if quote_sent, payment_pending, or confirmed
        const paySection = document.getElementById('pp-payment-section');
        if (['quote_sent', 'payment_pending', 'confirmed'].includes(req.status) && req.quote && paySection) {
            paySection.style.display = 'block';
            document.getElementById('pp-pay-amount').textContent =
                `${Number(req.quote.price).toLocaleString()} ${req.quote.currency}`;

            // If already paid
            if (req.payment && req.payment.status === 'paid') {
                document.getElementById('pp-payment-done').style.display = 'block';
                document.getElementById('pp-payment-form').style.display = 'none';
                document.getElementById('pp-pay-txn').textContent = req.payment.transactionRef || 'N/A';
                document.getElementById('pp-pay-method-done').textContent = req.payment.method.toUpperCase();
                document.getElementById('pp-pay-date-done').textContent =
                    new Date(req.payment.paidAt).toLocaleDateString('ar-DZ');
            } else {
                document.getElementById('pp-payment-done').style.display = 'none';
                document.getElementById('pp-payment-form').style.display = 'block';
            }
        } else if (paySection) {
            paySection.style.display = 'none';
        }

        // Render documents already uploaded in Patient Portal (Step 5)
        const ppDocsList = document.getElementById('pp-uploaded-docs-list');
        if (ppDocsList) {
            ppDocsList.innerHTML = '';
            if (req.documents && req.documents.length > 0) {
                req.documents.forEach(doc => {
                    const ext = doc.name.split('.').pop().toUpperCase();
                    const icon = ['PDF'].includes(ext) ? '📄' : ['JPG','PNG','JPEG'].includes(ext) ? '🖼️' : '📎';
                    const docItem = document.createElement('div');
                    docItem.className = 'mr-file-item';
                    docItem.style.width = 'calc(50% - 6px)';
                    docItem.style.minWidth = '200px';
                    docItem.style.padding = '8px 12px';
                    docItem.innerHTML = `
                        <span class="mr-file-icon" style="font-size:1.1rem;">${icon}</span>
                        <div style="flex:1;overflow:hidden;text-align:start;">
                            <span class="mr-file-name" style="display:block;font-weight:700;font-size:0.75rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;margin:0;" title="${doc.name}">${doc.name}</span>
                            <span class="mr-file-size" style="font-size:0.65rem;color:var(--text-muted);display:block;margin:0;">${(doc.size / 1024).toFixed(0)} KB</span>
                        </div>
                    `;
                    ppDocsList.appendChild(docItem);
                });
            } else {
                ppDocsList.innerHTML = `<span style="color:var(--text-muted);font-size:0.8rem;padding:8px 0;">لم تقم برفع أي وثائق بعد.</span>`;
            }
        }

        // Configurer l'uploader des pièces supplémentaires du portail (Step 5)
        this.setupPortalExtraUploader();

        // Store current request ID in portal for payment processing
        portalView.dataset.requestId = requestId;
    },

    renderPortalTimeline: function (currentStatus) {
        const steps = ['pending', 'analyzing', 'accepted', 'quote_sent', 'payment_pending', 'confirmed'];
        const container = document.getElementById('pp-timeline');
        if (!container) return;
        const currentIdx = steps.indexOf(currentStatus);
        container.innerHTML = steps.map((step, i) => {
            const info = this.statuses[step];
            const done    = i < currentIdx;
            const active  = i === currentIdx;
            const refused = currentStatus === 'refused';
            return `
                <div class="pp-timeline-step ${done ? 'done' : ''} ${active ? 'active' : ''} ${refused && step === 'refused' ? 'refused' : ''}">
                    <div class="pp-step-dot">${done ? '✓' : info.icon}</div>
                    <div class="pp-step-label">${info.ar}</div>
                </div>
                ${i < steps.length - 1 ? `<div class="pp-timeline-line ${done ? 'done' : ''}"></div>` : ''}
            `;
        }).join('');
    },

    // ─────────────────────────────────────────────────────────────
    //  PATIENT PAYMENT PROCESSING
    // ─────────────────────────────────────────────────────────────
    processPatientPayment: function (event) {
        if (event) event.preventDefault();

        const portalView = document.getElementById('patient-portal-view');
        const requestId  = portalView ? portalView.dataset.requestId : null;
        if (!requestId) return;

        const req = this.getRequestById(requestId);
        if (!req || !req.quote) {
            alert('لا يوجد ديفز مرتبط بهذا الطلب.');
            return;
        }

        const payMethod  = document.getElementById('pp-pay-method').value;
        const payCountry = document.getElementById('pp-pay-country').value;

        // Validate card fields if card payment
        if (['cib', 'edahabia', 'visa', 'mastercard'].includes(payMethod)) {
            const cardNum  = document.getElementById('pp-card-number').value.trim();
            const cardExp  = document.getElementById('pp-card-expiry').value.trim();
            const cardCvv  = document.getElementById('pp-card-cvv').value.trim();
            if (!cardNum || !cardExp || !cardCvv) {
                alert('يرجى ملء جميع بيانات البطاقة.');
                return;
            }
        }

        const btn = document.getElementById('pp-pay-btn');
        if (btn) { btn.disabled = true; btn.textContent = '⏳ جاري المعالجة...'; }

        // Simulate payment processing
        setTimeout(() => {
            const txnRef = 'TXN-' + Math.floor(Math.random() * 9000000 + 1000000);
            const payment = {
                status: 'paid',
                method: payMethod,
                amount: req.quote.price,
                currency: req.quote.currency,
                paidAt: new Date().toISOString(),
                transactionRef: txnRef
            };

            this.updateRequest(requestId, { status: 'confirmed', payment });

            // Refresh portal
            this.loadPatientPortal(requestId);

            if (window.EL_ZAHRA_ADMIN) {
                window.EL_ZAHRA_ADMIN.renderMedicalRequests();
                window.EL_ZAHRA_ADMIN.renderStats();
            }

            if (btn) { btn.disabled = false; btn.textContent = 'تأكيد الدفع 💳'; }
        }, 2500);
    },

    // ─────────────────────────────────────────────────────────────
    //  PAYMENT METHOD UI SWITCH
    // ─────────────────────────────────────────────────────────────
    onPayMethodChange: function () {
        const method  = document.getElementById('pp-pay-method').value;
        const country = document.getElementById('pp-pay-country').value;
        const cardSection = document.getElementById('pp-card-fields');

        const cardMethods = ['cib', 'edahabia', 'visa', 'mastercard'];
        if (cardSection) {
            cardSection.style.display = cardMethods.includes(method) ? 'block' : 'none';
        }

        // Show only relevant methods based on country
        const localMethods  = ['cib', 'edahabia'];
        const intlMethods   = ['visa', 'mastercard'];
        const methodSelect  = document.getElementById('pp-pay-method');
        if (!methodSelect) return;

        Array.from(methodSelect.options).forEach(opt => {
            if (country === 'dz') {
                opt.hidden = intlMethods.includes(opt.value);
            } else {
                opt.hidden = localMethods.includes(opt.value);
            }
        });
    },

    // ─────────────────────────────────────────────────────────────
    //  ADMIN — RENDER MEDICAL REQUESTS TABLE
    // ─────────────────────────────────────────────────────────────
    renderAdminMedicalRequests: function () {
        const requests = this.getRequests();
        const tbody = document.getElementById('admin-medical-requests-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (requests.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:40px;">لا توجد طلبات علاج بعد.</td></tr>`;
            return;
        }

        requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        requests.forEach(req => {
            const statusInfo = this.statuses[req.status] || this.statuses.pending;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong style="color:var(--primary);">${req.id}</strong><br><span style="font-size:0.7rem;color:var(--text-muted);">${req.patientRef}</span></td>
                <td>
                    <strong>${req.patient.fullName}</strong><br>
                    <span style="font-size:0.75rem;color:var(--text-muted);">${req.patient.age} سنة • ${req.patient.gender === 'female' ? '♀ أنثى' : '♂ ذكر'}</span><br>
                    <span style="font-size:0.75rem;color:var(--text-muted);">${req.patient.country}</span>
                </td>
                <td style="font-size:0.8rem;">${this.getTreatmentLabel(req.medical.treatmentType)}</td>
                <td>
                    <span style="font-size:0.75rem;">${req.patient.whatsapp}</span><br>
                    <span style="font-size:0.75rem;color:var(--text-muted);">${req.patient.email}</span>
                </td>
                <td>
                    <span class="mr-status-badge" style="background:${statusInfo.color}22;color:${statusInfo.color};border:1px solid ${statusInfo.color}44;border-radius:20px;padding:4px 10px;font-size:0.75rem;font-weight:700;white-space:nowrap;">
                        ${statusInfo.icon} ${statusInfo.ar}
                    </span>
                </td>
                <td style="font-size:0.75rem;">${req.quote ? `<strong style="color:#10B981;">${Number(req.quote.price).toLocaleString()} ${req.quote.currency}</strong>` : '<span style="color:var(--text-muted);">لم يُعدّ</span>'}</td>
                <td style="font-size:0.75rem;">${req.payment?.status === 'paid' ? `<span style="color:#10B981;">✅ مدفوع</span><br><span style="font-size:0.7rem;color:var(--text-muted);">${req.payment.transactionRef}</span>` : '<span style="color:var(--text-muted);">—</span>'}</td>
                <td>
                    <div class="admin-action-btns" style="flex-wrap:wrap;gap:4px;">
                        <button class="admin-mini-btn" style="background:#3B82F6;" onclick="window.EL_ZAHRA_MEDICAL.openAdminRequestModal('${req.id}')">
                            📋 إدارة
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    },

    // ─────────────────────────────────────────────────────────────
    //  ADMIN — OPEN REQUEST DETAIL MODAL
    // ─────────────────────────────────────────────────────────────
    openAdminRequestModal: function (id) {
        const req = this.getRequestById(id);
        if (!req) return;

        const modal = document.getElementById('admin-request-modal');
        if (!modal) return;

        // Fill modal fields
        document.getElementById('arm-id').textContent        = req.id;
        document.getElementById('arm-patref').textContent   = req.patientRef;
        document.getElementById('arm-name').textContent     = req.patient.fullName;
        document.getElementById('arm-age').textContent      = req.patient.age + ' سنة';
        document.getElementById('arm-gender').textContent   = req.patient.gender === 'female' ? '♀ أنثى' : '♂ ذكر';
        document.getElementById('arm-country').textContent  = req.patient.country;
        document.getElementById('arm-whatsapp').textContent = req.patient.whatsapp;
        document.getElementById('arm-email').textContent    = req.patient.email;
        document.getElementById('arm-treatment').textContent = this.getTreatmentLabel(req.medical.treatmentType);
        document.getElementById('arm-symptoms').textContent = req.medical.symptoms;
        document.getElementById('arm-history').textContent  = req.medical.history;
        document.getElementById('arm-prev-treat').textContent = req.medical.previousTreatments || '—';
        document.getElementById('arm-duration').textContent = req.medical.problemDuration;
        document.getElementById('arm-created').textContent  = new Date(req.createdAt).toLocaleString('ar-DZ');

        // Status select
        document.getElementById('arm-status-select').value = req.status;

        // Render documents in Admin Modal
        const docsListEl = document.getElementById('arm-documents-list');
        if (docsListEl) {
            docsListEl.innerHTML = '';
            if (req.documents && req.documents.length > 0) {
                req.documents.forEach(doc => {
                    const ext = doc.name.split('.').pop().toUpperCase();
                    const icon = ['PDF'].includes(ext) ? '📄' : ['JPG','PNG','JPEG'].includes(ext) ? '🖼️' : '📎';
                    const docItem = document.createElement('div');
                    docItem.className = 'mr-file-item';
                    docItem.style.width = 'calc(50% - 6px)';
                    docItem.style.minWidth = '220px';
                    docItem.innerHTML = `
                        <span class="mr-file-icon">${icon}</span>
                        <div style="flex:1;overflow:hidden;text-align:start;">
                            <span class="mr-file-name" style="display:block;font-weight:700;font-size:0.8rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;margin:0;" title="${doc.name}">${doc.name}</span>
                            <span class="mr-file-size" style="font-size:0.7rem;color:var(--text-muted);display:block;margin:0;">${(doc.size / 1024).toFixed(0)} KB</span>
                        </div>
                        <a href="javascript:void(0)" onclick="alert('🔒 نظام حماية البيانات الطبية: تم فك تشفير الملف ${doc.name} وعرضه بنجاح')" style="background:var(--primary);color:white;padding:4px 10px;border-radius:var(--radius-sm);font-size:0.7rem;text-decoration:none;font-weight:700;">👁️ عرض</a>
                    `;
                    docsListEl.appendChild(docItem);
                });
            } else {
                docsListEl.innerHTML = `<span style="color:var(--text-muted);font-size:0.85rem;padding:10px 0;">لم يتم رفع أي وثائق طبية مع هذا الطلب.</span>`;
            }
        }

        // Admin notes
        document.getElementById('arm-notes').value = req.adminNotes || '';

        // Quote fields
        if (req.quote) {
            document.getElementById('arm-q-treatment').value   = req.quote.recommendedTreatment;
            document.getElementById('arm-q-medications').value = req.quote.medications || '';
            document.getElementById('arm-q-sessions').value    = req.quote.sessions;
            document.getElementById('arm-q-consult').value     = req.quote.consultations;
            document.getElementById('arm-q-duration').value    = req.quote.duration;
            document.getElementById('arm-q-price').value       = req.quote.price;
            document.getElementById('arm-q-currency').value    = req.quote.currency;
            document.getElementById('arm-q-notes').value       = req.quote.notes || '';
        } else {
            document.getElementById('arm-q-treatment').value   = '';
            document.getElementById('arm-q-medications').value = '';
            document.getElementById('arm-q-sessions').value    = 1;
            document.getElementById('arm-q-consult').value     = 1;
            document.getElementById('arm-q-duration').value    = '';
            document.getElementById('arm-q-price').value       = '';
            document.getElementById('arm-q-currency').value    = 'DZD';
            document.getElementById('arm-q-notes').value       = '';
        }

        // Store ID for save
        modal.dataset.requestId = id;
        modal.classList.add('active');
    },

    saveAdminRequestChanges: function () {
        const modal = document.getElementById('admin-request-modal');
        if (!modal) return;
        const id = modal.dataset.requestId;

        const newStatus = document.getElementById('arm-status-select').value;
        const notes     = document.getElementById('arm-notes').value;

        const qTreatment = document.getElementById('arm-q-treatment').value.trim();
        const qPrice     = parseFloat(document.getElementById('arm-q-price').value);

        let updates = { status: newStatus, adminNotes: notes };

        if (qTreatment && !isNaN(qPrice)) {
            updates.quote = {
                recommendedTreatment: qTreatment,
                medications: document.getElementById('arm-q-medications').value.trim(),
                sessions:    parseInt(document.getElementById('arm-q-sessions').value),
                consultations: parseInt(document.getElementById('arm-q-consult').value),
                duration:    document.getElementById('arm-q-duration').value.trim(),
                price:       qPrice,
                currency:    document.getElementById('arm-q-currency').value,
                notes:       document.getElementById('arm-q-notes').value.trim(),
                generatedAt: new Date().toISOString()
            };
            // Auto-set status to quote_sent if quote is generated and status is still analyzing/accepted
            if (['analyzing', 'accepted', 'pending'].includes(newStatus)) {
                updates.status = 'quote_sent';
                document.getElementById('arm-status-select').value = 'quote_sent';
            }
        }

        this.updateRequest(id, updates);
        this.renderAdminMedicalRequests();
        this.closeAdminRequestModal();

        // Show WhatsApp notification simulation
        const req = this.getRequestById(id);
        if (req && ['quote_sent', 'payment_pending'].includes(updates.status)) {
            this.simulateWhatsAppNotification(req);
        }
    },

    closeAdminRequestModal: function () {
        const modal = document.getElementById('admin-request-modal');
        if (modal) modal.classList.remove('active');
    },

    // ─────────────────────────────────────────────────────────────
    //  WHATSAPP NOTIFICATION SIMULATION
    // ─────────────────────────────────────────────────────────────
    simulateWhatsAppNotification: function (req) {
        if (!req.quote) return;
        const msg = encodeURIComponent(
            `🏥 عيادة الزهراء — إشعار طبي\n\nمرحباً ${req.patient.fullName}،\n\nتم إعداد ديفز علاجي خاص بك:\n\n` +
            `📋 العلاج: ${req.quote.recommendedTreatment}\n` +
            `💰 التكلفة الإجمالية: ${Number(req.quote.price).toLocaleString()} ${req.quote.currency}\n` +
            `⏱ المدة: ${req.quote.duration}\n` +
            `📅 الجلسات: ${req.quote.sessions} جلسة، ${req.quote.consultations} استشارة\n\n` +
            `للدفع وتأكيد العلاج، يرجى تسجيل الدخول إلى بوابة المريض على موقعنا.\n` +
            `مرجعك: ${req.id}\n\nعيادة الزهراء — باتنة 📞 0665666960`
        );
        const waUrl = `https://wa.me/${req.patient.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`;

        // Show notification preview in UI
        const notifEl = document.getElementById('arm-wa-notification');
        if (notifEl) {
            notifEl.style.display = 'block';
            notifEl.querySelector('.arm-wa-link').href = waUrl;
        }
    },

    // ─────────────────────────────────────────────────────────────
    //  DOWNLOAD QUOTE AS TEXT (simulated PDF)
    // ─────────────────────────────────────────────────────────────
    downloadQuote: function (requestId) {
        const req = this.getRequestById(requestId);
        if (!req || !req.quote) return;

        const content = `
CLINIQUE EL-ZAHRA — DEVIS MÉDICAL
===================================
Date: ${new Date().toLocaleDateString('fr-DZ')}
Référence Dossier: ${req.id}
Référence Patient: ${req.patientRef}

INFORMATIONS PATIENT
-----------------------------------
Nom: ${req.patient.fullName}
Âge: ${req.patient.age} ans
Pays: ${req.patient.country}
WhatsApp: ${req.patient.whatsapp}
Email: ${req.patient.email}

TRAITEMENT RECOMMANDÉ
-----------------------------------
Type de traitement: ${this.getTreatmentLabel(req.medical.treatmentType)}
Traitement proposé: ${req.quote.recommendedTreatment}
Médicaments: ${req.quote.medications || 'N/A'}
Nombre de séances: ${req.quote.sessions}
Nombre de consultations: ${req.quote.consultations}
Durée estimée: ${req.quote.duration}

TARIFICATION
-----------------------------------
Coût total: ${Number(req.quote.price).toLocaleString()} ${req.quote.currency}
Notes: ${req.quote.notes || 'Aucune'}

===================================
Pour payer et confirmer votre traitement,
connectez-vous à votre espace patient sur notre site web.
Votre référence: ${req.id}

Clinique El-Zahra — Dr. Hakima Betira
Route de Tazoult, Batna, Algérie
Tél: +213 665 666 960
        `.trim();

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `devis_medical_${req.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // ─────────────────────────────────────────────────────────────
    //  HELPERS
    // ─────────────────────────────────────────────────────────────
    getTreatmentLabel: function (type) {
        const labels = {
            'female-infertility':    'العقم النسائي / Infertilité Féminine',
            'male-infertility':      'العقم الذكوري / Infertilité Masculine',
            'pcos':                  'تكيس المبايض SOPK',
            'endometriosis':         'بطانة الرحم / Endométriose',
            'recurrent-miscarriage': 'الإجهاضات المتكررة / Fausses Couches',
            'ovarian-insufficiency': 'قصور المبيض / Insuffisance Ovarienne',
            'gender-selection':      'اختيار جنس الجنين / Sélection du Sexe',
            'other':                 'أخرى / Autre'
        };
        return labels[type] || type;
    },

    portalExtraFiles: [],

    // PORTAL EXTRA UPLOADER (STEP 5)
    setupPortalExtraUploader: function() {
        const fileInput = document.getElementById('pp-extra-file-input');
        const fileStatus = document.getElementById('pp-extra-file-status');
        const preview = document.getElementById('pp-extra-file-preview');
        const submitBtn = document.getElementById('pp-extra-submit-btn');

        if (!fileInput) return;

        // Reset state
        this.portalExtraFiles = [];
        if (fileStatus) fileStatus.textContent = 'لم يتم اختيار أي ملف';
        if (preview) preview.innerHTML = '';
        if (submitBtn) submitBtn.style.display = 'none';

        fileInput.onchange = () => {
            const files = fileInput.files;
            if (files.length === 0) return;

            Array.from(files).forEach(file => {
                this.portalExtraFiles.push({ name: file.name, size: file.size, type: file.type });
                
                const item = document.createElement('div');
                item.className = 'mr-file-item';
                const ext = file.name.split('.').pop().toUpperCase();
                const icon = ['PDF'].includes(ext) ? '📄' : ['JPG','PNG','JPEG'].includes(ext) ? '🖼️' : '📎';
                item.innerHTML = `
                    <span class="mr-file-icon">${icon}</span>
                    <span class="mr-file-name" style="font-size:0.8rem;font-weight:700;">${file.name}</span>
                    <span class="mr-file-size" style="font-size:0.7rem;color:var(--text-muted);">${(file.size / 1024).toFixed(0)} KB</span>
                    <button type="button" class="mr-file-remove" onclick="this.parentElement.remove();">✕</button>
                `;
                if (preview) preview.appendChild(item);
            });

            if (fileStatus) fileStatus.textContent = `تم اختيار ${this.portalExtraFiles.length} ملف(ات)`;
            if (submitBtn) submitBtn.style.display = 'inline-block';
        };
    },

    // SAVE EXTRA DOCUMENTS FROM PATIENT PORTAL (STEP 5)
    uploadExtraDocumentsPortal: function() {
        const portalView = document.getElementById('patient-portal-view');
        const requestId  = portalView ? portalView.dataset.requestId : null;
        if (!requestId) return;

        const req = this.getRequestById(requestId);
        if (!req) return;

        const submitBtn = document.getElementById('pp-extra-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="mr-spinner"></span> جاري الرفع...';
        }

        setTimeout(() => {
            const currentDocs = req.documents || [];
            const updatedDocs = [...currentDocs, ...this.portalExtraFiles];

            this.updateRequest(requestId, { documents: updatedDocs });

            // Audit logging
            if (window.EL_ZAHRA_ADMIN) {
                window.EL_ZAHRA_ADMIN.logAction("Téléversement Patient", `Patient ${req.patient.fullName} a envoyé ${this.portalExtraFiles.length} document(s) supplémentaire(s) pour le dossier ${requestId}.`);
            }

            alert('🎉 تم رفع الوثائق الطبية الإضافية وتحديث ملفك الطبي بنجاح!');

            this.loadPatientPortal(requestId);

            if (window.EL_ZAHRA_ADMIN && window.EL_ZAHRA_ADMIN.isLoggedIn) {
                window.EL_ZAHRA_ADMIN.renderMedicalRequests();
            }
        }, 1500);
    },

    setupEventListeners: function () {
        // Pay method change
        const payMethod  = document.getElementById('pp-pay-method');
        const payCountry = document.getElementById('pp-pay-country');
        if (payMethod)  payMethod.addEventListener('change',  () => this.onPayMethodChange());
        if (payCountry) payCountry.addEventListener('change', () => this.onPayMethodChange());

        // Close modals on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'portal-login-modal')     e.target.classList.remove('active');
            if (e.target.id === 'admin-request-modal')    e.target.classList.remove('active');
            if (e.target.id === 'mr-success-overlay')     e.target.classList.remove('active');
        });
    }
};
