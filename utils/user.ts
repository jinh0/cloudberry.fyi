import { UserType } from "@typing";

export const initUser = (name: string, email: string): Partial<UserType> => ({
  name, email,
  saved: [],
  completed: [],
  current: [],
})