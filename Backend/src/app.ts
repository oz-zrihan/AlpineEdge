import express from "express";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import preventXss from "./3-middleware/prevent-xss";
import helmet from "helmet";
import cors from "cors";
import appConfig from "./4-utils/app-config";
import fs from "fs";
import https from "https";
import path from "path";
//Routs
import authRout from "./6-routes/auth-routes";
import productsRout from "./6-routes/products-routes";
import ordersRout from "./6-routes/orders-routes";
import basketRout from "./6-routes/basket-routes";
import basketItemRout from "./6-routes/basket-item-routes";
import deliveryMethodRout from "./6-routes/delivery-methods-routes";
import imagesRout from "./6-routes/images-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import { request } from "http";

const server = express();

// Prevent DoS attack:
// server.use(
//   expressRateLimit({
//     windowMs: 10000,
//     max: 10000,
//     message: "To many request",
//   })
// );

// Use helmet to defense against malicious headers:
server.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Create CORS policy:
server.use(cors());

// Create request.body object if json was sent:
server.use(express.json());

// Defend from cross-site scripting:
server.use(preventXss);

// Get files sent by the front into request.files object:
server.use(expressFileUpload());
server.use(express.static("./images"));

// Routs:
server.use("/api/auth", authRout);
server.use("/api/basket", basketRout);
server.use("/api/basketItems", basketItemRout);
server.use("/api/orders", ordersRout);
server.use("/api/products", productsRout);
server.use("/api/deliveryMethods", deliveryMethodRout);
server.use("/api/images", imagesRout);
server.use("*", routeNotFound);
server.use(catchAll);

// SSL/TLS Configuration:
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "cert/localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert/localhost.pem")),
};

// Start HTTPS server:
https.createServer(sslOptions, server).listen(appConfig.port, () => {
  console.log("Listening on https://localhost:" + appConfig.port);
});
