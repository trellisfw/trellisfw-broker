import { Controller } from "cerebral";
import root_module from "./modules";

const Devtools = (process.env.NODE_ENV === 'production' ?
					null :
					require('cerebral/devtools').default);
export default Controller(root_module, {
	devtools: Devtools && Devtools({host: 'localhost:8787'})
})
