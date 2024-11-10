(async function () {
  let res = await fetch("data.json");
  let EmployeeData = await res.json();
  console.log(EmployeeData);

  let selectedEmployeeId = EmployeeData[0].id;
  let selectedEmployee = EmployeeData[0];

  const EmployeeList = document.querySelector(".employee-list-box");
  const EmployeeInfo = document.querySelector(".employee-info-box");

  // Add Employee Logic

  // Select Employee Logic
  EmployeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      displyEmployee();
      displySigaleEmployee();
    }
  });

  //Disply Employee Logic

  const displyEmployee = () => {
    EmployeeList.innerHTML = "";
    EmployeeData.forEach((emp) => {
      const Employee = document.createElement("li");
      Employee.classList.add("singal-employee");

      Employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="fa-solid fa-xmark"></i>`;

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        Employee.classList.add("selected");
        selectedEmployee = emp;
      }

      Employee.setAttribute("id", emp.id);
      EmployeeList.append(Employee);
    });
  };

  displyEmployee();

  const displySigaleEmployee = () => {
    console.log("hello");
  };
})();
