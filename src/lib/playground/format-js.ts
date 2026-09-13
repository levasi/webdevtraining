import * as prettier from "prettier/standalone";
import estree from "prettier/plugins/estree";
import babel from "prettier/plugins/babel";

/** Format JavaScript with Prettier (browser-safe standalone build). */
export async function formatJavaScript(code: string): Promise<string> {
  return prettier.format(code, {
    parser: "babel",
    plugins: [babel, estree],
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    tabWidth: 2,
    printWidth: 80,
  });
}
