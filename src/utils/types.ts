export enum Paths {
  Profiles = "/profiles",
  Home = "/",
}

export enum RequestMethods {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PUSH = "PUSH",
}

export enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 202,
  NOT_ALLOWED = 405,
  BAD_REQUEST = 400,
  UNPROCESSABLE = 422,
}
