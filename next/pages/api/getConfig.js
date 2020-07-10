import { receive } from "../../src/utils/request";
import user from "../../src/database/datasources";

export default receive(user.getConfig);
