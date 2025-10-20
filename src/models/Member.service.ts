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

    public async processLogin(input: { memberNick: string; memberPassword: string; }): Promise<Member> { 
        const member = await this.memberModel
        .findOne(
            { memberNick: input.memberNick, 
              memberPassword: input.memberPassword 
            }
        )
         .exec();
        
        if (!member) { 
            throw new Errors(HttpCode.UNAUTHORIZED, Message.LOGIN_FAILED);
        }
        const isMatch = member.memberPassword === input.memberPassword;
        if (!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
        }
        
        
        return await this.memberModel.findById(member._id).exec();;
    }

}

export default MemberService;