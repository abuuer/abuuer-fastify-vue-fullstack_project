import fastify from "fastify";
import categoryRoutes from "./modules/Category/category.route";
import productRoutes from "./modules/Product/product.route";
import multipart from "@fastify/multipart";
import multer from "multer";
const server = fastify();

server.get("/", async () => {
  return "Hello there! 👋";
});

server.register(multipart, { attachFieldsToBody: "keyValues" });

server.register(categoryRoutes, { prefix: "api/categories" });
server.register(productRoutes, { prefix: "api/products" });

server.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Started server at http://localhost:3000`);
});
