import './App.css'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import WeatherModal from './components/WeatherModal'
import WeatherCityCard from './components/WeatherCityCard'


const App = () => {
  const [cityName, setCityName] = useState('')
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const handleCityClick = (city) => {
    setSelectedCity(city);
    setIsOpen(true)
  };

  const handleCloseModal = () => {
    setSelectedCity(null);
    setIsOpen(false)
  };

  const { isLoading, isError, data, refetch } = useQuery('weather', async () => {
    const response = await fetch(
      `https://search.reservamos.mx/api/v2/places${cityName ? `?q=${encodeURIComponent(cityName)}` : ''}`
    )
    const places = await response.json()
    return places.filter(place => place.result_type === 'city')
  })

  useEffect(
    () => {
      if (!cityName) {
        refetch()
      }
    }, [cityName, refetch]);

  return (
    <div className='h-screen'>
      <div className="bg-[#003175] flex flex-col w-full h-[90%]  overflow-auto p-[2rem] rounded-lg">
        <h1 className='text-white'>Reservamos Weahter App</h1>
        <div className="bg-[#5093cf] max-h-[95%] p-4 rounded-md shadow-md w-full flex flex-col items-center">

          <input
            type="text"
            value={cityName}
            onChange={e => setCityName(e.target.value)}
            placeholder="Enter city name"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button onClick={refetch} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Search</button>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching data.</p>}
          <div className='flex flex-col h-[90%] overflow-auto w-full items-center'>
            {data && data.map(city => (
              <WeatherCityCard
                handleSelect={handleCityClick}
                key={city.id}
                cityData={city}
              />
            ))}
          </div>
        </div>

        {selectedCity && <WeatherModal isOpen={isOpen} city={selectedCity} handleCloseModal={handleCloseModal} />}
      </div>

    </div>

  )
}

export default App

