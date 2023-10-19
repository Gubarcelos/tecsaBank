export interface IJwtPayload {
    id: string;
    name: string;
    cpf: string;
    mail: string;
    accounts: {
      checkingAccount: {
        agency: string;
        accountNumber: string;
        pixKey: string;
      };
      savingAccount?: {
        agency: string;
        accountNumber: string;
        pixKey: string;
      };
    };
  }