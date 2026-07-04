import { describe, it, expect } from "vitest";
import { rateLimit } from "../rate-limit";

describe("rateLimit", () => {
  it("allows up to the limit, then blocks with a retry hint", () => {
    const key = "test-key-a";
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(key, { limit: 3, windowMs: 60_000 }).allowed).toBe(true);
    }
    const blocked = rateLimit(key, { limit: 3, windowMs: 60_000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("keys are independent", () => {
    expect(rateLimit("test-key-b", { limit: 1 }).allowed).toBe(true);
    expect(rateLimit("test-key-c", { limit: 1 }).allowed).toBe(true);
    expect(rateLimit("test-key-b", { limit: 1 }).allowed).toBe(false);
  });

  it("reports remaining budget", () => {
    const r = rateLimit("test-key-e", { limit: 5 });
    expect(r.remaining).toBe(4);
  });
});
