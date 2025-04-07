# 👩‍🏫🧑‍💻 Teacher-Student Code Classroom

A real-time collaborative coding platform designed for virtual classrooms. Teachers can host sessions, share their live editor with students, and monitor or assist student code individually — all in real time.

---

## 🚀 Features

- 🧑‍🏫 **Teacher View**
  - Host a classroom session with a unique room ID
  - Share code editor live with all students
  - View and edit any student's code in real-time

- 🧑‍🎓 **Student View**
  - Join classroom with room ID
  - View teacher’s editor live
  - Work on their own code privately
  - Only the teacher can see and assist with student code

- ⚡ **Real-time Collaboration**
  - Powered by **Socket.IO**
  - Live sync of editor content
  - Separate teacher broadcast and student communication channels

---

## 🧱 Tech Stack

- **Frontend:** React 
- **Backend:** Node.js with Socket.IO
- **Editor:** Monaco Editor (or compatible)
- **Styling:** Tailwind CSS (Web) 

---

## 📸 Screenshots

![Screenshot from 2025-03-02 23-56-02](https://github.com/user-attachments/assets/2bb25379-cfa7-4160-941b-7257d8009701)
![Screenshot from 2025-03-02 23-55-55](https://github.com/user-attachments/assets/d8e22465-2324-4e1f-a076-0fef35c6861f)
![Screenshot from 2025-03-26 02-43-37](https://github.com/user-attachments/assets/d6522b77-510a-4419-a385-5356e2e9f821)
![Screenshot from 2025-03-26 02-43-26](https://github.com/user-attachments/assets/8292ccc4-9821-4f80-9b71-fef15f56a2aa)

---

## 🛠 Installation

# Clone the repository
git clone https://github.com/ayushmishra/teacher-student-code-classroom.git
cd teacher-student-code-classroom

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start the backend server
cd ../server
npm run dev

# Start the frontend app
cd ../client
npm start

---

🧪 Usage

Teacher opens the app and creates a session.
Students join the session using the room ID.
Live sync begins
Teacher’s editor is broadcasted.
Students work privately.
Teacher can view/edit student code on click.

---

🧠 Architecture

Client (Teacher & Students)
       |
    Socket.IO
       |
  Node.js Server (Socket Hub)
       |
   Code Sync & Session Logic

---

💡 Future Enhancements:

Syntax highlighting for multiple languages
Doubt-solving chat or raise hand system
Video/audio call integration
Role-based login with authentication
Save session history or export code

---

🙌 Acknowledgements:

Socket.IO
Monaco Editor
React
Tailwind CSS

---

📄 License
This project is licensed under the MIT License.
Feel free to fork, modify, and contribute!

---

🔗 Connect
Made with ❤️ by Ayush Mishra
📧 mishrayush.28@gmail.com
🌐 ayush-mishra-b13353265

---
