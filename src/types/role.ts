export enum Role {
  Admin = 'ADMIN',
  Buyer = 'BUYER',
  Seller = 'SELLER'
}

export type RoleValue = (typeof Role)[keyof typeof Role]
