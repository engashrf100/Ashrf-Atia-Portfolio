<div align="center">

  <img src="assets/images/app_icon.jpg" alt="Syaratc Online" width="140" height="140" />

  <h1>Syaratc Online</h1>

  <p>
    <strong>Find, Finance, and Manage Cars</strong><br>
    A modern, high-performance Flutter app powered by clean architecture.
  </p>

  <p>
    <strong>Market:</strong> Saudi Arabia 🇸🇦 — Arabic & English experience
  </p>

  <p>
    <a href="https://play.google.com/store/apps/details?id=com.syatric.app">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" height="50">
    </a>
    <br>
    <br>
    <a href="https://syaratc.online/en">
      <img src="https://img.shields.io/badge/Website-syaratc.online-blue?style=for-the-badge&logo=google-chrome&logoColor=white" height="50">
    </a>
    <a href="https://drive.google.com/file/d/1nF3FgbEGtSoubXAKsBPIOG4G5JTtZlUg/view?usp=sharing">
      <img src="https://img.shields.io/badge/Watch_Demo-Video-red?style=for-the-badge&logo=youtube&logoColor=white" height="50">
    </a>
  </p>

</div>

## Overview

Syaratc Online is a service that helps users find cars and secure financing — a car marketplace and financing companion. The app connects users with curated car offers, financing partners, and company programs while delivering a smooth, localized experience for both end‑users and companies. It mirrors the core capabilities available on the website (`https://syaratc.online/en`) and adds mobile‑first features like push notifications, offline‑first storage, and background token refresh.

This repository hosts the app profile and demos only (no source code). The product targets users in <strong>Saudi Arabia 🇸🇦</strong> with Arabic as a first‑class locale and English as a secondary locale.

<p>
  <strong>نظرة عامة (Arabic):</strong>
  «سيراتك أونلاين» خدمة تساعد المستخدمين على الحصول على السيارة وتمويلها بسهولة — منصة لعرض السيارات وربطك بشركاء التمويل وإدارة طلباتك بسلاسة. التجربة مصممة لسوق المملكة العربية السعودية 🇸🇦 مع دعم كامل للغتين العربية والإنجليزية، إضافة إلى الإشعارات الفورية، الحفظ دون اتصال، وتحديث آمن للرموز في الخلفية.
</p>

## Technologies

| Layer | Technology |
|---|---|
| Language | Flutter, Dart |
| State | BLoC (Cubit), rxdart |
| Storage | Hive for local persistence |
| Architecture | Clean Architecture (presentation + data, no separate domain layer) |
| Networking | dio + retrofit; API handler with interceptors, pagination, error mapping |
| Serialization | json_serializable, freezed |
| FP Utilities | dartz |
| UI/UX | Slivers for performant lists, skeleton loading, onboarding game/flow, flutter_screenutil |
| i18n | Double localization (Arabic and English) |
| Notifications | Firebase Cloud Messaging + local notifications (new offers, order updates, company campaigns) |
| Analytics | Firebase Analytics (events for conversion, OTP success, engagement) |
| Dependency Injection | get_it / injectable |
| Web Content | In‑app WebView for Terms and Conditions, Privacy |

## Screens & Features

- **Splash**: fast app startup and restoring user session
- **Auth**: login and signup, OTP verification, resend/refresh OTP
- **Forgot Password**: password reset with secure flows
- **Background Token Refresh**: silent refresh for both guest and authenticated sessions
- **Onboarding Car Game**: interactive onboarding car game that engages users and increases activation
- **Home**: brand search, featured products, performant sliver lists, skeleton loading
- **Offers**: special/featured offers, filters, pagination
- **Order/Form**: guided purchase order form with validation and autosave
- **Companies Offers**: tailored programs for businesses
- **User Profile**: profile view/edit, saved cars, preferences
- **Drawer**: links to Terms & Conditions and Privacy via WebView

## Screenshots

<table>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.33.46-pm.png" alt="Screenshot 1" width="240" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.34.04-pm.png" alt="Screenshot 2" width="240" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.34.16-pm.png" alt="Screenshot 3" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.34.31-pm.png" alt="Screenshot 4" width="240" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.34.38-pm.png" alt="Screenshot 5" width="240" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.34.48-pm.png" alt="Screenshot 6" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.35.00-pm.png" alt="Screenshot 7" width="240" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.35.09-pm.png" alt="Screenshot 8" width="240" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.35.20-pm.png" alt="Screenshot 9" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.35.27-pm.png" alt="Screenshot 10" width="240" /></td>
    <td><img src="assets/images/screenshots/screenshot-2025-10-30-3.35.36-pm.png" alt="Screenshot 11" width="240" /></td>
    <td></td>
  </tr>
</table>

## Visual Architecture

```
App (Flutter) — Clean Architecture (without separate domain layer to reduce boilerplate)
├─ presentation/        # Widgets, pages, BLoC cubits, UI state, use‑cases live here
└─ data/                # DTOs, mappers, Hive boxes, API clients/interceptors, repositories

Cross‑cutting: localization, error handling, analytics, notifications
```

## Project Structure (planned)

```
lib/
├─ core/                      # app-wide building blocks
│  ├─ di/                     # dependency injection (get_it/injectable)
│  ├─ network/                # api client, interceptors, error mapping
│  ├─ localization/           # i18n setup (ar, en)
│  ├─ notifications/          # FCM + local notifications
│  ├─ utils/                  # formatters, validators, shared helpers
│  └─ widgets/                # reusable UI components
└─ features/                  # vertical slices by business area
   ├─ auth/                   # login, signup, otp, refresh
   ├─ onboarding/             # onboarding game/flow
   ├─ home/                   # brands, featured, skeletons
   ├─ offers/                 # lists, filters, pagination
   ├─ order/                  # order form, steps, validation
   ├─ companies/              # company programs
   ├─ profile/                # user profile
   └─ legal/                  # terms & privacy (WebView)
```

## Demos (GIF Previews)

> Lightweight GIFs play inline on GitHub; click any image for full size.
> Hint: GIF previews may take a second to load — please wait for the loading indicator. If playback is choppy, watch the full demo video here: [Full demo video](https://drive.google.com/file/d/1nF3FgbEGtSoubXAKsBPIOG4G5JTtZlUg/view?usp=sharing).

### Onboarding Game (first‑run experience)
<img src="assets/demos/onboarding-auth.gif" alt="Onboarding Game and Auth demo" width="360" />

### Home
<img src="assets/demos/home.gif" alt="Home demo" width="360" />

### Offers
<img src="assets/demos/offers.gif" alt="Offers demo" width="360" />

### Form & Drawer
<img src="assets/demos/form-and-drawer.gif" alt="Form & Drawer demo" width="360" />

## 🎥 Full Demo

<div align="center">
  <a href="https://drive.google.com/file/d/1nF3FgbEGtSoubXAKsBPIOG4G5JTtZlUg/view?usp=sharing">
    <img src="https://img.shields.io/badge/▶_Watch_Full_Video_Walkthrough-FF0000?style=for-the-badge&logo=youtube&logoColor=white" height="60" />
  </a>
</div>

## Contact

<div align="center">
  <a href="mailto:eng.ashrf100@gmail.com?subject=Syaratc%20Online%20Inquiry">
    <img src="https://img.shields.io/badge/Email-eng.ashrf100%40gmail.com-red?style=for-the-badge&logo=gmail" height="40">
  </a>
  <br>
  <a href="https://linkedin.com/in/ashrf-atia">
    <img src="https://img.shields.io/badge/LinkedIn-Ashrf%20Atia-blue?style=for-the-badge&logo=linkedin" height="40">
  </a>
  <br>
  <a href="https://wa.me/201287200535">
    <img src="https://img.shields.io/badge/WhatsApp-%2B20%20128%20720%200535-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" height="40" />
  </a>
</div>

<!-- Suggestions and questions intentionally kept out of README for brevity and professionalism. -->


