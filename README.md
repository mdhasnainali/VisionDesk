# 📜 Contributing to VisionDesk

Thank you for your interest in contributing to **VisionDesk**! We follow a collaborative Git-based workflow where each contributor works independently on a fork and submits pull requests (PRs) to the main repository.

---

## 🏁 Getting Started

### 1. Fork the Repository

Fork the repository to your GitHub account by clicking the **"Fork"** button on the top-right of [VisionDesk](https://github.com/mdhasnainali/VisionDesk).

### 2. Clone Your Fork Locally

Use SSH to clone your forked repository:

```bash
git clone git@github.com:<your-username>/VisionDesk.git
cd VisionDesk
```

### 3. Set the Original Repository as `upstream`

```bash
git remote add upstream git@github.com:mdhasnainali/VisionDesk.git
git fetch upstream
```

---

## 🌱 Working on Your Contribution

### 1. Create a New Branch

Before making any changes, create a feature branch based on the latest version of the main branch:

```bash
git checkout main
git pull upstream main
git checkout -b your-feature-name
```

> 📌 Use a meaningful name for your branch, like `bugfix-auth-error` or `feature-enhance-ui`.

### 2. Make Your Changes

- Make your changes logically and cleanly.
- Test thoroughly before committing.
- Follow good coding practices and project structure.

### 3. Commit Your Changes

```bash
git add .
git commit -m "Add: Description of your changes"
```

---

## 🔁 Sync with Original Repository (Optional but Recommended)

If others are working in parallel, sync your fork regularly:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

Rebase your working branch if needed:

```bash
git checkout your-feature-name
git rebase main
```

---

## 📩 Submit a Pull Request

1. Push your branch to your forked repo:
   ```bash
   git push origin your-feature-name
   ```

2. Go to the original repo: [https://github.com/mdhasnainali/VisionDesk](https://github.com/mdhasnainali/VisionDesk)

3. Click **"Compare & pull request"**.

4. Select the following:
   - **Base repository**: `mdhasnainali/VisionDesk`
   - **Base branch**: `main`
   - **Head repository**: your GitHub fork
   - **Compare branch**: `your-feature-name`

5. Add a clear **title** and a detailed **description** of what you changed.

6. Click **"Create pull request"**.

---

## ✅ Contribution Checklist

- [ ] My code is well-structured and commented.
- [ ] I’ve tested my changes.
- [ ] My commits are descriptive and atomic.
- [ ] I’ve pulled the latest changes from `main` before submitting.
- [ ] I’ve opened the PR against the correct base branch (`main`).

---

## 🙏 Code of Conduct

We expect all contributors to act respectfully and constructively. Let's build something great together.

---

If you have any questions, open an issue or reach out to the maintainer.

Happy contributing! 🚀
# Guide

### Create a virtual environment

```bash
python -m venv env
```

### Install dependencies

```bash
pip install -r requirements.txt
cd vision_desk_backend
```

#### Run the server locally
```
python manage.py runserver
```

### For exposing IP
```bash
python manage.py runserver 0.0.0.0:<port>
```

### Run the worker (For updating the frames and annotations)
```bash
python worker.py
```

# NB: You must have redis server running in the background!
URL: https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-mac-os/

### Change stream the URL in `worker.py`, here `cap = cv2.VideoCapture("rtsp://192.168.1.112:8554/mystream")` 

### You are good to go!
