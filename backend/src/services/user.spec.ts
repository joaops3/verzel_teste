import userService from "./user.service"
import {IUser} from "../interfaces/interfaces"
describe("teste", ()=> {

  let name = "test"
  let password = "teste"
  it("should create user", async()=> {
    const created = await userService.create({name, password})


    expect(created).toHaveProperty("token")
  })

  it("should altenticate user", async()=> {
    const sud = await userService.login(name, password)
    expect(sud).toHaveProperty("token")
  })

  it("should not altenticate user", async ()=> {
    const sud = await userService.login("", "");
    expect(sud).toBe(undefined)
  })
})