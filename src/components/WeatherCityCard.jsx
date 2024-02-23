
const WeatherCityCard = ({ cityData, handleSelect }) => {
    return (
        <div onClick={() => handleSelect(cityData)} className="cursor-pointer bg-white text-black  hover:!border-[#2d7ce0] hover:border-2 hover:!text-white hover:!bg-[#7fc040] shadow-md rounded-md p-4 w-64 m-4 animate-fade-down animate-once ">
            <h3 className="font-semibold">{cityData?.display}</h3>
        </div>
    )
}

export default WeatherCityCard