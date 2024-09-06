import {getAllByText, render} from "@testing-library/react"
import CreateEvent from "./CreateEvent"

describe(CreateEvent, () =>{
    // label
    it("Label of page shown", () =>{
        const {getByTestId} = render(<CreateEvent/>)
        const titleText = getByTestId("title").textContent
        expect(titleText).toBe("Create your event")
    })
})