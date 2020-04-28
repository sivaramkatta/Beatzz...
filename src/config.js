const area = "dev";

const config = {
  prod: { base_url: "https://beatzz004.web.app" },
  dev: { base_url: "http://localhost:3000" }
}[area];

export default config;
