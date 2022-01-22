const addContactBtn = document.getElementById("contact-add");

const contactModal = document.getElementById("add-modal");

const backdrop = document.getElementById("backdrop");

const cancelBtn = contactModal.querySelector(".btn--passive");

const addBtn = cancelBtn.nextElementSibling;

const userInputs = contactModal.querySelectorAll("input");

const enteryText = document.getElementById("entry-text");

const deleteModal = document.getElementById("delete-modal");

const dangerBtn = document.getElementById("btn-danger");

const editContactModal = document.getElementById("edit-contact-modal");

let successBtn = document.getElementById("btn-success");

const contacts = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeContactModal = () => {
  editContactModal.classList.remove("visible");
};

const removeBackdrop = () => {
  clearUsrInputs();
  closecontactModal();
  cancelContactDeletion();
  closecontactModal();
  closeContactModal();
};

const clearUsrInputs = () => {
  for (const usrInput of userInputs) {
    if (usrInput.type === "radio") {
      usrInput.checked = false;
    } else {
      usrInput.value = "";
    }
  }
};

const cancelContactModal = () => {
  toggleBackdrop();
  closecontactModal();
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
  for (const contact of contacts) {
    if (contact.id === contactId) {
      break;
    }
    contactIndex++;
  }
  contacts.splice(contactIndex, 1);
  const newContactList = document.getElementById("contact-list");
  newContactList.children[contactIndex].remove();
  cancelContactDeletion();
  updateUi();
};
//------------------------  Edit Contact ----------------------//

const editContactHandler = (contId) => {
  const selectedContact = contacts.filter((el) => el.id === contId);
  console.log(selectedContact);
  editContactModal.classList.add("visible");
  toggleBackdrop();
};

//------------------------  Edit Contact ----------------------//

const renderContactElement = (
  id,
  firstName,
  lastName,
  imageUrl,
  emailAdd,
  phoneNo,
  status
) => {
  const editId = `edit${Math.random()}`;
  const deleteId = `delete${Math.random()}`;

  const newContactElement = document.createElement("div");
  newContactElement.className = "contact-element";
  newContactElement.innerHTML = `
       <div class="contact-element__image">
       <img src="${imageUrl}" alt="${firstName}">
       </div>
       <div class="contact-element__info">
       <h2>${firstName} ${lastName}</h2>
       <h4 style= "color:${
         status === "Active" ? "green" : "red"
       }">${status}</h4>
       <p>${emailAdd}</p>
       <p>${phoneNo}</p>
       <div>
       <button class="btn btn--success nasir" id=${editId}>Edit</button>
       <button class="btn btn--danger" id=${deleteId}>Delete</button>
       </div>
       </div>
      `;
  const newContactlist = document.getElementById("contact-list");
  newContactlist.append(newContactElement);
  const deleteBtn = document.getElementById(deleteId);
  deleteBtn.addEventListener("click", deleteContactElement.bind(null, id));
  const editBtn = document.getElementById(editId);
  editBtn.addEventListener("click", editContactHandler);
};

const closecontactModal = () => {
  contactModal.classList.remove("visible");
};

const addcontactModal = () => {
  contactModal.classList.add("visible");
  toggleBackdrop();
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

  if (
    firstName === "" ||
    imageValue === "" ||
    lastName === "" ||
    emailValue === "" ||
    +phoneNoVal < 1 ||
    +phoneNoVal.length > 10 ||
    +phoneNoVal.length < 10
  ) {
    alert("Please Enter a Valid Input");
    return;
  }
  let newContacts = {
    id: Math.random(),
    firstName,
    lastName,
    image: imageValue,
    email: emailValue,
    phone: phoneNoVal,
    status: statusVal,
  };
  contacts.push(newContacts);
  console.log(contacts);

  closecontactModal();
  toggleBackdrop();
  renderContactElement(
    newContacts.id,
    newContacts.firstName,
    newContacts.lastName,
    newContacts.image,
    newContacts.email,
    newContacts.phone,
    newContacts.status
  );
  clearUsrInputs();
  updateUi();
};

const cancelDeletionModal = () => {
  deleteModal.classList.remove("visible");
  toggleBackdrop();
};

addContactBtn.addEventListener("click", addcontactModal);

backdrop.addEventListener("click", removeBackdrop);

cancelBtn.addEventListener("click", cancelContactModal);

addBtn.addEventListener("click", addContactHandler);
