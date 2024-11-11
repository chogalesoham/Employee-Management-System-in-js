(async function () {
  let res = await fetch("data.json");
  let EmployeeData = await res.json();
  console.log(EmployeeData);

  let selectedEmployeeId = EmployeeData[0].id;
  let selectedEmployee = EmployeeData[0];

  const EmployeeList = document.querySelector(".employee-list-box");
  const EmployeeInfo = document.querySelector(".employee-info-box");

  // Add Employee Logic
  const createEmployeeButton = document.querySelector(".createEmployeeButton");
  const addEmployeeForm = document.querySelector(".create-employee-form");
  const createEmployeeModel = document.querySelector(".add-employee-main");

  createEmployeeButton.addEventListener("click", () => {
    createEmployeeModel.style.display = "flex";
  });

  createEmployeeModel.addEventListener("click", (e) => {
    if (e.target.className === "add-employee-main") {
      createEmployeeModel.style.display = "none";
    }
  });

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const value = [...formData.entries()];
    // console.log(value);
    let empData = {};

    value.forEach((val) => {
      empData[val[0]] = val[1];
    });

    empData.id = EmployeeData[EmployeeData.length - 1].id + 1;
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/21/21104.png";

    EmployeeData.push(empData);
    displyEmployee();
    addEmployeeForm.reset();
    createEmployeeModel.style.display = "none";
  });

  // Selected Employee Logic
  EmployeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      displyEmployee();
      displySigaleEmployee();
    }

    // Delete Employee
    if (e.target.tagName === "I") {
      const employeeId = e.target.parentNode.id;
      EmployeeData = EmployeeData.filter(
        (emp) => String(emp.id) !== employeeId
      );

      // Update selected employee if the deleted employee was selected
      if (String(selectedEmployeeId) === employeeId) {
        selectedEmployeeId = EmployeeData[0]?.id || -1;
        selectedEmployee = EmployeeData[0] || {};
        displySigaleEmployee();
      }

      displyEmployee();
    }
  });

  //Disply Employee Logic

  const displyEmployee = () => {
    EmployeeList.innerHTML = "";
    EmployeeData.forEach((emp) => {
      const Employee = document.createElement("li");
      Employee.classList.add("singal-employee");

      Employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="fa-solid fa-xmark"></i>`;
      if (parseInt(selectedEmployeeId) === emp.id) {
        Employee.classList.add("selected");
        selectedEmployee = emp;
      }
      Employee.setAttribute("id", emp.id);
      EmployeeList.append(Employee);
    });
  };

  displyEmployee();

  const displySigaleEmployee = () => {
    EmployeeInfo.innerHTML = `
    <img src=${selectedEmployee.imageUrl}>  
      <p>Name: ${selectedEmployee.firstName} ${selectedEmployee.lastName}</p>
      <p>Email:${selectedEmployee.email}</p>
      <p>Phone:${selectedEmployee.contactNumber}</p>
    <div>
      <span>Age : ${selectedEmployee.age}</span>
      <span>Salary : ${selectedEmployee.salary}K</span>
    </div>
    <p>Address : ${selectedEmployee.address}</p>`;
  };

  displySigaleEmployee();
})();
