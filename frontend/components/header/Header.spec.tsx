import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../context/AuthProvider"
import {useContext} from "react"
import Header from "./Header"

jest.mock("next/router", ()=> {
    return {
        useRouter(){
            asPath: "/"
        }
    }
})

describe("header tests", ()=> {

    it("should render correcly", ()=>{
        const {debug, getByText } = render(<Header fixed={true}></Header>)
        debug()

        expect(getByText("CADASTRAR")).toBeInTheDocument()
    })

    it("should be fixed", ()=>{
        const {container } = render(<Header></Header>)

        const nav = container.querySelector("nav")
        expect(nav).toHaveClass("header")
    })

    it("user not logged", () => {
        render(<Header></Header>)
        expect(screen.getByText("LOGIN")).toBeInTheDocument()
    })

    it("should be logged", async()=> {
        // const {login} = useContext(AuthContext)
        // await login("admin", "123")

        render(<Header></Header>)
        expect(screen.getByText("LOGIN")).not.toBeInTheDocument()
    })
})