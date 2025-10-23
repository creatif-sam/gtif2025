// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmr_a1BEb8BuliPkG3uT39zI-19mD3rNA",
  authDomain: "gtif2025.firebaseapp.com",
  projectId: "gtif2025",
  storageBucket: "gtif2025.appspot.com",
  messagingSenderId: "600874632947",
  appId: "1:600874632947:web:a433a34884cf967f905986",
  measurementId: "G-G1XWLCV4NW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// start anon sign in
signInAnonymously(auth).catch((e) => {
  console.error("Anon sign in failed:", e);
});

// wait for auth state with a timeout so it never hangs
export const ready = () =>
  new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const stop = onAuthStateChanged(auth, (user) => {
      if (user) {
        stop();
        finish();
      } else {
        // try again
        signInAnonymously(auth).catch(() => {});
      }
    });
    setTimeout(finish, 4000);
  });

export async function saveRegistration(data, photoFile) {
  await ready();

  const regRef = doc(collection(db, "registrations"));
  let photoUrl = "";

  if (photoFile) {
    const ext = photoFile.name.split(".").pop() || "jpg";
    const photoRef = ref(storage, `photos/${regRef.id}.${ext}`);
    await uploadBytes(photoRef, photoFile);
    photoUrl = await getDownloadURL(photoRef);
  }

  await setDoc(regRef, {
    ...data,
    photoUrl,
    createdAt: serverTimestamp(),
  });

  return { id: regRef.id, photoUrl };
}

export { db, storage };
