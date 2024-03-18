const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gallery = document.getElementById('gallery');

function clearGallery() {
  gallery.innerHTML = '';
}

async function searchImages() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    alert('Please enter a search term');
    return;
  }

  clearGallery();

  const apiKey = 'RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw'; 
  const apiUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors[0]);
    }

    data.results.forEach(result => {
      const imgElement = document.createElement('img');
      imgElement.src = result.urls.small;
      imgElement.alt = result.alt_description;
      gallery.appendChild(imgElement);
    });
  } catch (error) {
    console.error('Error fetching images:', error.message);
    alert('Error fetching images. Please try again later.');
  }
}

searchBtn.addEventListener('click', searchImages);
