const HIDDEN_MESSAGE = "beforeinstallpromptevent.preventDefault()";

function shouldSuppress(args: unknown[]) {
  return args.some((arg) =>
    typeof arg === "string"
      ? arg.includes(HIDDEN_MESSAGE)
      : typeof arg === "object" && arg !== null &&
        String(arg).includes(HIDDEN_MESSAGE)
  );
}

function wrapConsoleMethod(method: "log" | "warn" | "error" | "info") {
  const original = console[method];
  console[method] = (...args: unknown[]) => {
    if (shouldSuppress(args)) {
      return;
    }
    original.apply(console, args);
  };
}

wrapConsoleMethod("log");
wrapConsoleMethod("warn");
wrapConsoleMethod("error");
wrapConsoleMethod("info");
