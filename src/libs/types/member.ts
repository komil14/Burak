import { MemberStatus, MemberType } from "../enums/member.enum";
import { ObjectId } from "mongoose";
export interface Member {
    _id: ObjectId;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberPhone: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberImage?: string;
    memberPoints: number;
    createdAt: Date;
    updatedAt: Date;
  }


export interface MemberInput {
  RESTARANT: MemberType | undefined;
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
  memberEmail: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}