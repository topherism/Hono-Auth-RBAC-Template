# 📁 Project Structure – TrackKIT

This document explains the folder layout for TrackKIT using:
- **React** + **TypeScript**
- **Mantine UI**
- **Zustand**
- **TanStack Query**
- **Axios**
- **Dayjs**
- **React Router DOM**

---

## 1. Folder Overview
    src/
    │
    ├─ assets/ # Static assets (logos, images, icons)
    ├─ components/ # Reusable UI components across the app
    ├─ config/ # App-wide configuration (theme, API endpoints, nav items)
    ├─ features/ # Feature-based folders (auth, dashboard, inventory, etc.)
    ├─ hooks/ # Reusable generic hooks (not tied to one feature)
    ├─ layout/ # Global layouts (AppShell, Header, Sidebar)
    ├─ router/ # Routing setup and route protection
    ├─ services/ # Axios instance, interceptors, and global API utilities
    ├─ stores/ # Global Zustand stores (UI state, etc.)
    ├─ types/ # Global TypeScript types and interfaces
    ├─ utils/ # Helper functions (date formatters, number formatters)
    ├─ App.tsx # Main app component
    ├─ main.tsx # Entry point, wraps App with providers
    └─ vite-env.d.ts # Vite TypeScript definitions


---

## 2. Folder Details

### **assets/**
- Stores images, SVGs, and other static files.
- Example: `logo.svg`, placeholder images.

### **components/**
- **Reusable UI** elements that are **not tied to any specific feature**.
- Examples:  
  - `AppLoader.tsx` → loading spinner  
  - `ConfirmModal.tsx` → generic confirm dialog  
  - `Table.tsx` → generic table wrapper

### **config/**
- Global constants and settings.
- Examples:  
  - `theme.ts` → Mantine theme overrides  
  - `apiConfig.ts` → base API URLs  
  - `navConfig.ts` → role-based sidebar navigation items

### **features/**
- **Each feature has its own folder** containing:
  - `components/` → UI parts for that feature  
  - `pages/` → pages rendered by React Router  
  - `services/` → API calls related to the feature  
  - `hooks/` → feature-specific logic  
  - `store.ts` → Zustand store for the feature (optional)

Example:

features/auth/
├─ components/LoginForm.tsx
├─ pages/LoginPage.tsx
├─ services/authApi.ts
├─ store.ts
└─ hooks/useAuth.ts


### **hooks/**
- Generic hooks used across multiple features.
- Examples:  
  - `useMediaQuery.ts` → detect screen size changes  
  - `useDebounce.ts` → debounce search inputs

### **layout/**
- Global layout components (AppShell, Header, Sidebar).
- Example:
  - `AppLayout.tsx` → wraps main app content
  - `Header.tsx` → top bar
  - `Sidebar.tsx` → navigation menu

### **router/**
- App routes setup.
- Examples:  
  - `AppRouter.tsx` → contains `react-router-dom` routes  
  - `ProtectedRoute.tsx` → checks authentication before showing a page

### **services/**
- Shared API logic.
- Example:
  - `apiClient.ts` → Axios instance with interceptors for auth tokens

### **stores/**
- Global Zustand stores.
- Example:
  - `uiStore.ts` → tracks sidebar open/close state

### **types/**
- Global TypeScript types.
- Examples:  
  - `auth.ts` → user and login response types  
  - `inventory.ts` → inventory item type

### **utils/**
- Pure helper functions.
- Examples:
  - `formatDate.ts` → wraps `dayjs` for consistent formatting
  - `formatNumber.ts` → adds commas to numbers

---

## 3. Setup Instructions

1️⃣ **Install dependencies**
```sh
npm install @mantine/core @mantine/hooks @tabler/icons-react
npm install zustand @tanstack/react-query axios dayjs
npm install react-router-dom
npm install typescript --save-dev
