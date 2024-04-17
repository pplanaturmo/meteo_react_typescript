export const formatTemperature = (temperature : number):number => {
    const kelvin = 273.15
    return +(temperature - kelvin).toFixed(1)
}