import { render, screen } from "@testing-library/react"
import MainBanner from "./MainBanner"

describe("tests banner", ()=> {

    it("should render", ()=> {
        render(<MainBanner></MainBanner>)
        expect(screen.getByText("VENI VIDI VICI")).toBeInTheDocument()
    })

})