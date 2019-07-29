// Modules to control application life and create native browser window
import App from "./App";
import { serviceProviders } from "../config/app";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const app: App = new App();
const sp = serviceProviders.map((sp) => new sp(app));
sp.forEach((sp) => sp.register());
sp.forEach((sp) => sp.boot());
