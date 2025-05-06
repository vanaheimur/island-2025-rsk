import { CreateUserInput } from './dto/createUser.input'
import { UpdateUserInput } from './dto/updateUser.input'
import { UserOutput } from './dto/user.output'
import { UsersService } from './users.service'

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getMultipleUsers(): Promise<UserOutput[]> {
    const users = await this.usersService.getMultipleUsers()

    return users.map(
      (user) =>
        new UserOutput({
          ...user,
          createdAt: user.createdAt ?? undefined,
          updatedAt: user.updatedAt ?? undefined,
        }),
    )
  }

  @Get('/:id')
  async getSingleUser(@Param('id') id: number): Promise<UserOutput> {
    const user = await this.usersService.getSingleUserById(id)

    return new UserOutput({
      ...user,
      createdAt: user.createdAt ?? undefined,
      updatedAt: user.updatedAt ?? undefined,
    })
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserInput,
  ): Promise<UserOutput> {
    const user = await this.usersService.updateUser({
      ...body,
      id,
    })

    return new UserOutput({
      ...user,
      createdAt: user.createdAt ?? undefined,
      updatedAt: user.updatedAt ?? undefined,
    })
  }

  @Post()
  async createUser(@Body() body: CreateUserInput): Promise<UserOutput> {
    const user = await this.usersService.createUser(body)

    return new UserOutput({
      ...user,
      createdAt: user.createdAt ?? undefined,
      updatedAt: user.updatedAt ?? undefined,
    })
  }
}

// TODO: Add support to get old tax returns
// TODO: Add integration tests for this controller
