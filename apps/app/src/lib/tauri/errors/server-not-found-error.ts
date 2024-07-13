export class ServerNotFoundError extends Error {
  constructor() {
    super("Server not found");
  }
}
