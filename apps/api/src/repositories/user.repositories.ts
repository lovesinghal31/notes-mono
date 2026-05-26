import { prisma } from "@/lib/prisma"

export class UserRepository {
  private readonly userSelect = {
    id: true,
    email: true,
    name: true,
    created_at: true,
    updated_at: true,
  } as const

  public async findByEmail(
    email: string
  ) {
    return prisma.user.findUnique({
      where: { email },
      select: this.userSelect,
    })
  }

  public async findByEmailWithPassword(
    email: string
  ) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        ...this.userSelect,
        password_hash: true,
      },
    })
  }

  public async findById(
    id: string
  ) {
    return prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    })
  }

  public async existsByEmail(
    email: string
  ): Promise<boolean> {
    const user =
      await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
        },
      })

    return !!user
  }

  public async create(
    name: string,
    email: string,
    password_hash: string
  ) {
    return prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
      select: this.userSelect,
    })
  }

  public async update(
    id: string,
    data: Partial<{
      name: string
      email: string
      password_hash: string
    }>
  ) {
    return prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    })
  }

  public async delete(
    id: string
  ) {
    return prisma.user.delete({
      where: { id },
    })
  }
}