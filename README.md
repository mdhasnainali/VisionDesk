<div align="center">

# 🚀 VisionDesk

<h3>AI-Powered Workforce Surveillance and Efficiency Platform</h3>

[![Python](https://img.shields.io/badge/Python-3.10-3776AB?style=for-the-badge&logo=python&logoColor=white)]
[![Next.js](https://img.shields.io/badge/Next.js-13-000000?style=for-the-badge&logo=next-dot-js&logoColor=white)]
[![Django](https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django&logoColor=white)]
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95-009688?style=for-the-badge&logo=fastapi&logoColor=white)]

</div>

---

## 📖 Overview

VisionDesk is a comprehensive AI-driven surveillance solution tailored for manufacturing and industrial settings. Leveraging advanced pose estimation and activity recognition, our platform distinguishes between productive behaviors (e.g., typing, assembling) and non-productive actions (e.g., idling, phone usage). This empowers businesses to monitor workforce efficiency objectively and extract actionable insights for process optimization, automation, quality control, and supply chain efficiency.

## 🎯 Segment & Vision

- **Segment:** Manufacturing — Process Optimization, Automation, Quality Control, Supply Chain Efficiency
- **Team:** Machine_Mindset
- **Vision:** To deliver unbiased, real-time analytics of worker activities, enhancing productivity and safety through intelligent monitoring.

## 👥 Team Members

1. Md. Hasnain Ali
2. Md. Ahanaf Arif Khan
3. M. F. R. Siam
4. Md. Saleh Sadiq Tanim
5. Md. Tofaal Ahmed

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x
- Python >= 3.10
- Docker (optional, for containerized deployment)
- Redis server (for AI task queue)
- FFmpeg (for video processing)

### Frontend Setup

1. **Configure Environment**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env and set NEXT_PUBLIC_BACKEND_URL
    ```

2. **Install Dependencies**

   ```bash
   npm install
   # or npm install --legacy-peer-deps
   ```
3. **Development Mode**

   ```bash
   npm run dev
   ```
4. **Production Build**

   ```bash
   npm run build
   npm start
   # To specify port: npm run start -- -p 4000
   ```

### Backend Setup (Django)

1. **Create and Activate Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate   # macOS/Linux
   venv\\Scripts\\activate  # Windows
   ```
2. **Install Requirements**

   ```bash
   cd vision_desk_backend
   pip install -r requirements.txt
   ```
3. **Run Server**

   ```bash
   python manage.py runserver           # default 8000
   python manage.py runserver 0.0.0.0:9000  # custom port
   ```

### AI Backend Setup (FastAPI)

1. **Activate Virtual Environment** (if not active)
2. **Install Dependencies**

   ```bash
   cd ai-end
   pip install -r requirements.txt
   ```
3. **Install System Dependencies**

   * **FFmpeg:**

     * macOS: `brew install ffmpeg`
     * Linux: `sudo apt update && sudo apt install ffmpeg`
   * **Redis:**

     * macOS: `brew install redis && brew services start redis`
     * Linux: `sudo apt update && sudo apt install redis-server && sudo systemctl enable --now redis`
4. **Start AI Server**

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 80
   ```

## 🗂️ Project Structure

```
root/
├── frontend/           # Next.js frontend
├── backend/            # Django REST backend
├── ai-end/             # FastAPI-based AI services
├── docs/               # Documentation and design specs
└── scripts/            # Automation and deployment scripts
```

## 📄 API Reference

* **Swagger (Django):** `http://localhost:8000/swagger`
* **AI API (FastAPI):** `http://localhost:80/docs`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
Made with ❤️ by **Machine_Mindset**
</div>
