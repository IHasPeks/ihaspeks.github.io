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
  const navbarPath = currentPath.includes('/archive/') ? '../navbar.html' : 'navbar.html';

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

function addLastUpdated() {
  // Remove any existing last-updated elements
  const existingLastUpdated = document.getElementById('last-updated');
  if (existingLastUpdated) {
    existingLastUpdated.remove();
  }

  const lastUpdated = document.createElement('div');
  lastUpdated.id = 'last-updated';
  lastUpdated.innerHTML = `<p>Last updated: ${new Date().toLocaleString()}</p>`;
  
  const mainTitle = document.querySelector('main h1');
  if (mainTitle) {
    mainTitle.insertAdjacentElement('afterend', lastUpdated);
  }
}

function setupArchiveSearch() {
  const searchInput = document.getElementById('archive-search');
  const archiveList = document.getElementById('archive-list');

  if (!searchInput || !archiveList) {
    console.log('Search input or archive list not found');
    return;
  }

  // Clear existing list items
  archiveList.innerHTML = '';

  // Get existing archive links from the dropdown
  const archives = [
    { date: 'May 2024', url: '/stats/archive/may24.html' },
    { date: 'April 2024', url: '/stats/archive/apr24.html' },
    { date: 'March 2024', url: '/stats/archive/mar24.html' },
    { date: 'February 2024', url: '/stats/archive/feb24.html' },
    { date: 'January 2024', url: '/stats/archive/jan24.html' },
    { date: 'December 2023', url: '/stats/archive/dec23.html' },
    { date: 'November 2023', url: '/stats/archive/nov23.html' },
    { date: 'October 2023', url: '/stats/archive/oct23.html' },
    { date: 'September 2023', url: '/stats/archive/sep23.html' },
    { date: 'August 2023', url: '/stats/archive/aug23.html' },
    { date: 'July 2023', url: '/stats/archive/jul23.html' },
    { date: 'June 2023', url: '/stats/archive/jun23.html' },
    { date: 'May 2023', url: '/stats/archive/may23.html' },
    { date: 'April 2023', url: '/stats/archive/apr23.html' },
    { date: 'March 2023', url: '/stats/archive/mar23.html' },
    { date: 'February 2023', url: '/stats/archive/feb23.html' },
    { date: 'January 2023', url: '/stats/archive/jan23.html' },
    { date: 'December 2022', url: '/stats/archive/dec22.html' },
    { date: 'November 2022', url: '/stats/archive/nov22.html' },
    { date: 'October 2022', url: '/stats/archive/oct22.html' },
    { date: 'September 2022', url: '/stats/archive/sep22.html' }
  ];

  // Remove duplicates
  const uniqueArchives = Array.from(new Set(archives.map(a => JSON.stringify(a))))
    .map(a => JSON.parse(a));

  console.log('Number of archives:', uniqueArchives.length);

  // Populate archive list
  uniqueArchives.forEach(archive => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = archive.url;
    a.textContent = archive.date;
    li.appendChild(a);
    archiveList.appendChild(li);
  });

  console.log('Number of list items:', archiveList.children.length);

  // Search functionality
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    Array.from(archiveList.children).forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadNavbar();
  updateListStyling();
  setupImageModal();
  setupBackToTop();
  addLastUpdated();
  setupArchiveSearch();
});