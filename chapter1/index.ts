import { invoiceData } from "./mock";
import { statement } from "./controller";

const result = statement(invoiceData, "text");
console.log(result);
