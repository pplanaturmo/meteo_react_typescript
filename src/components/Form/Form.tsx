import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../types";
import Alert from "../../alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
    } else {
      fetchWeather(search);
      setAlert("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad: </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Introduce la ciudad"
          value={search.city}
          onChange={handleChange}
        ></input>
      </div>
      <div className={styles.field}>
        <label htmlFor="country">País: </label>
        <select
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}
        >
          <option className={styles.option} value={""}>
            ---Seleccione un País
          </option>
          {countries.map((country) => (
            <option
              className={styles.option}
              key={country.code}
              value={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input
        className={styles.submit}
        type="submit"
        value={"Consultar clima"}
      ></input>
    </form>
  );
}
