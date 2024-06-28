export default interface IAccountService {
  settingsById(id: number): Promise<any>;
}
