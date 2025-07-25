//--------------------------------------------------------------------------------------------------------------------------//
---
# Kaam-Karo ToDo App
**Author:** Nishant Garg

## 📝 Description
Kaam-Karo is a modern React Native ToDo app built with Expo. It lets you add, complete, and delete tasks, switch between beautiful themes, and view your tasks in a calendar. All data is stored locally using AsyncStorage, so your tasks are always available—even offline.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo Go](https://expo.dev/go) (install on your mobile device)

### Setup & Run
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the Expo server:**
   ```bash
   npx expo start
   ```
3. **Open the app:**
   - Scan the QR code in your terminal or browser using the Expo Go app on your phone.
   - Or run on an emulator/simulator (Android/iOS).

## ✨ Features
- Add, complete, and delete tasks
- Multiple beautiful themes (switch instantly)
- Calendar view for tasks
- Local storage (offline support)
- Push notifications for task reminders
- Modern, minimalist UI

## ⚡ Design Choices & Challenges
- **Offline-first:** All data is stored locally with AsyncStorage for instant access and reliability—no remote API needed.
- **Instant theme switching:** Redux powers seamless theme changes, with beautiful glassmorphism and shadow effects for a premium look.
- **Calendar mapping:** Tasks are linked to dates for easy planning and organization.
- **Push notifications:** Implemented local reminders for tasks using Expo Notifications, handling permissions and device quirks.
- **Navigation clarity:** Switched to Ionicons for a unified, modern tab bar.
- **Performance fix:** Avoided nesting FlatList inside ScrollView to prevent React Native windowing errors and ensure smooth scrolling.

## 🛠 Tech Stack
- React Native (Expo)
- TypeScript
- Redux Toolkit
- AsyncStorage
- Expo Notifications
- React Navigation
- Ionicons

## 📬 Contact
For feedback or questions, reach out to [Nishant Garg](mailto:0264nishu@gmail.com).

---
