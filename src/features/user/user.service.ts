import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../models/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  private blockedFields: (keyof User)[] = [
    'password',
    'sessionToken',
    'email',
    'facebookId',
    'googleId',
    'appleId',
  ];

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  getUserByName(name: string) {
    const username = { $regex: new RegExp(`^${name}$`, 'i') };
    return this.userModel.findOne({ username });
  }

  getUserByEmail(mail: string) {
    const email = { $regex: new RegExp(`^${mail}$`, 'i') };
    return this.userModel.findOne({ email });
  }

  async getUser(username: string) {
    return (
      (await this.getUserByName(username)) ??
      (await this.getUserByEmail(username))
    );
  }

  getUserById(id: ObjectId | string) {
    return this.userModel.findById(id);
  }

  async validateUserById(id: string) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(body: Partial<User>) {
    const user = await this.userModel.create(body);

    user.generateSessionToken();

    return user.save();
  }

  filterUser(user: User, allowedFields: (keyof User)[] = []) {
    const userObject = user.toObject({ virtuals: true });

    for (const field of this.blockedFields) {
      if (allowedFields.includes(field)) {
        continue;
      }

      delete userObject[field];
    }

    return userObject;
  }

  async validateUserByName(username: string) {
    const user = await this.getUserByName(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
