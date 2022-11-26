import request from "supertest";
import server from "../server";

describe("User controller", ()=> {
   

    it("should get cars", async()=> {
        await request(server).get("/car").expect(200)
    })

    it("should be able to create user", async()=> {
        // const response = await request(server).post("/user").send({name: "test", password: "test"})

        // expect(response.status).toBe(201)
    } )

    it("should be able to login and find user", async ()=> {
        const responseToken = await request(server).post("/login").send({name: "client", password: "123"})
        const response = await request(server).get(`/user/${responseToken.body.data.id}`).set({Authorization: `Bearer ${responseToken.body.data.token}`})

        expect(response.status).toBe(200)
    })
})