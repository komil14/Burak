import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/errors";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
    private readonly memberModel;
 constructor() {
    this.memberModel = MemberModel;
 }

 public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel.findOne({ memberType: MemberType.RESTAURANT }).exec();

    if (exist) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
   try {
    const tempResult = new this.memberModel(input);
    const result = await tempResult.save();
    result.memberPassword = "";
    return result;
   } catch (err) {
     throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATED_FAILED);
   }
}
}

export default MemberService;