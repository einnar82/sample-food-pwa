var firebaseConfig = {
  apiKey: "AIzaSyA-1vzMmTDNS0CMluqSqZEwiUmMlQecF08",
  authDomain: "sample-food-pwa.firebaseapp.com",
  databaseURL: "https://sample-food-pwa.firebaseio.com",
  projectId: "sample-food-pwa",
  storageBucket: "sample-food-pwa.appspot.com",
  messagingSenderId: "160229664245",
  appId: "1:160229664245:web:b5a4a30fc1234f1e9dacbc",
  measurementId: "G-RNPTTQJQSM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.enablePersistence().catch(err => {
  if (err.code === "failed-precondition") {
    console.log("persistence failed");
  }

  if (err.code === "unimplemented") {
    console.log("persistence not available");
  }
});

db.collection("recipes").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      removeRecipe(change.doc.id);
    }
    console.log(change.doc.data());
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", evt => {
  evt.preventDefault();
  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection("recipes")
    .add(recipe)
    .catch(err => {
      console.log(err);
    });

  form.title.value = "";
  form.ingredients.value = "";
});

const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", evt => {
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    db.collection("recipes")
      .doc(id)
      .delete();
  }
  console.log(evt);
});
