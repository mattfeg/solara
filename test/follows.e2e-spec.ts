import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';
import { createTestUser } from './testUtils';

describe('Follows (e2e)', () => {
  jest.setTimeout(20000);
  let app: INestApplication;
  let createdFollowId: string;
  let prisma: PrismaService;
  let user1: { id: string, access_token: string };
  let user1Id: string;
  let user1AccessToken: string;
  let user2: { id: string, access_token: string };
  let user2Id: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule.forRoot('.env.test')],
      providers: [PrismaService],
    }).compile();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();

    await prisma.follows.deleteMany();
    await prisma.user.deleteMany();

    user1 = await createTestUser(app, 'user1Test');
    user1Id = user1.id;
    user1AccessToken = user1.access_token;

    user2 = await createTestUser(app, 'user2Test');
    user2Id = user2.id;
  });

  afterAll(async () => {
    await prisma.follows.deleteMany();
    await prisma.user.deleteMany()
    await app.close();
  });

  it('should create a new follow (POST /follows)', async () => {
    const followsDto = {
      followingId: user2Id,
    };

    const response = await request(app.getHttpServer())
      .post(`/follows/${user1Id}`)
      .set('Authorization', `Bearer ${user1AccessToken}`)
      .send(followsDto)
      .expect(201);

    createdFollowId = response.body.id;
    expect(response.body).toHaveProperty('id');
    expect(response.body.followingId).toBe(followsDto.followingId);
    expect(response.body.followerId).toBe(user1Id);
  });

  it('should get all follows (GET /follows)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/follows/`)
      .set('Authorization', `Bearer ${user1AccessToken}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get all followers by user (GET /follows/user/followers/:id)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/follows/user/followers/${user2Id}`)
      .set('Authorization', `Bearer ${user1AccessToken}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get all followings by user (GET /follows/followings/:id)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/follows/user/followings/${user1Id}`)
      .set('Authorization', `Bearer ${user1AccessToken}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('should delete a follow (DELETE /follows/:id)', async () => {
    await request(app.getHttpServer())
      .delete(`/follows/${createdFollowId}`)
      .set('Authorization', `Bearer ${user1AccessToken}`)
      .expect(200);

    const followInDb = await prisma.follows.findUnique({ where: { id: createdFollowId } });
    expect(followInDb).toBeNull();
  });
});
