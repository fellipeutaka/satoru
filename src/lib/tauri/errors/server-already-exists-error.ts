export class ServerAlreadyExistsError extends Error {
  constructor() {
    super("Server already exists");
  }
}
