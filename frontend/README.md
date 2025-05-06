# Project Setup Instructions

## 1. Set up the environment file

Ensure you have a `.env` file with the following line:

```
NEXT_PUBLIC_BACKEND_URL=your_backend_url_here
```

---

## 2. Install dependencies

Run the following command in your terminal:

```bash
npm install
```

If it fails, try:

```bash
npm i --legacy-peer-deps
```

---

## 3. Build and start the project (Production Mode) [Recommended]

### Step 1: Build the project

```bash
npm run build
```

### Step 2: Start the project

```bash
npm start
```

By default, the application runs at [http://localhost:3000](http://localhost:3000).

### 👉 Run on a different port (Production Mode)

Set the `PORT` environment variable before starting:

```bash
npm run start -- -p 4000
```

Replace `4000` with your desired port.

---

## 4. Run in development mode

Start the development server:

```bash
npm run dev
```

Then open your browser and navigate to:  
[http://localhost:3000](http://localhost:3000)

### 👉 Run on a different port (Development Mode)

Use the following command:

```bash
npm run dev -- -p 4000
```

Replace `4000` with your preferred port number.

---

✅ Your project should now be running successfully!