import axios from 'axios';
import fs from 'fs';
import { lz4 } from 'lz4';
import path from 'path';

// Configuration options
interface ConfigOptions {
  apiUrl: string;
  accessToken: string;
  outputDirectory: string;
  outputFileName: string;
}

// Default configuration values
const defaultConfig: ConfigOptions = {
  apiUrl: 'https://api.dreams.example.com',
  accessToken: 'YOUR_ACCESS_TOKEN',
  outputDirectory: __dirname,
  outputFileName: 'exported_blob.bin',
};

// Load configuration from file or use default values
function loadConfig(): ConfigOptions {
  const configFilePath = path.join(__dirname, 'config.json');

  if (fs.existsSync(configFilePath)) {
    // Configuration file exists, load and parse it
    const configFileData = fs.readFileSync(configFilePath, 'utf-8');
    return JSON.parse(configFileData) as ConfigOptions;
  } else {
    // Configuration file doesn't exist, use default values
    return defaultConfig;
  }
}

// Save configuration to file
function saveConfig(config: ConfigOptions): void {
  const configFilePath = path.join(__dirname, 'config.json');
  const configData = JSON.stringify(config, null, 2);

  fs.writeFileSync(configFilePath, configData, 'utf-8');
}

// Function to decompress LZ4 data
function decompressLZ4(data: Buffer): Buffer {
  // Decompress the LZ4 data using the lz4 library or module
  const decompressedData = lz4.decompress(data);

  return decompressedData;
}

// Function to export blob data from the server
async function exportBlobData(config: ConfigOptions) {
  try {
    // Make a GET request to fetch the blob data
    const response = await axios.get(`${config.apiUrl}/blob`, {
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
      responseType: 'arraybuffer',
    });

    // Handle LZ4 compression if multiple blob files are present
    if (response.headers['content-encoding'] === 'lz4') {
      // Decompress the LZ4 data stream
      const decompressedData = decompressLZ4(Buffer.from(response.data));

      // Save the decompressed blob data to a file
      const outputFile = path.join(config.outputDirectory, 'decompressed_blob.bin');
      fs.writeFileSync(outputFile, decompressedData);

      console.log('LZ4 data decompressed successfully!');
    } else {
      // Save the blob data to a file
      const blobData = Buffer.from(response.data, 'binary');
      const outputFile = path.join(config.outputDirectory, config.outputFileName);
      fs.writeFileSync(outputFile, blobData);

      console.log('Blob data exported successfully!');
    }
  } catch (error) {
    console.error('Failed to export blob data:', error.message);
  }
}

// Main function to export blob data
function main() {
  // Load configuration
  const config = loadConfig();

  // Export blob data using the configuration
  exportBlobData(config);
}

// Call the main function to initiate the export
main();
