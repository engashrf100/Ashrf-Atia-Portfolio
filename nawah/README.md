<div align="center">

  <img src="assets/images/logo.png" alt="Nawah Healthcare" width="140" height="140" />

  <h1>Nawah Healthcare</h1>

  <p>
    <strong>Modern Healthcare Platform for MENA</strong><br>
    Consultations, branch discovery, and service booking across Egypt, Qatar, and Saudi Arabia.
  </p>

  <p>
    <strong>منصة الرعاية الصحية الحديثة</strong><br>
    التطبيق يخدم مراكز طبية متعددة الفروع داخل مصر مع توسع للدوحة والرياض. المستخدم يقدر يحجز خدمات، يتابع الاستشارات، ويستقبل إشعارات بالعربي أو الإنجليزي.
  </p>

  <p>
    <strong>Market:</strong> Egypt 🇪🇬 | Qatar 🇶🇦 | Saudi Arabia 🇸🇦
  </p>

  <p align="center">
    <a href="https://play.google.com/store/apps/details?id=com.nawah.app">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" height="50">
    </a>
    <br>
    <br>
    <a href="https://drive.google.com/file/d/1Kdtn28umpEsDeh-1nc50BrNpOLBvRk8u/view?usp=sharing">
      <img src="https://img.shields.io/badge/Watch_Demo-Video-red?style=for-the-badge&logo=youtube&logoColor=white" height="50">
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-75%25_Complete-yellow?style=flat-square" />
    <img src="https://img.shields.io/badge/Platform-Android_|_iOS-green?style=flat-square" />
    <img src="https://img.shields.io/badge/Architecture-Clean-blue?style=flat-square" />
  </p>

</div>

---

## 📖 Overview

Nawah is the official mobile companion for a multi-branch medical center network operating across Egyptian governorates with new franchises launching in Qatar and Saudi Arabia. Patients discover clinics, book services, follow up on consultations, and receive proactive care journeys inside one bilingual (Arabic/English) experience that mirrors the organization’s custom Figma design system.

---

## 🛠 Technology Stack

| Layer | Stack |
|---|---|
| Language | Flutter, Dart |
| State | BLoC (flutter_bloc), Cubits, rxdart |
| Architecture | Clean Architecture (presentation + data only) |
| Networking | dio + retrofit + interceptors, connectivity_plus |
| Backend | REST APIs powered by Laravel/PHP |
| Serialization | freezed, json_serializable, build_runner |
| Storage & Security | flutter_secure_storage, shared_preferences |
| UI/UX | Material 3 theming, custom Figma design system, dark & light themes |
| Animations | Hero transitions, custom loaders, micro-interactions |
| Notifications | Firebase Cloud Messaging, flutter_local_notifications |
| Localization | easy_localization (AR/EN, RTL) |
| Analytics | Firebase Analytics events, Sentry |
| Dependency Injection | get_it / injectable |

---

## ✨ Screens & Features

- **Splash & Onboarding**: Branded splash, user walkthrough, environment probing.
- **Language & Theme Picker**: Dual-language (AR/EN) selector, live dark/light toggle.
- **Auth**: OTP login/signup, password reset, biometric unlock.
- **Consultations**: Attach notes/photos, follow statuses, receive responses.
- **Services Catalog**: Filtered services with pricing, duration, prerequisites.
- **Branch Finder**: Live availability with Google Maps, working hours, directions.
- **Booking (WIP)**: Pay-now/pay-later, multi-payment environments.
- **Notifications**: Deep-linked push topics for offers and updates.
- **Profile & Settings**: Preferences, security controls, privacy/legal.

---

## 🚀 Highlights

- **Production architecture**: Feature-first Clean Architecture, GetIt DI, Retrofit APIs, seamless hand-off with Laravel backend.
- **Secure sessions**: Token refresh, biometric unlock, secure storage, offline awareness, Sentry logging for QA.
- **Custom Figma fidelity**: Dark/light themes, hero animations, shimmer/skeleton states, smooth transitions built with Flutter.
- **Localization excellence**: Arabic-first typography, mirroring, localized notifications, instant AR/EN toggle.
- **Deployment ready**: Remote config toggles, analytics hooks, QA regression scripts, multi-environment payment rollout plan.

## 🏗 Visual Architecture

```text
App (Flutter) — Clean Architecture (Simplified)
├─ presentation/        # Views, BLoCs/Cubits, Widgets
└─ data/                # Models, Repositories, Network client, Local storage
```

## 📂 Project Structure

```text
lib/
├─ core/
│  ├─ di/                   # Dependency injection (GetIt)
│  ├─ network/              # Dio factory, interceptors
│  ├─ localization/         # Easy Localization config
│  ├─ theme/                # Material 3 themes & styles
│  └─ widgets/              # Reusable UI components
├─ features/
│  ├─ auth/                 # Login, Signup, OTP, Biometric
│  ├─ onboarding/           # First-run experience
│  ├─ consultations/        # Booking & tracking flows
│  ├─ branches/             # Map & list views
│  └─ profile/              # Settings & user data
├─ data/                    # Models & Data Sources
└─ main.dart                # App Entry Point
```

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.54.21pm.png" width="210" alt="Screen 1" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.54.35pm.png" width="210" alt="Screen 2" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.54.42pm.png" width="210" alt="Screen 3" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.55.01pm.png" width="210" alt="Screen 4" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.55.19pm.png" width="210" alt="Screen 5" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.55.27pm.png" width="210" alt="Screen 6" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.55.34pm.png" width="210" alt="Screen 7" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.55.40pm.png" width="210" alt="Screen 8" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.55.47pm.png" width="210" alt="Screen 9" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.55.59pm.png" width="210" alt="Screen 10" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.56.06pm.png" width="210" alt="Screen 11" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.56.13pm.png" width="210" alt="Screen 12" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.56.17pm.png" width="210" alt="Screen 13" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.56.22pm.png" width="210" alt="Screen 14" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.57.14pm.png" width="210" alt="Screen 15" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.57.20pm.png" width="210" alt="Screen 16" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.57.33pm.png" width="210" alt="Screen 17" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.57.44pm.png" width="210" alt="Screen 18" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.57.49pm.png" width="210" alt="Screen 19" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-11-19-2.57.56pm.png" width="210" alt="Screen 20" /></td>
    <td></td>
  </tr>
</table>

---

## 🎥 Full Demo

<div align="center">
  <a href="https://drive.google.com/file/d/1Kdtn28umpEsDeh-1nc50BrNpOLBvRk8u/view?usp=sharing">
    <img src="https://img.shields.io/badge/▶_Watch_Full_Video_Walkthrough-FF0000?style=for-the-badge&logo=youtube&logoColor=white" height="60" />
  </a>
</div>

---

## 📬 Contact

<div align="center">
  <a href="mailto:eng.ashrf100@gmail.com?subject=Nawah%20Inquiry">
    <img src="https://img.shields.io/badge/Email-eng.ashrf100%40gmail.com-red?style=for-the-badge&logo=gmail" height="40">
  </a>
  <br>
  <a href="https://www.linkedin.com/in/ashrf-atia-mostafa-92538a318/">
    <img src="https://img.shields.io/badge/LinkedIn-Ashrf%20Atia-blue?style=for-the-badge&logo=linkedin" height="40">
  </a>
  <br>
  <a href="https://wa.me/201287200535">
    <img src="https://img.shields.io/badge/WhatsApp-%2B20%20128%20720%200535-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" height="40" />
  </a>
</div>


