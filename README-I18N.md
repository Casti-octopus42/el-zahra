# 🌍 Multilingue - Support Arabe, Français & Anglais

Documentation pour le support multilingue (AR/FR/EN) du site El-Zahra Clinic.

## 📋 Langues supportées

- 🇩🇿 **العربية** (Arabe) - code: `ar` - RTL
- 🇫🇷 **Français** (French) - code: `fr` - LTR
- 🇬🇧 **English** (Anglais) - code: `en` - LTR

## 🎯 Structure des traductions

Les traductions sont organisées dans `lib/translations.js`:

```javascript
{
  nav: {},          // Navigation
  hero: {},         // Section héro
  services: {},     // Services
  doctors: {},      // Médecins
  contact: {},      // Contact
  payment: {},      // Paiement
  footer: {},       // Pied de page
  common: {}        // Éléments communs
}
```

## 🚀 Utilisation

### 1. Utiliser le hook useLanguage

```javascript
import { useLanguage } from '../context/LanguageContext';

export default function MyComponent() {
  const { t, language, switchLanguage, dir } = useLanguage();
  
  return (
    <div dir={dir}>
      <h1>{t('nav.home')}</h1>
      <button onClick={() => switchLanguage('ar')}>العربية</button>
      <button onClick={() => switchLanguage('fr')}>Français</button>
      <button onClick={() => switchLanguage('en')}>English</button>
    </div>
  );
}
```

### 2. Accéder aux traductions

```javascript
// Navigation
t('nav.home')      // الرئيسية / Accueil / Home

// Paiement
t('payment.amount') // المبلغ المستحق / Montant à payer / Amount to pay

// Commun
t('common.save')   // حفظ / Enregistrer / Save
```

## 🔄 RTL (Right-to-Left) Support

L'arabe est automatiquement détecté et configuré avec `dir="rtl"`:

```javascript
const { dir } = useLanguage();
<div dir={dir}>Content</div>
```

Le document HTML change également:
- `document.dir = 'rtl'` pour l'arabe
- `document.dir = 'ltr'` pour le français et l'anglais

## 💾 Persistance de la langue

La langue est sauvegardée dans `localStorage`:

```javascript
localStorage.getItem('language')  // 'ar', 'fr' ou 'en'
```

## 📱 Détection automatique

Détecte la langue du navigateur automatiquement:

```javascript
// Détection du navigateur
navigator.language  // 'ar', 'fr', 'en'
```

## 🎨 Composant LanguageSwitcher

Affiche les trois drapeaux pour changer de langue:

```jsx
<LanguageSwitcher />
// 🇩🇿 AR | 🇫🇷 FR | 🇬🇧 EN
```

## 🔧 Fichiers modifiés

| Fichier | Description |
|---------|-------------|
| `lib/translations.js` | 53 clés AR/FR/EN |
| `context/LanguageContext.js` | Contexte avec support RTL |
| `components/LanguageSwitcher.js` | Sélecteur AR/FR/EN |
| `components/Navigation.js` | Navigation multilingue |
| `components/Hero.js` | Héro multilingue |
| `components/Services.js` | Services multilingues |
| `components/Footer.js` | Pied de page multilingue |
| `components/PaymentForm.js` | Paiement multilingue |
| `pages/_app.js` | Provider global |
| `README-I18N.md` | Cette documentation |

## 🔄 Ajouter une nouvelle traduction

1. **Ouvrir** `lib/translations.js`
2. **Ajouter** la clé dans les trois sections (ar, fr, en):

```javascript
export const translations = {
  ar: {
    myCategory: {
      myKey: 'نص بالعربية'
    }
  },
  fr: {
    myCategory: {
      myKey: 'Texte en français'
    }
  },
  en: {
    myCategory: {
      myKey: 'Text in English'
    }
  }
};
```

3. **Utiliser** dans le composant:

```javascript
const { t } = useLanguage();
<p>{t('myCategory.myKey')}</p>
```

## 🧪 Test multilingue

1. Ouvrir l'application
2. Cliquer sur les sélecteurs AR/FR/EN
3. Vérifier:
   - Le contenu change
   - La direction du texte change (RTL/LTR)
   - La langue est persistée au rechargement

## 📊 Statistiques de couverture

- **Navigation**: 7 éléments
- **Hero**: 4 éléments
- **Services**: 7 éléments
- **Docteurs**: 2 éléments
- **Contact**: 6 éléments
- **Paiement**: 11 éléments
- **Pied de page**: 5 éléments
- **Commun**: 11 éléments

**Total**: 53 clés de traduction × 3 langues = 159 traductions

## 🐛 Dépannage

### Les traductions ne changent pas
- Vérifier que le composant utilise `useLanguage`
- S'assurer que le composant est dans `LanguageProvider`

### La direction RTL ne fonctionne pas
- Vérifier que `dir={dir}` est ajouté aux éléments principaux
- Vérifier que `document.dir` est mis à jour

### Texte manquant affiche la clé
- Vérifier l'orthographe dans `translations.js`
- Vérifier la présence de la clé dans les trois langues

## 🚀 Ajouter une quatrième langue

1. Ajouter à `supportedLanguages`:

```javascript
supportedLanguages = [
  { code: 'ar', name: 'العربية', flag: '🇩🇿', dir: 'rtl' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' }  // Nouveau
];
```

2. Ajouter toutes les traductions dans `translations`

## 📚 Ressources

- [MDN: International Characters](https://developer.mozilla.org/en-US/docs/Glossary/RTL)
- [React i18n Best Practices](https://react.i18next.com/)
- [Arabic Web Design](https://www.smashingmagazine.com/2010/08/designing-web-interfaces-for-the-middle-east/)

---

Créé pour **Clinique El-Zahra** 🏥
Support complet Arabe 🇩🇿 | Français 🇫🇷 | Anglais 🇬🇧
