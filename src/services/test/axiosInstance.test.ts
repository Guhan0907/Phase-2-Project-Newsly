import API from "../axiosInstance";
import AxiosMockAdapter from "axios-mock-adapter";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mock = new AxiosMockAdapter(API);

describe("axiosInstance", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("has correct base URL and includes API key", async () => {
    const sampleData = { msg: "ok" };
    mock.onGet("/svc/topstories/v2/home.json").reply((config) => {
      expect(config.baseURL).toBe("https://api.nytimes.com");
      expect(config.params["api-key"]).toBe(import.meta.env.VITE_NYT_API_KEY);
      return [200, sampleData];
    });

    const res = await API.get("/svc/topstories/v2/home.json");
    expect(res.data).toEqual(sampleData);
  });

  it("redirects to /error on API error", async () => {
    const locationSpy = vi.spyOn(window, "location", "get").mockReturnValue({
      ...window.location,
      href: "",
    });

    mock.onGet("/svc/fake-error").reply(500);

    await expect(API.get("/svc/fake-error")).rejects.toThrow();

    expect(window.location.href).toBe("/error");

    locationSpy.mockRestore();
  });
});
