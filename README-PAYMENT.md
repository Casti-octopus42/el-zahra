# 💳 Intégration Stripe - Paiement Multi-Devises

Documentation complète pour l'intégration du paiement Stripe avec support multi-devises (DZD et USD).

## 🎯 Fonctionnalités

- ✅ Support dual-devise: **Dinar Algérien (DZD)** et **Dollar US (USD)**
- ✅ Conversion automatique entre devises
- ✅ Paiements sécurisés via Stripe
- ✅ Interface moderne et responsive
- ✅ Webhooks pour gérer les confirmations
- ✅ Traçabilité complète des transactions

## 📋 Configuration

### 1. Installation des dépendances

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js micro
```

### 2. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet:

```env
# Stripe Keys (obtenir sur https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Webhook
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# Configuration devises
NEXT_PUBLIC_DEFAULT_CURRENCY=dzd
NEXT_PUBLIC_SUPPORTED_CURRENCIES=dzd,usd
```

### 3. Configuration Stripe en production

Pour passer en production:

1. Remplacez les clés de test par les clés de production dans `.env.local`
2. Configurez votre webhook Stripe pour pointer vers: `https://votre-domaine.com/api/webhooks/stripe`
3. Activez 3D Secure pour sécuriser les paiements

## 🚀 Utilisation

### Page de paiement simple

```jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        amount={5000}
        currency="dzd"
        onSuccess={(paymentIntent) => console.log('Paiement réussi:', paymentIntent)}
        onError={(error) => console.error('Erreur:', error)}
      />
    </Elements>
  );
}
```

### Configuration des devises

Le fichier `lib/stripe-config.js` contient:

```javascript
// Configuration disponible
CURRENCY_CONFIG = {
  dzd: { name: 'Dinar Algérien', symbol: 'DA', ... },
  usd: { name: 'Dollar US', symbol: '$', ... }
}

// Utilitaires
formatAmount(5000, 'dzd')  // "5 000,00 DA"
convertCurrency(100, 'dzd', 'usd')  // Convertir DZD en USD
getCurrencyConfig('dzd')  // Obtenir la config d'une devise
```

## 💳 Flux de paiement

```
1. Client remplit le formulaire (email + infos carte)
2. Sélection de la devise (DZD ou USD)
3. Envoi au backend → API `/api/create-payment-intent`
4. Création d'un Payment Intent Stripe
5. Confirmation du paiement côté client
6. Webhook Stripe confirme le succès
7. Email de confirmation envoyé au client
```

## 🔐 Sécurité

- ✅ Clés Stripe jamais exposées côté client
- ✅ Validation des montants côté serveur
- ✅ Signature des webhooks vérifiée
- ✅ Chiffrement SSL/TLS obligatoire
- ✅ 3D Secure optionnel pour les gros montants

## 📊 Monitoring et Logs

Tous les événements sont loggés dans `pages/api/webhooks/stripe.js`:

```
✓ Payment succeeded: [ID, amount, currency]
✗ Payment failed: [ID, error details]
⊘ Payment canceled: [ID, reason]
```

## 🧪 Tests

### Cartes de test Stripe

```
Succès: 4242 4242 4242 4242
Décliné: 4000 0000 0000 0002
Authentification requise: 4000 0025 0000 3155
```

### Tester localement

1. Installer [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Lancer: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Copier le secret webhook et l'ajouter à `.env.local`

## 📱 Conversion automatique

Les taux de change se trouvent dans `lib/stripe-config.js`:

```javascript
EXCHANGE_RATES = {
  'dzd-to-usd': 0.0075,
  'usd-to-dzd': 133.33
}
```

**À mettre à jour régulièrement** pour rester à jour avec les taux du marché.

## 🔧 Intégration avec la base de données

Dans `pages/api/webhooks/stripe.js`, décommenter et adapter:

```javascript
// Exemple pour sauvegarder les transactions
await saveTransaction({
  stripeId: paymentIntent.id,
  amount: paymentIntent.amount,
  currency: paymentIntent.currency,
  status: 'succeeded',
  customerEmail: paymentIntent.receipt_email,
  metadata: paymentIntent.metadata
});
```

## 📧 Emails de confirmation

À ajouter dans `pages/api/webhooks/stripe.js`:

```javascript
// Envoyer un email après paiement réussi
await sendConfirmationEmail({
  to: paymentIntent.receipt_email,
  subject: 'Paiement reçu - Clinique El-Zahra',
  template: 'payment-confirmation'
});
```

## 🐛 Dépannage

### Erreur: "Stripe is not loaded"
- Vérifier que `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` est définie
- Vérifier la clé n'est pas erronée

### Erreur: "Webhook signature verification failed"
- Vérifier que `STRIPE_WEBHOOK_SECRET` est correct
- Vérifier que le webhook est bien configuré dans le dashboard Stripe

### Paiement décliné
- Utiliser les cartes de test Stripe pour le debugging
- Vérifier les logs Stripe pour plus de détails

## 📚 Ressources

- [Documentation Stripe](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [React Stripe Elements](https://stripe.com/docs/stripe-js/react)
- [Webhooks Stripe](https://stripe.com/docs/webhooks)

## 📝 Fichiers créés

```
.env.local                          # Variables d'environnement
lib/stripe-config.js                # Configuration des devises
pages/api/create-payment-intent.js  # Créer un Payment Intent
pages/api/webhooks/stripe.js        # Gérer les événements Stripe
components/PaymentForm.js           # Formulaire de paiement
components/PaymentForm.module.css   # Styles du formulaire
pages/payment.js                    # Page de paiement complète
README-PAYMENT.md                   # Cette documentation
```

---

**Créé pour la Clinique El-Zahra** 🏥
Support multi-devises avec Stripe & Eldhahabia
