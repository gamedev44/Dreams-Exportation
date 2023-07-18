import axios from 'axios';
import fs from 'fs';
import { lz4 } from 'lz4';

// Assume you have an access token for authentication
const accessToken = 'YOUR_ACCESS_TOKEN';

// Define the URL of the Dreams API server
const apiUrl = 'https://api.dreams.example.com';

// Function to decompress LZ4 data
function decompressLZ4(data: Buffer): Buffer {
  // Decompress the LZ4 data using the lz4 library or module
  const decompressedData = lz4.decompress(data);

  return decompressedData;
}

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

    // Handle LZ4 compression if multiple blob files are present
    if (response.headers['content-encoding'] === 'lz4') {
      // Decompress the LZ4 data stream
      const decompressedData = decompressLZ4(Buffer.from(response.data));

      // Save the decompressed blob data to a file
      fs.writeFileSync('decompressed_blob.bin', decompressedData);

      console.log('LZ4 data decompressed successfully!');
    } else {
      // Save the blob data to a file
      const blobData = Buffer.from(response.data, 'binary');
      fs.writeFileSync('exported_blob.bin', blobData);

      console.log('Blob data exported successfully!');
    }
  } catch (error) {
    console.error('Failed to export blob data:', error.message);
  }
}

// Call the exportBlobData function to initiate the export
exportBlobData();
