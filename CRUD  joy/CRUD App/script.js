 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  set,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
const appSetting = {
  databaseURL: "https://js-crud-2214f-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const usersListInDB = ref(database, "users");

const idEle = document.querySelector("#id");
const nameEle = document.querySelector("#name");
const ageEle = document.querySelector("#Age");
const cityEle = document.querySelector("#City");
const tblBodyEle = document.querySelector("#tblBody");
const form = document.querySelector("#frm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!nameEle.value.trim() || !ageEle.value.trim() || !cityEle.value.trim()) {
    alert("Please fill all fields");
    return;
  }

  if (idEle.value) {
    // Update Record
    set(ref(database, "users/" + idEle.value), {
      name: nameEle.value.trim(),
      age: ageEle.value.trim(),
      city: cityEle.value.trim(),
    });
    clearElements();
    return;
  }

  // Insert Record
  const newUser = {
    name: nameEle.value.trim(),
    age: ageEle.value.trim(),
    city: cityEle.value.trim(),
  };
  push(usersListInDB, newUser);
  clearElements(); // clear
});

function clearElements() {
  nameEle.value = "";
  ageEle.value = "";
  cityEle.value = "";
  idEle.value = "";
}

onValue(usersListInDB, function (snapshot) {
  if (snapshot.exists()) {
    // let userArray = snapshot.val();
    // console.log(userArray);
    let userArray = Object.entries(snapshot.val());
    // console.log(userArray);
    tblBodyEle.innerHTML = "";
    for (let i = 0; i < userArray.length; i++) {
      let currentUser = userArray[i];
      // console.log(currentUser);
      let currentUserID = currentUser[0];
      let currentUserValue = currentUser[1];

      tblBodyEle.innerHTML += `
      <tr>
                <td>${i + 1}</td>
                <td>${currentUserValue.name}</td>
                <td>${currentUserValue.age}</td>
                <td>${currentUserValue.city}</td>
                <td>
                    <button class="btn-edit" data-id="${currentUserID}">
                        <ion-icon name="create-outline" ></ion-icon>
                    </button>
                </td>
                <td>
                    <button class="btn-dlt" data-id="${currentUserID}">
                        <ion-icon name="trash-outline" ></ion-icon>
                    </button>
                </td>
            </tr>
      `;
    }
  } else {
    tblBodyEle.innerHTML = `<tr>
       <td colspan="6" >No Recod Found</td>
       </tr>`;
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    const id = e.target.dataset.id;
    const tdElemens = e.target.closest("tr").children;
    idEle.value = id;
    nameEle.value = tdElemens[1].textContent;
    ageEle.value = tdElemens[2].textContent;
    cityEle.value = tdElemens[3].textContent;

    // console.log("a", id);
  } else if (e.target.classList.contains("btn-dlt")) {
    if (confirm("Are you sure to delete?")) {
      const id = e.target.dataset.id;
      let data = ref(database, `users/${id}`);
      remove(data);
    }
    const id = e.target.dataset.id;
    // console.log("b", id);
  }
});


 

 
