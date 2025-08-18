# Pesanest Frontend

Pesanest Frontend is the web client for **Pesanest**, a modern personal finance and savings platform designed to help users track expenses, set goals, and manage their money seamlessly.  
This frontend is built with **Next.js**, **TypeScript**, and **Tailwind CSS**, ensuring a fast, scalable, and responsive user experience.

---

## 🚀 Tech Stack

- **Next.js** – React framework for production-grade web apps
- **TypeScript** – Type safety and better developer experience
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Framer Motion** – Smooth animations and transitions
- **Better Auth (integration ready)** – Secure and simple authentication

---

## 📂 Project Structure

```bash
frontend/
├── public/          # Static assets (favicon, images, etc.)
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # Reusable UI components
│   ├── styles/      # Global styles
│   └── utils/       # Helper functions
├── package.json
└── tsconfig.json
````

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sifulabs/pesanest.git
cd pesanest/frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🛠 Available Scripts

* `dev` – Run development server
* `build` – Build for production
* `start` – Start production server
* `lint` – Lint codebase with ESLint

---

## 🌍 Environment Variables

Create a `.env.local` file in the root of `frontend/` and add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080  # Pesanest Backend API
NEXT_PUBLIC_APP_NAME=Pesanest
```

---

## 🤝 Contributing

Contributions are welcome!
Fork the repo, create a branch, and submit a PR.

---

## 📜 License

This project is licensed under the **MIT License**.

"# pesanest" 
