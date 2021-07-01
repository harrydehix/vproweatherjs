🔴 This package is still in the development phase. most of the functions will probably already work, but there are still some tests to be done and a more detailed documentation to be written. 🔴

# vproweatherjs
Javascript/Typescript interface to any Davis Vantage Pro weather station. Based on the [vproweather](https://github.com/bytesnz/vproweather) driver.
Only works on *unix devices.

## Installation
### 1. Driver ([vproweather](https://github.com/bytesnz/vproweather))
This small guide explains how to install and setup the vproweather driver that is a requirement for the `vproweatherjs` package. 
#### Step 1: Downloading the driver's source
```sh
git clone https://github.com/bytesnz/vproweather
```
#### Step 2: Compiling the source
```sh
sudo apt install gcc make
cd vproweather
make
```
#### Step 3: Testing the driver
Make sure to test the commands the driver offers. No later than now, you should connect your Vantage Pro console to your *unix device serially.
To test the connection, you need the url (e.g. `/dev/ttyUSB0`) of your device.
```sh
./vproweather --help
```
#### Step 4: Installing the driver as globally available program (important!)<br>
This should work for the most *unix devices.
```sh
sudo nano ~/.bashrc
```
Add following to the end of the file:
```sh
export PATH="/your/path/to/the/cloned/repository:$PATH"
```
Now you should be able to access the vproweather globally via `vproweather`.
### 2. Package
```
npm install vproweatherjs
```
## Basic Usage
After setting up the driver and installing the vproweatherjs package you are ready to connect seamlessly to your weather station in javascript/typescript!
```javascript
import { SimpleVPDriver } from "vproweatherjs";

async function doDriverStuff(){
  const driver = new SimpleVPDriver({
      deviceUrl: "/dev/ttyUSB0" // replace with the url to your device
  );

  // access the currently measured weather data
  const realtimeData = await driver.getRealtimeData();
  console.log(realtimeData);
  
  // access the highs and lows
  const highsAndLows = await driver.getHighsAndLows();
  console.log(highsAndLows);
  
  // access the weather station's time
  const weatherStationTime = await driver.getTime();
  console.log(weatherStationTime);
  
  // synchronize the weather station's time to system time
  await driver.synchronizeTime();
  
  // turn the weather station's background light on
  await driver.setBackgroundLight(true);
  
  // access the weather station's model name
  const modelName = await driver.getModelName();
  console.log(modelName);
}

doDriverStuff();
```
## Advanced Usage
With vproweatherjs, the weather data can also be refractored into a more readable structure.
Added to that there is a unit system that allows you to convert the weather data into any unit you want with minimal effort.
```javascript
import { AdvancedVPDriver, Units, UnitConfig } from "vproweatherjs";

async function doDriverStuff(){
  const driver = new AdvancedVPDriver({
      deviceUrl: "/dev/ttyUSB0" // replace with the url to your device
  );

  // access the currently measured weather data in a more structured and unit flexible way
  const realtimeData = await driver.getFlexibleRealtimeData();
  realtimeData.applyUnits(new UnitConfig({
      wind: Units.Wind.kmh,
      temperature: Units.Temperature.celsius,
      ...
  }));
  console.log(realtimeData.weatherData);
  
  // access the highs and lows in a more structured and unit flexible way
  const highsAndLows = await driver.getFlexibleHighsAndLows();
  highsAndLows.applyUnits(new UnitConfig({
      preset: "eu",
  }));
  console.log(highsAndLows.weatherData);
  
  // access the weather station's time
  const weatherStationTime = await driver.getTime();
  console.log(weatherStationTime);
  
  // synchronize the weather station's time to system time
  await driver.synchronizeTime();
  
  // turn the weather station's background light on
  await driver.setBackgroundLight(true);
  
  // access the weather station's model name
  const modelName = await driver.getModelName();
  console.log(modelName);
}

doDriverStuff();
```
