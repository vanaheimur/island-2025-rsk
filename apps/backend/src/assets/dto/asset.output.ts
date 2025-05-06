export class AssetOutput {
  id!: number
  landNumber!: string
  description!: string
  amount!: number
  isForeign!: boolean
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<AssetOutput>) {
    Object.assign(this, partial)
  }
}
