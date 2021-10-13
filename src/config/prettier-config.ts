import prettier from "prettier";
import parser from "prettier/parser-babel";

export const PrettierConfig = (code: string) => {
      return prettier
            .format(code, {
                  parser: "babel",
                  plugins: [parser],
                  tabWidth: 4,
                  useTabs: false,
                  jsxSingleQuote: true,
                  bracketSameLine: true,
            })
            .replace(/\n$/, "");
};
