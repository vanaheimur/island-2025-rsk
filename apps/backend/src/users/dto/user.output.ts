export class UserOutput {
  id!: number
  name!: string
  nationalId!: string
  address!: string
  email!: string
  phone!: string
  createdAt!: Date
  updatedAt!: Date

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<UserOutput>) {
    Object.assign(this, partial)
  }
}
