# A simple fully functional expense tracker app using MERN stack

## Features:
- Track and manage expenses and income
- View expenses and income in tabular and chart formats
- Add, update, and delete expenses and incomes
- User authentication and authorization with global auth state preventing risks of Session Hijacking, Replay Attacks and Token Tampering.

## Tech Stack

- **Frontend:** React, React Google Charts, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **Containerization:** Docker

## Getting Started

  ### Prerequisites
  
  - Docker
  - Docker Compose
  
  ### Installation
  
  1. **Clone the Repository**
  
     ```
     git clone https://github.com/vandan-savla/expense-tracker.git
     cd expense-tracker
     ```
  2. **Build and Run the Docker Containers**:
     
       ```
      docker-compose up --build
       ```
  ### To run without docker
   1. **Clone the Repository**
  
     ```
     git clone https://github.com/vandan-savla/expense-tracker.git
     cd expense-tracker
     ```
  2. **Install Dependencies**
     
     ```
     cd frontend
     npm install
     cd ../backend
     npm install
     
     ```
  4. **Configure Env**:
     - Properly configure the .env by looking at the reference from file .env.local in /backend folder
       
  6. **Mongo Configuration**:
     
     - Make the database 'expense-tracker' in mongo-db atlas.
     - Configure network by allowing your IP from the mongo-atlas.
       
  8. **Run Backend and frontend**:
     - Run both in different terminals by using below command.
     ```
     npm start
     ```
