# 🔍 Lost & Found Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://reactjs.org/) 
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-F4B400.svg)](https://cloudinary.com/)

## 📖 The Problem It Solves

Every day, people lose valuable items—keys, wallets, electronics, and sentimental belongings—in public spaces, campuses, and communities. Traditional lost-and-found systems are fragmented, localized, and rely heavily on physical notice boards or disjointed social media groups, drastically reducing the chances of recovering lost property.

**Lost & Found** is a centralized, digital solution designed to bridge this gap. It provides a real-time, community-driven platform where individuals can instantly report items they have found or broadcast items they have lost. By centralizing these reports into a single, easily searchable database with visual evidence, the application significantly increases the likelihood of reuniting lost belongings with their rightful owners.

<br>

## 🚀 Key Features

* **Real-Time Reporting:** Users can instantly post detailed listings of lost or found items, complete with timestamps, location data, and contact information.
* **Visual Identification:** Direct integration with cloud storage allows finders to upload photographic evidence of items, minimizing false claims and accelerating identification.
* **Secure Community Network:** A robust authentication system ensures that all reports are tied to verified user accounts, promoting trust and accountability within the community.
* **Personalized Dashboard:** Users have full CRUD (Create, Read, Update, Delete) control over their active listings, allowing them to manage their reports and remove them once an item is successfully returned.
* **Intuitive Search & Filtering:** A responsive, grid-based UI allows users to easily browse and filter through active community reports.

<br>

## 🛠️ Technology Stack & Architecture

This application was engineered from the ground up using the **MERN** stack, emphasizing a separation of concerns between a scalable backend API and a dynamic, responsive client interface.

### Frontend Architecture (Client)
* **React 18:** Leveraged for building a fast, component-driven single-page application (SPA).
* **Tailwind CSS:** Utilized for rapid, utility-first UI design, ensuring the application is fully responsive across all device sizes.
* **Framer Motion:** Integrated to provide fluid, micro-interaction animations that enhance the overall user experience.
* **Axios:** Handles asynchronous HTTP requests to the RESTful backend.
* **Formik & Yup:** Implemented for complex form state management and strict schema-based input validation.

### Backend Architecture (Server)
* **Node.js & Express.js:** Powers the scalable, RESTful backend API that handles business logic and data routing.
* **MongoDB & Mongoose:** A NoSQL database architecture chosen for its flexibility in handling varied item report schemas, integrated via Mongoose ODM.
* **JWT (JSON Web Tokens):** Implemented stateless, token-based authentication to secure API routes and protect user data.
* **Bcrypt.js:** Utilized for cryptographic hashing of user passwords prior to database storage.

### Cloud Integration
* **Cloudinary:** Integrated via REST API to handle unsigned, direct-from-browser image uploads. This architecture bypasses the need for the Node.js server to process and store heavy image payloads, significantly optimizing server performance and reducing latency.

<br>

## 📈 Impact & Technical Highlights
* **Optimized Payload Delivery:** Transitioned image handling from a monolithic server-side upload approach to a direct-to-cloud architecture using Cloudinary, reducing server bandwidth usage.
* **Responsive Design:** Ensured 100% mobile accessibility using Tailwind's mobile-first breakpoints.
* **Secure API Design:** Protected sensitive item management endpoints using middleware that validates JWT signatures.
