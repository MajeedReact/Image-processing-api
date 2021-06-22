import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Endpoint responses", () => {
  it("Gets the server status to check if it is connected or not", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });

  it("Should reject request and display input file missing", async () => {
    const response = await request.get("/api/image");
    expect(response.status).toBe(400);
  });

  it("Request accepted and image is either resized or loading the cached image", async () => {
    const response = await request.get(
      "/api/image?filename=fjord&height=300&width=300"
    );
    expect(response.status).toBe(200);
  });

  it("Should reject request and display Invalid height or width.", async () => {
    const response = await request.get(
      "/api/image?filename=fjord&height=300&width=-300"
    );
    expect(response.text).toBe(
      `Invalid height or width. height:${300}, width:${-300}`
    );
  });

  it("Request is rejected and display Expected to recieve a number for height and width but instead recieved a character", async () => {
    const response = await request.get(
      "/api/image?filename=fjord&height=300&width=abc"
    );
    expect(response.text).toBe(
      `Expected to recieve a number for height and width but instead recieved a character, height:300 width:NaN`
    );
  });
});
