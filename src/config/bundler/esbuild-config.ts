import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service = false;

const startService = async (rawCode: string) => {
      if (!service) {
            console.log(service);
            await esbuild.initialize({
                  worker: true,
                  wasmURL: "https://unpkg.com/esbuild-wasm@0.13.4/esbuild.wasm",
            });
            service = true;
      }

      try {
            const result = await esbuild.build({
                  entryPoints: ["index.js"],
                  bundle: true,
                  write: false,
                  plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
                  define: {
                        "process.env.NODE_ENV": '"production"',
                        global: "window",
                  },
            });
            return {
                  code: result.outputFiles[0].text,
                  err: "",
            };
      } catch (error: any) {
            return {
                  code: "",
                  err: error.message,
            };
      }
};

export default startService;
