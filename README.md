npm install mongoose body-parser bcrypt ejs

//index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin_user_db', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// User schema
const userSchema = new mongoose.Schema({
username: { type: String, required: true },
password: { type: String, required: true },
role: { type: String, required: true, default: 'user' }
});

// User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for user login
app.post('/login', async (req, res) => {
const { username, password } = req.body;

// Find user in the database
const user = await User.findOne({ username });

if (!user) {
return res.status(404).send('User not found');
}

// Compare passwords
const validPassword = await bcrypt.compare(password, user.password);

if (!validPassword) {
return res.status(400).send('Invalid password');
}

// Redirect based on user role
if (user.role === 'admin') {
res.redirect('/admin');
} else {
res.redirect('/user');
}
});

// Route for admin page
app.get('/admin', (req, res) => {
res.render('admin', { username: req.query.username });
});

// Route for user page
app.get('/user', (req, res) => {
res.render('user', { username: req.query.username });
});

// Set up view engine and start server
app.set('view engine', 'ejs');
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

//admin.ejs

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Page</title>
</head>
<body>
    <h1>Welcome <%= username %>!</h1>
    <p>This is the admin page.</p>
</body>
</html>

// user.ejs

<script>
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', async (ev) => {
            ev.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;


            const response = await axios.post('/login', {
                username,
                password
            });


            if (response.ok) {
                const data = await response.json();
                const token = data.token;


                const profileResponse = await axios.get('/profile', {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    }
                });
                
                console.log(profileResponse);


            } else {
                console.error(response.statusText);
            }
        });
    </script>

                    <!-- <h1>Welcome <%= username %>!</h1> -->




                    const delRole = async (id) => {

try {
const del = await axios.delete(`/deleteRole?id=${id}`);
if (del) {
alert("Deleted!!");
}
} catch (error) {
console.log(error);
alert(error);
}
};const deleteRole = async (req, res) => {
const { id } = req.query;
try {
const del = await roleModel.findByIdAndDelete(id);

    if (!del) return res.status(401).send("No");

    res.status(200).json({ message: "Role Deleted Succesfully" });

} catch (error) {
res.json({ "error is": error });
}
};

<!-- Add Bootstrap CSS and JS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl7/1L_dstPt3HV5HzF6Gvk/e9T9hXmJ58bldgTk+"
  crossorigin="anonymous"
/>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz4fnFO9gybB5IXNxFwWQfE7u8Lj+XJHAxKlXiG/8rsrtpb6PEdzD828Ii" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>

<!-- Add Bootstrap modal -->

const updateRole = async (id, active) => {
try {
const updatedRole = await axios.patch(`/updateRole/${id}`, { active });
if (updatedRole) {
if (!alert("Updated!!")) {
window.location.reload();
}
}
} catch (error) {
console.log(error);
alert(error);
}
};

<!-- Add Bootstrap modal -->
<div
  class="modal fade"
  id="updateModal"
  tabindex="-1"
  aria-labelledby="updateModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="updateModalLabel">Update Role</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        Role: <span id="roleToUpdate"></span>
        <br />
        Active Status:
        <select id="activeStatusToUpdate">
          <option value="1">on</option>
          <option value="0">off</option>
        </select>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button id="confirmUpdateBtn" type="button" class="btn btn-primary">
          Update
        </button>
      </div>
    </div>
  </div>
</div>

deleteBtn.addEventListener("click", () => {
// Set the role and active status in the update modal
document.getElementById("roleToUpdate").innerText = item[1].role;
document.getElementById("activeStatusToUpdate").value = item[1].active;

// Show the update modal
var updateModal = new bootstrap.Modal(document.getElementById("updateModal"));
updateModal.show();

// Add an event listener to the confirm update button
const confirmUpdateBtn = document.getElementById("confirmUpdateBtn");
confirmUpdateBtn.addEventListener("click", () => {
updateRole(item[1].\_id, document.getElementById("activeStatusToUpdate").value);
updateModal.hide();
});
});

 <div
      class="modal fade"
      id="updateModal"
      tabindex="-1"
      aria-labelledby="updateModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">Update Role</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Role: <span id="roleToUpdate"></span>
            <br />
            Active Status:
            <select id="activeStatusToUpdate">
              <option value="1">on</option>
              <option value="0">off</option>
            </select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button id="confirmUpdateBtn" type="button" class="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

{
"username": "user1",
"password": "pass1",
"email": "user1@mail.com",
"gender": "male",
"age": 25,
"role": "user"
}

{
"username": "user2",
"password": "pass2",
"email": "user2@mail.com",
"gender": "female",
"age": 30,
"role": "user"
}

{
"username": "user3",
"password": "pass3",
"email": "user3@mail.com",
"gender": "non-binary",
"age": 35,
"role": "user"
}
{
"username": "admin1",
"password": "pass4",
"email": "admin1@mail.com",
"gender": "male",
"age": 40,
"role": "admin"
}

{
"username": "admin2",
"password": "pass5",
"email": "admin2@mail.com",
"gender": "female",
"age": 45,
"role": "admin"
}

{
"username": "guest1",
"password": "pass6",
"email": "guest1@mail.com",
"gender": "male",
"age": 50,
"role": "guest"
}

{
"username": "guest2",
"password": "pass7",
"email": "guest2@mail.com",
"gender": "female",
"age": 55,
"role": "guest"
}

{
"username": "staff1",
"password": "pass8",
"email": "staff1@mail.com",
"gender": "non-binary",
"age": 60,
"role": "staff"
}

{
"username": "instructor1",
"password": "pass10",
"email": "instructor1@mail.com",
"gender": "female",
"age": 70,
"role": "instructor"
}

<div class="border border-dashed border-2 border-danger"></div>

// for (let i = data.length - 1; i >= 0; i--) {
// const item = data[i];
// const userRow = document.createElement("tr");
// const username = document.createElement("th");
// username.textContent = item.username;
// userRow.append(username);

        //     const email = document.createElement("th");
        //     email.textContent = item.email;
        //     userRow.append(email);

        //     const gender = document.createElement("th");
        //     gender.textContent = item.gender;
        //     userRow.append(gender);

        //     const age = document.createElement("th");
        //     age.textContent = item.age;
        //     userRow.append(age);

        //     const role = document.createElement("th");
        //     role.textContent = item.role;
        //     userRow.append(role);

        //     const updateBtn = document.createElement("button");
        //     updateBtn.textContent = "Update";
        //     updateBtn.classList.add("btn-primary");
        //     updateBtn.classList.add("p-1");

        //     userRow.appendChild(updateBtn);
        //     userRow.appendChild(document.createTextNode(" "));

        //     const deleteBtn = document.createElement("button");
        //     deleteBtn.textContent = "Delete  ";
        //     deleteBtn.classList.add("btn-danger");
        //     deleteBtn.classList.add("p-1");
        //     userRow.appendChild(deleteBtn);
        //     usersAll.appendChild(userRow);

        // }






        const openModal = async (obj) => {
        const userDetails = await getUserDetails(obj);
        const t = JSON.stringify(userDetails);
        localStorage.setItem("user", t);
        var myModal = new bootstrap.Modal(
          document.getElementById("exampleModal"),
          {
            keyboard: false,
          }
        );
        myModal.show();
      };



      const modal = document.getElementById("exampleModal");
      const closeButton = modal.querySelector("button.close");

      closeButton.addEventListener("click", function () {
        localStorage.removeItem("user");
      });

      modal.addEventListener("hide.bs.modal", function () {
        localStorage.removeItem("user");
      });

      document
        .querySelector("#exampleModal .modal-content")
        .addEventListener("click", function (event) {
          localStorage.removeItem("user");
        });

const getUserDetails = async (obj) => {
const res = await axios.get(`/getOneUser/${obj}`);

        return res;
      };

document.addEventListener("DOMContentLoaded", async function () {
const rolesResponse = await axios.get("/getRoles");
const roles = rolesResponse.data;

        console.log(roles);

        const roleSelect = document.getElementById("role");
        roles.forEach((role) => {
          const option = document.createElement("option");
          option.value = role.role;
          option.textContent = role.role;
          roleSelect.appendChild(option);
        });
      });

navbar

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body>
    <div class="">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>

            </div>

        </nav>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
            integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
            integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
            crossorigin="anonymous"></script>
    </div>

</body>

</html>

<div class="mb-3">
          <label for="role" class="form-label">Role</label>
          <select
            id="role"
            class="form-select col-sm-7"
            aria-label="Default select example"
          ></select>
        </div>

const displayData = async () => {
// Existing code...

    const totalPages = Math.ceil(data.length / pageSize);

    let start = (curPage - 1) * pageSize;
    let end = curPage * pageSize;
    let result = "";
    data
      .filter((row, index) => index >= start && index < end)
      .forEach((c, index) => {
        // Rendering logic for table rows
        result += `<tr>...</tr>`;
    });
    table.innerHTML = result;

    // Generate and update the page number buttons
    const pageNumbersContainer = document.querySelector("#pageNumbers");
    let pageNumbersHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      pageNumbersHTML += `<button class="pageNumber" data-page="${i}">${i}</button>`;
    }
    pageNumbersContainer.innerHTML = pageNumbersHTML;

    // Add event listeners for page number buttons
    const pageNumberButtons = document.querySelectorAll(".pageNumber");
    pageNumberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        curPage = parseInt(button.dataset.page);
        displayData();
      });
    });

};

displayData()

let flag = false;
if (permissions.length === 0) {
document.getElementById("addUserLink").style.display =
"inline-block";
document.getElementById("addUserButton").style.display = "none";
document.getElementById("addRoleLink").style.display =
"inline-block";
document.getElementById("addRoleButton").style.display = "none";
document.getElementById("uDLink").style.display = "inline-block";
document.getElementById("uDButton").style.display = "none";
document.getElementById("moreDetailsLink").style.display =
"inline-block";
document.getElementById("moreDetailsButton").style.display = "none";
}

          for (let i = 0; i < permissions.length && flag === false; i++) {
            if (permissions[i] === "allowAll") {
              document.getElementById("addUserLink").style.display =
                "inline-block";
              document.getElementById("addUserButton").style.display = "none";
              document.getElementById("addRoleLink").style.display =
                "inline-block";
              document.getElementById("addRoleButton").style.display = "none";
              document.getElementById("uDLink").style.display = "inline-block";
              document.getElementById("uDButton").style.display = "none";
              document.getElementById("moreDetailsLink").style.display =
                "inline-block";
              document.getElementById("moreDetailsButton").style.display =
                "none";
              flag = true;
            }
          }

          if (permissions.length < 2 && !flag) {
            if (permissions.length === 1) {
              if (permissions[i] === "allowDisplay") {
                document.getElementById("addUserLink").style.display = "none";
                document.getElementById("addUserButton").style.display =
                  "inline-block";
                document.getElementById("addRoleLink").style.display = "none";
                document.getElementById("addRoleButton").style.display =
                  "inline-block";
                document.getElementById("uDLink").style.display = "none";
                document.getElementById("uDButton").style.display =
                  "inline-block";
                document.getElementById("moreDetailsLink").style.display =
                  "inline-block";
                document.getElementById("moreDetailsButton").style.display =
                  "none";
              } else if (permissions[i] === "allowEdit") {
                document.getElementById("addUserLink").style.display = "none";
                document.getElementById("addUserButton").style.display =
                  "inline-block";
                document.getElementById("addRoleLink").style.display = "none";
                document.getElementById("addRoleButton").style.display =
                  "inline-block";
                document.getElementById("uDLink").style.display =
                  "inline-block";
                document.getElementById("uDButton").style.display = "none";
                document.getElementById("moreDetailsLink").style.display =
                  "inline-block";
                document.getElementById("moreDetailsButton").style.display =
                  "none";
              }
            } else {
              document.getElementById("addUserLink").style.display = "none";
              document.getElementById("addUserButton").style.display =
                "inline-block";
              document.getElementById("addRoleLink").style.display = "none";
              document.getElementById("addRoleButton").style.display =
                "inline-block";
              document.getElementById("uDLink").style.display = "inline-block";
              document.getElementById("uDButton").style.display = "none";
              document.getElementById("moreDetailsLink").style.display =
                "inline-block";
              document.getElementById("moreDetailsButton").style.display =
                "none";
            }
          }
        } else {
          document.body.style.display = "none";
        }
