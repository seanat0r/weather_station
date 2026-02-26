# Weather Station Projects

This is the frontend portion of the Weather Station Project. It provides a clean, responsive interface to visualize real-time weather data and historical trends. This is part 2/3.

## Table of Contents

1. [Architecture](#1-architecture)
2. [Technology Stack](#2-technology-stack)
3. [API Concept](#3-api-concept)
4. [Getting Started](#4-getting-started)
5. [Problems & Solutions](#5-problems--solutions)
6. [Lessons Learned](#6-lessons-learned)
7. [Next Steps](#7-next-steps)

---

## 1. Architecture

### Component Structure

The UI is divided into three primary modules:

* **Hero Section:** Displays the title and current status.
* **Board:** The main container holding the data displays.
* **Graph Module:** A dedicated component within the board for data visualization.

### Logic & Configuration

* **Services:** Handle frontend logic and centralized API communication.
* **Config:** A central file managing emoji icons, data interfaces, graph color schemes, and time ranges (24h, 1 Week, 1 Month).
* **Styles:** All styling is kept clean and organized within the `/css` directory.

## 2. Technology Stack

* **Framework:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Visualization:** [Recharts](https://recharts.org/)
* **Styling:** Vanilla CSS

## 3. API Concept

The frontend uses a centralized fetching module. Each function is responsible for a specific API endpoint.

* **Error Handling:** Implemented via `try-catch` blocks.
* **Resilience:** If a call fails, the function returns `null` and logs the error to the console, ensuring the UI doesn't crash.

## 4. Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ````

2. **Run development server:**

    ```bash
    npm run dev
    ````

3. **Buidl for production:**

    ````bash
    npm run build
    ````

## 5. Problems & Solutions

* **Learning Curve:** Moving from JavaScript to TypeScript and getting used to the React/Vite workflow was a challenge. TypeScript's strictness felt like a "quirk" at first, but soon became a powerful tool for catching bugs early.

* **Data Visualization:** Implementing Recharts for the first time was tricky, especially regarding responsive layouts and custom styling of the tooltips.

## 6. Lessons Learned

I gained significant experience with TypeScript and grew to appreciate its type safety. I also gained deep insights into working with charting libraries and managing complex state in React.

## 7. Next Steps

* *The core features of the project are finished.*

### Future improvements may include

* Mold Warning System: Implement a logic to warn users about potential mold risk based on humidity and temperature.
