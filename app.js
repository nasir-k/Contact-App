const addContactBtn = document.getElementById("contact-add");

const contactModal = document.getElementById("add-modal");

const backdrop = document.getElementById("backdrop");

const newContactList = document.getElementById("contact-list");

const cancelBtn = contactModal.querySelector(".btn--passive");

const addBtn = cancelBtn.nextElementSibling;

const userInputs = contactModal.querySelectorAll("input");

const enteryText = document.getElementById("entry-text");

const deleteModal = document.getElementById("delete-modal");

const dangerBtn = document.getElementById("btn-danger");

const editContactModal = document.getElementById("edit-contact-modal");

const editModalCancelBtn = document.getElementById("cancel-btn-edit");

const editModalUpdateBtn = document.getElementById("update-btn-edit");

const editModalInputs = editContactModal.querySelectorAll("input");

const addValidAlert = document.querySelectorAll("small");

const editValidAlert = document.querySelectorAll("span");

let successBtn = document.getElementById("btn-success");

let contacts = [];

if (!sessionStorage.getItem("contactsData")) {
  sessionStorage.setItem("contactsData", JSON.stringify(contacts));
} else {
  contacts = JSON.parse(sessionStorage.getItem("contactsData"));
}

let selectedContactForEdit = {};

const resetUi = () => {
  const ToBeDeletedContacts = document.querySelectorAll("li");
  ToBeDeletedContacts.forEach((contact) => newContactList.removeChild(contact));
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeEditContactModal = () => {
  editContactModal.classList.remove("visible");
};

const removeBackdrop = () => {
  clearUsrInputs();
  closeAddContactModal();
  cancelContactDeletion();
  closeEditContactModal();
  // closeContactModal();
};

const clearUsrInputs = () => {
  userInputs.forEach((userinput) =>
    userinput.type === "radio"
      ? (userinput.checked = false)
      : (userinput.value = "")
  );
  addValidAlert.forEach((valiAl, idx) => {
    if (valiAl.className.includes("visible-alert")) {
      addValidAlert[idx].classList.remove("visible-alert");
    }
  });
};

const cancelAddContactModal = () => {
  toggleBackdrop();
  closeAddContactModal();
  clearUsrInputs();
};

const updateUi = () => {
  if (contacts.length == "") {
    enteryText.style.display = "block";
  } else {
    enteryText.style.display = "none";
  }
};

const cancelContactDeletion = () => {
  toggleBackdrop();
  deleteModal.classList.remove("visible");
  updateUi();
};

const deleteContactElement = (contactId) => {
  deleteModal.classList.add("visible");
  toggleBackdrop();
  successBtn.replaceWith(successBtn.cloneNode(true));
  successBtn = document.getElementById("btn-success");
  dangerBtn.addEventListener("click", cancelDeletionModal);
  successBtn.addEventListener(
    "click",
    deleteContactConfirmation.bind(null, contactId)
  );
};

const deleteContactConfirmation = (contactId) => {
  let contactIndex = 0;

  contacts.find(
    (contact, idx) =>
      (contactIndex = contact.id === contactId ? idx : contactIndex)
  );

  contacts.splice(contactIndex, 1);
  sessionStorage.setItem("contactsData", JSON.stringify(contacts));

  const newContactList = document.getElementById("contact-list");
  newContactList.children[contactIndex].remove();
  cancelContactDeletion();
  updateUi();
};

const editModalOperations = (id) => {
  const obj = contacts.find((contact) => (newObject = contact.id === id));
  console.log(obj);
  console.log(editModalInputs);
  editModalInputs[0].value = obj.firstName;
  editModalInputs[1].value = obj.lastName;
  editModalInputs[2].value = obj.image;
  editModalInputs[3].value = obj.email;
  editModalInputs[4].value = obj.phone;
  if (obj.status === "Active") {
    editModalInputs[5].checked = true;
  } else editModalInputs[6].checked = true;
};

const editContactHandler = (obj) => {
  toggleBackdrop();
  editContactModal.classList.add("visible");
  editModalOperations(obj.id);
  selectedContactForEdit = obj;
};

const renderContactElement = () => {
  resetUi();

  contacts.map((contact) => {
    let editId = `edit${Math.random()}`;
    let deleteId = `delete${Math.random()}`;

    const newContactElement = document.createElement("li");
    newContactElement.className = "contact-element";
    newContactElement.innerHTML = `
       <div class="contact-element__image">
       <img src="${
         !contact.image ? "/images/profile-img.jpg" : contact.image
       }" alt="${contact.firstName}"> 
       </div>
       <div class="contact-element__info">
       <h2>${contact.firstName} ${contact.lastName}</h2>
       <p><img src="/assets/email.png"> ${contact.email}</p>
       <p><img src="/assets/phone.png"> ${contact.phone}</p>
       <p>Status : <bold style="color : ${
         contact.status === "Active" ? "green" : "red"
       }">${contact.status}</bold></p>
       <div class="edit-box">
       <div id=${editId} class="btn btn--edit edits">
       <img src="/assets/edit-btn.png"></div>
       <div id=${deleteId} class="btn btn--delete editd"><img src="/assets/delete-btn.png"></i></div>
       </div>
       </div>
      `;

    newContactList.append(newContactElement);
    const deleteBtn = document.getElementById(deleteId);
    deleteBtn.addEventListener("click", () => deleteContactElement(contact.id));
    const editBtn = document.getElementById(editId);
    editBtn.addEventListener("click", () => editContactHandler({ ...contact }));
  });
};

renderContactElement();
updateUi();

const closeAddContactModal = () => {
  contactModal.classList.remove("visible");
};

const addContactModal = () => {
  contactModal.classList.add("visible");
  toggleBackdrop();
};

const formValidation = (
  isUpdateModalInputVisible = false,
  alertMode = false
) => {
  const inputs = isUpdateModalInputVisible ? editModalInputs : userInputs;

  const alert = alertMode ? editValidAlert : addValidAlert;

  for (let i = 0; i < inputs.length; i++) {
    if (i === 2) {
      continue;
    } else if (!inputs[i].value) {
      alert[i].classList.add("visible-alert");
    } else if (i === 5 || i === 6) {
      if (i === 5) {
        if (!inputs[i].checked) {
          alert[5].classList.add("visible-alert");
        } else {
          alert[5].classList.remove("visible-alert");
        }
      } else {
        if (!inputs[i].checked && !inputs[5].checked) {
          alert[5].classList.add("visible-alert");
        } else {
          alert[5].classList.remove("visible-alert");
        }
      }
    } else {
      alert[i].classList.remove("visible-alert");
    }
  }
};

const addContactHandler = () => {
  const firstName = userInputs[0].value;
  const lastName = userInputs[1].value;
  const imageValue = userInputs[2].value;
  const emailValue = userInputs[3].value;
  const phoneNoVal = userInputs[4].value;
  const statusVal = userInputs[5].checked
    ? userInputs[5].value
    : userInputs[6].value;
  console.log(statusVal);

  formValidation();

  for (const validAl of addValidAlert) {
    if (validAl.className.includes("visible-alert")) {
      swal({
        title: "Ooops!",
        text: "Please fill alll mandetory fields *",
        icon: "error",
      });
      return;
    }
  }

  // +phoneNoVal.length > 10 ||
  // +phoneNoVal.length < 10
  // ) {
  //   alert("Please Enter a Valid Input");
  //   return;
  // }
  const newContacts = {
    id: Math.random(),
    firstName,
    lastName,
    image: imageValue,
    email: emailValue,
    phone: phoneNoVal,
    status: statusVal,
  };
  contacts.push(newContacts);

  sessionStorage.setItem("contactsData", JSON.stringify(contacts));

  console.log(contacts);

  closeAddContactModal();
  toggleBackdrop();
  renderContactElement();
  clearUsrInputs();
  updateUi();
};

const cancelDeletionModal = () => {
  deleteModal.classList.remove("visible");
  toggleBackdrop();
};

const editModalUpdateBtnHandler = () => {
  // console.log(contacts);
  const editedContact = { ...selectedContactForEdit };

  console.log(editedContact);
  console.log(contacts);

  editedContact.firstName = editModalInputs[0].value;
  editedContact.lastName = editModalInputs[1].value;
  editedContact.image = editModalInputs[2].value;
  editedContact.email = editModalInputs[3].value;
  editedContact.phone = editModalInputs[4].value;
  editedContact.status =
    editModalInputs[5].checked === true
      ? editModalInputs[5].value
      : editModalInputs[6].value;

  formValidation(true, true);

  for (const validAl of editValidAlert) {
    if (validAl.className.includes("visible-alert")) {
      swal({
        title: "Ooops!",
        text: "Please fill alll mandetory fields *",
        icon: "error",
      });
      return;
    }
  }

  contacts.splice(
    contacts.findIndex((contact) => contact.id === editedContact.id),
    1,
    editedContact
  );

  sessionStorage.setItem("contactsData", JSON.stringify(contacts));

  closeEditContactModal();
  removeBackdrop();

  renderContactElement();
};

const editModalCancelBtnHandler = () => {
  closeEditContactModal();
  removeBackdrop();
};

addContactBtn.addEventListener("click", addContactModal);

backdrop.addEventListener("click", removeBackdrop);

cancelBtn.addEventListener("click", cancelAddContactModal);

addBtn.addEventListener("click", addContactHandler);

editModalCancelBtn.addEventListener("click", editModalCancelBtnHandler);

editModalUpdateBtn.addEventListener("click", editModalUpdateBtnHandler);
