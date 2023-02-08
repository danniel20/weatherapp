const API_KEY = 'a0d1cd5596809c3ca7799abfdb189a2c';

async function fetchData(city: string): Promise<any> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`;

  try {
    const fetchResponse = await fetch(url);
    const data = await fetchResponse.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default fetchData;
