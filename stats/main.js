document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
  updateListStyling();
  setupImageModal();
  setupBackToTop();
  addLastUpdated();
  setupArchiveSearch();
});

function loadNavbar() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (!navbarPlaceholder) return;

  const currentPath = window.location.pathname;
  const navbarPath = currentPath.includes('/archive/') || currentPath.includes('/event/') ? '../navbar.html' : 'navbar.html';

  fetch(navbarPath)
    .then(response => response.text())
    .then(data => {
      navbarPlaceholder.innerHTML = data;
      setupDropdowns();
    })
    .catch(error => console.error('Error loading navbar:', error));
}

function setupDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    const content = dropdown.querySelector('.dropdown-content');
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
}

function updateListStyling() {
  const usersToItalicize = ["blobin_wobin", "creatisbot", "firewraith4", "Flauenn", "muercielaga", "MurphyAI", "skgyorugo", "StreamElements", "StreamLabs", "voidross"];
  const usersToBold = ["princetemperr", "aniluhsum", "cooometoflegends", "poppinzed", "AniAkemi", "OfficiallySp", "shazanana", "iamtolboe", "xxxtemptiom", "suprize_gaming", "teiva3", "pskthresh"];

  const listItems = document.querySelectorAll('.stats-list li');
  listItems.forEach(item => {
    const text = item.textContent;
    const parts = text.split(':');
    if (parts.length === 2) {
      const username = parts[0].trim();
      const count = parts[1].trim();
      
      let styledUsername = username;
      if (usersToItalicize.includes(username)) {
        styledUsername = `<em>${username}</em>`;
        item.classList.add('mod');
      } else if (usersToBold.includes(username)) {
        styledUsername = `<strong>${username}</strong>`;
        item.classList.add('vip');
      }
      
      item.innerHTML = `${styledUsername}: ${count}`;
    }
  });
}

function setupImageModal() {
  const images = document.querySelectorAll('img:not(.profile-pic)');
  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.onclick = function() {
      const modal = document.createElement('div');
      modal.className = 'modal';
      const modalImg = document.createElement('img');
      modalImg.className = 'modal-content';
      modalImg.src = this.src;
      const closeSpan = document.createElement('span');
      closeSpan.className = 'close';
      closeSpan.innerHTML = '&times;';
      modal.appendChild(modalImg);
      modal.appendChild(closeSpan);
      document.body.appendChild(modal);
      modal.style.display = 'block';
      closeSpan.onclick = function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
      }
    }
  });
}

function setupBackToTop() {
  const backToTopButton = document.createElement('a');
  backToTopButton.href = '#';
  backToTopButton.className = 'back-to-top';
  backToTopButton.textContent = 'Back to Top';
  document.body.appendChild(backToTopButton);

  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  backToTopButton.onclick = function(e) {
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
}

// Add this at the top of the file
const lastUpdatedTime = "2024-08-01T03:59:42Z"; // Update this whenever you change the content

function addLastUpdated() {
  const existingLastUpdated = document.getElementById('last-updated');
  if (existingLastUpdated) {
    existingLastUpdated.remove();
  }

  const lastUpdated = document.createElement('div');
  lastUpdated.id = 'last-updated';
  const formattedTime = new Date(lastUpdatedTime).toLocaleString();
  lastUpdated.innerHTML = `<p>Last updated: ${formattedTime}</p>`;
  
  const mainTitle = document.querySelector('main h1');
  if (mainTitle) {
    mainTitle.insertAdjacentElement('afterend', lastUpdated);
  }
}

function setupArchiveSearch() {
    const archiveList = document.getElementById('archive-list');
    if (!archiveList) return;

    // Example archive data - replace with your actual data
    const archives = [
        { month: 'Aug', year: 24 },
        { month: 'Jul', year: 24 },
        { month: 'Jun', year: 24 },
        { month: 'May', year: 24 },
        { month: 'Apr', year: 24 },
        { month: 'Mar', year: 24 },
        { month: 'Feb', year: 24 },
        { month: 'Jan', year: 24 },
        { month: 'Dec', year: 23 },
        { month: 'Nov', year: 23 },
        { month: 'Oct', year: 23 },
        { month: 'Sep', year: 23 },
        { month: 'Aug', year: 23 },
        { month: 'Jul', year: 23 },
        { month: 'Jun', year: 23 },
        { month: 'May', year: 23 },
        { month: 'Apr', year: 23 },
        { month: 'Mar', year: 23 },
        { month: 'Feb', year: 23 },
        { month: 'Jan', year: 23 },
        { month: 'Dec', year: 22 },
        { month: 'Nov', year: 22 },
        { month: 'Oct', year: 22 },
        { month: 'Sep', year: 22 }
    ];

    function groupArchivesByYear(archives) {
        return archives.reduce((acc, archive) => {
            (acc[archive.year] = acc[archive.year] || []).push(archive);
            return acc;
        }, {});
    }

    function renderArchives(filteredArchives) {
        archiveList.innerHTML = '';
        const groupedArchives = groupArchivesByYear(filteredArchives);
        
        Object.entries(groupedArchives).sort((a, b) => b[0] - a[0]).forEach(([year, yearArchives]) => {
            const yearSection = document.createElement('div');
            yearSection.className = 'archive-year';
            yearSection.innerHTML = `<h2>${year}</h2>`;
            
            const grid = document.createElement('div');
            grid.className = 'archive-grid';
            
            yearArchives.sort((a, b) => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return months.indexOf(a.month) - months.indexOf(b.month);
            }).forEach(archive => {
                const item = document.createElement('div');
                item.className = 'archive-item';
                item.innerHTML = `<a href="/stats/archive/${archive.month.toLowerCase()}${year}.html">${archive.month}</a>`;
                grid.appendChild(item);
            });
            
            yearSection.appendChild(grid);
            archiveList.appendChild(yearSection);
        });
    }

    renderArchives(archives);

    const searchInput = document.getElementById('archive-search');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredArchives = archives.filter(archive => 
            `${archive.month} ${archive.year}`.toLowerCase().includes(searchTerm)
        );
        renderArchives(filteredArchives);
    }

    searchInput.addEventListener('input', performSearch);
}

document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
  updateListStyling();
  setupImageModal();
  setupBackToTop();
  addLastUpdated();
  setupArchiveSearch();
});