export function parseExceptionStack(exception: unknown) {
  if (exception instanceof Error) {
    return exception.stack;
  }

  return 'no stack';
}
