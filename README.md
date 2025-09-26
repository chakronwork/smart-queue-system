# Smart Queue System 🚀
**Smart Queue System** is a lightweight, real-time web application designed to replace paper-based queuing systems. It's perfect for small businesses like clinics, restaurants, or barber shops to manage customer flow efficiently without requiring customers to wait in line.

Customers can scan a QR code, get a queue number on their phone, and track their status in real-time. Admins get a simple dashboard to call and manage the queue instantly.

**Live Demo:** [**smart-queue.your-domain.com**](https://smart-queue-system-sepia.vercel.app/)  
**Live API:** [**smart-queue-api.onrender.com**](https://smart-queue-backend-gc5v.onrender.com)

---

## ✨ Features

*   **Real-time Updates:** Built with **Socket.IO** for instant status changes. No more refreshing!
*   **Simple Customer Interface:** Scan a QR, enter your name/phone, and you're in the queue.
*   **Admin Dashboard:** A secure, login-protected dashboard to view all queues, call the next customer, and close finished queues.
*   **Lightweight & Fast:** Uses a simple stack (Vite, Express, SQLite) for great performance.
*   **Easy to Deploy:** Ready to be deployed on modern platforms like Vercel and Render.
*   **Mobile-Friendly Design:** Looks and works great on both desktop and mobile devices.

---

## 🛠️ Tech Stack

| Category      | Technology                                    |
|---------------|-----------------------------------------------|
| **Frontend**  | [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/)) + [Tailwind CSS](https://tailwindcss.com/) |
| **Backend**   | [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)             |
| **Real-time** | [Socket.IO](https://socket.io/)                   |
| **Database**  | [SQLite](https://www.sqlite.org/index.html)       |
| **Auth**      | JWT (JSON Web Tokens) + bcrypt                |
| **Deployment**| Frontend on [Vercel](https://vercel.com/), Backend on [Render](https://render.com/) |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/download/) (v16 or later) and npm installed on your computer.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/smart-queue-system.git
    cd smart-queue-system
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    # The server will start on http://localhost:3001
    node server.js
    ```
    *Keep this terminal running.*

3.  **Setup the Frontend:**
    *Open a new terminal window.*
    ```bash
    cd frontend
    npm install
    # The development server will start on http://localhost:5173
    npm run dev
    ```

4.  **You're all set!**
    *   Customer View: Open `http://localhost:5173`
    *   Admin Dashboard: Open `http://localhost:5173/admin`
    *   Admin Login: Username `admin`, Password `password123`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/smart-queue-system/issues).

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

<!-- Optional: Add contact info -->
Created by [@chakronwork](https://github.com/chakronwork)