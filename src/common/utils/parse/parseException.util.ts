import { parseExceptionMessage } from "./parseExceptionMesage.util";
import { parseExceptionStack } from "./parseExceptionStack.util";
import { parseExceptionStatus } from "./parseExceptionStatus.util";


export function parseException(exception: unknown) {
	return {
		status: parseExceptionStatus(exception),
		message: parseExceptionMessage(exception),
		stack: parseExceptionStack(exception)
	}
}