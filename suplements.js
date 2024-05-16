const menu = [
    {
      id: 1,
      title: "Protein Tozu nedir?",
      category: "Protein",
      img: "https://cdn.memorial.com.tr/files/Uploads/1/15/protein-tozu-ne-ise-yarar-protein-tozu-zararli-midir.jpg",
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: "Bcaa nedir?",
      category: "Bcaa",
      img: "https://t4.ftcdn.net/jpg/02/23/83/57/360_F_223835709_tSpnpa5zYX6WXzYCXcftY2i74PSvN706.jpg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: "Vitamin nedir?",
      category: "Vitamin",
      img: "https://t4.ftcdn.net/jpg/03/93/32/19/360_F_393321972_WJp0sEtKDEKfV31SAX30zxNkCmwtBZjX.jpg",
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: "Preworkout nedir?",
      category: "Preworkout",
      img: "https://m.media-amazon.com/images/I/51B0vJ437xL.jpg",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 7,
      title: "Preworkout Haber?",
      category: "Preworkout",
      img: "https://i0.wp.com/beaconsfieldfitness.com.au/wp-content/uploads/2022/02/Pre-Workout-Blog.jpeg?resize=1170%2C650&ssl=1",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: "Kreatin nedir?",
      category: "Kreatin",
      img:"https://media.istockphoto.com/id/1172939913/tr/foto%C4%9Fraf/f%C3%BCt%C3%BCristik-bir-arka-plan-%C3%BCzerinde-kreatin-kimyasal-form%C3%BCl%C3%BC.jpg?s=612x612&w=0&k=20&c=YrMsV02u6PnA5k_kUKRR-sRzrECJL2-HQHoi4QHGyEM=",
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: "Postworkout nedir?",
      category: "Postworkout",
      img: "https://www.cnet.com/a/img/resize/c629547db823c0e4252303e7d917aa1b2cc5f103/hub/2022/09/15/c6554166-8f31-496c-8b8a-eb10888a2563/gettyimages-1295738108.jpg?auto=webp&fit=crop&height=675&width=1200",
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    
  ];
  // get parent element
  const sectionCenter = document.querySelector(".section-center");
  const btnContainer = document.querySelector(".sub-main-button-div");
  // display all items when page loads
  window.addEventListener("DOMContentLoaded", function () {
    diplayMenuItems(menu);
    displayMenuButtons();
  });  
  function formatDescription(description) {
    // Split the description into sentences
    const sentences = description.split('. ');
  
    // Limit the number of sentences displayed or join all sentences
    const maxLength = 3;
    const truncatedSentences = sentences.slice(0, maxLength);
    const formattedDescription = truncatedSentences.join('. ');
  
    // Add an ellipsis if the description is truncated
    if (sentences.length > maxLength) {
      return formattedDescription + '...';
    }
  
    return formattedDescription;
  }
  
  
  function diplayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
      return `<article class="menu-item" data-id="${item.id}" data-category="${item.category}">
      <img src="${item.img}" alt="${item.title}" class="photo" />
      <div class="item-info">
          <header>
              <h4>${item.title}</h4>
          </header>
          <p class="item-text">
              ${formatDescription(item.desc)}
          </p>
          <span class="delete-icon" onclick="deleteSupplementById(${item.id})">🗑️</span>
      </div>
  </article>`;
    });
    displayMenu = displayMenu.join("");
  
    sectionCenter.innerHTML = displayMenu;
  }
  
  const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");
about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    // remove selected from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  var threshold = 200; // Bu değeri ihtiyacınıza göre ayarlayın
  var navbar = document.querySelector('.navbar');

  if (scrollPosition > threshold) {
      navbar.classList.add('fixed-navbar');
  } else {
      navbar.classList.remove('fixed-navbar');
  }
});

function addNewSupplement() {
  // Get supplement details from the admin (one prompt for each field)
  const userInput = {};

  const fields = [
    "title",
    "category",
    "img",
    "desc",
  ];

  for (const field of fields) {
    const input = prompt(`Enter supplement ${field}:`);
    if (input === null) {
      // Kullanıcı iptal etti, işlemi durdur
      return;
    }
    userInput[field] = input.trim();
  }

  // Kategori kontrolü ekle
  const existingCategories = menu.map(item => item.category.toLowerCase());
  const userInputCategory = userInput["category"].toLowerCase();

  if (!existingCategories.includes(userInputCategory)) {
    alert(`Category "${userInputCategory}" does not exist. Please add the category first.`);
    return;
  }

  // Add the new supplement to the end of the menu array
  const newSupplement = {
    id: menu.length + 1, // Assign a new unique ID
    ...userInput,
  };

  menu.push(newSupplement);

  // Update the display
  diplayMenuItems(menu);
  displayMenuButtons();
  displayNewSupplement(newSupplement);
}

function displayNewSupplement(supplement) {
  let forumText = "New Supplement Added:\n";
  for (const field in supplement) {
    forumText += `${field.charAt(0).toUpperCase() + field.slice(1)}: ${supplement[field]}\n`;
  }

  alert(forumText);
}

// Add a click event listener to the "Add New Supplement" button
const addSupplementBtnElement = document.getElementById("addSupplementBtn");
addSupplementBtnElement.addEventListener("click", function () {
  // Show the popup only when the "Add Supplement" button is clicked
  showPopup(true);
});

// Add a click event listener to the "Add New Supplement" button
const addSupplementBtn = document.getElementById("addSupplementBtn");
addSupplementBtn.addEventListener("click", addNewSupplement);


function displayMenuButtons() {
  const categories = menu.reduce(
      function (values, item) {
          if (!values.includes(item.category)) {
              values.push(item.category);
          }
          return values;
      },
      ["All"]
  );
  const categoryBtns = categories
      .map(function (category) {
          return `<button type="button" class="btn btn-light" data-id=${category}>
              ${category}
            </button>`;
      })
      .join("");
    
  const addSupplementBtn = `<button type="button" class="btn btn-light" id="addSupplementBtn">Add Suplement</button>`;
  
  btnContainer.innerHTML = categoryBtns + addSupplementBtn;

  const filterBtns = btnContainer.querySelectorAll(".btn");

  filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
          const category = e.currentTarget.dataset.id;
          const menuCategory = menu.filter(function (menuItem) {
              if (menuItem.category === category) {
                  return menuItem;
              }
          });
          if (category === "All") {
              diplayMenuItems(menu);
          } else {
              diplayMenuItems(menuCategory);
          }
      });
  });

  // Add a click event listener to the "Add New Supplement" button
  const addSupplementBtnElement = document.getElementById("addSupplementBtn");
  addSupplementBtnElement.addEventListener("click", addNewSupplement);
}

// Kullanıcının girdiği başlık ile eşleşen supplementi silen fonksiyon
// Kullanıcının girdiği başlık ile eşleşen supplementi silen fonksiyon
function deleteSupplementById(id) {
  const indexToDelete = menu.findIndex(item => item.id === id);

  if (indexToDelete !== -1) {
    menu.splice(indexToDelete, 1);
    diplayMenuItems(menu);
    displayMenuButtons();
    handleProteinLink();
    alert(`Supplement with ID ${id} successfully deleted.`);
  } else {
    alert(`Supplement with ID ${id} not found.`);
  }
}






