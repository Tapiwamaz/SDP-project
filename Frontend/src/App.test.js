import App from "./App";
import {render} from "@testing-library/react"

describe(App,  () =>{
    it("Basic app testings", () =>{
        const {getByTestId} = render(<App />);
        const textValue = getByTestId("title").textContent;
        expect(textValue).toBe("We're currently working on a few things :(")
    })
})
