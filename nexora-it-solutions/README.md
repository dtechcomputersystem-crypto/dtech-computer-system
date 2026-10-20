# D-Tech Computer System - Web Application & Vercel Deployment Guide

A high-performance modern e-commerce web platform built for **D-Tech Computer System** (Laptop Sales, Genuine Replacement Parts & High-Performance Accessories). Includes an interactive **Laptop Compatibility Matcher**, **Product Catalog with Filters**, **Product Specs Modal**, **Slide-Over Cart Drawer**, **Direct WhatsApp Ordering**, and a **Printable Tax Invoice Generator**.

Designed for **100% Free Lifetime Hosting on Vercel** with instant zero-build deployment, free SSL security, and global high-speed delivery.

---

## 🚀 How to Host on Vercel (100% Free)

### Step 1: Create a Free GitHub Account
1. Go to [https://github.com](https://github.com) and sign up (or log in).
2. Click the **"+"** icon in the top right &rarr; select **"New repository"**.
3. Name it: `d-tech-computer-system`.
4. Keep it **Public** (or Private) and click **"Create repository"**.

### Step 2: Upload Project Files to GitHub
1. On your new repository page, click **"uploading an existing file"** (or use Git if installed).
2. Drag and drop all files and folders from this folder:
   - `index.html`
   - `vercel.json`
   - `css/`
   - `js/`
   - `assets/`
3. Click **"Commit changes"**.

### Step 3: Deploy to Vercel
1. Go to [https://vercel.com](https://vercel.com) and log in using your GitHub account.
2. Click **"Add New..."** &rarr; select **"Project"**.
3. You will see `d-tech-computer-system` listed under *Import Git Repository*. Click **"Import"**.
4. In the configuration screen:
   - **Framework Preset:** Leave as *Other*
   - **Root Directory:** `./`
   - **Build and Output Settings:** Leave default (No build command needed for Vanilla HTML/JS)
5. Click **"Deploy"**.

Within **30 seconds**, Vercel will deploy your website and provide a free live URL (e.g. `https://d-tech-computer-system.vercel.app`) with free automatic SSL certificate (`https://`).

---

## 🌐 Connecting a Custom Domain (Optional)
If you own a custom domain (e.g. `dtechcomputers.lk` or `dtech.com`):
1. In your Vercel Dashboard, go to your project &rarr; **Settings** &rarr; **Domains**.
2. Type your domain name and click **"Add"**.
3. Follow the DNS instructions on your domain registrar (add the provided CNAME or A Record).
4. Vercel automatically activates free HTTPS SSL within minutes.

---

## 💻 Local Testing & Running
- **Windows Double-Click:** Run `start.bat` to boot the local server and launch your browser at `http://localhost:8080/`.
- **PowerShell:** `powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8080`
- **Current Background Server:** `http://localhost:8085/`
