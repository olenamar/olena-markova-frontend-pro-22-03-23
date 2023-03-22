import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Listen at ${PORT}`);
});

app.post('/weanter', async(req, res) => {
    const { city } = req.body;
    if (city) {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`);
        const data = await response.json();
        const temperature = data.main.temp;
        const windSpeed = data.wind.speed;
        res.status(200).json({temperature, windSpeed});
    } else {
        res.status(400).json('Error')
    }
})