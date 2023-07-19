
interface UploadResponse {
    success: boolean;
    message: string;
    url?: string;
  }
  
  interface ProgressEventWithLength extends ProgressEvent {
    lengthComputable: boolean;
    loaded: number;
    total: number;
  }
  
  function prompt(message: string): Promise<string> {
    return new Promise((resolve) => {
      const input = window.prompt(message);
      resolve(input);
    });
  }
  
  async function importAudioData() {
    try {
      const filePath = await prompt('Enter the path of the MP3 file: ');
      // Read the MP3 file data using a method appropriate for your environment
      const mp3Data = ...; // Read the file data from filePath
  
      // Process the imported audio data as needed
      console.log('Audio data imported successfully!');
    } catch (error) {
      console.error('Failed to import audio data:', error.message);
    }
  }
  
  async function extractSpecificAudio() {
    try {
      const audioName = await prompt('Enter the name of the specific audio: ');
      // Extract specific audio from a timeline/track/recording
      console.log('Specific audio extracted and converted to MP3 successfully!');
    } catch (error) {
      console.error('Failed to extract specific audio:', error.message);
    }
  }
  
  async function downloadRawAudioAsset() {
    try {
      const assetName = await prompt('Enter the name of the audio asset to download: ');
      // Download raw audio asset
      console.log('Raw audio asset downloaded successfully!');
    } catch (error) {
      console.error('Failed to download raw audio asset:', error.message);
    }
  }
  
  async function exportAudioData() {
    try {
      const dreamURL = await prompt('Enter the dream URL: ');
      const exportOption = await prompt('Choose an export option (1: Extract all ATRAC audio and convert to MP3, 2: Extract specific audio, 3: Download raw audio assets): ');
  
      if (exportOption === '1') {
        // Decompress and extract ATRAC audio from .dat9 files
        console.log('ATRAC audio extracted and converted to MP3 successfully!');
      } else if (exportOption === '2') {
        await extractSpecificAudio();
      } else if (exportOption === '3') {
        await downloadRawAudioAsset();
      } else {
        console.log('Invalid export option selected!');
      }
    } catch (error) {
      console.error('Failed to export audio data:', error.message);
    }
  }
  
  async function main() {
    try {
      const operation = await prompt('Choose an operation (1: Import audio data, 2: Export audio data): ');
  
      if (operation === '1') {
        await importAudioData();
      } else if (operation === '2') {
        await exportAudioData();
      } else {
        console.log('Invalid operation selected!');
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
  
  main();
  
  document.addEventListener("DOMContentLoaded", () => {
    const audioInput = document.getElementById("audioInput") as HTMLInputElement;
    const uploadButton = document.getElementById("uploadButton") as HTMLButtonElement;
    const exportButton = document.getElementById("exportButton") as HTMLButtonElement;
    const progress = document.getElementById("progress");
  
    let audioUrl: string;
  
    uploadButton.addEventListener("click", () => {
      const file = audioInput.files[0];
      if (!file) {
        alert("Please select an audio file.");
        return;
      }
  
      const formData = new FormData();
      formData.append("audio", file);
  
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.indreams.me/en-US/create/sound/audio-importer");
      xhr.upload.addEventListener("progress", (event: ProgressEventWithLength) => {
        if (event.lengthComputable) {
          const percentage = (event.loaded / event.total) * 100;
          progress.textContent = `Uploading: ${Math.round(percentage)}%`;
        }
      });
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response: UploadResponse = JSON.parse(xhr.responseText);
          if (response.success) {
            progress.textContent = "Upload successful!";
            audioUrl = response.url;
          } else {
            progress.textContent = `Upload failed: ${response.message}`;
          }
        } else {
          progress.textContent = `Error: ${xhr.statusText}`;
        }
      };
  
      xhr.onerror = () => {
        progress.textContent = "Error occurred during upload.";
      };
  
      xhr.send(formData);
    });
  
    exportButton.addEventListener("click", () => {
      if (!audioUrl) {
        alert("Please upload an audio file first.");
        return;
      }
  
      const dreamUrl = prompt("Enter the URL of the dream on indreams.me:");
      if (!dreamUrl) {
        alert("Please enter a valid dream URL.");
        return;
      }
  
      const exportUrl = dreamUrl + "/export";
      window.location.href = exportUrl;
    });
  });  