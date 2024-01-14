import Koa from 'koa';
import { ValidationErrorHandler } from 'koa-zod-router';
import ResponseStatus from '@constants/status';

const handleZodError = ({
  ctx,
  message,
}: {
  ctx: Koa.DefaultContext;
  message: string;
}) => {
  const zodErrors = JSON.parse(message);
  const errors = [];
  for (const error of zodErrors) {
    const { code, message, path } = error;
    const data = {
      code,
      message,
      path: path.join('.'),
    };
    errors.push(data);
  }
  ctx.status = 422;
  ctx.body = {
    status: ResponseStatus.validation_error,
    data: {
      errors,
    },
  };
};

const validationErrorHandler: ValidationErrorHandler = async (ctx, next) => {
  if (!ctx.invalid?.error) {
    await next();
    return;
  }

  const { body, headers, params } = ctx.invalid;

  if (body) {
    const { message } = body;
    handleZodError({ ctx, message });
    return;
  }

  if (headers) {
    ctx.status = 401;
    ctx.body = { status: ResponseStatus.unauthenticated };
    return;
  }

  if (params) {
    const { message } = params;
    handleZodError({ ctx, message });
    return;
  }

  ctx.status = 422;
  ctx.body = {
    status: ResponseStatus.validation_error,
    message: 'Unable to process request.',
  };
};

export default validationErrorHandler;
