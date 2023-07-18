import path from 'path';
import fs from 'fs';

const configPath = path.resolve(__dirname, '../apiconfig.json');

interface DreamsApiConfig {
  apiKey: string;
  apiUrl: string;
  timeout: number;
  maxRetries: number;
}

interface Config {
  dreamsApi: DreamsApiConfig;
}

let config: Config = {
  dreamsApi: {
    apiKey: '',
    apiUrl: '',
    timeout: 5000,
    maxRetries: 3
  }
};

export function loadConfig() {
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configData);
  } catch (error) {
    console.error('Error loading configuration:', error);
  }
}

export function saveConfig() {
  try {
    const configData = JSON.stringify(config, null, 2);
    fs.writeFileSync(configPath, configData);
  } catch (error) {
    console.error('Error saving configuration:', error);
  }
}

export function getConfig() {
  return config;
}

export function setConfig(newConfig: Config) {
  config = newConfig;
  saveConfig();
}

export function getConfigValue<T extends keyof Config>(key: T): Config[T] {
  return config[key];
}

export function setConfigValue<T extends keyof Config>(key: T, value: Config[T]) {
  setConfig({
    ...config,
    [key]: value
  });
}

// Load the initial configuration when this module is imported
loadConfig();

//changes made by mr.asterisk

// Introduced two new interfaces: DreamsApiConfig and Config. DreamsApiConfig defines the advanced configurations specific to the Dreams API, while Config represents the overall configuration object.
// Initialized the config variable with the advanced configuration for the Dreams API, including default values for apiKey, apiUrl, timeout, and maxRetries.
// Updated the getConfigValue and setConfigValue functions to use the Config interface for type checking. These functions now enforce that the provided keys are valid properties of the Config object.
// Updated the setConfig function parameter to accept a Config object, allowing the entire configuration to be updated at once.
// Retained the loadConfig and saveConfig functions for loading and saving the configuration file.
// Ensured that the initial configuration is loaded when the module is imported.
// more coming soon...
