import { Session } from "express-session";
import { Request } from "express";
import { MemberStatus, MemberType } from "../enums/member.enum";
import mongoose, { Types } from "mongoose";
import { ObjectId } from "mongoose";

export interface Member {
  _id: ObjectId;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberAddress?: string;
  memberDescription?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberUpdateInput {
  _id: ObjectId;
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberStatus?: MemberStatus;
  memberAddress?: string;
  memberDescription?: string;
  memberImage?: string;
}
export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberImage?: string;
  memberDescription?: string;
  memberPoints?: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface AdminRequest extends Request {
  member: Member;
  session: Session & { member: Member };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
