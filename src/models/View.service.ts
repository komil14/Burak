import { HttpCode } from "../libs/errors";
import { View, ViewInput } from "../libs/types/view";
import { Message } from "../libs/errors";
import Errors from "../libs/errors";
import ViewModel from "../schemas/View.model";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }
  public async checkViewExistance(input: ViewInput): Promise<View> {
    const view = await this.viewModel
      .findOne({
        memberId: input.memberId,
        viewRefId: input.viewRefId,
      })
      .exec();

    return view;
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      return await this.viewModel.create(input);
    } catch (err) {
      console.error("Error inserting member view:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ViewService;
