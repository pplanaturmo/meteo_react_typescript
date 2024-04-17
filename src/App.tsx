import styles from "./App.module.css"
import Alert from "./alert/Alert";
import Form from "./components/Form/Form";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import Spinner from "./components/spinner/Spinner";
import useWeather from "./hooks/useWeather";

function App() {

const {weather,loading,notFound,fetchWeather,hasWeatherData} = useWeather()




  return (
    <>
      <h1 className={styles.title}>Busca clima</h1>

      <div className={styles.container}>
        <Form
        fetchWeather = {fetchWeather}
        />
        {loading &&<Spinner/>}
        {hasWeatherData && <WeatherDetails weather = {weather}/>}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
