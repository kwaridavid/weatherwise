# WeatherWise - Intelligent Weather Forecasting Platform

A premium, production-quality weather web application built with Next.js 15, React, TypeScript, and Tailwind CSS.

## Features

- **Smart Search**: Search any city, country, or landmark with autocomplete
- **Current Weather**: Real-time conditions with animated icons
- **Today's Plan**: AI-powered practical recommendations based on weather
- **AI Weather Summary**: Natural language weather summaries
- **Hourly Forecast**: Scrollable 24-hour timeline
- **7-Day Forecast**: Expandable weekly outlook
- **UV Index**: Color-coded risk levels with recommendations
- **Interactive Map**: Weather layers (temp, rain, clouds, wind, pressure)
- **Favorite Cities**: Save and manage favorite locations
- **Dynamic Themes**: Weather-responsive backgrounds with particles
- **Dark/Light Mode**: System-aware with manual override
- **Responsive Design**: Mobile-first, works on all devices

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- TanStack Query
- Zustand
- React Leaflet
- Recharts
- WeatherAPI.com

## Getting Started

### 1. Get API Keys

- Sign up at [WeatherAPI.com](https://www.weatherapi.com/) for a free API key
- (Optional) Get an OpenWeatherMap API key for map tiles

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy `.env.local` and add your API keys:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_weatherapi_key_here
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key_here
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
pnpm build
```

## Architecture

```
weatherwise/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main application page
│   ├── loading.tsx         # Loading skeleton
│   ├── error.tsx           # Error boundary
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── weather/            # Weather-specific components
│   ├── map/                # Map components
│   ├── animations/         # Background animations
│   ├── theme-provider.tsx  # Dark/light mode provider
│   └── query-provider.tsx  # TanStack Query provider
├── hooks/                  # Custom React hooks
├── services/               # Business logic services
├── lib/                    # Utilities and store
├── types/                  # TypeScript types
├── constants/              # App constants
└── public/                 # Static assets
```

## Design Philosophy

- **Minimal & Elegant**: Inspired by Apple Weather, Linear, Vercel, Stripe
- **Generous Whitespace**: Clean, breathable layouts
- **Smooth Animations**: Framer Motion for delightful interactions
- **Glass Morphism**: Subtle backdrop-filter effects
- **Accessibility**: Keyboard navigation, ARIA labels, color contrast

## License

MIT
