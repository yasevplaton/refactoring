import { invoiceData } from "./mock";
import { statement } from "./controller";

const result = statement(invoiceData, "html");
console.log(result);
