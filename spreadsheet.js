let SHEET_ID = '1hx6OIxlZGvaVBcCKurc1XuWeyMZx1XXd0HZBRvb2huo';
let SHEET_TITLE = 'GROW';
let SHEET_RANGE = 'A2:E'; // Changed to fetch all rows

const dataContainer = document.getElementById('dataContainer');

let FULL_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE;

fetch(FULL_URL)
  .then(res => res.text())
  .then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    let rows = data.table.rows;

    dataContainer.innerHTML = '';

    rows.forEach(row => {
      const dataItem = document.createElement('div');
      dataItem.classList.add('data-item');

      // Extract formatted values from each row
      const dateTime = new Date(row.c[0]?.f); // Use optional chaining to handle null values
      const name = row.c[1]?.v || '';
      const isWatered = row.c[2]?.v && row.c[2].v.includes('BOOL');
      const message = row.c[3]?.v || '';
      const imageUrl = row.c[4]?.v || '';

      // Customize how you want to display the data in each container
      dataItem.innerHTML = `
        <h3>${name}</h3>
        ${isWatered ? '<p class="watered-text">I watered!</p>' : ''}
        <p>${dateTime.toLocaleString()}</p>
        <p class="scrollable-text">${message}</p>
        ${imageUrl ? `<button class="thumbnail-button"><img class="thumbnail" src="${imageUrl}" alt="Thumbnail"></button>` : ''}
      `;

      dataContainer.appendChild(dataItem);

      if (imageUrl) {
        const thumbnailButton = dataItem.querySelector('.thumbnail-button');
        thumbnailButton.addEventListener('click', () => showExpandedImage(imageUrl));
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function showExpandedImage(imageUrl) {
  const expandedImageContainer = document.createElement('div');
  expandedImageContainer.classList.add('expanded-image');

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;

  expandedImageContainer.appendChild(imageElement);
  document.body.appendChild(expandedImageContainer);

  expandedImageContainer.addEventListener('click', () => {
    document.body.removeChild(expandedImageContainer);
  });
}
