[README.md](https://github.com/user-attachments/files/22720170/README.md)
# WildGuardian - AI-Powered Wildlife Detection

WildGuardian is an Australian wildlife-aware home security system that uses AI to detect and identify wildlife in security camera footage, providing safety recommendations for homeowners.

## Features

- **AI Wildlife Detection**: Powered by Anthropic's Claude AI to identify Australian wildlife species
- **Risk Assessment**: Categorizes wildlife by risk level (Critical, High, Medium, Low)
- **Safety Recommendations**: Provides specific advice for each detected species
- **Camera Integration**: Supports Eufy cameras with plans for Ring and Arlo
- **Interactive Demo**: Try the wildlife detection system with sample footage
- **Subscription Model**: Free tier with 3 analyses, Pro tier for unlimited access

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key (for AI wildlife detection)
- Stripe account (for payments, optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wildguardian
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your API keys:
   - Get Anthropic API key from: https://console.anthropic.com/
   - Get Stripe keys from: https://dashboard.stripe.com/apikeys

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
wildguardian/
├── pages/
│   ├── api/
│   │   ├── analyze.js          # AI wildlife detection endpoint
│   │   ├── beta-signup.js      # Beta program signup
│   │   └── create-checkout.js  # Stripe payment processing
│   ├── index.js                # Main landing page
│   ├── eufy-demo.js           # Interactive camera demo
│   ├── ai-analysis.js         # AI technology explanation
│   ├── camera-integration.js  # Camera setup guide
│   ├── wildlife-database.js   # Species information database
│   └── success.js             # Payment success page
├── styles/
│   └── globals.css            # Global styles with Tailwind
└── public/                    # Static assets
```

## API Endpoints

### POST /api/analyze
Analyzes uploaded images for wildlife detection.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "detected": "eastern brown snake",
  "confidence": 96,
  "risk": "CRITICAL",
  "advice": "Do NOT approach. Keep pets and children inside..."
}
```

### POST /api/beta-signup
Handles beta program email signups.

### POST /api/create-checkout
Creates Stripe checkout sessions for Pro subscriptions.

## Wildlife Database

The system recognizes 50+ Australian species including:

**Critical Risk:**
- Eastern Brown Snake
- Funnel Web Spider
- Taipan

**High Risk:**
- Redback Spider
- Tiger Snake
- Death Adder

**Low Risk:**
- Kangaroo
- Possum
- Blue-tongue Lizard
- Koala

## Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **AI**: Anthropic Claude 3.5 Sonnet
- **Payments**: Stripe
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Anthropic API key for AI detection | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key for payments | Optional |
| `STRIPE_PRICE_ID` | Stripe price ID for Pro subscription | Optional |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret for sessions | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@wildguardian.com or visit our help center.

## Roadmap

- [ ] Ring camera integration
- [ ] Arlo camera integration
- [ ] Mobile app
- [ ] Real-time alerts
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
