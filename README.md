# Modern E-Commerce Platform

A high-performance, aesthetically pleasing e-commerce application built with the latest web technologies. This project focuses on delivering a premium user experience (UX) similar to top-tier retail sites, backed by a robust and secure administration system.

## 🌟 Key Features

### Premium User Experience
*   **Visual Polish**: Beautiful, clean interface with smooth transitions, skeletal loading states, and purposeful animations.
*   **Smart Navigation**: Dynamic product categorization and a unified search bar for instant access.
*   **Seamless Shopping**: Guest checkout support, local storage cart synchronization, and optimized image loading.
*   **Security**: Dual-method authentication (Username or Phone Number) with secure session management.

![Landing Page](screenshots/landing-page.png)

### Powerful Admin Suite
*   **Dashboard**: Real-time overview of business performance and key metrics.
*   **Inventory Control**: Full CRUD capabilities for product management with image support.
*   **Order fulfillment**: Detailed order tracking, status updates, and customer information access.

---

## 📸 Application Showcase

### Customer Journey

**Browse & Discover**  
An intuitive product grid with effective filtering and sorting options.  
![Products Grid](screenshots/products-grid.png)

**Product Details**  
Deep dive into product specifications with high-quality imagery.  
![Single Product](screenshots/single-product.png)

**Shopping Cart**  
A clear, responsive cart view that manages items efficiently.  
![Cart](screenshots/cart.png)

**Secure Checkout**  
Streamlined checkout process ensuring high conversion rates.  
![Placing Order](screenshots/checkout.png)

### Administrator Portal

**Admin Dashboard**  
A centralized hub for store management.  
![Admin Dashboard](screenshots/admin-dashboard.png)

**Order Management**  
View and manage customer orders with granular detail.  
![Order Management](screenshots/order-management.png)
![Order Info](screenshots/order-details.png)

**Product Management**  
Easily add and update inventory.  
![Product Management](screenshots/product-management.png)
![Adding Product](screenshots/adding-product.png)

---

## 🛠 Tech Stack

### Frontend
-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, Lucide Icons
-   **State Management**: React Context (Auth & Cart)
-   **Performance**: Turbopack, Next/Image

### Backend
-   **Runtime**: Node.js & Express
-   **Database**: PostgreSQL via Prisma ORM
-   **Validation**: Zod (Shared schemas)
-   **Security**: JWT Authentication, Helmet, Rate Limiting, CORS

---

## 📦 Getting Started

### Prerequisites
-   Node.js (v18+)
-   PostgreSQL Database

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/ecommerce.git
    cd ecommerce
    ```

2.  **Install Dependencies**
    ```bash
    # Frontend
    cd frontend
    npm install

    # Backend
    cd ../backend
    npm install
    ```

3.  **Environment Configuration**
    Create `.env` files in both folders based on `.env.example`.

    **Backend `.env`**:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
    JWT_SECRET="your_secret_key"
    PORT=4000
    ```

4.  **Database Setup**
    ```bash
    cd backend
    npx prisma migrate dev
    npm run seed # Seeds products and test users
    ```

5.  **Run Application**
    ```bash
    # Terminal 1: Backend
    cd backend
    npm run dev

    # Terminal 2: Frontend
    cd frontend
    npm run dev
    ```

Visit the store at `http://localhost:3000`  
Access API at `http://localhost:4000`

---

## 📄 License
MIT License.
