enum ResponseStatus {
  success = 'success',
  failed = 'failed',
  not_found = 'not_found',
  unauthenticated = 'not_authenticated',
  unauthorized = 'not_authorized',
  validation_error = 'validation_error',
}

export default ResponseStatus;
