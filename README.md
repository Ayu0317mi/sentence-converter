# Sentence Converter App

This application allows users to transform sentences into various styles, such as natural, formal, casual, and In shorts. It supports both English and Japanese sentence conversion and provides an intuitive interface for quick and efficient use.

## Features

- Convert English sentences to different styles:
  - Natural English
  - Professional English
  - Casual English
  - Shorter (concise) English
- Convert Japanese sentences to different styles:
  - Natural
  - Formal
  - Casual
  - Shorter (concise) Japanese
- Real-time result display
- Copy results to clipboard with one click
- Responsive design for mobile and desktop devices

## Technologies Used

- [Next.js](https://nextjs.org): A React framework for building server-side rendered and static web applications.
- [React](https://reactjs.org): A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org): A superset of JavaScript that adds static types.
- Tailwind CSS: For styling the application with utility-first CSS.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm, yarn, or pnpm (package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sentence-converter-app.git
   cd sentence-converter-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the app.

### Building for Production

Build the application for production:

```bash
npm run build
```

Run the production build:

```bash
npm start
```

### Testing

To run tests:

```bash
npm test
```

## File Structure

- `app/`
  - `page.tsx`: Main English sentence converter.
  - `japanese/page.tsx`: Japanese sentence converter.
- `components/ui/`: Reusable UI components such as buttons and cards.
- `actions/`: Logic for sentence conversion (both client and server-side).

## API Integration

The app uses server-side functions to handle sentence conversion. These functions are located in the `actions/` folder and communicate with the backend APIs to process input and return results.

## Deployment

The easiest way to deploy the application is via [Vercel](https://vercel.com). Follow these steps:

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com) and import the repository.
3. Set up environment variables if needed.
4. Click "Deploy" to launch your app.

For more details, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs): Comprehensive guide to Next.js features.
- [React Documentation](https://reactjs.org/docs/getting-started.html): Learn the basics of React.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs): Explore utility-first styling with Tailwind CSS.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

