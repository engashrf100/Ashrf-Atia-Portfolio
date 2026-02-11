<div align="center">

  <img src="assets/images/app_logo.png" alt="MailStorm" width="140" height="140" />

  <h1>MailStorm - AI Emailer</h1>

  <p>
    <strong>AI-Powered Bulk Job Application Emailer</strong><br>
    Send personalized job applications to hundreds of companies with one click.
  </p>

  <p>
    <strong>Market:</strong> Global 🌍 | Job Seekers & Recruiters
  </p>
  
  <p>
     <strong>⚠️ Closed Testing Status:</strong><br>
     This app is currently in <strong>Google Play Closed Testing</strong>.
     <br>Step 1: <a href="https://groups.google.com/g/-mailstrom-app--join-group-">Join the Google Group</a> to get access.
     <br>Step 2: Download from the Store link below.
  </p>

  <p align="center">
    <a href="https://play.google.com/store/apps/details?id=com.mailstorm.app">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" height="50">
    </a>
    <br>
    <br>
    <!-- Secondary Buttons -->
    <a href="https://drive.google.com/file/d/17_BYg8E_7mJvlaoot-7AKccyasj5QXgB/view?usp=share_link">
      <img src="https://img.shields.io/badge/Watch_Demo-Video-red?style=for-the-badge&logo=youtube&logoColor=white" height="50">
    </a>
  </p>

</div>

---

## 📖 Overview

### Global Support
MailStorm is a **Flutter-based bulk email application** designed for job seekers worldwide. It allows users to send personalized job application emails to hundreds of companies simultaneously. The app features **multi-provider OAuth authentication** (Gmail, Outlook), **AI-powered email generation**, and a **rich text editor** for professional emails.

**Current Status:** 99% complete. Currently in **Google Console Closed Testing**. The app is designed for Google Ads (AdMob) integration but is currently free for testing. Focus involves UI/UX refinements to enhance user understanding.

**Language Support:** 🌍 Fully localized in **10 Languages** (English, Arabic, French, German, Spanish, etc.) to serve a global user base.

---

## 🛠 Technology Stack

| Layer | Technology | Details |
|---|---|---|
| Language | Flutter/Dart | SDK 3.0+ |
| State Management | Riverpod | With riverpod_generator for code generation |
| Local Storage | Hive + Flutter Secure Storage | NoSQL for data, encrypted storage for credentials |
| OAuth | google_sign_in + flutter_appauth | Native Google Sign-In & AppAuth for Microsoft |
| AI Engine | Firebase Vertex AI + Local Logic | Hybrid Cloud/Local generation (Resilient to offline/rate-limits) |
| Deep Linking | receive_sharing_intent | Handle `mailto:` links & `.mailstorm` files |
| Security | encrypt (AES-256-CBC) | Secure encryption for shared company lists |
| Email Sending | mailer + Microsoft Graph API | SMTP for Gmail, REST API for Outlook |
| Rich Text Editor | flutter_quill | Delta-based document model |
| Animations | flutter_animate + Lottie | Smooth UI transitions |
| Localization | easy_localization | Support for 10+ Languages (RTL/LTR) |
| In-App Purchases | in_app_purchase | Premium subscription system |
| Architecture | Feature-first Clean Architecture | Clean separation of concerns |

---

## 🔐 OAuth Implementation (Technical Highlight)

One of the key technical challenges was implementing **multi-provider OAuth** with different authentication flows. The app handles **Gmail OAuth** via native Google Sign-In (automatic token refresh) and **Outlook OAuth** via AppAuth (custom redirect URIs and manual token management), bridging the gap between simple SMTP and complex Microsoft Graph REST APIs.

---

## 🏗 Architecture

```text
lib/
├── core/
│   ├── middleware/          # Validation & processing logic
│   ├── constants/
│   └── widgets/
├── features/
│   ├── job_application/     # Main email sending feature
│   ├── onboarding/          # User profile setup
│   ├── provider_status/     # OAuth connection management
│   ├── premium/             # In-app purchases
│   ├── settings/
│   └── templates/           # Email templates
├── services/
│   ├── oauth/               # Gmail & Outlook OAuth services
│   ├── email/               # Email provider abstraction
│   ├── storage/             # Hive & Secure Storage
│   └── premium/
└── main.dart
```

---

## ✨ Key Features

- **🔗 Multi-Provider OAuth** - Connect Gmail, Outlook, or Yahoo accounts
- **🤖 AI Email Generation** - Personalized subject lines and body content
- **📝 Rich Text Editor** - Professional email formatting with flutter_quill
- **📊 CSV Import** - Bulk import companies from spreadsheets
- **🌍 Global Localization** - Full support for **10 Languages**
- **💎 Premium System** - Subscription-based unlimited sending
- **📈 Activity Tracker** - Track success rates and daily application volume.
- **🔐 Secure Sharing** - Share encrypted `.mailstorm` company lists.

---

## 🧠 Hybrid AI Architecture

MailStorm uses a sophisticated **Hybrid AI Strategy** to ensure reliability:

1.  **Primary (Cloud):** Uses **Firebase Vertex AI (LLM)** to generate highly contextual and personalized chart-topping emails.
2.  **Fallback (Local):** If the device is offline, rate-limited, or facing network issues, the app seamlessly switches to a **Local Algorithmic Generator**. This uses smart heuristics and saved templates to ensure the user can *always* generate content without interruption.

---

## 🔐 Deep Linking & Secure Sharing

### Quick Add via Email Links
The app registers as a handler for `mailto:` links.
- **Workflow:** User sees a recruiter's email on LinkedIn/Job Site -> Taps email -> MailStorm opens instantly -> **AI Animation plays** -> Company is automatically added to the list.

### Encrypted `.mailstorm` Files
Users can share their curated list of companies with others.
- **Format:** Custom `.mailstorm` JSON file.
- **Security:** Content is encrypted using **AES-256-CBC**. This ensures that proprietary company lists remain secure during transit.
- **Importing:** Tapping a `.mailstorm` file (e.g., from WhatsApp/Telegram) triggers a deep link that imports the secure data directly into the app.

---

## 📈 Activity Tracker
The app features a detailed **Activity Tracker** screen that visualizes:
- **Application Success Rate:** Track how many emails were successfully sent vs failed.
- **Daily Progress:** See your application streak and daily volume.
- **Provider Stats:** Break down usage by email provider (Gmail/Outlook).

---

## 📱 Onboarding Experience

The app features a comprehensive onboarding flow to guide new users:
1.  **Language Selection:** Choose from 10 supported languages.
2.  **User Profile:** Input name, job title, and skills (used by AI).
3.  **Template Setup:** Create the default "Core" email template.
4.  **Provider Connection:** Securely connect Gmail/Outlook accounts.
5.  **Tutorial:** Interactive walkthrough of the main dashboard.

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.02.07 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.02.10 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.02.54 PM.png" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.09 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.14 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.21 PM.png" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.25 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.35 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.38 PM.png" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.44 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.03.55 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.04.00 PM.png" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.04.14 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.04.22 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.04.34 PM.png" width="240" /></td>
  </tr>
  <tr>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.04.40 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.04.43 PM.png" width="240" /></td>
    <td><img src="assets/images/screenshots/Screenshot 2026-02-11 at 1.04.49 PM.png" width="240" /></td>
  </tr>
</table>

---

## 🚧 Roadmap

- [x] Multi-provider OAuth (Gmail, Outlook)
- [x] Rich text email editor
- [x] CSV company import
- [x] Premium subscription system
- [x] **10 Languages Support**
- [x] Deep link integration
- [x] Secure file sharing
- [x] Hybrid AI Implementation
- [x] Google Play Closed Testing (99% Ready)
- [ ] 🔄 Google Ads integration (AdMob)
- [ ] Public Release

---

## 🎥 Full Demo

<div align="center">
  <a href="https://drive.google.com/file/d/17_BYg8E_7mJvlaoot-7AKccyasj5QXgB/view?usp=share_link">
    <img src="https://img.shields.io/badge/▶_Watch_Full_Video_Walkthrough-FF0000?style=for-the-badge&logo=youtube&logoColor=white" height="60" />
  </a>
</div>

---

## 📬 Contact

<div align="center">
  
  <a href="mailto:eng.ashrf100@gmail.com?subject=MailStorm%20Inquiry">
    <img src="https://img.shields.io/badge/Email-eng.ashrf100%40gmail.com-red?style=for-the-badge&logo=gmail" height="40" />
  </a>
  <br>
  
  <a href="https://linkedin.com/in/ashrf-atia">
    <img src="https://img.shields.io/badge/LinkedIn-Ashrf%20Atia-blue?style=for-the-badge&logo=linkedin" height="40" />
  </a>
  <br>

  <a href="https://wa.me/201287200535">
    <img src="https://img.shields.io/badge/WhatsApp-%2B20%20128%20720%200535-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" height="40" />
  </a>

</div>

---

<div align="center">
  <sub>Built with ❤️ using Flutter</sub>
</div>
