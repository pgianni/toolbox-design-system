// Development-only warnings for deprecated APIs, logged once per message.
// `process.env.NODE_ENV` is written literally so bundlers can replace it.
declare const process: { env: { NODE_ENV?: string } };

const warned = new Set<string>();

function isProduction() {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return false;
  }
}

export function warnDeprecated(message: string) {
  if (warned.has(message) || isProduction()) return;
  warned.add(message);
  console.warn(`[@pgianni/toolbox-react] ${message} Voir MIGRATION.md.`);
}
