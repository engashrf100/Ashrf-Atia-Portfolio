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

</div>

## Overview

Egg POS is a tablet-based Point of Sale system designed specifically for egg selling branches. The application provides a complete inventory management and business analytics solution with a simplified, user-friendly interface tailored for non-technical users, particularly those over 60 years old. Built as a mini SaaS platform, it enables branch managers to efficiently track stock, manage transactions, handle damaged products, and monitor business performance.

- **Target Users**: Branch managers and staff (non-technical, 60+ years)
- **Platform**: Tablet-optimized (not published to app stores)
- **Deployment**: Direct installation on tablets for branch operations
- **Business Model**: Mini SaaS POS system

<p>
  <strong>نظرة عامة (Arabic):</strong>
  نظام نقاط البيع المصغر لبيع البيض — حل متكامل لإدارة المخزون والأعمال مصمم خصيصاً للعمل على الأجهزة اللوحية. التطبيق يوفر واجهة مبسطة وسهلة الاستخدام للمستخدمين غير التقنيين، مع إدارة كاملة للمخزون والمعاملات والتحليلات التجارية.
</p>

## Technologies

| Layer | Technology |
|---|---|
| Language | Flutter, Dart |
| State Management | Riverpod |
| Backend & Database | Supabase (Database & Authentication) |
| Authentication | Email-based authentication via Supabase |
| Architecture | Feature-based architecture with Riverpod providers |
| UI/UX | Simplified, large-button interface for non-technical users |

## Screens & Features

### Authentication
- **Email Login**: Secure email-based authentication powered by Supabase
- **Session Management**: Persistent user sessions for seamless access

### Inventory Management
- **Stock Tracking**: Real-time stock level monitoring and updates
- **Buy Operations**: Record incoming stock purchases from suppliers
- **Sell Operations**: Process sales transactions and update inventory
- **Damaged Products**: Track and manage damaged or expired products
- **Provider Management**: Manage supplier information and relationships

### Business Analytics
- **Transaction Logs**: Complete history of all buy/sell transactions
- **Statistics Dashboard**: Visual analytics and business insights
- **Profit Calculations**: Automated profit margin and revenue tracking
- **Reports**: Generate business performance reports

### User Experience
- **Simplified UI/UX**: Large buttons, clear labels, intuitive navigation designed for non-technical users
- **Tablet-Optimized**: Interface optimized for tablet screens and touch interactions
- **Accessibility**: User-friendly design for users over 60 years old

## Highlights

- **Simplified Design**: UI/UX specifically designed for non-technical users with large, clear interface elements
- **Complete Inventory System**: Full stock management with buy/sell operations, damaged product tracking, and provider management
- **Business Intelligence**: Comprehensive analytics including transaction logs, statistics, and profit calculations
- **Modern Tech Stack**: Built with Flutter, Riverpod for state management, and Supabase for backend services
- **Tablet-First**: Optimized for tablet devices used in branch operations
- **Email Authentication**: Secure authentication system powered by Supabase

## Visual Architecture

```
App (Flutter) — Feature-based with Riverpod
├─ features/
│   ├─ auth/              # Email authentication
│   ├─ inventory/        # Stock, buy, sell operations
│   ├─ providers/        # Supplier management
│   ├─ analytics/        # Statistics, logs, profits
│   └─ damaged/          # Damaged products tracking
└─ core/
    ├─ providers/        # Riverpod providers
    ├─ models/           # Data models
    └─ services/         # Supabase services
```

## Project Structure

```
lib/
├─ core/
│  ├─ providers/         # Riverpod providers setup
│  ├─ models/            # Data models
│  ├─ services/          # Supabase client & services
│  └─ utils/             # Helpers and utilities
└─ features/
   ├─ auth/              # Authentication screens
   ├─ inventory/         # Stock management
   ├─ transactions/      # Buy/sell operations
   ├─ providers/         # Supplier management
   ├─ damaged/           # Damaged products
   ├─ analytics/         # Statistics and reports
   └─ logs/              # Transaction history
```

## Contact

- Email: <a href="mailto:eng.ashrf100@gmail.com?subject=Egg%20POS%20Inquiry">eng.ashrf100@gmail.com</a>
- WhatsApp: <a href="https://wa.me/201287200535" target="_blank">+20 128 720 0535</a>
- Phone: <a href="tel:+201287200535">+20 128 720 0535</a>

---

**Project Type:** Freelance Project  
**Status:** Production (Tablet deployment)  
**Year:** 2024

