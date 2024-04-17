import axios from "axios";
import { SearchType } from "../types";
import { string, number, object, Output, parse } from "valibot";
import { useMemo, useState } from "react";

// import { Weather } from '../types/index';
// import { z } from "zod";

// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }

//zod
// const Weather = z.object({
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_max: z.number(),
//     temp_min: z.number(),
//   }),
// });

// type Weather = z.infer<typeof Weather>;

//Valibot
const WeatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number(),
  }),
});

type Weather = Output<typeof WeatherSchema>;

export default function useWeather() {
  const initialWeatherState = {
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  };

  const [weather, setWeather] = useState<Weather>(initialWeatherState);

  //state para spinner
  const [loading, setLoading] = useState(false);

  //state para ver si existe la ciudad
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    setLoading(true);

    setWeather(initialWeatherState);
    setNotFound(false)

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;

      const { data } = await axios.get(geoUrl);

      //check if town exists
      if (!data[0]) {
        setNotFound(true)
        return;
      }
      
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      //castear el type, worst one
      //    const {data: weatherData} = await axios.get<Weather>(weatherUrl)
      //    console.log(weatherData);

      //TYPE GUARD  or ASSERTION
      //   const { data: weatherData } = await axios.get<Weather>(weatherUrl);
      //   const result = isWeatherResponse(weatherData);
      //   if (result) {
      //     console.log(weatherData.name);
      //   } else {
      //     console.log("Respuesta mal formada");
      //   }

      //validate with ZOD

      //   const { data: weatherData } = await axios.get<Weather>(weatherUrl);
      //   const result = Weather.safeParse(weatherData);
      //   console.log(result);

      //     if(result.success){
      //         console.log(result.data.name);

      //     }else{
      //         console.log("Respuesta mal formada");

      //     }

      //validate with valibot

      const { data: weatherResult } = await axios(weatherUrl);
      const result = parse(WeatherSchema, weatherResult);

      if (result) {
        console.log(result);
        setWeather(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return { weather, loading, notFound,fetchWeather, hasWeatherData };
}
