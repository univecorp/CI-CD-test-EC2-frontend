import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // By setting this to true, Vite will automatically infer your local network IP address.
    port: 3000, // Specify the port number you want the server to run on.
  },
});
