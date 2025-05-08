export class VehicleOutput {
  id!: number
  licensePlate!: string
  yearOfPurchase!: number
  value!: number
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<VehicleOutput>) {
    Object.assign(this, partial)
  }
}
