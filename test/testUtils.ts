import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export async function createTestUser(
  app: INestApplication,
  name: string,
): Promise<{ id: string, access_token: string }> {
  const uniqueEmail = `${name}+${Date.now()}@example.com`;
  const newUser = await request(app.getHttpServer())
    .post('/users')
    .send({
      name,
      email: uniqueEmail,
      password: 'testPassword',
    })
    .expect(201);

  const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: uniqueEmail,
      password: 'testPassword',
    })
    .expect(200);

  return {
    id: newUser.body.id,
    access_token: loginResponse.body.access_token,
  };
}
