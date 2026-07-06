const protocolPattern = /^[a-z][a-z\d+\-.]*:/i;

export function withBase(path = "") {
  if (path.startsWith("#") || protocolPattern.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;
}
