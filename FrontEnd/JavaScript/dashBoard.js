const table = document.querySelector(".User_Dash_board_Table");
const tableBody = document.querySelector(".User_Dash_board_Table tbody");
const edit = document.querySelector(".Edit_Tab");
const add = document.querySelector(".add");

let datas;
async function fetchData() {
  await fetch("../../mock/users.json")
    .then((data) => data.json())
    .then((data) => (datas = data));
  datas.users.forEach((e) => {
    console.log(e);
    append(e);
  });
}

function append(data) {
  let row = document.createElement("tr");
  row.innerHTML = `
            <td>${data.id}</td>
            <td class="img"> <img src="${data.img}" alt=""></td>
            <td>${data.FirstName}</td>
            <td>${data.LastName}</td>
            <td>${data.email}</td>
            <td>${data.password}</td>
            <td class="${data.roll}" > <p>${data.roll}</p></td>
            <td>${data.points}</td>
            <td class="Edit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></td>
            <td class="Delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></td>
    `;
  tableBody.append(row);
}
fetchData();

table.addEventListener("click", (e) => {
  if (e.target.classList[0] == "Delete") {
    tableBody.removeChild(e.target.parentElement);
  }
  if (e.target.classList[0] == "Edit") {
    edit.classList.toggle("hidden");
    const id = e.target.parentElement.children[0].innerText;
    const Fname = e.target.parentElement.children[2].innerText;
    const Lname = e.target.parentElement.children[3].innerText;
    const email = e.target.parentElement.children[4].innerText;
    const password = e.target.parentElement.children[5].innerText;
    const roll = e.target.parentElement.children[6].innerText;
    edit.innerHTML = `
        <h1 id="id">Edit #${id}</h1>
        <div>
          <label for="First_Name">First Name</label>
          <input type="text" value="${Fname}" id="First_Name">
        </div>
        <div>
          <label for="Last_Name">Last Name</label>
          <input type="text" value="${Lname}" id="Last_Name">
        </div>
        <div>
          <label for="E-mail">E-mail</label>
          <input type="text" value="${email}" id="E-mail">
        </div>
        <div>
          <label for="Password">Password</label>
          <input type="text" value="${password}" id="Password">
        </div>
        <div>
          <label for="roll">Roll</label>
          <select name="rolls" id="roll">
            <option value="${roll}">${roll}</option>
            <option value="${roll == "Admin" ? "Employee" : "Admin"}">${
      roll == "Admin" ? "Employee" : "Admin"
    }</option>
          </select>
        </div>
        <button class="BtnEdit">update</button>
        `;
  }
});
function updateRow(id) {
  const fname = edit.querySelector("#First_Name").value;
  const lname = edit.querySelector("#Last_Name").value;
  const email = edit.querySelector("#E-mail").value;
  const password = edit.querySelector("#Password").value;
  const roll = edit.querySelector("#roll").value;

  const rows = document.querySelectorAll(".User_Dash_board_Table tbody tr");
  rows.forEach((row) => {
    if (row.cells[0].innerText === id) {
      row.cells[2].innerText = fname;
      row.cells[3].innerText = lname;
      row.cells[4].innerText = email;
      row.cells[5].innerText = password;
      row.cells[6].querySelector("p").innerHTML = roll;
      row.cells[6].classList.add(roll);
      row.cells[6].classList.remove(roll == "Admin" ? "Employee" : "Admin");
    }
  });

  edit.classList.toggle("hidden");
}

add.addEventListener("click", () => {
  const id = document.querySelectorAll(".User_Dash_board_Table tbody tr").length + 1;
  edit.classList.toggle("hidden");
  edit.innerHTML = `
    <h1 id="id">Add # ${id} </h1>
    <div>
      <label for="First_Name">First Name</label>
      <input type="text" value="" id="First_Name">
    </div>
    <div>
      <label for="Last_Name">Last Name</label>
      <input type="text" value="" id="Last_Name">
    </div>
    <div>
      <label for="E-mail">E-mail</label>
      <input type="text" value="" id="E-mail">
    </div>
    <div>
      <label for="Password">Password</label>
      <input type="text" value="" id="Password">
    </div>
    <div>
      <label for="roll">Roll</label>
      <select name="rolls" id="roll">
      <option value="Employee">Employee</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
    <button class="AddEdit">Add</button>
    `;
});

edit.addEventListener("click", (e) => {
  const id = edit.querySelector("#id").innerHTML.split("#")[1];

  if (e.target.tagName == "BUTTON" && e.target.classList[0] == "BtnEdit") {
    updateRow(id);
    edit.classList.add("hidden");
  }
  if (e.target.tagName == "BUTTON" && e.target.classList[0] == "AddEdit") {
    const fname = edit.querySelector("#First_Name").value;
    const lname = edit.querySelector("#Last_Name").value;
    const email = edit.querySelector("#E-mail").value;
    const password = edit.querySelector("#Password").value;
    const roll = edit.querySelector("#roll").value;

    addRow(fname, lname, email, password, roll);

    edit.classList.add("hidden");
  }
});

function addRow(fname, lname, email, password, roll) {
  const id =
    document.querySelectorAll(".User_Dash_board_Table tbody tr").length + 1;
  let row = document.createElement("tr");
  row.innerHTML = `
          <td>${id}</td>
          <td class="img"> <img src="../../mock/UsersImgs/default.jpg" alt=""></td>
          <td>${fname}</td>
          <td>${lname}</td>
          <td>${email}</td>
          <td>${password}</td>
          <td class="${roll}" > <p>${roll}</p></td>
          <td>0</td>
          <td class="Edit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></td>
          <td class="Delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></td>
  `;
  tableBody.append(row);
}
