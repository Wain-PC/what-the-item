import { receive } from "../../src/utils/request";
import config from "../../src/utils/config";

export default receive(async () => {
  const { language } = config;
  const data = await import(`../../src/languages/${language}.json`);
  return { language, data };
});
