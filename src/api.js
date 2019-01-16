import axios from 'axios';

const instance = axios.create({
    baseURL: "https://spendcadev.azurewebsites.net/api/"
  });

instance.defaults.headers.common["Accept"] = "application/json"
instance.defaults.headers.common["Content-Type"] = "application/json"
instance.defaults.headers.common["authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJicnVub0BicnVuby5jb20iLCJqdGkiOiJiNzkwOTg4My01NjVkLTQ1MTUtYjY1ZS1kYWI4OTc0YzM4OTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJleHAiOjE1NTAyNzMzOTYsImlzcyI6Imh0dHBzOi8vc3BlbmRjYWRldi5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3NwZW5kY2FkZXYuYXp1cmV3ZWJzaXRlcy5uZXQvIn0.JKe7ypMZWq0BoVQK7IpXnKhIO5YXDJo_tBla4gaqM9o";
  
  export default instance;