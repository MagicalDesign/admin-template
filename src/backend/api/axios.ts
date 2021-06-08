import axios from "axios";
import { config } from "../config/index";

axios.defaults.baseURL = config.baseURL;

export { axios, config };
