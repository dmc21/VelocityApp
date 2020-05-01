export interface JwtResponseI {
  dataUser: {
    _id?: string;
    name: string;
    username: string;
    password: string;
    maxSpeed: number;
    maxDistance: number;
    acumDistance: number;
    accessToken: string;
    expiresIn: string;
  };
}
