# 🎲 Dice Roller

A beautiful, responsive virtual dice roller with comprehensive statistics tracking. Perfect for board games, RPGs, and probability experiments!

## Features

- **Multiple Dice Types**: Support for d4, d6, d8, d10, d12, d20, and d100
- **Multiple Dice Rolling**: Roll up to 10 dice at once
- **Beautiful Animations**: Smooth rolling animations with visual feedback
- **Comprehensive Statistics**:
  - Total rolls count
  - Average roll value
  - Min/Max values
  - Most common result
  - Value distribution with visual bars
  - Dice type usage breakdown
  - Recent rolls history
- **Persistent Storage**: Statistics are saved to localStorage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Attractive UI**: Modern gradient design with glassmorphism effects

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: React 19

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ismat-Samadov/dice_roller.git
cd dice_roller
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Select Dice Type**: Choose from d4, d6, d8, d10, d12, d20, or d100
2. **Set Number of Dice**: Use the slider to select 1-10 dice
3. **Roll**: Click the "Roll Dice" button to roll
4. **View Statistics**: Scroll down to see comprehensive roll statistics
5. **Clear History**: Click "Clear History" to reset all statistics

## Project Structure

```
dice_roller/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page with state management
│   ├── globals.css      # Global styles
│   └── icon.tsx         # Favicon generator
├── components/
│   ├── DiceRoller.tsx   # Dice roller component
│   └── Statistics.tsx   # Statistics display component
├── public/              # Static assets
└── ...config files
```

## Features in Detail

### Dice Display
- For single d6 rolls, the dice shows traditional dot patterns
- For all other combinations, shows the numeric total

### Statistics Tracking
- **Real-time Updates**: Statistics update immediately after each roll
- **Visual Distribution**: Bar charts show frequency of each value
- **Percentage Breakdown**: See what percentage each value represents
- **Dice Type Analytics**: Track which dice types you use most

### Local Storage
- All roll history is automatically saved to your browser
- Data persists across sessions
- Clear anytime with the "Clear History" button

## License

ISC

## Author

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
