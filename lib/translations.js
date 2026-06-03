export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      doctors: 'Médecins',
      contact: 'Contact',
      payment: 'Paiement',
      language: 'Langue'
    },

    // Hero Section
    hero: {
      title: 'Bienvenue à la Clinique El-Zahra',
      subtitle: 'Votre santé est notre priorité',
      description: 'Centre médical moderne offrant des services de santé de qualité supérieure',
      cta: 'Prendre un rendez-vous'
    },

    // Services
    services: {
      title: 'Nos Services',
      consultation: 'Consultation Médicale',
      emergency: 'Urgences 24/7',
      laboratory: 'Laboratoire',
      imaging: 'Imagerie Médicale',
      pharmacy: 'Pharmacie',
      surgery: 'Chirurgie'
    },

    // Doctors
    doctors: {
      title: 'Notre Équipe Médicale',
      specialty: 'Spécialité',
      experience: 'ans d\'expérience'
    },

    // Contact
    contact: {
      title: 'Nous Contacter',
      address: 'Adresse',
      phone: 'Téléphone',
      email: 'Email',
      hours: 'Heures d\'ouverture',
      message: 'Message'
    },

    // Payment
    payment: {
      title: 'Paiement Sécurisé',
      subtitle: 'Effectuez votre paiement de manière sécurisée',
      amount: 'Montant à payer',
      currency: 'Devise',
      email: 'Email',
      cardNumber: 'Numéro de carte',
      expiry: 'Date d\'expiration',
      cvc: 'CVC',
      pay: 'Payer',
      processing: 'Traitement en cours...',
      success: 'Paiement réussi!',
      error: 'Erreur',
      transactionId: 'ID de transaction',
      backHome: 'Retour à l\'accueil'
    },

    // Footer
    footer: {
      companyName: 'Clinique El-Zahra',
      description: 'Centre médical moderne à Batna',
      quickLinks: 'Liens rapides',
      followUs: 'Suivez-nous',
      rights: '© 2026 Clinique El-Zahra. Tous droits réservés.'
    },

    // Common
    common: {
      yes: 'Oui',
      no: 'Non',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      submit: 'Soumettre',
      close: 'Fermer',
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      success: 'Succès'
    }
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      doctors: 'Doctors',
      contact: 'Contact',
      payment: 'Payment',
      language: 'Language'
    },

    // Hero Section
    hero: {
      title: 'Welcome to El-Zahra Clinic',
      subtitle: 'Your health is our priority',
      description: 'Modern medical center offering high-quality healthcare services',
      cta: 'Book an Appointment'
    },

    // Services
    services: {
      title: 'Our Services',
      consultation: 'Medical Consultation',
      emergency: 'Emergency 24/7',
      laboratory: 'Laboratory',
      imaging: 'Medical Imaging',
      pharmacy: 'Pharmacy',
      surgery: 'Surgery'
    },

    // Doctors
    doctors: {
      title: 'Our Medical Team',
      specialty: 'Specialty',
      experience: 'years of experience'
    },

    // Contact
    contact: {
      title: 'Contact Us',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Opening Hours',
      message: 'Message'
    },

    // Payment
    payment: {
      title: 'Secure Payment',
      subtitle: 'Make your payment securely',
      amount: 'Amount to pay',
      currency: 'Currency',
      email: 'Email',
      cardNumber: 'Card Number',
      expiry: 'Expiration Date',
      cvc: 'CVC',
      pay: 'Pay',
      processing: 'Processing...',
      success: 'Payment Successful!',
      error: 'Error',
      transactionId: 'Transaction ID',
      backHome: 'Back to Home'
    },

    // Footer
    footer: {
      companyName: 'El-Zahra Clinic',
      description: 'Modern medical center in Batna',
      quickLinks: 'Quick Links',
      followUs: 'Follow Us',
      rights: '© 2026 El-Zahra Clinic. All rights reserved.'
    },

    // Common
    common: {
      yes: 'Yes',
      no: 'No',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      submit: 'Submit',
      close: 'Close',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success'
    }
  }
};

export const getTranslation = (lang, key) => {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const supportedLanguages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];
