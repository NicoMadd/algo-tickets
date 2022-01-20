import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common["Access-Token"] =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicGVwZSIsImlhdCI6MTY0MjQ3MTI2MCwiZXhwIjoxNjQzMzM1MjYwfQ.VxPFuLFP2T-3d7QnGgGhkbQyWIinS77cwx5-GKc_hTc"
