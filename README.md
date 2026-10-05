# Coffee Cafe App

"A React Native mobile application built for a coffee business, allowing customers to browse menus, customize drinks, and place real-time orders. Admins manage inventory, pricing, and promotions, while staff handle incoming orders via a connected dashboard. Integrated with Firebase for authentication, push notifications, and live order tracking, it ensures a seamless, efficient, and engaging user experience with detailed order history, responsive design, and real-time status updates throughout."

---

## 🚀 Key Features

- **Custom Drink Builder:** Choose sizes, milk options, sweetness levels, and add-ons in real time.
- **Live Order Tracking:** Real-time order status updates powered by Firebase Firestore.
- **Push Notifications:** Instant alerts for order confirmation, status changes, and promotions.
- **Role-Based Workflows:** Customer mobile interface connected with staff and admin dashboard workflows.
- **Order History & Favorites:** Quick re-ordering and detailed past receipt summaries.

---

## 🛠️ Tech Stack

- **Framework:** React Native / Expo
- **Backend & Auth:** Firebase (Authentication, Firestore, Cloud Messaging)
- **UI & Styling:** Mobile UI / Custom Theme Tokens
- **State Management:** React Context API / Redux Toolkit

---

## 💻 Local Setup Instructions

Follow these step-by-step instructions to set up and run the mobile application in your local development environment:

### 1. **Clone the Repository**
Clone the project repository to your local machine and navigate into the project directory:
```bash
git clone [https://github.com/Zunair-01/coffee-cafe-app.git](https://github.com/Zunair-01/coffee-cafe-app.git)
cd coffee-cafe-app

```

### 2. **Install Dependencies**

Install all required Node modules and project packages:

```bash
npm install

```

### 3. **Configure Environment Variables**

Create a `.env` file in the root directory and add your Firebase project configuration keys:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

```

### 4. **Start the Development Server**

Launch the Expo development server:

```bash
npx expo start

```

### 5. **Run on Emulator or Physical Device**

* **Android:** Press `a` in the terminal or run `npx expo run:android` (requires Android Studio Emulator).
* **iOS:** Press `i` in the terminal or run `npx expo run:ios` (requires macOS & Xcode Simulator).
* **Physical Device:** Download the **Expo Go** app on your phone and scan the QR code generated in the terminal.

```

