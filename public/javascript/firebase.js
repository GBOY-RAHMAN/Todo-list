// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA4a8wnfxiL9y5J1Ft29FfZvRIkJdXj_iE",
  authDomain: "todo-list-ed43b.firebaseapp.com",
  projectId: "todo-list-ed43b",
  storageBucket: "todo-list-ed43b.appspot.com",
  messagingSenderId: "1060442624593",
  appId: "1:1060442624593:web:fd23a46455c255dcb4de70"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = async (taskData) => {
    const colRef = collection(db, 'TaskList');
    const docRef = await addDoc(colRef, { ...taskData, createdAt: new Date(), checked: false });
    console.log("Document wirtten with ID: ", docRef.id);
};

export async function deleteTask(taskId) {
    await deleteDoc(doc(db, "TaskList", taskId));
}

export async function toggleCheck(taskId, checkedStatus) {
    const taskRef = doc(db, "TaskList", taskId);
    await updateDoc(taskRef, { checked: checkedStatus });
}

export function listenForTasks(updateUI) {
    const q = query(collection(db, "TaskList"), orderBy("createdAt"));

    onSnapshot(q, (snapshot) => {
        const tasks = [];
        console.log(snapshot);
        snapshot.forEach((doc) => {
            const task = doc.data();
            task.id = doc.id;
            tasks.push(task);
        });
        updateUI(tasks);
    });
}