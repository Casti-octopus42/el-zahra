/**
 * EL-ZAHRA FERTILITY CLINIC - DATABASE & TRANSLATIONS
 * Contains all static content, localized data, treatments, blog posts, e-commerce catalog, and Algerian Wilayas.
 */

window.EL_ZAHRA_DATA = {
    // 1. DICTIONNAIRE DE TRADUCTION GLOBAL
    translations: {
        ar: {
            title: "عيادة الزهراء - د. الحكيمة بتيرة",
            subtitle: "مركز طبي متقدم للخصوبة والصحة النسائية باتنة",
            // Navigation
            nav_home: "الصفحة الرئيسية",
            nav_services: "علاجاتنا",
            nav_about: "من نحن",
            nav_why: "لماذا نحن",
            nav_gallery: "العيادة",
            nav_blog: "المدونة الطبية",
            nav_faq: "الأسئلة الشائعة",
            nav_shop: "الصيدلية والمنتجات",
            nav_contact: "اتصل بنا",
            nav_admin: "لوحة التحكم",
            btn_book: "حجز موعد",
            btn_call: "اتصل الآن",
            
            // Hero
            hero_badge: "أحدث التقنيات الطبية لرعاية الخصوبة",
            hero_title: "الأمل يبدأ من هنا – حلول علمية حديثة لعلاج العقم وتأخر الإنجاب",
            hero_desc: "عيادة الزهراء تحت إشراف الدكتورة الحكيمة بتيرة، متخصصة في علاج العقم والمشاكل الهرمونية عند النساء والرجال بأحدث الطرق والوسائل الطبية والعلمية المتطورة لضمان رحلة علاج آمنة وناجحة.",
            stat_experience: "سنوات خبرة",
            stat_success: "نسبة نجاح",
            stat_patients: "حالة معالجة",
            
            // Pourquoi nous choisir
            why_title: "لماذا تختار عيادتنا؟",
            why_subtitle: "التزامنا برعايتكم يبنى على أسس علمية متينة وسرية تامة",
            why_feat_1_title: "خبرة طبية متخصصة",
            why_feat_1_desc: "تحت إشراف الدكتورة بتيرة، طبيبة أخصائية تتمتع بخبرة واسعة ومواكبة مستمرة لأحدث التطورات العالمية.",
            why_feat_2_title: "تكنولوجيا طبية حديثة",
            why_feat_2_desc: "نستخدم أحدث أجهزة الليزر الطبي والتشخيص بالموجات فوق الصوتية المتقدمة لضمان دقة النتائج.",
            why_feat_3_title: "مرافقة شخصية ونفسية",
            why_feat_3_desc: "نحن نؤمن أن الدعم النفسي والإنساني هو نصف العلاج. نرافقكم خطوة بخطوة في رحلتكم.",
            why_feat_4_title: "سرية تامة وموثوقية",
            why_feat_4_desc: "خصوصية المرضى ونتائج التحاليل محاطة بأقصى درجات الكتمان والاحترام المهني التام.",
            why_feat_5_title: "طرق علمية مدروسة",
            why_feat_5_desc: "جميع بروتوكولاتنا الطبية مبنية على دراسات وبراهين علمية معتمدة دولياً لتحقيق أفضل النتائج.",
            
            // Services
            services_title: "علاجاتنا وتخصصاتنا الطبية",
            services_subtitle: "نقدم رعاية طبية متكاملة للخصوبة، الصحة النسائية والتجميل الطبي النسائي بأحدث التقنيات",
            btn_details: "التفاصيل الطبية",
            btn_reserve: "حجز استشارة",
            service_cat_fertility: "علاج العقم وتأخر الحمل",
            service_cat_laser: "الليزر والتجميل النسائي",
            service_cat_hormone: "الهرمونات والصحة العامة",
            modal_advantages: "مزايا العلاج في عيادتنا :",
            modal_faq: "الأسئلة الشائعة حول العلاج :",
            
            // About
            about_title: "د. الحكيمة بتيرة",
            about_subtitle: "أخصائية علاج العقم و تأخر الإنجاب",
            about_desc_1: "مرحباً بكم في عيادة الزهراء. أنا الدكتورة الحكيمة بتيرة، أكرس مسيرتي المهنية لمساعدة الأزواج في تحقيق حلم الأمومة والأبوة، وتوفير رعاية صحية راقية وشاملة للمرأة في جميع مراحل حياتها.",
            about_desc_2: "نعتمد في عيادتنا بباتنة على الجمع بين الخبرة الطبية السريرية العميقة وأحدث الابتكارات التكنولوجية مثل الليزر الطبي التجميلي والعلاجات الهرمونية المخصصة، مع الحفاظ على أعلى معايير الخصوصية والأمان.",
            about_feat_1: "توجيه علمي مخصص",
            about_feat_2: "أحدث جيل ليزر طبي نسائي",
            about_feat_3: "متابعة دقيقة للأزواج",
            about_feat_4: "بيئة مريحة ودافئة",
            about_experience_text: "خبرة وتفانٍ في الخدمة",
            about_qual_title: "المؤهلات والخبرات المهنية",
            about_qual_intro: "متحصلة على العديد من الشهادات والتكوينات المتخصصة في المجال الطبي والعلاجي، من بينها:",
            about_card_diplomas_title: "🎓 الشهادات والتكوين المتخصص",
            about_qual_1: "شهادة تخصص في الطب البشري.",
            about_qual_2: "شهادة في الإيكوغرافيا (Échographie) لمتابعة الحمل والتشخيص الطبي.",
            about_qual_3: "شهادة دولية في العلاج الطبيعي وتحضير العلاجات الطبيعية الموجهة لعلاج العقم لدى النساء والرجال.",
            about_qual_4: "شهادة في الحجامة الطبية وفق الأسس العلاجية الحديثة.",
            about_qual_5: "تكوين مكثف وشهادة مع البروفيسور ندار سيتي في مجال علاج العقم.",
            about_qual_6: "شهادة في التغذية العلاجية ودورها في تحسين الصحة الإنجابية والعلاج التكميلي.",
            about_card_aesthetic_title: "✨ العناية والعلاج التجميلي والطبي للمنطقة الحساسة",
            about_aesthetic_1: "علاج جفاف المنطقة الحساسة.",
            about_aesthetic_2: "تضييق وتجديد المنطقة الحساسة بطرق علاجية آمنة.",
            about_aesthetic_3: "علاج الالتهابات المزمنة وتقرحات عنق الرحم المزمنة.",
            about_aesthetic_4: "علاج الإفرازات المهبلية المزمنة التي قد تؤثر على الراحة والصحة الزوجية.",
            about_exp_box_title: "💼 خبرة في متابعة وعلاج حالات :",
            about_exp_box_desc: "العقم النسائي والرجالي، سن اليأس المبكر، تكيس المبايض، البطانة المهاجرة، والإجهاضات المتكررة، وفق منهج علمي وعلاجي متكامل.",
            
            // Gallery
            gallery_title: "معرض صور العيادة",
            gallery_subtitle: "جولة مرئية داخل عيادتنا للتعرف على التجهيزات العصرية والأجواء المريحة والآمنة للمرضى",
            gallery_lobby: "قاعة الانتظار الفاخرة",
            gallery_office: "مكتب الفحص الطبي والموجات الصوتية",
            gallery_laser: "غرفة العلاج بالليزر الطبي الحديث",
            gallery_equip: "الأجهزة المتطورة وأدوات التشخيص الدقيق",
            
            // FAQ
            faq_title: "الأسئلة الشائعة",
            faq_subtitle: "إجابات علمية ومبسطة لأكثر الأسئلة تكراراً لمساعدتكم وتوجيهكم قبل زيارتنا",
            
            // E-Commerce / Shop
            shop_title: "الصيدلية الطبية لتعزيز الخصوبة",
            shop_subtitle: "مكملات غذائية معتمدة ومنتجات عناية خاصة بالمرأة تم اختيارها طبياً لدعم رحلتكم العلاجية",
            btn_add_cart: "إضافة إلى السلة",
            cart_title: "سلة المشتريات",
            cart_empty: "السلة فارغة حالياً.",
            cart_subtotal: "المجموع الفرعي :",
            cart_shipping: "مصاريف الشحن :",
            cart_discount: "الخصم (Coupon) :",
            cart_total: "المجموع الكلي :",
            btn_checkout: "إتمام الطلب والدفع",
            coupon_placeholder: "كود الخصم (مثال: ZAHRA2026)",
            coupon_apply: "تطبيق",
            coupon_success: "تم تطبيق خصم 15% بنجاح!",
            coupon_invalid: "كود الخصم غير صحيح.",
            price_dzd: "دج",
            price_usd: "$",
            price_eur: "€",
            stock_in: "متوفر في المخزن",
            stock_out: "غير متوفر",
            
            // Checkout Form
            checkout_title: "استمارة إتمام الطلب",
            checkout_sub: "يرجى ملء معلوماتك بدقة لضمان الشحن السريع والتواصل الآمن",
            lbl_name: "الاسم الكامل",
            lbl_phone: "رقم الهاتف والواتساب (WhatsApp)",
            lbl_age: "السن",
            lbl_wilaya: "الولاية (58 ولاية)",
            lbl_address: "العنوان بالتفصيل",
            lbl_shipping_type: "طريقة التوصيل",
            ship_office: "التوصيل لمكتب شركة الشحن بالولاية",
            ship_home: "التوصيل للمنزل مباشرة",
            lbl_pay_method: "طريقة الدفع المناسبة",
            pay_method_cod: "الدفع عند الاستلام / في العيادة",
            pay_method_ccp: "حوالة بريدية CCP / BaridiMob",
            pay_method_satim: "بطاقة ذهبية / CIB (SATIM)",
            pay_method_intl: "الدفع الدولي (Visa/Mastercard/Stripe)",
            lbl_card_num: "رقم البطاقة",
            lbl_card_date: "تاريخ انتهاء الصلاحية",
            lbl_card_cvv: "الرمز السري الخلفي CVV",
            lbl_card_holder: "اسم صاحب البطاقة",
            ccp_instructions: "الرجاء تحويل المبلغ إلى الحساب الجاري البريدي التالي للدكتورة بتيرة، وتقديم وصل التحويل في العيادة أو رفعه عبر الواتساب لتأكيد الشحن الفوري :",
            ccp_account: "رقم الحساب CCP الجاري",
            ccp_rip: "مفتاح الحساب RIP",
            ccp_copy: "نسخ",
            ccp_copied: "تم النسخ!",
            btn_pay_submit: "تأكيد الطلب والدفع",
            btn_pay_stripe: "الدفع عبر Stripe الآمن",
            pay_success_title: "تم تسجيل طلبك بنجاح!",
            pay_success_desc: "شكراً لثقتكم. تم تسجيل الطلب وسيتم الاتصال بكم هاتفياً لتأكيد الشحن فوراً. تم إصدار فاتورة الشراء الطبية الخاصة بك.",
            btn_download_invoice: "تحميل الفاتورة الطبية (PDF)",
            
            // Booking Form
            booking_title: "طلب حجز موعد طبي",
            booking_subtitle: "احجزي استشارتك الطبية بسرية وسهولة. سنقوم بالتواصل معك لتأكيد التوقيت الدقيق لموعدك.",
            lbl_motif: "سبب الاستشارة الطبية",
            lbl_date: "التاريخ المفضل للزيارة",
            lbl_time_slot: "الفترة المفضلة",
            time_morning: "الفترة الصباحية (08:00 - 12:00)",
            time_afternoon: "فترة بعد الظهر (13:00 - 17:00)",
            booking_note: "ملاحظة: طلب الحجز يخضع للتأكيد الهاتفي أو عبر WhatsApp من طرف سكرتيرة العيادة.",
            btn_booking_whatsapp: "إرسال الحجز وتأكيد عبر الواتساب 💬",
            btn_booking_direct: "تسجيل الموعد مباشرة في قاعدة البيانات 📅",
            booking_success_title: "تم تسجيل طلب الحجز!",
            booking_success_desc: "تم حفظ موعدك الطبي بنجاح. سيقوم فريق الدكتورة بتيرة بالاتصال بك هاتفياً في غضون ساعتين لتثبيت الموعد. تم إرسال رسالة التذكير SMS.",
            
            // SMS Simulator
            sms_title: "تذكير تلقائي بالموعد (SMS)",
            sms_sender: "عيادة الزهراء للخصوبة",
            sms_content_template: "مرحباً {name}، لقد تم تسجيل طلب موعدك بنجاح في عيادة الزهراء للدكتورة بتيرة في باتنة ليوم {date} ({time}). سنقوم بالاتصال بك قريباً لتثبيته. شكراً لثقتكم.",
            
            // Contact
            contact_title: "تواصلوا معنا",
            contact_subtitle: "نحن هنا للإجابة على تساؤلاتكم واستقبالكم في مقر العيادة بباتنة",
            contact_phone_title: "الهاتف والواتساب المباشر",
            contact_address_title: "عنوان العيادة الجغرافي",
            contact_address_desc: "طريق تازولت بجانب مسجد عمر بن العاص، باتنة، الجزائر",
            contact_hours_title: "أوقات العمل واستقبال المرضى",
            contact_hours_desc: "السبت - الخميس: 08:00 صباحاً - 17:00 مساءً | الجمعة: مغلق",
            contact_map_btn: "فتح في خرائط Google",
            
            // Footer
            footer_text: "المركز الطبي الرائد في الشرق الجزائري لرعاية الخصوبة، مساعدة الإنجاب وتجميل وتضييق المنطقة الحساسة بأحدث جيل من الليزر الطبي المتقدم.",
            footer_quick_links: "روابط سريعة",
            footer_all_rights: "جميع الحقوق محفوظة © عيادة الزهراء 2026. تصميم طبي راقٍ.",
            footer_admin_trigger: "بوابة الإدارة الطبية",
            
            // Admin Portal
            admin_title: "بوابة الإدارة للعيادة والمبيعات",
            admin_subtitle: "إدارة مواعيد المرضى، طلبات الأدوية، مخزون الصيدلية والإحصائيات الحيوية للعيادة",
            admin_logout: "خروج",
            admin_tab_appointments: "طلبات المواعيد الطبية ({count})",
            admin_tab_orders: "طلبات المبيعات والشحن ({count})",
            admin_tab_inventory: "مخزون المنتجات",
            admin_tab_blog: "إدارة مقالات المدونة",
            admin_stats_revenue: "إجمالي الإيرادات",
            admin_stats_booking_rate: "معدل المواعيد المقبولة",
            admin_stats_popular: "العلاج الأكثر طلباً",
            admin_btn_export: "تصدير البيانات CSV",
            admin_col_patient: "المريضة",
            admin_col_details: "التفاصيل والسن",
            admin_col_date: "التاريخ والفترة",
            admin_col_motif: "السبب الطبي",
            admin_col_status: "الحالة",
            admin_col_actions: "الإجراءات",
            admin_col_order_id: "رقم الطلب",
            admin_col_products: "المنتجات",
            admin_col_total: "الإجمالي والعملة",
            admin_col_payment: "طريقة الدفع",
            admin_col_location: "الولاية والتوصيل",
            admin_action_confirm: "تأكيد",
            admin_action_cancel: "إلغاء",
            admin_action_delete: "حذف",
            admin_status_pending: "قيد الانتظار",
            admin_status_confirmed: "مؤكد",
            admin_status_shipped: "تم الشحن",
            admin_status_delivered: "تم التسليم",
            admin_status_cancelled: "ملغي",
            
            // Blog CMS Admin
            admin_cms_title: "إضافة مقال طبي جديد (SEO)",
            admin_cms_lbl_title: "عنوان المقال",
            admin_cms_lbl_category: "التصنيف الطبي",
            admin_cms_lbl_summary: "ملخص المقال للمحركات",
            admin_cms_lbl_content: "محتوى المقال الكامل باللغة المحددة",
            admin_cms_btn_save: "نشر المقال فوراً",
            admin_cms_success: "تم نشر المقال الطبي بنجاح ودمجه في محركات البحث!",
            
            // General
            lang_toggle_label: "Français",
            dir_rtl: "rtl",
            whatsapp_welcome: "مرحباً بكِ في عيادة الزهراء الطبية 🌸 أنا المساعد الذكي للدكتورة بتيرة. كيف يمكنني مساعدتك اليوم؟",
            whatsapp_q1: "كيف يمكنني حجز موعد في العيادة؟",
            whatsapp_q2: "ما هو موقع العيادة الجغرافي والاتصال؟",
            whatsapp_q3: "ما هي أوقات العمل والأسعار العامة؟",
            whatsapp_a1: "لحجز موعد طبي فوراً، يمكنك ملء 'استمارة طلب الحجز' في أسفل الموقع وسنقوم بالتواصل معك، أو الاتصال بنا مباشرة على الأرقام: 0665666960 / 0664795367.",
            whatsapp_a2: "تقع عيادتنا في ولاية باتنة: طريق تازولت بجانب مسجد عمر بن العاص، الجزائر. يمكنك الاطلاع على الخارطة التفاعلية أسفل الصفحة.",
            whatsapp_a3: "نحن نستقبلكم من السبت إلى الخميس من 08:00 صباحاً حتى 17:00 مساءً. أسعار الاستشارات الطبية والتحاليل مدروسة وتنافسية مع توفير الخصوصية التامة لكافة الأزواج."
        },
        fr: {
            title: "Clinique El-Zahra - Dr. Hakima Betira",
            subtitle: "Centre Médical Avancé de Fertilité & Santé Féminine, Batna",
            // Navigation
            nav_home: "Accueil",
            nav_services: "Nos Traitements",
            nav_about: "À Propos",
            nav_why: "Pourquoi Nous",
            nav_gallery: "La Clinique",
            nav_blog: "Blog Médical",
            nav_faq: "FAQ",
            nav_shop: "Boutique & Fertilité",
            nav_contact: "Contact",
            nav_admin: "Administration",
            btn_book: "Prendre RDV",
            btn_call: "Appeler",
            
            // Hero
            hero_badge: "Technologies avancées au service de votre fertilité",
            hero_title: "L'espoir commence ici – Solutions scientifiques modernes pour l'infertilité",
            hero_desc: "La Clinique El-Zahra, sous la direction du Dr. Hakima Betira, est spécialisée dans le diagnostic et le traitement de l'infertilité masculine et féminine et des troubles gynécologiques, utilisant les technologies médicales les plus avancées.",
            stat_experience: "Ans d'Expertise",
            stat_success: "Taux de Réussite",
            stat_patients: "Couples Accompagnés",
            
            // Pourquoi nous choisir
            why_title: "Pourquoi nous choisir ?",
            why_subtitle: "Notre engagement repose sur la rigueur scientifique et une confidentialité absolue",
            why_feat_1_title: "Expertise spécialisée",
            why_feat_1_desc: "Sous la direction du Dr. Betira, gynécologue-obstétricienne chevronnée, formée aux dernières protocoles internationaux.",
            why_feat_2_title: "Technologie de pointe",
            why_feat_2_desc: "Équipements d'échographie 4D avancés et dernière génération de laser esthétique et thérapeutique gynécologique.",
            why_feat_3_title: "Accompagnement personnalisé",
            why_feat_3_desc: "Parce que chaque parcours est unique, nous offrons un suivi médical et un soutien psychologique chaleureux et sur mesure.",
            why_feat_4_title: "Confidentialité totale",
            why_feat_4_desc: "Vos données médicales, résultats de tests et parcours de soins sont traités dans le respect le plus strict du secret professionnel.",
            why_feat_5_title: "Approche scientifique",
            why_feat_5_desc: "Des protocoles basés uniquement sur des preuves scientifiques reconnues mondialement pour optimiser vos chances de réussite.",
            
            // Services
            services_title: "Nos Traitements Médicaux",
            services_subtitle: "Une gamme complète de soins haut de gamme dédiés à la fertilité, à la gynécologie moderne et au bien-être intime au laser.",
            btn_details: "Détails Médicaux",
            btn_reserve: "Réserver Consultation",
            service_cat_fertility: "Fertilité & PMA",
            service_cat_laser: "Laser & Bien-être Intime",
            service_cat_hormone: "Gynécologie & Hormones",
            modal_advantages: "Avantages du traitement :",
            modal_faq: "FAQ spécifiques :",
            
            // About
            about_title: "Dr. Hakima Betira",
            about_subtitle: "Spécialiste du traitement de l'infertilité et du retard de procréation",
            about_desc_1: "Bienvenue à la Clinique El-Zahra. En tant que médecin, ma vocation est de mettre la science et l'empathie au service des couples désireux de fonder une famille, et d'accompagner chaque femme avec dignité et expertise.",
            about_desc_2: "Notre clinique à Batna combine une solide expertise clinique avec les technologies médicales les plus modernes, notamment le laser intime et les thérapies hormonales ciblées, dans un cadre serein et confidentiel.",
            about_feat_1: "Orientation personnalisée",
            about_feat_2: "Laser gynécologique de pointe",
            about_feat_3: "Suivi rigoureux du couple",
            about_feat_4: "Ambiance apaisante et chaleureuse",
            about_experience_text: "Années d'expertise et de dévouement",
            about_qual_title: "Qualifications & Expérience Professionnelle",
            about_qual_intro: "Titulaire de nombreux diplômes et formations spécialisées dans le domaine médical et thérapeutique, notamment :",
            about_card_diplomas_title: "🎓 Diplômes & Formations Spécialisées",
            about_qual_1: "Diplôme de spécialisation en Médecine Générale / Humaine.",
            about_qual_2: "Certificat en Échographie pour le suivi de grossesse et le diagnostic médical.",
            about_qual_3: "Certificat international en thérapie naturelle et préparation de remèdes naturels pour le traitement de l'infertilité masculine et féminine.",
            about_qual_4: "Certificat en ventousothérapie médicale (Cupping) selon les bases thérapeutiques modernes.",
            about_qual_5: "Formation intensive et certificat avec le Professeur Nedar Setti dans le domaine du traitement de l'infertilité.",
            about_qual_6: "Certificat en nutrition thérapeutique et son rôle dans l'amélioration de la santé reproductive et les thérapies complémentaires.",
            about_card_aesthetic_title: "✨ Soins Esthétiques & Médicaux de la Zone Intime",
            about_aesthetic_1: "Traitement de la sécheresse de la zone intime.",
            about_aesthetic_2: "Resserrement et rajeunissement de la zone intime par des méthodes thérapeutiques sûres.",
            about_aesthetic_3: "Traitement des infections et ulcérations chroniques du col de l'utérus.",
            about_aesthetic_4: "Traitement des sécrétions vaginales chroniques affectant le confort et la santé du couple.",
            about_exp_box_title: "💼 Expérience dans le suivi et le traitement :",
            about_exp_box_desc: "Infertilité féminine et masculine, ménopause précoce, syndrome des ovaires polykystiques (SOPK), endométriose et fausses couches à répétition, selon une approche scientifique et thérapeutique intégrée.",
            
            // Gallery
            gallery_title: "Galerie de la Clinique",
            gallery_subtitle: "Découvrez notre établissement moderne et nos équipements à la pointe de la technologie pour votre confort.",
            gallery_lobby: "Espace d'attente premium",
            gallery_office: "Cabinet de consultation et d'échographie",
            gallery_laser: "Salle de traitement au laser médical",
            gallery_equip: "Appareillages de pointe",
            
            // FAQ
            faq_title: "Questions Fréquentes",
            faq_subtitle: "Des réponses claires et scientifiques aux questions que vous vous posez avant votre consultation.",
            
            // E-Commerce / Shop
            shop_title: "Boutique de Fertilité & Bien-être",
            shop_subtitle: "Compléments alimentaires haut de gamme et produits de soins intimes sélectionnés par nos médecins pour optimiser vos soins.",
            btn_add_cart: "Ajouter au Panier",
            cart_title: "Mon Panier",
            cart_empty: "Votre panier est vide pour le moment.",
            cart_subtotal: "Sous-total :",
            cart_shipping: "Livraison :",
            cart_discount: "Réduction (Coupon) :",
            cart_total: "Total général :",
            btn_checkout: "Valider ma Commande",
            coupon_placeholder: "Code promo (ex: ZAHRA2026)",
            coupon_apply: "Appliquer",
            coupon_success: "Réduction de 15% appliquée avec succès !",
            coupon_invalid: "Code promo invalide.",
            price_dzd: "DA",
            price_usd: "$",
            price_eur: "€",
            stock_in: "En Stock",
            stock_out: "En rupture",
            
            // Checkout Form
            checkout_title: "Formulaire de Paiement",
            checkout_sub: "Veuillez saisir vos informations avec précision pour un acheminement rapide et sécurisé.",
            lbl_name: "Nom complet",
            lbl_phone: "Numéro de téléphone / WhatsApp",
            lbl_age: "Âge",
            lbl_wilaya: "Wilaya (58 Wilayas)",
            lbl_address: "Adresse détaillée",
            lbl_shipping_type: "Mode de livraison",
            ship_office: "Retrait au bureau du transporteur",
            ship_home: "Livraison à domicile",
            lbl_pay_method: "Mode de paiement",
            pay_method_cod: "Paiement au cabinet (à la livraison)",
            pay_method_ccp: "Virement CCP / BaridiMob",
            pay_method_satim: "Carte CIB / Edahabia (SATIM)",
            pay_method_intl: "Paiement international (Visa/Stripe)",
            lbl_card_num: "Numéro de carte",
            lbl_card_date: "Date d'expiration",
            lbl_card_cvv: "Code de sécurité CVV",
            lbl_card_holder: "Titulaire de la carte",
            ccp_instructions: "Veuillez effectuer le transfert sur le compte CCP suivant du Dr. Betira, et présenter le reçu à la clinique ou le téléverser par WhatsApp pour valider l'expédition :",
            ccp_account: "N° Compte CCP",
            ccp_rip: "Clé RIP",
            ccp_copy: "Copier",
            ccp_copied: "Copié !",
            btn_pay_submit: "Confirmer la commande",
            btn_pay_stripe: "Payer avec Stripe",
            pay_success_title: "Commande enregistrée avec succès !",
            pay_success_desc: "Merci pour votre confiance. Votre commande a été enregistrée. Notre équipe vous contactera par téléphone pour confirmer l'expédition. Votre facture médicale a été générée.",
            btn_download_invoice: "Télécharger la Facture Médicale (PDF)",
            
            // Booking Form
            booking_title: "Prendre Rendez-vous",
            booking_subtitle: "Planifiez votre consultation en toute discrétion. Notre secrétaire médicale vous contactera pour valider le créneau exact.",
            lbl_motif: "Motif de consultation",
            lbl_date: "Date souhaitée",
            lbl_time_slot: "Créneau horaire souhaité",
            time_morning: "Matinée (08h00 - 12h00)",
            time_afternoon: "Après-midi (13h00 - 17h00)",
            booking_note: "Note: La demande de réservation est soumise à une confirmation téléphonique par le secrétariat.",
            btn_booking_whatsapp: "Envoyer ma demande par WhatsApp 💬",
            btn_booking_direct: "Enregistrer directement en clinique 📅",
            booking_success_title: "Demande de rendez-vous reçue !",
            booking_success_desc: "Votre demande a été enregistrée. Le secrétariat du Dr. Betira vous appellera sous 2 heures pour confirmer l'heure exacte. Le rappel SMS a été généré.",
            
            // SMS Simulator
            sms_title: "Rappel SMS automatique",
            sms_sender: "El-Zahra Fertility",
            sms_content_template: "Bonjour {name}, votre demande de RDV a ete enregistree avec succes à la Clinique El-Zahra du Dr. Betira (Batna) pour le {date} ({time}). Nous vous appellerons sous peu pour validation. Merci.",
            
            // Contact
            contact_title: "Contactez-nous",
            contact_subtitle: "Nous sommes à votre disposition pour planifier votre visite ou répondre à vos questions.",
            contact_phone_title: "Téléphone & WhatsApp Direct",
            contact_address_title: "Adresse de la Clinique",
            contact_address_desc: "Route de Tazoult, à côté de la Mosquée Omar Ibn El-Ass, Batna, Algérie",
            contact_hours_title: "Horaires d'Ouverture",
            contact_hours_desc: "Samedi - Jeudi : 08h00 - 17h00 | Vendredi : Fermé",
            contact_map_btn: "Ouvrir sur Google Maps",
            
            // Footer
            footer_text: "Centre de référence dans l'Est algérien pour le traitement de l'infertilité, l'assistance médicale à la procréation et le bien-être intime laser féminin de dernière génération.",
            footer_quick_links: "Liens Rapides",
            footer_all_rights: "Tous droits réservés © Clinique El-Zahra 2026. Design Médical Premium.",
            footer_admin_trigger: "Espace Praticien",
            
            // Admin Portal
            admin_title: "Tableau de Bord Administratif",
            admin_subtitle: "Gestion des rendez-vous, suivi des ventes, stock de la boutique et statistiques cliniques.",
            admin_logout: "Déconnexion",
            admin_tab_appointments: "Mouvements Gynécologiques ({count})",
            admin_tab_orders: "Commandes de Produits ({count})",
            admin_tab_inventory: "Stock Produits",
            admin_tab_blog: "Gestion des Articles Blog",
            admin_stats_revenue: "Chiffre d'Affaires Total",
            admin_stats_booking_rate: "Taux de Validation RDV",
            admin_stats_popular: "Traitement Phare",
            admin_btn_export: "Exporter les données (CSV)",
            admin_col_patient: "Patiente",
            admin_col_details: "Détails & Âge",
            admin_col_date: "Date & Créneau",
            admin_col_motif: "Motif Gynéco",
            admin_col_status: "Statut",
            admin_col_actions: "Actions",
            admin_col_order_id: "ID Commande",
            admin_col_products: "Articles",
            admin_col_total: "Total & Devise",
            admin_col_payment: "Paiement",
            admin_col_location: "Destination / Wilaya",
            admin_action_confirm: "Confirmer",
            admin_action_cancel: "Annuler",
            admin_action_delete: "Supprimer",
            admin_status_pending: "En attente",
            admin_status_confirmed: "Confirmé",
            admin_status_shipped: "Expédié",
            admin_status_delivered: "Livré",
            admin_status_cancelled: "Annulé",
            
            // Blog CMS Admin
            admin_cms_title: "Publier un nouvel article médical (SEO)",
            admin_cms_lbl_title: "Titre de l'article",
            admin_cms_lbl_category: "Catégorie médicale",
            admin_cms_lbl_summary: "Résumé court (Meta)",
            admin_cms_lbl_content: "Contenu de l'article avec balises",
            admin_cms_btn_save: "Publier l'article",
            admin_cms_success: "L'article a été publié sur le blog et indexé par Google !",
            
            // General
            lang_toggle_label: "العربية",
            dir_rtl: "ltr",
            whatsapp_welcome: "Bienvenue à la Clinique El-Zahra 🌸 Je suis l'assistant virtuel du Dr. Betira. Comment puis-je vous aider aujourd'hui ?",
            whatsapp_q1: "Comment prendre rendez-vous à la clinique ?",
            whatsapp_q2: "Où se situe la clinique exactement ?",
            whatsapp_q3: "Quels sont vos horaires et les tarifs ?",
            whatsapp_a1: "Pour prendre rendez-vous, veuillez remplir le formulaire 'Prendre Rendez-vous' en bas du site, ou appelez directement nos secrétaires au : 0665666960 / 0664795367.",
            whatsapp_a2: "Notre clinique se trouve à Batna : Route de Tazoult, à côté de la Mosquée Omar Ibn El-Ass, Algérie. Une carte interactive est disponible en bas de page.",
            whatsapp_a3: "Nous sommes ouverts du samedi au jeudi de 08h00 à 17h00. Nos tarifs sont étudiés avec soin, garantissant une discrétion absolue et un accompagnement d'excellence."
        }
    },

    // 2. LES 8 TRAITEMENTS CLINIQUES CLÉS
    services: [
        {
            id: "female-infertility",
            title: { ar: "علاج العقم عند النساء", fr: "Infertilité Féminine" },
            category: { ar: "علاج العقم وتأخر الحمل", fr: "Fertilité & PMA" },
            description: {
                ar: "تشخيص وعلاج دقيق للعوامل المسببة لتأخر الإنجاب عند المرأة باستخدام أحدث الوسائل الطبية.",
                fr: "Diagnostic précis et prise en charge globale des facteurs altérant la fertilité chez la femme."
            },
            fullDescription: {
                ar: "نقدم في عيادتنا بروتوكولات علاجية شاملة لعقم النساء تشمل تحريض الإباضة، علاج الاضطرابات الهرمونية، ومتابعة نمو البويضات بدقة متناهية عبر الموجات فوق الصوتية، بالإضافة إلى توجيه الحالات التي تستدعي التلقيح الاصطناعي أو أطفال الأنابيب.",
                fr: "Nous proposons des protocoles de diagnostic poussés pour identifier les troubles de l'ovulation, les anomalies tubaires ou utérines, suivis d'un traitement adapté : stimulation ovarienne contrôlée, monitorage échographique précis et orientation pour insémination ou FIV."
            },
            img: "assets/female_fertility.png",
            advantages: {
                ar: [
                    "متابعة دقيقة وتخصيص كامل لبروتوكول العلاج لكل مريضة.",
                    "استخدام تقنيات تصوير حديثة جداً لفحص الرحم والمبايض.",
                    "نسب نجاح عالية جداً بفضل المتابعة الهرمونية الدقيقة.",
                    "سرية تامة وأجواء مريحة جداً للمريضة وزوجها."
                ],
                fr: [
                    "Suivi personnalisé et adaptation constante des doses hormonales.",
                    "Échographie pelvienne 4D haute résolution pour l'étude folliculaire.",
                    "Taux de succès élevés grâce à un encadrement médical rigoureux.",
                    "Discrétion absolue et accompagnement psychologique de couple."
                ]
            },
            faqs: [
                {
                    q: { ar: "متى يجب على الزوجة استشارة الطبيب؟", fr: "Quand faut-il consulter pour infertilité ?" },
                    a: {
                        ar: "بعد سنة من الزواج المنتظم دون حدوث حمل، أو بعد 6 أشهر إذا كان سن الزوجة فوق 35 سنة.",
                        fr: "Après un an de rapports réguliers sans contraception, ou après 6 mois si la femme a plus de 35 ans."
                    }
                },
                {
                    q: { ar: "هل العلاجات الهرمونية تسبب زيادة الوزن؟", fr: "La stimulation ovarienne fait-elle grossir ?" },
                    a: {
                        ar: "البروتوكولات الحديثة آمنة جداً وتأثيراتها الجانبية مؤقتة وضئيلة للغاية تحت المتابعة الدقيقة.",
                        fr: "Les protocoles modernes de stimulation sont très bien dosés, les effets secondaires sont minimes et passagers."
                    }
                }
            ]
        },
        {
            id: "early-menopause",
            title: { ar: "علاج سن اليأس المبكر", fr: "Ménopause Précoce" },
            category: { ar: "الهرمونات والصحة العامة", fr: "Gynécologie & Hormones" },
            description: {
                ar: "بروتوكولات حديثة لتنشيط المبيض ومكافحة أعراض القصور المبيضي المبكر وحماية صحة المرأة.",
                fr: "Protocoles modernes de régulation hormonale et traitement de l'insuffisance ovarienne prématurée."
            },
            fullDescription: {
                ar: "سن اليأس المبكر أو قصور المبيض المبكر يستدعي تدخلاً سريعاً. نقوم بتقديم العلاج الهرموني التعويضي المناسب والمدروس لحماية العظام والقلب من الآثار الجانبية، مع استخدام طرق علمية متطورة لتحفيز خلايا المبيض المتبقية لدى النساء الراغبات في الإنجاب.",
                fr: "L'insuffisance ovarienne prématurée (IOP) nécessite une prise en charge précoce. Nous mettons en place des thérapies hormonales substitutives (THS) sur mesure pour préserver la santé cardiovasculaire et osseuse, tout en explorant les solutions pour restaurer ou pallier la fertilité."
            },
            img: "assets/hormone_therapy.png",
            advantages: {
                ar: [
                    "فحوصات معملية شاملة للهرمونات ومخزون المبيض.",
                    "علاجات تعويضية هرمونية طبيعية ومتوازنة.",
                    "الوقاية من هشاشة العظام والمشاكل القلبية المصاحبة.",
                    "دعم وتوجيه نفسي متميز للتأقلم مع التغيرات الجسدية."
                ],
                fr: [
                    "Bilan hormonal complet et évaluation de la réserve ovarienne.",
                    "Traitements hormonaux de substitution bio-identiques et sûrs.",
                    "Prévention active de l'ostéoporose et des risques cardiaques.",
                    "Prise en charge empathique pour surmonter le choc psychologique."
                ]
            },
            faqs: [
                {
                    q: { ar: "هل يمكن للمصابة بسن اليأس المبكر الحمل؟", fr: "Peut-on tomber enceinte en cas d'IOP ?" },
                    a: {
                        ar: "نعم، هناك حالات يتم فيها تنشيط المبيض بنجاح بالطرق الحديثة وحدوث حمل بإذن الله.",
                        fr: "Bien que difficile, une grossesse spontanée reste possible dans 5 à 10% des cas grâce aux thérapies de stimulation."
                    }
                }
            ]
        },
        {
            id: "male-infertility",
            title: { ar: "علاج العقم الرجالي", fr: "Infertilité Masculine" },
            category: { ar: "علاج العقم وتأخر الحمل", fr: "Fertilité & PMA" },
            description: {
                ar: "تشخيص متكامل لتحليل السائل المنوي وعلاج الاضطرابات التي تؤثر على جودة ونشاط النطاف.",
                fr: "Bilan complet du sperme et prise en charge des altérations quantitatives et qualitatives des spermatozoïdes."
            },
            fullDescription: {
                ar: "عقم الرجال يشكل حوالي 40% من حالات تأخر الإنجاب. توفر عيادتنا تشخيصاً دقيقاً يشمل تحليل جودة ونشاط وحركة الحيوانات المنوية، تشخيص الدوالي، علاج الالتهابات التناسلية والاضطرابات الهرمونية، بالتعاون مع أخصائيين لتوفير بروتوكول متكامل للزوجين معاً في نفس المكان.",
                fr: "L'infertilité d'origine masculine représente près de 40% des cas. Nous réalisons des spermogrammes détaillés, des bilans hormonaux et recommandons des thérapies médicamenteuses ou chirurgicales (dépistage de varicocèle) pour maximiser le potentiel de fécondation naturelle ou orienter vers l'ICSI."
            },
            img: "assets/male_fertility.png",
            advantages: {
                ar: [
                    "تشخيص مشترك للزوجين في نفس الوقت لضمان الفعالية.",
                    "توجيه دقيق ومكملات علاجية متطورة لتحسين جودة النطاف.",
                    "بروتوكولات حديثة لعلاج ضعف الحركة وتشوهات النطاف.",
                    "توجيه سريع وموثوق لأفضل مراكز أطفال الأنابيب عند الضرورة."
                ],
                fr: [
                    "Prise en charge conjointe et simultanée du couple au même endroit.",
                    "Traitements innovants à base de micronutriments et d'hormones.",
                    "Amélioration significative de la motilité et de la morphologie spermatique.",
                    "Orientation rapide et fluide vers les meilleurs centres d'ICSI en cas de besoin."
                ]
            },
            faqs: [
                {
                    q: { ar: "هل التدخين يؤثر على خصوبة الرجل؟", fr: "Le tabac nuit-il à la fertilité masculine ?" },
                    a: {
                        ar: "نعم، بشكل كبير جداً، حيث يقلل من عدد وحركة النطاف ويزيد من تشوهاتها.",
                        fr: "Oui, le tabac altère l'ADN spermatique, diminue la concentration et la mobilité des spermatozoïdes."
                    }
                }
            ]
        },
        {
            id: "pcos-treatment",
            title: { ar: "علاج تكيس المبايض", fr: "Syndrome des Ovaires Polykystiques (SOPK)" },
            category: { ar: "الهرمونات والصحة العامة", fr: "Gynécologie & Hormones" },
            description: {
                ar: "علاج فعال لمتلازمة تكيس المبايض، تنظيم الدورة الشهرية، مكافحة الأعراض وعلاج العقم المصاحب.",
                fr: "Prise en charge globale du SOPK : régulation du cycle, traitement de l'acné/hirsutisme et induction de l'ovulation."
            },
            fullDescription: {
                ar: "متلازمة تكيس المبايض (SOPK) هي السبب الأكثر شيوعاً لتأخر الحمل. بروتوكولنا يعتمد على علاج متكامل يجمع بين تعديل مقاومة الإنسولين، تنظيم الدورة الشهرية، مكافحة ظهور الشعر الزائد وحب الشباب، وتنشيط المبيض بطرق علمية آمنة لحماية المبايض من التضخم الزائد وتسهيل الحمل السريع.",
                fr: "Le SOPK est le trouble hormonal féminin le plus fréquent. Notre approche médicale vise à réduire l'insulinorésistance, équilibrer les hormones androgènes, réguler les cycles menstruels et induire une ovulation de qualité en toute sécurité pour mener à bien un projet de grossesse."
            },
            img: "assets/medical_equipment.png",
            advantages: {
                ar: [
                    "متابعة دقيقة ومستمرة لمستويات الهرمونات ومقاومة الإنسولين.",
                    "استخدام محفزات إباضة حديثة تقلل من خطر الحمل المتعدد.",
                    "نصائح غذائية مخصصة لإنقاص الوزن وتحفيز التبويض الطبيعي.",
                    "علاج متكامل للأعراض الجمالية (شعر زائد، تساقط شعر، حب شباب)."
                ],
                fr: [
                    "Bilan métabolique complet (insuline, glycémie, androgènes).",
                    "Induction d'ovulation douce sous surveillance échographique stricte.",
                    "Accompagnement diététique ciblé pour réguler naturellement le métabolisme.",
                    "Solutions esthétiques complémentaires pour l'hirsutisme et l'acné."
                ]
            },
            faqs: [
                {
                    q: { ar: "هل يزول تكيس المبايض نهائياً؟", fr: "Peut-on guérir définitivement du SOPK ?" },
                    a: {
                        ar: "التكيس حالة مزمنة، لكن يمكن السيطرة الكاملة على جميع أعراضها وحدوث الحمل بشكل طبيعي جداً.",
                        fr: "C'est une prédisposition génétique, mais les symptômes se contrôlent parfaitement et le taux de grossesse est excellent."
                    }
                }
            ]
        },
        {
            id: "endometriosis-treatment",
            title: { ar: "علاج البطانة المهاجرة", fr: "Endométriose" },
            category: { ar: "الهرمونات والصحة العامة", fr: "Gynécologie & Hormones" },
            description: {
                ar: "تشخيص دقيق لآلام الحوض وعلاج متطور للحد من انتشار بطانة الرحم المهاجرة وتأثيرها على الخصوبة.",
                fr: "Diagnostic précis des douleurs pelviennes et traitement ciblé pour stopper l'endométriose et préserver la fertilité."
            },
            fullDescription: {
                ar: "البطانة المهاجرة تسبب آلاماً شديدة وتؤثر سلباً على الحمل. نقوم بتشخيصها بدقة عبر الفحص بالرنين المغناطيسي أو الموجات الصوتية المهبلية المتقدمة، وتقديم بروتوكول علاجي يجمع بين تسكين الآلام، كبح نمو الخلايا الهرموني، وتجهيز الرحم والمبايض لحدوث الحمل بأقل الأضرار الممكنة وبسرية تامة.",
                fr: "L'endométriose altère grandement la qualité de vie et la fertilité. Nous proposons un parcours de soins complet : cartographie échographique des lésions, traitements hormonaux suppressifs de la douleur, et protocoles de stimulation douce pour contourner l'impact inflammatoire sur l'ovocyte."
            },
            img: "assets/hero_bg.png",
            advantages: {
                ar: [
                    "خبرة واسعة في تشخيص الحالات المستعصية والآلام المزمنة.",
                    "بروتوكولات دوائية متطورة للتحكم في الآلام وتراجع المرض.",
                    "خطة مخصصة لحماية الخصوبة ومخزون المبيض مبكراً.",
                    "سرية تامة وتفهم عميق لمعاناة المريضة النفسية والجسدية."
                ],
                fr: [
                    "Expertise reconnue dans la gestion des douleurs pelviennes chroniques.",
                    "Traitements hormonaux innovants pour stopper la progression des lésions.",
                    "Stratégies proactives de préservation de la réserve ovarienne.",
                    "Prise en charge humaine et écoute bienveillante de la patiente."
                ]
            },
            faqs: [
                {
                    q: { ar: "هل البطانة المهاجرة تمنع الحمل نهائياً؟", fr: "L'endométriose rend-elle stérile ?" },
                    a: {
                        ar: "لا، الكثير من المريضات يحملن بشكل طبيعي بعد العلاج المناسب والمتابعة الدقيقة.",
                        fr: "Non, de nombreuses femmes atteintes d'endométriose conçoivent naturellement ou via PMA après traitement adapté."
                    }
                }
            ]
        },
        {
            id: "recurrent-miscarriage",
            title: { ar: "علاج الإجهاضات المتكررة", fr: "Fausses Couches Répétées" },
            category: { ar: "علاج العقم وتأخر الحمل", fr: "Fertilité & PMA" },
            description: {
                ar: "فحوصات دقيقة للبحث في أسباب فقدان الجنين المتكرر وتقديم بروتوكول حماية مبكر للحمل.",
                fr: "Recherche approfondie des causes des pertes embryonnaires répétées et protocoles thérapeutiques préventifs."
            },
            fullDescription: {
                ar: "الإجهاض المتكرر يمثل عبئاً نفسياً وجسدياً كبيراً على الزوجين. نركز في عيادتنا على كشف الأسباب الدقيقة مثل التخثرات الدموية، مشاكل المناعة الذاتية، تشوهات الرحم والاضطرابات الهرمونية، وتقديم بروتوكول وقائي صارم يبدأ قبل التخطيط للحمل ويستمر طيلة الأشهر الأولى لضمان ولادة طفل سليم بإذن الله.",
                fr: "Les fausses couches à répétition exigent une enquête médicale rigoureuse (bilan de thrombophilie, immunologique, caryotypes, anatomie utérine). Nous mettons en œuvre des traitements préventifs (aspirine, héparine de bas poids moléculaire, progestérone) dès la phase préconceptionnelle pour sécuriser la grossesse."
            },
            img: "assets/miscarriage_lab.png",
            advantages: {
                ar: [
                    "تحاليل مناعية وجينية متكاملة للزوجين معاً.",
                    "متابعة دورية ولصيقة جداً في الأسابيع الأولى الحرجة من الحمل.",
                    "علاجات مميعة للدم وداعمة للمشيمة ذات جودة عالية.",
                    "مرافقة نفسية ودعم مستمر للتخفيف من القلق والتوتر."
                ],
                fr: [
                    "Bilan immunologique, chromosomique et utérin complet du couple.",
                    "Suivi ultra-rapproché et rassurant durant le premier trimestre critique.",
                    "Thérapies anticoagulantes et vasculaires de dernière génération.",
                    "Soutien psychologique permanent pour apaiser l'anxiété maternelle."
                ]
            },
            faqs: [
                {
                    q: { ar: "ما هو الإجهاض المتكرر طبياً؟", fr: "Qu'est-ce que la fausse couche répétée ?" },
                    a: {
                        ar: "هو حدوث إجهاض تلقائي متتالي لثلاث مرات أو أكثر قبل الأسبوع العشرين من الحمل.",
                        fr: "Elle est définie médicalement par la perte spontanée de 3 grossesses consécutives ou plus avant 20 semaines."
                    }
                }
            ]
        },
        {
            id: "gender-selection",
            title: { ar: "اختيار جنس الجنين بالطرق العلمية", fr: "Sélection du Sexe de l'Embryon" },
            category: { ar: "علاج العقم وتأخر الحمل", fr: "Fertilité & PMA" },
            description: {
                ar: "توجيه علمي مبني على أسس طبية دقيقة لفرز النطاف وجدولة العلاج لترجيح جنس المولود بإذن الله.",
                fr: "Orientation et méthodes scientifiques rigoureuses de tri et de timing pour optimiser le choix du sexe de l'enfant."
            },
            fullDescription: {
                ar: "نوفر لعملائنا توجيهاً علمياً متكاملاً لاختيار جنس الجنين (ذكر أو أنثى) عبر الجمع بين تحديد موعد التبويض بدقة متناهية بالسونار، تعديل حموضة المنطقة الحساسة، نظام غذائي مخصص، وتوجيه الحالات الطبية لإجراء الفرز الوراثي للأجنة PGT-A بالتعاون مع أرقى مختبرات أطفال الأنابيب لضمان دقة تصل لـ 99%.",
                fr: "Nous accompagnons les couples souhaitant équilibrer leur famille par des protocoles scientifiques éprouvés : timing précis de l'ovulation par échographie, régulation du pH vaginal, régimes nutritionnels spécifiques et orientation vers le diagnostic préimplantatoire (DPI) en laboratoire de FIV pour un résultat garanti à 99%."
            },
            img: "assets/dna_selection.png",
            advantages: {
                ar: [
                    "طرق علمية مدروسة وبعيدة عن الخرافات والوصفات التقليدية.",
                    "متابعة تبويض دقيقة بالسونار المهبلي لتحديد ساعة التلقيح.",
                    "توجيه لأحدث مختبرات التشخيص الجيني للأجنة قبل الإرجاع.",
                    "احترام تام لرغبة العائلة وبسرية مطلقة."
                ],
                fr: [
                    "Méthodes basées uniquement sur la physiologie et la science médicale.",
                    "Suivi rigoureux de l'ovulation pour un ciblage temporel précis.",
                    "Partenariat avec des laboratoires de FIV de pointe pour le DPI.",
                    "Respect total de votre choix familial et confidentialité préservée."
                ]
            },
            faqs: [
                {
                    q: { ar: "هل الطرق الطبيعية (الحمية والتوقيت) مضمونة؟", fr: "Les méthodes naturelles (régime/timing) sont-elles sûres ?" },
                    a: {
                        ar: "تزيد من الاحتمالية بنسبة 70% إلى 80%، بينما تقنية الفحص الجيني للأجنة في الحقن المجهري مضمونة بنسبة 99%.",
                        fr: "Le timing et le régime augmentent les probabilités à 70-80%, seul le DPI associé à la FIV garantit le sexe à 99%."
                    }
                }
            ]
        },
        {
            id: "laser-rejuvenation",
            title: { ar: "علاج وتضييق المنطقة الحساسة بالليزر", fr: "Laser Intime & Resserrement" },
            category: { ar: "الليزر والتجميل النسائي", fr: "Laser & Bien-être Intime" },
            description: {
                ar: "تقنية ليزر متطورة وبدون ألم لتضييق وتجديد أنسجة المهبل وعلاج سلس البول الإجهادي والترهلات.",
                fr: "Technologie laser de pointe, indolore et sans chirurgie, pour le resserrement vaginal et le traitement des fuites urinaires."
            },
            fullDescription: {
                ar: "الليزر النسائي هو ثورة في طب النساء التجميلي. نستخدم جهاز ليزر متطور جداً يعمل على تحفيز الكولاجين الطبيعي في جدار المهبل، مما يؤدي إلى تضييق فوري للأنسجة المرتخية نتيجة الولادات المتكررة، علاج جفاف المهبل في سن اليأس، وعلاج مشكلة سلس البول الإجهادي بطريقة آمنة وبدون ألم أو جراحة في عيادتنا بباتنة.",
                fr: "Le laser CO2 fractionné vaginal est une révolution indolore. Il stimule la néocollagénèse des parois vaginales, entraînant un resserrement tissulaire immédiat (post-accouchements), traite la sécheresse vaginale de la ménopause et corrige efficacement l'incontinence urinaire d'effort mineure, le tout sans chirurgie."
            },
            img: "assets/treatment_laser.png",
            advantages: {
                ar: [
                    "جلسة سريعة (15 إلى 20 دقيقة) داخل العيادة دون الحاجة لتخدير.",
                    "بدون ألم، بدون جراحة، ولا تتطلب فترة نقاهة (العودة للعمل مباشرة).",
                    "نتائج ملموسة تبدأ من الجلسة الأولى تحت إشراف طبي خبير.",
                    "أمان كامل مع تعقيم طبي صارم للملحقات والأجهزة."
                ],
                fr: [
                    "Séances rapides (15-20 minutes) en cabinet, sans aucune anesthésie.",
                    "Procédure indolore, non invasive, aucune éviction sociale requise.",
                    "Amélioration nette du confort intime dès la première séance.",
                    "Sécurité absolue avec du matériel à usage unique ou hautement stérilisé."
                ]
            },
            faqs: [
                {
                    q: { ar: "كم عدد الجلسات المطلوبة لليزر التضييق؟", fr: "Combien de séances de laser sont nécessaires ?" },
                    a: {
                        ar: "تحتاج المريضة عادة من 2 إلى 3 جلسات تفصل بينها 4 أسابيع للحصول على نتيجة مثالية ودائمة.",
                        fr: "En général, 2 à 3 séances espacées de 4 semaines suffisent pour un résultat optimal et durable."
                    }
                },
                {
                    q: { ar: "هل يمكن ممارسة الحياة الزوجية بعد الجلسة؟", fr: "Peut-on reprendre les rapports après le laser ?" },
                    a: {
                        ar: "يُفضل الامتناع عن الجماع لمدة 3 إلى 5 أيام فقط بعد الجلسة لضمان التئام وتحفيز الأنسجة.",
                        fr: "Il est recommandé de respecter un repos sexuel de 3 à 5 jours après la procédure."
                    }
                }
            ]
        }
    ],

    // 3. LA BOUTIQUE E-COMMERCE (Compléments & Soins Féminins)
    products: [
        {
            id: "fertility-women",
            title: { ar: "مكمل الخصوبة الممتاز للنساء", fr: "Fertily-Fém Premium" },
            desc: {
                ar: "تركيبة علمية متطورة غنية بحمض الفوليك، الميوفينول والمضادات الأكسدة لتعزيز جودة البويضات وتنظيم الإباضة الطبيعية.",
                fr: "Formule scientifique riche en Myo-Inositol, Acide Folique et CoQ10 pour améliorer la qualité ovocytaire et réguler les cycles."
            },
            priceBaseDZD: 6500, // 6500 DZD
            stock: 45,
            img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FFF0F2' rx='10'/><circle cx='50' cy='45' r='20' fill='%23FF8EA1'/><rect x='40' y='65' width='20' height='25' fill='%231E3A8A' rx='3'/><path d='M42 35 C42 45 58 45 58 35' stroke='%23FFF' stroke-width='3' fill='none'/></svg>"
        },
        {
            id: "fertility-men",
            title: { ar: "حقيبة دعم الخصوبة للرجال", fr: "SpermActif Pro" },
            desc: {
                ar: "مجموعة من الفيتامينات والأحماض الأمينية المركزة (L-Carnitine, Zinc) لزيادة عدد الحيوانات المنوية وتحسين حركتها ونشاطها بشكل ملحوظ.",
                fr: "Complexe puissant de L-Carnitine, Zinc et Sélénium formulé cliniquement pour stimuler le nombre et la mobilité des spermatozoïdes."
            },
            priceBaseDZD: 7200,
            stock: 30,
            img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23E0F2FE' rx='10'/><circle cx='50' cy='45' r='20' fill='%233B82F6'/><rect x='40' y='65' width='20' height='25' fill='%230B1B3D' rx='3'/><path d='M50 35 L50 55 M40 45 L60 45' stroke='%23FFF' stroke-width='4'/></svg>"
        },
        {
            id: "laser-cream",
            title: { ar: "جل العناية الملطف بعد الليزر النسائي", fr: "GynaSoothe Post-Laser" },
            desc: {
                ar: "جل طبي طبيعي معقم يحتوي على الصبار وحمض الهيالورونيك، مصمم خصيصاً لترطيب وتلطيف المنطقة الحساسة وتسريع الشفاء بعد جلسات الليزر.",
                fr: "Gel médical stérile à base d'Acide Hyaluronique et d'Aloe Vera pour apaiser, régénérer et hydrater la zone intime après le laser."
            },
            priceBaseDZD: 3800,
            stock: 50,
            img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FFFBEB' rx='10'/><path d='M50 20 C35 40 35 65 50 80 C65 65 65 40 50 20 Z' fill='%23D4AF37'/><rect x='42' y='50' width='16' height='16' fill='%23FFF' rx='2'/><path d='M50 54 L50 62 M46 58 L54 58' stroke='%23D4AF37' stroke-width='2'/></svg>"
        },
        {
            id: "prenatal-vitamins",
            title: { ar: "فيتامينات ما قبل الولادة الشاملة", fr: "BioNatal Vitamines" },
            desc: {
                ar: "حبوب متكاملة تحتوي على الحديد، حمض الفوليك النشط، واليود لتهيئة الرحم وتغذية الجنين وحمايته من التشوهات الخلقية في المراحل الأولى.",
                fr: "Complexe prénatal tout-en-un avec Acide Folique hautement assimilable, Fer et Iode pour préparer et sécuriser le début de grossesse."
            },
            priceBaseDZD: 4200,
            stock: 25,
            img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23ECFDF5' rx='10'/><circle cx='40' cy='50' r='15' fill='%2310B981'/><circle cx='60' cy='50' r='15' fill='%23FF8EA1'/><rect x='43' y='68' width='14' height='20' fill='%231E3A8A' rx='2'/></svg>"
        }
    ],

    // 4. LES 58 WILAYAS D'ALGÉRIE AVEC TARIFS DE LIVRAISON (Recommandations locales)
    // Batna (05) est gratuite, Relais point standard = 400 DA, Domicile standard = 700 DA
    wilayas: [
        { id: 1, name: { ar: "أدرار", fr: "Adrar" }, feePoint: 600, feeHome: 900 },
        { id: 2, name: { ar: "الشلف", fr: "Chlef" }, feePoint: 400, feeHome: 700 },
        { id: 3, name: { ar: "الأغواط", fr: "Laghouat" }, feePoint: 450, feeHome: 800 },
        { id: 4, name: { ar: "أم البواقي", fr: "Oum El Bouaghi" }, feePoint: 350, feeHome: 600 },
        { id: 5, name: { ar: "باتنة", fr: "Batna" }, feePoint: 0, feeHome: 0 }, // GRATUIT / Clinique
        { id: 6, name: { ar: "بجاية", fr: "Béjaïa" }, feePoint: 400, feeHome: 700 },
        { id: 7, name: { ar: "بسكرة", fr: "Biskra" }, feePoint: 300, feeHome: 550 },
        { id: 8, name: { ar: "بشار", fr: "Béchar" }, feePoint: 550, feeHome: 850 },
        { id: 9, name: { ar: "البليدة", fr: "Blida" }, feePoint: 400, feeHome: 700 },
        { id: 10, name: { ar: "البويرة", fr: "Bouira" }, feePoint: 400, feeHome: 700 },
        { id: 11, name: { ar: "تمنراست", fr: "Tamanrasset" }, feePoint: 700, feeHome: 1100 },
        { id: 12, name: { ar: "تبسة", fr: "Tébessa" }, feePoint: 350, feeHome: 600 },
        { id: 13, name: { ar: "تلمسان", fr: "Tlemcen" }, feePoint: 450, feeHome: 800 },
        { id: 14, name: { ar: "تيارت", fr: "Tiaret" }, feePoint: 400, feeHome: 700 },
        { id: 15, name: { ar: "تيزي وزو", fr: "Tizi Ouzou" }, feePoint: 400, feeHome: 700 },
        { id: 16, name: { ar: "الجزائر العاصمة", fr: "Alger" }, feePoint: 350, feeHome: 650 },
        { id: 17, name: { ar: "الجلفة", fr: "Djelfa" }, feePoint: 400, feeHome: 700 },
        { id: 18, name: { ar: "جيجل", fr: "Jijel" }, feePoint: 350, feeHome: 650 },
        { id: 19, name: { ar: "سطيف", fr: "Sétif" }, feePoint: 300, feeHome: 600 },
        { id: 20, name: { ar: "سعيدة", fr: "Saïda" }, feePoint: 450, feeHome: 750 },
        { id: 21, name: { ar: "سكيكدة", fr: "Skikda" }, feePoint: 350, feeHome: 650 },
        { id: 22, name: { ar: "سيدي بلعباس", fr: "Sidi Bel Abbès" }, feePoint: 450, feeHome: 750 },
        { id: 23, name: { ar: "عنابة", fr: "Annaba" }, feePoint: 350, feeHome: 650 },
        { id: 24, name: { ar: "قالمة", fr: "Guelma" }, feePoint: 350, feeHome: 650 },
        { id: 25, name: { ar: "قسنطينة", fr: "Constantine" }, feePoint: 300, feeHome: 600 },
        { id: 26, name: { ar: "المدية", fr: "Médéa" }, feePoint: 400, feeHome: 700 },
        { id: 27, name: { ar: "مستغانم", fr: "Mostaganem" }, feePoint: 450, feeHome: 750 },
        { id: 28, name: { ar: "المسيلة", fr: "M'Sila" }, feePoint: 350, feeHome: 600 },
        { id: 29, name: { ar: "معسكر", fr: "Mascara" }, feePoint: 450, feeHome: 750 },
        { id: 30, name: { ar: "ورقلة", fr: "Ouargla" }, feePoint: 450, feeHome: 800 },
        { id: 31, name: { ar: "وهران", fr: "Oran" }, feePoint: 400, feeHome: 700 },
        { id: 32, name: { ar: "البيض", fr: "El Bayadh" }, feePoint: 500, feeHome: 800 },
        { id: 33, name: { ar: "إليزي", fr: "Illizi" }, feePoint: 700, feeHome: 1100 },
        { id: 34, name: { ar: "برج بوعريريج", fr: "Bordj Bou Arreridj" }, feePoint: 300, feeHome: 600 },
        { id: 35, name: { ar: "بومرداس", fr: "Boumerdès" }, feePoint: 400, feeHome: 700 },
        { id: 36, name: { ar: "الطارف", fr: "El Tarf" }, feePoint: 350, feeHome: 650 },
        { id: 37, name: { ar: "تندوف", fr: "Tindouf" }, feePoint: 750, feeHome: 1200 },
        { id: 38, name: { ar: "تيسمسيلت", fr: "Tissemsilt" }, feePoint: 400, feeHome: 700 },
        { id: 39, name: { ar: "الوادي", fr: "El Oued" }, feePoint: 450, feeHome: 750 },
        { id: 40, name: { ar: "خنشلة", fr: "Khenchela" }, feePoint: 300, feeHome: 500 },
        { id: 41, name: { ar: "سوق أهراس", fr: "Souk Ahras" }, feePoint: 350, feeHome: 650 },
        { id: 42, name: { ar: "تيبازة", fr: "Tipaza" }, feePoint: 400, feeHome: 700 },
        { id: 43, name: { ar: "ميلة", fr: "Mila" }, feePoint: 300, feeHome: 600 },
        { id: 44, name: { ar: "عين الدفلى", fr: "Aïn Defla" }, feePoint: 400, feeHome: 700 },
        { id: 45, name: { ar: "النعامة", fr: "Naâma" }, feePoint: 500, feeHome: 800 },
        { id: 46, name: { ar: "عين تموشنت", fr: "Aïn Témouchent" }, feePoint: 450, feeHome: 800 },
        { id: 47, name: { ar: "غرداية", fr: "Ghardaïa" }, feePoint: 450, feeHome: 800 },
        { id: 48, name: { ar: "غليزان", fr: "Relizane" }, feePoint: 450, feeHome: 750 },
        { id: 49, name: { ar: "تيميمون", fr: "Timimoun" }, feePoint: 650, feeHome: 950 },
        { id: 50, name: { ar: "برج باجي مختار", fr: "Bordj Badji Mokhtar" }, feePoint: 800, feeHome: 1300 },
        { id: 51, name: { ar: "أولاد جلال", fr: "Ouled Djellal" }, feePoint: 350, feeHome: 600 },
        { id: 52, name: { ar: "بني عباس", fr: "Béni Abbès" }, feePoint: 650, feeHome: 950 },
        { id: 53, name: { ar: "عين صالح", fr: "In Salah" }, feePoint: 700, feeHome: 1100 },
        { id: 54, name: { ar: "عين قزام", fr: "In Guezzam" }, feePoint: 800, feeHome: 1300 },
        { id: 55, name: { ar: "تقرت", fr: "Touggourt" }, feePoint: 450, feeHome: 800 },
        { id: 56, name: { ar: "جانت", fr: "Djanet" }, feePoint: 800, feeHome: 1300 },
        { id: 57, name: { ar: "المغير", fr: "El M'Ghair" }, feePoint: 400, feeHome: 750 },
        { id: 58, name: { ar: "الميعاد", fr: "Ouled Fayed" }, feePoint: 400, feeHome: 700 }
    ],

    // 5. 5 ARTICLES DE BLOG MÉDICAUX SEO HAUTEMENT OPTIMISÉS Google Algérie
    blogPosts: [
        {
            id: "pregnancy-delay-reasons",
            title: { ar: "أسباب تأخر الحمل عند الزوجين: حقائق علمية وتوجيهات طبية", fr: "Causes du retard de grossesse : faits scientifiques et conseils médicaux" },
            category: { ar: "علاج العقم وتأخر الحمل", fr: "Fertilité & PMA" },
            date: { ar: "20 مايو 2026", fr: "20 Mai 2026" },
            readTime: { ar: "6 دقائق", fr: "6 min de lecture" },
            summary: {
                ar: "تعرف على الأسباب الشائعة لتأخر الإنجاب عند الزوجين والخطوات العلمية الأولى لبدء العلاج الناجح.",
                fr: "Découvrez les causes fréquentes du retard de conception chez l'homme et la femme et les premiers bilans à réaliser."
            },
            content: {
                ar: "يعتبر تأخر الحمل مشكلة طبية شائعة تؤثر على حوالي 15% من الأزواج في الجزائر. من الناحية الطبية، لا يمكن تشخيص تأخر الإنجاب إلا بعد مرور سنة كاملة من العلاقة الزوجية المنتظمة دون استعمال موانع.\n\nتتوزع الأسباب بالتساوي تقريباً بين الزوجين :\n1. **أسباب نسائية (40%)** : تشمل اضطرابات الإباضة وتكيس المبايض، انسداد قنوات فالوب، البطانة المهاجرة، أو اضطرابات هرمونات الحليب والغدة الدرقية.\n2. **أسباب رجالية (40%)** : تتعلق بضعف جودة أو حركة الحيوانات المنوية، قلة عددها، أو وجود دوالي الخصية.\n3. **أسباب مشتركة أو غير مفسرة (20%)** : حيث تكون التحاليل الأولية سليمة وتستدعي فحوصات أكثر عمقاً.\n\nتوصي الدكتورة بتيرة ببدء الفحوصات مبكراً وتجنب الأدوية التقليدية غير المدروسة التي قد تضر بمخزون المبيض.",
                fr: "Le retard de conception est une situation fréquente qui concerne environ 15% des couples. Médicalement, on parle d'infertilité après un an de rapports réguliers sans contraception.\n\nLes causes sont équitablement réparties :\n- **Chez la femme (40%)** : troubles de l'ovulation (SOPK), obstruction des trompes de Fallope, endométriose ou anomalies utérines.\n- **Chez l'homme (40%)** : altérations du spermogramme (nombre, mobilité, morphologie des spermatozoïdes) ou varicocèle.\n- **Origines mixtes ou inexpliquées (20%)** : nécessitant des examens immunologiques ou génétiques approfondis.\n\nLe Dr. Betira conseille d'éviter l'automédication ou les remèdes traditionnels non validés qui peuvent altérer irrémédiablement la réserve ovarienne, et de consulter un spécialiste pour établir un arbre diagnostique rigoureux."
            },
            img: "assets/clinic_lobby.png"
        },
        {
            id: "pcos-infertility-relation",
            title: { ar: "تكيس المبايض وعلاقته بالعقم: أعراض وعلاجات حديثة", fr: "SOPK et fertilité : symptômes, causes et traitements modernes" },
            category: { ar: "الهرمونات والصحة العامة", fr: "Gynécologie & Hormones" },
            date: { ar: "15 مايو 2026", fr: "15 Mai 2026" },
            readTime: { ar: "5 دقائق", fr: "5 min de lecture" },
            summary: {
                ar: "كل ما يجب معرفته عن متلازمة تكيس المبايض، كيفية تأثيرها على الحمل، وأحدث الطرق الطبية لعلاجها.",
                fr: "Tout savoir sur le SOPK, ses impacts sur l'ovulation et les solutions médicales innovantes pour tomber enceinte."
            },
            content: {
                ar: "تعد متلازمة تكيس المبايض (SOPK) اضطراباً هرمونياً شائعاً جداً يعيق الإباضة الطبيعية عند النساء. يؤدي التكيس لزيادة هرمونات الأندروجين الذكرية وتراكم بويضات صغيرة غير ناضجة في محيط المبيض.\n\n**أبرز الأعراض الطبية للتكيس:**\n- عدم انتظام الدورة الشهرية أو انقطاعها لفترات طويلة.\n- ظهور حب الشباب الزائد، تساقط شعر الرأس وظهور الشعر في مناطق غير مرغوبة.\n- صعوبة فقدان الوزن ومقاومة الإنسولين.\n\n**طرق العلاج الحديثة بعيادة الزهراء:**\nيعتمد العلاج على تنظيم هرموني متوازن، أدوية لتحسين حساسية الإنسولين (مثل الميتفورمين)، وبروتوكول دقيق لتنشيط المبيض بمتابعة السونار المهبلي لحماية المريضة من متلازمة فرط التنشيط وتسهيل الحمل بنجاح.",
                fr: "Le Syndrome des Ovaires Polykystiques (SOPK) est la première cause d'infertilité anovulatoire chez la femme. Il se caractérise par une production excessive d'androgènes qui perturbe la maturation des follicules ovariens.\n\n**Symptômes cliniques majeurs :**\n- Cycles irréguliers, clairsemés (oligoménorrhée) ou absents (aménorrhée).\n- Signes d'hyperandrogénie : acné, hirsutisme, alopécie.\n- Syndrome métabolique associé à une insulinorésistance et prise de poids.\n\n**Prise en charge moderne à la Clinique El-Zahra :**\nNotre protocole intègre la régulation de l'insulinorésistance par des mesures hygiéno-diététiques et médicamenteuses, l'utilisation d'inducteurs d'ovulation de dernière génération (létrozole) avec un monitorage échographique strict pour éviter tout risque d'hyperstimulation."
            },
            img: "assets/treatment_laser.png"
        },
        {
            id: "endometriosis-symptoms-care",
            title: { ar: "أعراض البطانة المهاجرة وكيف تؤثر على فرص الإنجاب؟", fr: "Symptômes de l'endométriose : quel impact sur la fertilité ?" },
            category: { ar: "الهرمونات والصحة العامة", fr: "Gynécologie & Hormones" },
            date: { ar: "08 مايو 2026", fr: "08 Mai 2026" },
            readTime: { ar: "7 دقائق", fr: "7 min de lecture" },
            summary: {
                ar: "دليل طبي متكامل حول البطانة المهاجرة، تشخيصها المتقدم وعلاجها لحماية الخصوبة والحد من الآلام.",
                fr: "Guide sur l'endométriose, son diagnostic par imagerie et les stratégies pour concevoir malgré la maladie."
            },
            content: {
                ar: "البطانة المهاجرة (Endométriose) هي نمو خلايا شبيهة ببطانة الرحم خارج تجويف الرحم (في المبايض أو الحوض)، مما يسبب التهابات مزمنة وتندبات تؤثر على الخصوبة.\n\n**الأعراض الرئيسية:**\n- آلام شديدة وحادة جداً أثناء الدورة الشهرية لا تستجيب للمسكنات العادية.\n- آلام مزمنة في الحوض وأثناء الجماع.\n- تأخر الحمل نتيجة التصاقات قنوات فالوب أو تراجع جودة البويضات بالمبايض.\n\n**التشخيص والعلاج في عيادتنا:**\nنقوم بتشخيص دقيق للمرض هرمونياً وبالتصوير المتقدم، ووضع خطة علاجية مخصصة تشمل مكافحة الالتهابات، العلاج الهرموني لتثبيط انتشار المرض، وتحضير المبايض والرحم لضمان حمل آمن بأقل آلام ممكنة وبسرية تامة.",
                fr: "L'endométriose se définit par la présence de tissu endométrial en dehors de la cavité utérine. Ce tissu ectopique réagit aux cycles hormonaux, créant une inflammation chronique, des adhérences pelviennes et des kystes ovariens (endométriomes).\n\n**Symptômes cardinaux :**\n- Dysménorrhée sévère (douleurs intenses durant les règles) invalidante.\n- Dyspareunie profonde (douleurs lors des rapports sexuels).\n- Infertilité par blocage mécanique (adhérences des trompes) ou par altération de la qualité ovocytaire liée au milieu inflammatoire.\n\n**Diagnostic et thérapeutique à la clinique :**\nNous réalisons un bilan échographique pelvien ciblé et orientons si besoin vers l'IRM. Le traitement associe l'antibiothérapie anti-inflammatoire, la suppression hormonale temporaire pour assécher les lésions et des protocoles de PMA sur mesure pour optimiser les chances de grossesse."
            },
            img: "assets/clinic_lobby.png"
        },
        {
            id: "modern-infertility-treatments",
            title: { ar: "طرق علاج العقم الحديثة والذكية لعام 2026", fr: "Traitements modernes de l'infertilité : les innovations de 2026" },
            category: { ar: "علاج العقم وتأخر الحمل", fr: "Fertilité & PMA" },
            date: { ar: "01 مايو 2026", fr: "01 Mai 2026" },
            readTime: { ar: "5 دقائق", fr: "5 min de lecture" },
            summary: {
                ar: "نظرة شاملة على الثورة التكنولوجية والبروتوكولات الذكية المعتمدة لعلاج العقم وتأخر الإنجاب.",
                fr: "Un tour d'horizon des protocoles de PMA intelligents et des traitements innovants pour vaincre l'infertilité."
            },
            content: {
                ar: "شهد مجال طب الخصوبة والمساعدة الطبية على الإنجاب قفزة نوعية في السنوات الأخيرة. لم تعد العلاجات تقتصر على الحقن العشوائي، بل أصبحت مخصصة بدقة عالية.\n\nتشمل التقنيات الحديثة التي نوجه ونعد المريضات لها :\n1. **تحسين بطانة الرحم بالبلازما الغنية بالصفائح (PRP)** : لتكثيف جدار الرحم الضعيف وزيادة نسب انغراس الأجنة.\n2. **فرز النطاف المتطور** : لعزل الحيوانات المنوية الأكثر نشاطاً وخلوها من التشوهات الجينية.\n3. **التشخيص الجيني المبكر للأجنة (PGT)** : لاستبعاد الأجنة الحاملة للأمراض الوراثية وتحديد الأجنة السليمة تماماً.\n\nتلتزم عيادتنا بتطبيق هذه البروتوكولات العلمية المبتكرة لتقليل فترات العلاج وزيادة نسب النجاح للأزواج.",
                fr: "La médecine de la reproduction a accompli des progrès extraordinaires ces dernières années, s'orientant vers une personnalisation extrême des traitements de l'infertilité.\n\nLes innovations majeures que nous mettons en pratique incluent :\n1. **Régénération endométriale par PRP (Plasma Riche en Plaquettes)** : pour augmenter l'épaisseur de l'endomètre et favoriser la nidation chez les patientes ayant des échecs d'implantation répétés.\n2. **Sélection spermatique avancée (MACS / Zymōt)** : pour isoler les spermatozoïdes présentant le moins de fragmentation de l'ADN.\n3. **DPI (Diagnostic Préimplantatoire)** : pour analyser génétiquement les embryons en laboratoire avant le transfert utérin afin de s'assurer de leur viabilité.\n\nNotre centre à Batna applique et prépare les couples à ces parcours technologiques d'élite pour maximiser les taux de naissances vivantes."
            },
            img: "assets/medical_equipment.png"
        },
        {
            id: "gender-selection-facts",
            title: { ar: "اختيار جنس الجنين: حقائق علمية وتفنيد الخرافات الشائعة", fr: "Sélection du sexe de l'embryon : réalités scientifiques et mythes" },
            category: { ar: "علاج العقم وتأخر الحمل", fr: "Fertilité & PMA" },
            date: { ar: "25 أبريل 2026", fr: "25 Avril 2026" },
            readTime: { ar: "6 دقائق", fr: "6 min de lecture" },
            summary: {
                ar: "قراءة نقدية علمية لطرق اختيار جنس المولود بين الحمية الغذائية، التوقيت، والفرز الجيني المضمون.",
                fr: "Analyse critique des méthodes de sélection du sexe du bébé : régimes, timing vaginal et diagnostic génétique."
            },
            content: {
                ar: "يثير موضوع اختيار جنس المولود (ذكر أو أنثى) اهتماماً واسعاً لدى العائلات في الجزائر. للأسف، تنتشر في مجتمعنا خرافات ووصفات عشبية قد تكون خطيرة على الصحة دون أي أساس علمي.\n\n**الحقائق العلمية المعتمدة:**\n- **الحمية الغذائية وتوقيت الجماع:** تعتمد على تغيير طفيف في حموضة المهبل وتركيز المعادن في البويضة لترجيح نطفة (Y أو X). تبلغ نسبة نجاحها طبياً حوالي 60-70% وليست مضمونة بشكل مطلق.\n- **فرز الأجنة وراثياً (PGT-A) مع الحقن المجهري:** هي التقنية الطبية الوحيدة المضمونة بنسبة 99%، حيث يتم فحص كروموسومات الأجنة في المختبر وإرجاع الأجنة من الجنس المرغوب والسليمة وراثياً.\n\nتساعدك الدكتورة بتيرة في فهم هذه الخيارات وتطبيق البروتوكول الأنسب لرغباتكم وبسرية تامة.",
                fr: "Le choix du sexe de l'enfant suscite un intérêt grandissant chez les couples en Algérie. Cependant, de nombreuses croyances populaires ou régimes farfelus circulent sans aucun fondement biologique.\n\n**Ce que dit la science :**\n- **Méthodes diététiques et timing du rapport :** Reposent sur la modification du pH vaginal et de la balance minérale (sodium/potassium vs calcium/magnésium) pour favoriser les spermatozoïdes X ou Y. L'efficacité scientifiquement constatée oscille entre 60% et 70%.\n- **Tri embryonnaire par Diagnostic Préimplantatoire (DPI) en FIV :** C'est l'unique méthode fiable à 99%. Elle consiste à prélever quelques cellules de l'embryon à J5 pour analyser les chromosomes sexuels (XX ou XY) avant le transfert in utero.\n\nÀ la Clinique El-Zahra, nous vous guidons objectivement parmi ces options médicales pour concevoir en toute sécurité et discrétion."
            },
            img: "assets/dna_selection.png"
        }
    ],

    // 6. LES QUESTIONS GÉNÉRALES DE LA CLINIQUE (FAQ ACCORDÉON)
    faqs: [
        {
            id: "faq-1",
            q: { ar: "هل أحتاج إلى موعد مسبق لزيارة الدكتورة بتيرة؟", fr: "Faut-il obligatoirement prendre rendez-vous ?" },
            a: {
                ar: "نعم، لتفادي الانتظار الطويل ولضمان رعاية مريحة وخصوصية تامة، نوصي بشدة بحجز موعد مسبقاً عبر الهاتف، الواتساب أو استمارة الحجز على موقعنا الإلكتروني.",
                fr: "Oui, afin de vous garantir une attente minimale, un confort optimal et de respecter la confidentialité de chaque patiente, les consultations se font uniquement sur rendez-vous."
            }
        },
        {
            id: "faq-2",
            q: { ar: "هل نتائج تحاليل الخصوبة والعلاجات سرية؟", fr: "Mes résultats de fertilité et mes soins sont-ils confidentiels ?" },
            a: {
                ar: "بكل تأكيد. نحن نطبق بروتوكولات حماية صارمة وسرية تامة على كافة الملفات الطبية للزوجين. لا يتم مشاركة أي معلومة أو نتيجة مع أي طرف خارج العيادة إطلاقاً.",
                fr: "Absolument. La confidentialité est le pilier de notre clinique. Tous les dossiers médicaux, résultats de sperme et traitements PMA sont soumis au secret médical absolu et hautement sécurisés."
            }
        },
        {
            id: "faq-3",
            q: { ar: "ما هي تكلفة جلسات ليزر تضييق المنطقة الحساسة؟", fr: "Quel est le coût du traitement laser intime ?" },
            a: {
                ar: "تختلف التكلفة حسب عدد الجلسات التي يقررها الفحص الطبي الأولي. لكن عيادتنا تقدم أسعاراً تنافسية ومدروسة للغاية مقارنة بجودة الأجهزة وسلامة التعقيم المعتمدة.",
                fr: "Le tarif dépend du nombre de séances prescrites lors de la première consultation. La clinique propose des tarifs très compétitifs, avec des facilités de paiement, tout en garantissant des technologies d'élite."
            }
        },
        {
            id: "faq-4",
            q: { ar: "كيف يتم شحن وتوصيل منتجات الخصوبة في الجزائر؟", fr: "Comment se déroule la livraison des produits en Algérie ?" },
            a: {
                ar: "نقوم بالشحن السريع لكافة الـ 58 ولاية جزائرية. التوصيل مجاني تماماً داخل ولاية باتنة (أو الاستلام من العيادة)، وبأسعار رمزية للولايات الأخرى مع خيار التوصيل للمنزل أو استلام الطلب من مكتب الشحن.",
                fr: "Nous livrons rapidement dans les 58 Wilayas d'Algérie. La livraison est gratuite à Batna (retrait en clinique possible). Pour les autres Wilayas, les frais sont calculés automatiquement avec option de livraison à domicile ou retrait en point relais."
            }
        }
    ]
};
