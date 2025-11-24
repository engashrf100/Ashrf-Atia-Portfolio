<div align="center">

  <h1>Egg POS</h1>

  <p>
    Mini SaaS POS system for egg selling branches — tablet-based inventory and business management solution.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Flutter-3.0+-02569B?logo=flutter&logoColor=white" alt="Flutter" />
    <img src="https://img.shields.io/badge/Dart-3.0+-0175C2?logo=dart&logoColor=white" alt="Dart" />
    <img src="https://img.shields.io/badge/Platform-Tablet-lightgrey" alt="Platform" />
    <img src="https://img.shields.io/badge/State-Riverpod-orange" alt="State" />
    <img src="https://img.shields.io/badge/Backend-Supabase-green" alt="Backend" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-Production-success?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/Type-Freelance-blue?style=for-the-badge" alt="Type" />
  </p>

  <p>
    <a href="https://drive.google.com/file/d/1xh0cbbUBMyYCcYJznF7djC7QncPhVoNN/view?usp=sharing" target="_blank">
      <img src="https://img.shields.io/badge/🎬%20Watch%20Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch Demo" />
    </a>
  </p>

</div>

---

## Overview

Egg POS is a cloud-connected, Arabic-first tablet application that turns any Android tablet into a POS and operations console for egg shops run by non-technical staff and senior owners (60+). The experience is optimized for RTL reading, extra-large touch targets, and "one tap per task" flows so low-tech teams can handle stock, pricing, profits, and damage with confidence.

- **Market**: Micro-retail egg branches
- **Users**: Branch managers, cashiers, senior owners (60+) with limited technical expertise
- **Languages**: Arabic-first UI/UX (Cairo font, RTL layout), English-ready copy
- **Deployment**: Sideloaded onto in-branch tablets (not on public stores)
- **Business Model**: Subscription-ready mini SaaS backed by Supabase multi-tenancy

<p><strong>نظرة عامة:</strong> نظام نقاط بيع متصل بالسحابة وموجه أولاً للغة العربية، يحوّل أي جهاز لوحي يعمل بنظام أندرويد إلى منصة لإدارة المخزون والبيع والمتابعة المالية لمتاجر بيع البيض. الواجهة مصممة لكبار السن والمستخدمين غير التقنيين مع أزرار كبيرة ودعم كامل للغة العربية من اليمين لليسار.</p>

---

## Media

<div align="center">

  <img src="screens/Screenshot%202025-11-24%20at%202.29.51%E2%80%AFPM.png" alt="Screen 1" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.29.55%E2%80%AFPM.png" alt="Screen 2" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.29.59%E2%80%AFPM.png" alt="Screen 3" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.30.07%E2%80%AFPM.png" alt="Screen 4" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.30.11%E2%80%AFPM.png" alt="Screen 5" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.30.26%E2%80%AFPM.png" alt="Screen 6" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.30.29%E2%80%AFPM.png" alt="Screen 7" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.30.48%E2%80%AFPM.png" alt="Screen 8" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.30.53%E2%80%AFPM.png" alt="Screen 9" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.30.56%E2%80%AFPM.png" alt="Screen 10" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.31.02%E2%80%AFPM.png" alt="Screen 11" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.31.17%E2%80%AFPM.png" alt="Screen 12" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.31.19%E2%80%AFPM.png" alt="Screen 13" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.31.25%E2%80%AFPM.png" alt="Screen 14" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.31.31%E2%80%AFPM.png" alt="Screen 15" width="45%" />
  <img src="screens/Screenshot%202025-11-24%20at%202.32.01%E2%80%AFPM.png" alt="Screen 16" width="45%" />

  <img src="screens/Screenshot%202025-11-24%20at%202.50.16%E2%80%AFPM.png" alt="Screen 17" width="45%" />

</div>

> 🎥 **Demo video**: [Watch on Google Drive](https://drive.google.com/file/d/1xh0cbbUBMyYCcYJznF7djC7QncPhVoNN/view?usp=sharing) · Full gallery available in [`screens/`](screens).

---

## Status & Scope

- ✅ Production tablet builds installed in branches (private distribution)
- ✅ Supabase multi-tenant schema, migrations, role-based auth
- ✅ Riverpod-powered feature modules (inventory, analytics, logs, suppliers, privacy)
- 🔄 Continuous UI tuning for seniors (contrast, iconography, gestures)
- 🔜 Planned enhancements: automated WhatsApp receipts, supplier settlement exports, wireless POS thermal printer integration

---

## Responsibilities

- Designed end-to-end tablet UX for Arabic-speaking seniors (18–22sp Cairo font, large hit areas)
- Built Riverpod feature modules (auth, stock, logs, analytics, privacy) with provider invalidation patterns
- Modeled Supabase/Postgres schema (tables, RLS policies, views, stored functions) + versioned migrations
- Implemented FIFO-aware inventory logic (buy/sell/damage) with batch linkage and profitability tracking
- Created QA tooling (`reset_database`, seed scripts) for demos/hiring walkthroughs
- Produced bilingual documentation, onboarding guides, and demo assets

---

## Technologies

| Layer | Stack |
| --- | --- |
| Language | Flutter 3.x, Dart 3.x |
| Architecture | Feature-first MVVM + shared `core/` layer |
| State Management | Riverpod 2.x providers with `ref.invalidate` patterns |
| Backend | Supabase (Postgres + Auth + Storage) |
| Storage | Supabase tables, local secure storage for tokens |
| Serialization | `freezed`, `json_serializable`, `build_runner` |
| Design System | Cairo/Inter fonts, `flutter_screenutil`, custom `EnhancedSelectionCard`, Font Awesome icons |
| Animations | `flutter_animate`, implicit animations, Lottie micro-interactions |
| Tooling | Supabase CLI, VS Code, Codemagic |

---

## Core Modules & Features

### POS & Inventory Operations
- **Buy/Sell/Damage flows** consolidated into animated `PosActionButton`s for muscle memory
- **FIFO batch tracking** links every sale/damage entry back to purchase batches
- **Role-based auth** (cashier, supervisor, owner) controls visibility of critical actions

### Business Intelligence & Logs
- **Activity Logs Center** merges purchases, sales, damage with infinite scroll + detail dialogs
- **Profit privacy toggle** hides profitability data in shared areas; eye icon reveals on demand
- **Statistics dashboard** surfaces daily volume, margins, supplier performance

### Suppliers & Pricing
- **Supplier directory** with Arabic names, contacts, outstanding balances
- **Price guardrails**: last recorded price per SKU auto-fills POS forms, warns on anomalies
- **Reset & seed tooling**: Supabase functions + CLI to spin demo data in under a minute

### Accessibility & Localization
- **RTL-first layouts** with mirrored animations and large tap targets for gloved workers
- **Explainability icons** (InfoIconButton) describe business context in colloquial Arabic
- **High-contrast theme** ensures visibility outdoors or in low-light back rooms

---

## Highlights

- **Mini SaaS mindset**: multi-tenant Supabase schema, migrations, feature flags ready for subscriptions
- **Tablet-first UX**: workflows tuned for 10" devices used by non-technical, often gloved personnel
- **Riverpod discipline**: feature-scoped providers + cache invalidation keep data fresh across tablets
- **Data transparency**: unified activity feed, profit/loss context, and privacy controls build trust
- **QA speed**: `reset_database()` and seed scripts let stakeholders replay demos instantly

---

## Supabase Data Model

<div align="center">
  <img src="screens/Screenshot%202025-11-24%20at%202.50.16%E2%80%AFPM.png" alt="Egg POS Database Schema" width="85%" />
</div>

---

## Application Structure

```text
App (Flutter) — Feature-based with Riverpod
├─ features/
│   ├─ auth/              # Email onboarding + Supabase auth
│   ├─ inventory/         # Stock cards, buy/sell/damage flows
│   ├─ analytics/         # KPIs, statistics, charts
│   ├─ logs/              # Unified FIFO-aware log center
│   ├─ suppliers/         # Provider management
│   └─ privacy/           # Profit toggle, kiosk modes
└─ core/
    ├─ providers/        # Global Riverpod providers
    ├─ models/           # Typed entities (ActivityLog, Batch)
    └─ services/         # Supabase clients, cache, helpers
```

```text
lib/
├─ core/
│  ├─ providers/         # Riverpod bootstrapping & observers
│  ├─ models/            # Freezed models & DTOs
│  ├─ services/          # Supabase + local storage helpers
│  └─ utils/             # Formatters, validators, localization helpers
└─ features/
   ├─ auth/
   ├─ inventory/
   ├─ transactions/
   ├─ suppliers/
   ├─ analytics/
   ├─ logs/
   └─ privacy/
```

---

## Riverpod Usage (Plain Language)

- Feature modules expose providers responsible for fetching/caching Supabase data.
- UI widgets call `ref.watch` for live updates; `ref.invalidate` refreshes data when returning to a screen.
- Shared devices (multiple tablets per branch) always see fresh stock/log numbers without manual refresh buttons.

---

## Contact

- **Email**: <a href="mailto:eng.ashrf100@gmail.com?subject=Egg%20POS%20Inquiry">eng.ashrf100@gmail.com</a>
- **WhatsApp / Phone**: <a href="https://wa.me/201287200535" target="_blank">+20 128 720 0535</a>

---

**Project Type:** Freelance Project  
**Status:** Production (Tablet deployment)  
**Year:** 2024
