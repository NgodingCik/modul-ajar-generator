[node-js]: [https://nodejs.org/](https://nodejs.org/)
[git]: [https://git-scm.com/](https://git-scm.com/)
[repository]: [https://github.com/NgodingCik/modul-ajar-generator](https://github.com/NgodingCik/modul-ajar-generator)

# Installation Guide

Follow this guide to set up the project in your local development environment. Please ensure you complete each step carefully to ensure a successful build.

## Prerequisites

Before you begin, make sure you have the following installed:

*   **[Node.js][node-js]** v20 or higher
*   **npm** (bundled with Node.js)
*   **[Git][git]** (for cloning the repository)

## Getting Started

### 1. Clone the Repository
Open your terminal and run the following command to clone the project to your local machine:
```bash
git clone https://github.com/NgodingCik/modul-ajar-generator.git
```

### 2. Navigate to Project Directory
Change your working directory to the project folder:
```bash
cd modul-ajar-generator
```

### 3. Install Dependencies
Install the required packages using npm:
```bash
npm install
```

### 4. Environment Configuration
Create a `.env` file in the root directory and define the necessary environment variables. You can use the `.env.example` file as a reference for the required keys.
```bash
cp .env.example .env
```

### 5. Run the Application
Once the setup is complete, start the development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000` by default.

## Important Notes

*   **Security:** Never commit your `.env` file or expose your API keys publicly. Ensure sensitive information is kept out of version control.
*   **Troubleshooting:** If you encounter any issues during installation, double-check your Node.js version and ensure all dependencies were installed correctly. For further assistance, feel free to open an issue on the [official repository][repository].