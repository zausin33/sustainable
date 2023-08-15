# Sustainable
Habit tracker for sustainable goals.
+ Spring boot Backend with JWT Authentication
+ React Native Frontend

Still in progress.

### Starting Database
```bash
docker compose up --build 
```

### Starting Backend
Start the backend with your IDE via the standard Spring Boot Run Configuration.#

### Starting Frontend
```bash
cd sustainable-app
```
Adjust CORE_API_URL in [.env](sustainable-app%2F.env) (should be IP of PC where backend is running)
Maybe then you have to run the following command to make the change visible (clearing the cache):
```bash
npx expo start -c
```
Starting the frontend:
```bash
npm install
npm start
```