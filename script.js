const wrapper = document.querySelector('.task-card');
const front = document.querySelector('.front');
const btnCreate = document.querySelector('.btnCreate');
const btnClose = document.querySelector('.close');
// const btnColor = document.querySelectorAll('.color');


document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.querySelector("form");
  const taskList = document.getElementById("taskList");
  const totalTaskEl = document.getElementById("total-task");
  const totalCompleteEl = document.getElementById("total-complete");
  const filterBtns = document.querySelectorAll(".filters button");
  const submitBTN = document.querySelector(".submit-btn");



  // For color
  let selectedColor = "#8b24ff"; // pag walang pinili
  const colorOptions = document.querySelectorAll(".color");
  const colorLabel = document.querySelector(".color-label");

  colorOptions.forEach(colorDiv => {
    colorDiv.addEventListener("click", () => {
      colorOptions.forEach(c => c.style.border = "none");
      colorDiv.style.border = "2px solid #000";

      selectedColor = colorDiv.getAttribute("data-color") || colorDiv.style.backgroundColor;
      colorLabel.textContent = `Color Selected`;
    });
  });

  submitBTN.addEventListener('click', ()=>{
    wrapper.classList.remove('active-pop');
    front.classList.remove('active-out');
    taskCard.style.display = "none"; // Hide the form
  });

  // Submit
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // yung mga input na ilalagay
    const name = document.getElementById("taskName").value;
    const desc = document.getElementById("taskDesc").value;
    const deadline = document.getElementById("deadline").value;
    const category = document.getElementById("category").value;

    // Create the Task Item (LI)
    const li = document.createElement("li");
    li.style.backgroundColor = selectedColor;
    li.classList.add("task-item");

    // Build the inner HTML
    li.innerHTML = `
      <div class="task-content">
        <div class="task-header">
          <strong>${name}</strong>
          <span class="category-badge">${category}</span>
          <p>${desc}</p>
          <small>Due: ${new Date(deadline).toLocaleString()}</small>
        </div>
        
        <div class="task-actions">
          <button class="complete">Complete</button>
          <button class="delete-btn">×</button>
        </div>
      </div>
      
    `;

    filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      applyFilter();
    });
  });

  function applyFilter() {
    const activeFilter = document.querySelector(".filters button.active").dataset.filter;
    const tasks = taskList.querySelectorAll(".task-item");

    tasks.forEach(task => {
      const isCompleted = task.classList.contains("completed");

      switch (activeFilter) {
        case "all":
          task.style.display = "flex";
          break;
        case "active":
          task.style.display = isCompleted ? "none" : "flex";
          break;
        case "completed":
          task.style.display = isCompleted ? "flex" : "none";
          break;
      }
    });
  }

    taskList.appendChild(li);

    updateStats();

    taskForm.reset();
    document.querySelector(".task-card").classList.remove("active"); 
    
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        updateStats();
    });

    const checkBtn = li.querySelector(".complete");
    checkBtn.addEventListener("click", () => {
      li.classList.toggle("completed");
      
      if (li.classList.contains("completed")) {
        checkBtn.textContent = "Uncomplete";
      } else {
        checkBtn.textContent = "Complete";
      }
      
      updateStats();
    });
  });

  function updateStats() {
    const total = taskList.querySelectorAll("li").length;
    const completed = taskList.querySelectorAll(".completed").length;
    
    totalTaskEl.textContent = `${total} task${total !== 1 ? 's' : ''}`;
    totalCompleteEl.textContent = `${completed} complete`;
  }

  const btnCreate = document.querySelector(".btnCreate");
  const taskCard = document.querySelector(".task-card");
  const closeBtns = document.querySelectorAll(".close");

  btnCreate.addEventListener("click", () => {
    taskCard.style.display = "block"; // Show the form
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        taskCard.style.display = "none"; // Hide the form
    });
  });
});


// btnColor.forEach(item => {
//   item.addEventListener('click', function() {
//     btnColor.forEach(div => div.classList.remove('active'));
//     this.classList.add('active');
//     document.body.style.backgroundColor = this.dataset.color;
//   });
// });



btnCreate.addEventListener('click', ()=>{
    wrapper.classList.add('active-pop');
    front.classList.add('active-out');
});



btnClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-pop');
    front.classList.remove('active-out');
});

btnColor.addEventListener('click', ()=>{
    btnColor.classList.add('active-pop');
    btnColor.classList.add('active-out');
});



