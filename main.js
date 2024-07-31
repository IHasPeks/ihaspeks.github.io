// Navbar
	function loadNavbar() {
		const navbarPlaceholder = document.getElementById('navbar-placeholder');
		if (!navbarPlaceholder) return;  // Exit if placeholder not found

		const xhr = new XMLHttpRequest();

		// Determine the correct path to navbar.html based on the current URL
		let navbarPath = 'navbar.html'; // Default path for stat page
		if (window.location.pathname.includes('/peks/archive/') || window.location.pathname.includes('/peks/event/')) {
			navbarPath = '../navbar.html'; // Path for pages in archive and events directories
		}

		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				navbarPlaceholder.innerHTML = this.responseText;
			}
		};

		xhr.open('GET', navbarPath, true);
		xhr.send();
	}

// Styling
// Predefined list of Mods to bold
var usersToItalicize = ["blobin_wobin", "creatisbot", "firewraith4", "Flauenn", "muercielaga", "MurphyAI", "skgyorugo", "StreamElements", "StreamLabs", "voidross"];

// Predefined list of VIP's to italicize
var usersToBold = ["princetemperr", "aniluhsum", "cooometoflegends", "poppinzed", "AniAkemi", "OfficiallySp", "shazanana", "iamtolboe", "xxxtemptiom", "suprize_gaming", "teiva3", "pskthresh"];

function updateListStyling() {
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function(item) {
        // Find usernames in the list item
        var fullText = item.textContent;
        var parts = fullText.split(/, | and /); // Split by ", " and " and " to handle multiple users
        
        // Iterate over each part to check for usernames and apply styles
        parts = parts.map(part => {
            var username = part.split(':')[0].trim();
            var messageCount = part.split(':')[1];
            
            // Apply bold styling
            if (usersToBold.includes(username)) {
                username = `<strong>${username}</strong>`;
            }
            
            // Apply italic styling
            if (usersToItalicize.includes(username)) {
                username = `<em>${username}</em>`;
            }

            return username + (messageCount ? ': ' + messageCount : '');
        });
        
        // Reconstruct the item's innerHTML with styled usernames
        var updatedText = parts.join(', ').replace(/, ([^,]*)$/, ' and $1'); // Re-adding the 'and' for the last item
        item.innerHTML = updatedText;
    });
}


// Run the function to update styling
window.onload = function() {
    loadNavbar();
    if (!document.body.dataset.disableStyling) {
        updateListStyling();
    }
};
