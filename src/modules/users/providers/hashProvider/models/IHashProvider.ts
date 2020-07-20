export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hasehd: string): Promise<boolean>;
}
