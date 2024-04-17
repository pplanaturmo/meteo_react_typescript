import { Weather } from '../../types/index';
import { formatTemperature } from '../../utils';
import styles from "./WeatherDetails.module.css"

type WeatherDetailsProps = {
  weather: Weather;
};

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div className={styles.container}>
      <h2>Temperatura en</h2>
      <span className={styles.city}> {weather.name}</span>
      <p className={styles.current}> {formatTemperature(weather.main.temp)} ºC</p>
      <div className={styles.temperatures}>
        <p>Mínima: {formatTemperature(weather.main.temp_min)} ºC</p>
        <p>Máxima: {formatTemperature(weather.main.temp_max)} ºC</p>
      </div>
    </div>
  );
}
