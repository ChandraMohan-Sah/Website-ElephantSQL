//----------------------------Form Validation and Posting Data to Server------------------------------------
const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  //Inside userForm we have id as name, email, phone. Store them in variables.
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;


  // Validate User Name using regex
  const nameRegex = /^[A-Za-z\s]+$/; //Allow alphabets and spaces only
  if (!nameRegex.test(name)) {
    alert('Invalid name. Please enter only characters and spaces.');
    return;
  }


  // Validate phone number using regex
  const phoneRegex = /^\d{10}$/;  //Allow 10 digit phone number only
  if (!phoneRegex.test(phone)) {
    alert('Invalid phone number. Please enter a 10-digit number.');
    return;
  }

  // Check if email or phone number already exists
  if (isEmailExists(email)) {   //send email variable to function isEmailExists()
    alert('Email already exists. Please enter a unique email.');
    return;
  }

  if (isPhoneExists(phone)) {   //send phone variable to function isPhoneExists()
    alert('Phone number already exists. Please enter a unique phone number.');
    return;
  }


  // Function to check if email already exists
  function isEmailExists(email) {
    const userList = document.getElementById('userList');
    const rows = userList.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      const emailCell = rows[i].getElementsByTagName('td')[1]; //Column selection for email
      if (emailCell.textContent === email) { // checks if the text content of the emailCell matches the provided email.
        return true;  //Email Exists
      }
    }

    return false; //Dont Exists
  }


  // Function to check if phone number already exists
  function isPhoneExists(phone) {
    const userList = document.getElementById('userList');
    const rows = userList.getElementsByTagName('tr'); //Selects rows of userList Table

    for (let i = 0; i < rows.length; i++) {
      const phoneCell = rows[i].getElementsByTagName('td')[2]; //Column selection for phone
      if (phoneCell.textContent === phone) {
        return true;
      }
    }

    return false;
  }


  //save user information in formData context
  const formData = {
    name: name,
    email: email,
    phone: phone
  };



  //Now server side code  ...Connection checks to server through two steps ... // Endpoint then POST Method.
  // i.e in server side checks the function
  // app.post('/users', (req, res) => 

  fetch('/users', //endpoint
  {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json' //
    },
    body: JSON.stringify(formData)
  })
    .then(response => {   //when the request receives a response from server after succesful completion of above statements.
      if (response.ok) {   //Checks if the response status is in the successful range (200-299). xa bhana reset form now
        userForm.reset();
        fetchUsers(); // Fetch updated user data after successful submission
      } else {
        alert('Failed to add user.');
      }
    })
    .catch(error => { //Starts the error handling block, which will be executed if there is an error in the request or response.
      console.error('Error:', error);
    });
});

//---------------------------------------Fetch Information -------------------------------------------------------------------------------------


// Fetch users and populate the table
function fetchUsers() {
  fetch('/users')                            //sends a GET request to the '/users' endpoint
    .then(response => response.json())      //takes the response from the server and parses it as JSON

    .then(users => {
      // Sort the users array alphabetically by name
      users.sort((a, b) => a.name.localeCompare(b.name));
      
      const userList = document.getElementById('userList');
      userList.innerHTML = ''; // Clear previous user data

      users.forEach(user => {   // iterates over each user object in the users array.
        const row = document.createElement('tr');  //creates a new <tr> element to represent a row in the table.

        const nameCell = document.createElement('td');  // creates a new <td> element.  cell is intended to display the name of a user.
        nameCell.textContent = user.name;  // assigns the value of user.name inside content of nameCell

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;

        const phoneCell = document.createElement('td');
        phoneCell.textContent = user.phone; 

        const actionCell = document.createElement('td'); //this also naya Cell

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';                //editButton bhitra Edit lekhdaa
        editButton.className = 'w3-button w3-round w3-teal'; // assigns the CSS
        editButton.addEventListener('click', (event) => {
          editUser(user.id, user.name, user.email); //calls the editUser function with the user's id, name, and email as arguments.
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'w3-button w3-round w3-red'; // Add the class for red color
        deleteButton.addEventListener('click', () => {
          deleteUser(user.id);
        });

        actionCell.appendChild(editButton); //Adds editButton as a child to actionCell
        actionCell.appendChild(document.createTextNode(' ')); // Add a space character to child to actionCell
        actionCell.appendChild(deleteButton); 

        //appends the nameCell, emailCell , phoneCell, actionCell as a child to the row.
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(phoneCell); // Add the phoneCell to the row
        row.appendChild(actionCell);

        //Finally appends row to userList
        userList.appendChild(row);
      });
    })
    
    .catch(error => {
      console.error('Error:', error);
    });
}

//------------------------------------UPDATE FUNCTION---------------------------------------------------------------


// Open the Edit User Modal
function openEditModal(id, name, email) {  //id uthau and assign to variables
  const editForm = document.getElementById('editForm');
  const editNameInput = document.getElementById('editName');
  const editEmailInput = document.getElementById('editEmail');

  // Set the current user data in the modal inputs
  editForm.setAttribute('data-id', id);  //stores the ID of the user being edited
  editNameInput.value = name;
  editEmailInput.value = email;

  // Show the Edit User Modal
  const editModal = document.getElementById('editModal'); //represents the modal element that is being opened.
  editModal.style.display = 'block';  //makes the modal visible by changing its display property
}

// Close the Edit User Modal
function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.style.display = 'none'; //Hides the modal
}

// Handle the edit form submission
function handleEditForm(event) { //event notice garara handles form submission
  event.preventDefault();  //prevents the default behavior of form submission, which would normally cause the page to reload.

  const editForm = event.target; //the code obtains a reference to the form element that was submitted
  const userId = editForm.getAttribute('data-id');
  const newName = document.getElementById('editName').value;
  const newEmail = document.getElementById('editEmail').value;

  fetch(`/users/${userId}`, {
    method: 'PUT',        //to update the user data
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newName, email: newEmail })
  })
    .then(response => {
      if (response.ok) {
        // User updated successfully, close the modal and fetch the updated user list

        closeEditModal(); //close gardau modal lai after successful update
        fetchUsers(); //fetch now
      } else {
        throw new Error('Failed to update user.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Add event listener to the edit form
const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', handleEditForm); //handleEditForm function will be called when the form is submitted

// Update the editUser function
function editUser(id, name, email) {
  openEditModal(id, name, email);
}


//------------------------------------DELETE FUNCTION-----------------------------------------------------------------

// Open the Delete User Modal
function openDeleteModal(id) { 
  const deleteModal = document.getElementById('deleteModal');   // Set the current user id in the modal
  deleteModal.setAttribute('data-id', id);

  // Show the Delete User Modal
  deleteModal.style.display = 'block'; //show modal
}

// Close the Delete User Modal
function closeDeleteModal() {
  const deleteModal = document.getElementById('deleteModal');
  deleteModal.style.display = 'none'; //invisible garda deleteModal lai
}


// Confirm and delete the user
function confirmDeleteUser() {
  const deleteModal = document.getElementById('deleteModal'); //retrieves the DOM element with the ID 'deleteModal'
  const userId = deleteModal.getAttribute('data-id');

  // Send a DELETE request to delete the user
  fetch(`/users/${userId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        // User deleted successfully, close the modal and fetch the updated user list
        closeDeleteModal();
        fetchUsers();
      } else {
        throw new Error('Failed to delete user.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Update the deleteUser function
function deleteUser(id) {
  openDeleteModal(id);
}


//---------------------------------FILTER FUNCTION for searching-------------------------------------------------------------------

// Filter the user list based on search query
function filterUsers() {
  const searchInput = document.getElementById('searchInput');
  const filterValue = searchInput.value.toLowerCase();  //converts the value to lowercase to perform a case-insensitive search.

  const userList = document.getElementById('userList');  
  const rows = userList.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const name = rows[i].querySelector('td:nth-child(1)').textContent.toLowerCase();
    const email = rows[i].querySelector('td:nth-child(2)').textContent.toLowerCase();

    //checks if either the name or email value includes the filterValue. 
    if (name.includes(filterValue) || email.includes(filterValue)) {
      rows[i].style.display = '';     //tyo particular value display gara if matched
    } else {
      rows[i].style.display = 'none'; //else dont display anything if not matched
    }
  }
}

// Add event listener to the search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterUsers);

//---------------------------------------------------------------------------------------------------------

// Call fetchUsers() to populate the table initially
fetchUsers();


//const name = rows[i].querySelector('td:nth-child(1)').textContent.toLowerCase();
// Retrieves the text content of the first 'td' element 
// within the current row of a table (rows[i]). 
// It converts the text content to lowercase and assigns it to the name variable. 
// This allows for consistent and case-insensitive comparison when filtering or searching for names in the user list.