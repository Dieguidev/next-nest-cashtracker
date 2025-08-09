import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetExpense = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.expense;
  },
);
