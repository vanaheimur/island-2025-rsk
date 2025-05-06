import { CreateAssetInput } from './createAsset.input'

import { PartialType } from '@nestjs/swagger'

export class UpdateAssetInput extends PartialType(CreateAssetInput) {}
