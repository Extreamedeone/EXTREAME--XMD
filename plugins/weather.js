import axios from 'axios';

async function weather(sock, chatId, city) {
    try {
        const apiKey = '4902c0f2550f58298ad4146a92b65e10';  // Replace with your OpenWeather API Key
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weather = response.data;
        const weatherText = `Weather in ${weather.name}: ${weather.weather[0].description}. Temperature: ${weather.main.temp}°C.`;
        await sock.sendMessage(chatId, { text: weatherText });
    } catch (error) {
        console.error('Error fetching weather:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch the weather right now.' });
    }
};
export default {
  name: 'weather',         // Unique name of the command
  description: 'weather',   // Optional, for help menus
  execute: async (...args) => {
    // Your logic here
    console.log('weather executed!');
  }
};
