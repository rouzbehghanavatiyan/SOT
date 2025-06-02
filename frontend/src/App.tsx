import "./services/axios";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import EditVideo from "./common/EditVideo";
import LearningSot from "./pages/LearningSot";
import { useServiceWorker } from "./hooks/useServiceWorker";
const publicKey: string | undefined = import.meta.env.VITE_PUBLIC_KEY;

function App() {
  useServiceWorker();
  const handleSubscribe = async () => {
    try {
      const permission = await Notification.requestPermission();
      console.log("Permission status:", permission);

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey, // کلید عمومی VAPID خود را اینجا قرار دهید
        });

        // ارسال subscription به سرور
        console.log("Push subscription:", subscription);
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
    }
  };

  return (
    <>
      {/* <div className="notification-container">
        <button onClick={handleSubscribe} className="enable-notifications-btn">
          Enable Notifications
        </button>
      </div> */}

      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        {/* <Route path="/editVideos" element={<EditVideo />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/learningSot" element={<LearningSot />} />
        <Route path="/signUp" element={<SignUpForm />} />
      </Routes>
    </>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import { db } from "./firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";

// function App() {
//   const [text, setText] = useState("");
//   const [posts, setPosts] = useState([]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const res = await addDoc(collection(db, "posts"), {
//         text,
//         createdAt: new Date(),
//       });
//       console.log(res);

//       alert("پست ذخیره شد!");
//       setText("");
//     } catch (error: any) {
//       alert("خطا: " + error.message);
//     }
//   };

//   const fetchPosts = async () => {
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     const postsData: any = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setPosts(postsData);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h1>تست Firebase Firestore در React</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="متن پست"
//         />
//         <button type="submit">ارسال</button>
//       </form>
//       <ul>
//         {posts.map((post: any) => (
//           <li key={post.id}>{post.text}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
