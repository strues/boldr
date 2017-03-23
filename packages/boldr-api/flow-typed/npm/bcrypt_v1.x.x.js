// flow-typed signature: de994876c9a9c710a0d5f03841d1747d
// flow-typed version: f3b8b37d70/bcrypt_v1.x.x/flow_>=v0.29.x

declare module bcrypt {
  declare function genSaltSync(rounds?: number): string;
  declare function genSalt(rounds: number): Promise<string>;
  declare function genSalt(): Promise<string>;
  declare function genSalt(callback: (err: Error, salt:string) => void): void;
  declare function genSalt(rounds: number, callback: (err: Error, salt: string) => void): void;
  declare function hashSync(data: string, salt: string): string;
  declare function hashSync(data: string, rounds: number): string;
  declare function hash(data: string, saltOrRounds: string|number): Promise<string>;
  declare function hash(data: string, rounds: number, callback: (err: Error, encrypted: string) => void): void;
  declare function hash(data: string, salt: string, callback: (err: Error, encrypted: string) => void): void;
  declare function compareSync(data: string, encrypted: string): boolean;
  declare function compare(data: string, encrypted: string): Promise<bool>;
  declare function compare(data: string, encrypted: string, callback: (err: Error, same: boolean) => void): void;
  declare function getRounds(encrypted: string): number;
}
