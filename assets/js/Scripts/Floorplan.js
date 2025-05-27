// 1).Img-map functions
const floorPlan = document.getElementById("floor-plan");
const viewerContainer = document.querySelector(".viewer-container");

let scale = 1; // Initial zoom scale
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

if (floorPlan) {
  // Prevent default drag behavior
  floorPlan.addEventListener("dragstart", (e) => e.preventDefault());

  // Zoom In
  document.getElementById("zoom-in").addEventListener("click", () => {
    scale += 0.2;
    constrainPosition();
    updateTransform();
  });

  // Zoom Out
  document.getElementById("zoom-out").addEventListener("click", () => {
    scale = Math.max(1, scale - 0.2); // Minimum scale of 1
    constrainPosition();
    updateTransform();
  });

  // Reset
  document.getElementById("reset").addEventListener("click", () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  });

  // Drag Start
  floorPlan.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    floorPlan.style.cursor = "grabbing";
  });

  // Dragging
  floorPlan.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    constrainPosition();
    updateTransform();
  });

  // Drag End
  floorPlan.addEventListener("mouseup", () => {
    isDragging = false;
    floorPlan.style.cursor = "grab";
  });

  floorPlan.addEventListener("mouseleave", () => {
    isDragging = false;
    floorPlan.style.cursor = "grab";
  });

  // Constrain Position to avoid gaps
  function constrainPosition() {
    const containerRect = viewerContainer.getBoundingClientRect();
    const imageWidth = floorPlan.width * scale;
    const imageHeight = floorPlan.height * scale;

    const minTranslateX = Math.min(0, (containerRect.width - imageWidth) / 2);
    const maxTranslateX = Math.max(0, (imageWidth - containerRect.width) / 2);
    const minTranslateY = Math.min(0, (containerRect.height - imageHeight) / 2);
    const maxTranslateY = Math.max(0, (imageHeight - containerRect.height) / 2);

    translateX = Math.min(maxTranslateX, Math.max(minTranslateX, translateX));
    translateY = Math.min(maxTranslateY, Math.max(minTranslateY, translateY));
  }

  // Apply Transform
  function updateTransform() {
    floorPlan.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }
}


      //2). check-box function
    
    const mainCheckbox = document.getElementById("mainCheckbox");
    const checkbox1 = document.getElementById("checkbox1");
    const checkbox2 = document.getElementById("checkbox2");
    const checkbox3 = document.getElementById("checkbox3");
    const checkbox4 = document.getElementById("checkbox4");
    const checkbox5 = document.getElementById("checkbox5");

    // Store the initial states of the below checkboxes
if(mainCheckbox){
    let initialState = {
      checkbox1: checkbox1.checked,
      checkbox2: checkbox2.checked,
      checkbox3: checkbox3.checked,
      checkbox4: checkbox4.checked,
      checkbox5: checkbox5.checked,
    };

    // Initially set the state of the below checkboxes to true if main checkbox is checked
    if (mainCheckbox.checked) {
      checkbox1.checked = true;
      checkbox2.checked = true;
      checkbox3.checked = false;
      checkbox4.checked = false;
      checkbox5.checked =false;
    }

    mainCheckbox.addEventListener("change", () => {
      if (mainCheckbox.checked) {
        // If main checkbox is checked, set the below checkboxes to true
        checkbox1.checked = true;
        checkbox2.checked = true;
        checkbox3.checked = false;
        checkbox4.checked = false;
        checkbox5.checked = false;
      } else {
        // If main checkbox is unchecked, set the below checkboxes to false
        checkbox1.checked = false;
        checkbox2.checked = false;
        checkbox3.checked = false;
        checkbox4.checked = false;
        checkbox5.checked = false;
      }
    });

    // Keep the state of other checkboxes intact even if the main checkbox is checked/unchecked
    checkbox1.addEventListener("change", () => {
      if (!checkbox1.checked) {
        mainCheckbox.checked = false;
      }
    });

    checkbox2.addEventListener("change", () => {
      if (!checkbox2.checked) {
        mainCheckbox.checked = false;
      }
    });

    checkbox3.addEventListener("change", () => {
      if (!checkbox3.checked) {
        mainCheckbox.checked = false;
      }
    });
    checkbox4.addEventListener("change", () => {
      if (!checkbox4.checked) {
        mainCheckbox.checked = false;
      }
    });
    checkbox5.addEventListener("change", () => {
      if (!checkbox5.checked) {
        mainCheckbox.checked = false;
      }
    });
  }

// 3).search-Box
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const searchButton = document.getElementById("searchButton");

    if(searchInput){
    // Clear input field when 'X' icon is clicked
    searchButton.addEventListener("click", function (event) {
      const query = searchInput.value;
      if (query.trim() !== "") {
        event.preventDefault(); // Prevent form submission
        searchInput.value = ""; // Clear the input field
        searchIcon.classList.remove("fa-xmark"); // Reset to magnifying glass
        searchIcon.classList.add("fa-magnifying-glass");
      }
    });

    searchInput.addEventListener("input", function () {
      const query = searchInput.value;
      if (query.trim() === "") {
        // Reset to magnifying glass if input is empty
        searchIcon.classList.remove("fa-xmark"); // Remove 'X' icon class
        searchIcon.classList.add("fa-magnifying-glass"); // Add magnifying glass icon class
      } else {
        // Change to 'X' icon if input contains text
        searchIcon.classList.remove("fa-magnifying-glass"); // Remove magnifying glass icon class
        searchIcon.classList.add("fa-xmark"); // Add 'X' icon class
      }
    });

    // Filter the links based on the search input
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();
      links.forEach((link) => {
        const linkName = link.getAttribute("data-name").toLowerCase();
        if (linkName.includes(query)) {
          link.style.display = "block"; // Show link if it matches the query
        } else {
          link.style.display = "none"; // Hide link if it doesn't match the query
        }
      });
    });

    // if we click this btn input field be on empty and list all become normal without filter

    function searchBtn(){
      const query = searchInput.value.toLowerCase();
      links.forEach((link) => {
        const linkName = link.getAttribute("data-name").toLowerCase();
        if (linkName.includes(query)) {
          link.style.display = "block"; // Show link if it matches the query
        } else {
          link.style.display = "block"; // Hide link if it doesn't match the query
        }
      });
    }
  }

    // 4)container-open/close

    let modelistbtn = document.getElementById("sponcer-li-oc");
    let modelSpBox = document.querySelector(".floor-plan-r-inner");

    if(modelistbtn){
    modelistbtn.addEventListener("click", () => {
      modelSpBox.classList.toggle("modeOPCl");
      if (modelistbtn.innerHTML === "+") {
        modelistbtn.innerHTML = "-";
      } else {
        modelistbtn.innerHTML = "+";
      }
    });

    let sponcerlibtn=document.getElementById("sponcer-lvl-op");
    let modelLvBox=document.querySelector(".floor-check-form");
    sponcerlibtn.addEventListener("click",()=>{
      modelLvBox.classList.toggle("modeOPCl");
      if (sponcerlibtn.innerHTML === "+") {
        sponcerlibtn.innerHTML = "-";
      } else {
        sponcerlibtn.innerHTML = "+";
      }
    })
  }

    // 5).floor-modaal function

    const links = document.querySelectorAll(".link-container a");
    const modals = document.querySelectorAll(".modal-f");
    const contentContainer = document.getElementById("content-container");

    links.forEach((link, index) => {
      const modal = modals[index]; // Corresponding modal for the clicked link
      const closeButton = modal.querySelector(".flrp-close-btn");

      // Function to open the corresponding modal
      link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent the default link behavior
        modal.style.display = "block"; // Show the modal
       
        contentContainer.classList.add("hide-content"); // Hide other content
      });

      // Close the modal when clicking the close button
      closeButton.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal
        
        contentContainer.classList.remove("hide-content"); // Show the rest of the content
      });

      // Close the modal when clicking outside the image
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.style.display = "none"; // Hide the modal
          
          contentContainer.classList.remove("hide-content"); // Show the rest of the content
        }
      });
    });



