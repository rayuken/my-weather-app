import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useQuery } from 'react-query';
import WeatherContainer from './WeatherContainer';

const WeatherModal = ({ city, isOpen, handleCloseModal }) => {
    const [showForecastMap, setShowForecastMap] = useState({});


    const { isLoading, isError, data: currentWeather } = useQuery(['weatherData', city], async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.long}&appid=${import.meta.env.VITE_APIKEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });

    const { isLoading: isLoadingForecast, isError: isErrorForecast, data: forecastWeather } = useQuery(['forcastData', city], async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.long}&appid=${import.meta.env.VITE_APIKEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resp = await response.json();
        const result = resp.list.reduce((acc, cur) => {
            const date = new Date(cur.dt * 1000);

            const dateString = date.toISOString().split('T')[0];

            acc[dateString] = acc[dateString] || [];
            acc[dateString].push(cur);

            return acc;
        }, {})
        console.log(Object.entries(result));
        return Object.entries(result)
    });

    const handleSeeDetails = (dateString) => {
        setShowForecastMap((prevState) => ({
            ...prevState,
            [dateString]: true,
        }));
    };

    const handleHideDetails = (dateString) => {
        setShowForecastMap((prevState) => ({
            ...prevState,
            [dateString]: false,
        }));
    };

    if (isLoading) return 'Loading...';
    if (isError) return 'Error!';

    return (
        <Modal show={isOpen} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Weather in {city.display}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col items-center bg-[#0c4492] p-2 rounded-xl">
                    <div className="text-center text-white">
                        <h2>{city.display}</h2>
                        <span className='font-thin'>Current weather details:</span>
                        <p>Temperature: {currentWeather.main.temp}&deg;C</p>
                        <p>Max Temperature: {currentWeather.main.temp_max}&deg;C</p>
                        <p>Min Temperature: {currentWeather.main.temp_min}&deg;C</p>
                    </div>
                    <div className='max-h-[400px] overflow-auto bg-white rounded-2xl'>
                        {isLoadingForecast && <span>Loding Forcast......</span>}
                        {isErrorForecast && <span>Error getting forecast, please try again.</span>}
                        {forecastWeather && <WeatherContainer forecastWeather={forecastWeather} showForecastMap={showForecastMap} handleHideDetails={handleHideDetails} handleSeeDetails={handleSeeDetails} />}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default WeatherModal;