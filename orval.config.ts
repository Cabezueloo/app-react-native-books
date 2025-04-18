import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      mode: "split",
      target: "./api/generated",
      schemas: './api/model',
      client: "react-query",
      override: {
        mutator: {
          path: "./api/axios-instance.ts",
          name: "customInstance",
        }
      },
    },
    input: {
      target:  "http://localhost:8000/api/docs.jsonopenapi", // Use env variable for Swagger URL
    },
  },
});
