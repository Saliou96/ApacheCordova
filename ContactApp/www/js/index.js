document.addEventListener("deviceready", loadContacts, false);

function loadContacts() {
  // Cordova is now initialized. Have fun!
  let opt = new ContactFindOptions();
  opt.multiple = true;
  opt.hasPhoneNumber = true;
  let fields = ["id"];

  navigator.contacts.find(fields, showContacts, handleContactError, opt);
}

function showContacts(contacts) {
  const contactList = document.getElementById("contactList");

  let contactItem;
  // let contactHtml = "";
  for (const item of contacts) {
    contactItem = document.createElement("li");
    contactItem.innerHTML = `
        <a href="#contact-show">
          <img src="img/contact.png" />
          <h2>${item.name.formatted}</h2>
          <p>${item.phoneNumbers[0].value}</p>
        </a>`;

    contactItem.onclick = function () {
      getContact(item.id);
    };
    contactList.appendChild(contactItem);
  }

  // contactList.innerHTML = contactHtml;
  $(contactList).listview("refresh");
}

function handleContactError(error) {
  console.log("====================================");
  console.log("Error while getting contacts list");
  console.log(error);
}

function getContact(contactId) {
  let options = new ContactFindOptions();
  options.filter = contactId;
  options.multiple = false;
  options.hasPhoneNumber = true;
  let fields = ["id"];

  navigator.contacts.find(fields, showContact, handleContactError, options);
}

function showContact(contacts) {
  let contact = contacts[0];
  let contactInfo = `
  <li>
    <img src="../img/contact.png" height="100" width="100"  alt="">
  </li>
      <li>
          <h1>Nom du Contact</h1>
          <p>${contact.name.formatted}</p>
      </li>
      <li>
          <h1>Numéros de téléphone</h1>`;
            for (const phoneNumber of contact.phoneNumbers) {
              contactInfo += `${phoneNumber.value}`;
            }

            contactInfo += `

      </li>
      <li>
          <h1>Email</h1>
          <p>${contact.emails ? contact.emails[0].value : "Non renségné"}</p>
      </li>
      <li>
          <h1>Adresse</h1>
          <p>${
            contact.addresses ? contact.addresses[0].formatted : "Non renségné"
          }</p>
      </li>
      <li>
          <h1>Organisations</h1>
          <p>${
            contact.organizations
              ? contact.organizations[0].name
              : "Non renségné"
          }</p>
      </li>
  `;

  const DetailsContact = document.getElementById("detail");
  DetailsContact.innerHTML = contactInfo;
  $(DetailsContact).listview("refresh");
}
