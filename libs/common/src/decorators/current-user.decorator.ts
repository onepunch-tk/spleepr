import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '@app/common';

const getCurrentUserByContext = (context: ExecutionContext): UserDto => {
  return context.switchToHttp().getRequest().user;
};
export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => getCurrentUserByContext(context),
);
