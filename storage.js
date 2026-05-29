import { seedPosts } from "./data.js";
import { USE_FIREBASE, firebaseConfig } from "./firebase.js";

const LOCAL_KEY = "benchmark_extra_posts_v4";

async function firebaseHelpers(){
  if(!USE_FIREBASE) return null;
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
  const { getFirestore, collection, addDoc, getDocs, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { db, collection, addDoc, getDocs, serverTimestamp };
}

export async function getPosts(){
  const fb = await firebaseHelpers();
  if(fb){
    const snap = await fb.getDocs(fb.collection(fb.db, "posts"));
    return [...seedPosts, ...snap.docs.map(d => ({ id:d.id, ...d.data() }))];
  }
  const extra = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  return [...seedPosts, ...extra];
}

export async function addPost(post){
  const fb = await firebaseHelpers();
  const clean = {...post, views:+post.views||0, likes:+post.likes||0, comments:+post.comments||0, shares:+post.shares||0};
  if(fb){
    await fb.addDoc(fb.collection(fb.db, "posts"), {...clean, createdAt: fb.serverTimestamp()});
    return;
  }
  const extra = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  extra.push({...clean, id:crypto.randomUUID(), source:"Admin"});
  localStorage.setItem(LOCAL_KEY, JSON.stringify(extra));
}

export function usingFirebase(){
  return USE_FIREBASE;
}
