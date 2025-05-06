import { AssetsService } from './assets.service'
import { AssetOutput } from './dto/asset.output'
import { CreateAssetInput } from './dto/createAsset.input'
import { UpdateAssetInput } from './dto/updateAsset.input'

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}
  @Get()
  async getMultipleAssets(): Promise<AssetOutput[]> {
    const assets = await this.assetsService.getMultipleAssets()

    return assets.map(
      (asset) =>
        new AssetOutput({
          ...asset,
          createdAt: asset.createdAt ?? undefined,
          updatedAt: asset.updatedAt ?? undefined,
        }),
    )
  }

  @Get('/:id')
  async getSingleAsset(@Param('id') id: number): Promise<AssetOutput> {
    const asset = await this.assetsService.getSingleAssetById(id)

    return new AssetOutput({
      ...asset,
      createdAt: asset.createdAt ?? undefined,
      updatedAt: asset.updatedAt ?? undefined,
    })
  }

  @Put('/:id')
  async updateAsset(
    @Param('id') id: number,
    @Body() body: UpdateAssetInput,
  ): Promise<AssetOutput> {
    const asset = await this.assetsService.updateAsset(id, body)

    return new AssetOutput({
      ...asset,
      createdAt: asset.createdAt ?? undefined,
      updatedAt: asset.updatedAt ?? undefined,
    })
  }

  @Post()
  async createAsset(@Body() body: CreateAssetInput): Promise<AssetOutput> {
    const asset = await this.assetsService.createAsset(body)

    return new AssetOutput({
      ...asset,
      createdAt: asset.createdAt ?? undefined,
      updatedAt: asset.updatedAt ?? undefined,
    })
  }
}

// TODO: Add support to get old tax returns
// TODO: Add integration tests for this controller
