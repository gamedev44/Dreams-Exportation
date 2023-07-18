import axios from 'axios';
import fs from 'fs';

// Assume you have an access token for authentication
const accessToken = 'YOUR_ACCESS_TOKEN';

// Define the URL of the Dreams API server
const apiUrl = 'https://api.dreams.example.com';

// Function to export blob data from the server
async function exportBlobData() {
  try {
    // Make a GET request to fetch the blob data
    const response = await axios.get(`${apiUrl}/blob`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'arraybuffer',
    });

    // Save the blob data to a file
    const blobData = Buffer.from(response.data, 'binary');
    fs.writeFileSync('exported_blob.bin', blobData);

    console.log('Blob data exported successfully!');
  } catch (error) {
    console.error('Failed to export blob data:', error.message);
  }
}

// Call the exportBlobData function to initiate the export
exportBlobData();