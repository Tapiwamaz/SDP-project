import { render, screen, fireEvent } from "@testing-library/react";
import CreateNotifications, {
  formatDateToISO,
  handleChangeNoti,
  handleSendButtonClick,
  sendNotification,
} from "./CreateNotifications"; // The component you're testing
import { fetchStorage } from "../../pages/CreateEvent/CreateEvent";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

jest.mock("../../pages/CreateEvent/CreateEvent", () => ({
  fetchStorage: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

jest.mock("../../firebase_config", () => ({
  auth: { currentUser: { uid: "mock-uid" } },
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Unit tests (Functions)", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("handleChangeNoti", () => {
    let initialState = {};

    let change = "message";
    let value = "hi";

    const mockSetMyNoti = jest.fn((updateFunction) => {
      const updatedState = updateFunction(initialState);
      return updatedState;
    });

    handleChangeNoti(change, value, mockSetMyNoti);
    expect(mockSetMyNoti).toHaveBeenCalled();
    expect(mockSetMyNoti).toHaveBeenCalledWith(expect.any(Function));
    let updateFunction = mockSetMyNoti.mock.calls[0][0];
    let updatedState = updateFunction(initialState);

    expect(updatedState).toEqual({
      message: value,
    });
  });

  test("handleSendButtonClick", () => {
    let mockNoti = { message: "hi", eventIndex: 0 };
    let mockOrganiser = { name: "tyson", image_url: "exampl.url" };
    let mockEvents = [
      {
        name: "Annual Tech Conference",
        date: "2024-09-15",
        start_time: "09:00",
        end_time: "17:00",
        type: "Conference",
        venue_type: "Indoor",
        description:
          "A conference bringing together tech enthusiasts and professionals to discuss the latest in technology and innovation.",
        location: "Tech Hub Convention Center, San Francisco, CA",
        event_id: "12",
      },
    ];

    let mockDB = {};
    let auth = { currentUser: { uid: "xyz" } };
    const mockSetOpen = jest.fn((updateFunction) => {
      if (typeof updateFunction === "function") {
        return updateFunction(true);
      }
    });
    const mockSendNoti = jest.fn((noti, db) => {});
    handleSendButtonClick(
      mockNoti,
      mockOrganiser,
      mockEvents,
      mockDB,
      auth,
      mockSetOpen,
      mockSendNoti
    );
    let resultant = {
      message: mockNoti.message,
      ...mockOrganiser,
      event_id: mockEvents[0].event_id,
      notification_id: undefined,
      notification_type: "organizer",
      organiser_id: auth.currentUser.uid,
      time: formatDateToISO(new Date()),
    };

    expect(mockSendNoti).toHaveBeenCalled();
    expect(mockSendNoti).toHaveBeenCalledWith(resultant, mockDB);
    expect(mockSetOpen).toHaveBeenCalledWith(false);
    let updateFunction = mockSetOpen.mock.calls[0][0];
    expect(updateFunction).toEqual(false);
  });

  test("sendNotification handles error correctly", async () => {
    addDoc.mockRejectedValueOnce(new Error("Failed to send"));
    const notification = { message: "test" };
    const db = {};

    await expect(sendNotification(notification, db)).rejects.toThrow(
      "Failed to create notification. Please try again."
    );

    expect(toast.success).not.toHaveBeenCalled();
  });

  test("sendNotification sends notification successfully", async () => {
    const mockCollectionRef = {}; // Mocked return value for collection
    collection.mockReturnValueOnce(mockCollectionRef);
    addDoc.mockResolvedValueOnce({});
    const notification = { message: "test" };
    const db = {};

    await sendNotification(notification, db);

    expect(collection).toHaveBeenCalledWith(db, "Notifications");
    expect(addDoc).toHaveBeenCalledWith(mockCollectionRef, notification);
    expect(toast.success).toHaveBeenCalledWith("Your message has been sent");
  });

  test("formateDateIso", ()=> {
    const date = new Date(2023, 8, 30, 14, 45, 30); // September 30, 2023 14:45:30
    const formattedDate = formatDateToISO(date);
    expect(formattedDate).toBe('2023-09-30T14:45:30');

  })
});

describe("Branching tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("useEffect sets filledForm to true when message and eventIndex are set", () => {
    fetchStorage.mockReturnValue({ name: "User" });

    const { rerender } = render(
      <CreateNotifications
        myEvents={[{ name: "Event 1" }]}
        setOpen={jest.fn()}
      />
    );

    const messageInput = screen.getByTestId("h");
    fireEvent.change(messageInput, { target: { value: "Hello" } });
    const eventSelect = screen.getByText("Select an event");
    fireEvent.change(eventSelect, { target: { value: 0 } });
    expect(parseInt(eventSelect.value)).toBe(0);
  });

  test("SendButton is disabled if message or eventIndex are not set", () => {
    render(<CreateNotifications myEvents={[]} setOpen={jest.fn()} />);

    const sendButton = screen.getByRole("button", { name: /send/i });
    expect(sendButton).toBeDisabled();
  });

  test("updates message input on change", () => {
    const { rerender } = render(
      <CreateNotifications myEvents={[]} setOpen={jest.fn()} />
    );

    const messageInput = screen.getByTestId("h");
    fireEvent.change(messageInput, { target: { value: "Hello" } });
    rerender(<CreateNotifications myEvents={[]} setOpen={jest.fn()} />);
    expect(messageInput.value).toBe("Hello");
  });
});

describe("Rendering tests", () => {
  test("renders CreateNotificationWrapper and child elements", () => {
    render(<CreateNotifications myEvents={[]} setOpen={jest.fn()} />);

    expect(
      screen.getByPlaceholderText("Please enter your message")
    ).toBeInTheDocument();
    expect(screen.getByText("Select an event")).toBeInTheDocument();
    expect(screen.getByText("Characters left: 200")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  test("renders event options correctly", () => {
    const events = [{ name: "Event 1" }, { name: "Event 2" }];
    render(<CreateNotifications myEvents={events} setOpen={jest.fn()} />);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0].textContent).toBe("Event 1");
    expect(options[1].textContent).toBe("Event 2");
  });
});
