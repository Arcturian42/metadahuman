import { describe, it, expect } from "vitest";
import { reportReadyEmail } from "./templates";

describe("reportReadyEmail", () => {
  it("HTML-escapes firstName so markup in names cannot inject into the email body", () => {
    const firstName = "<script>alert(1)</script>";
    const { html, text } = reportReadyEmail({
      to: "test@example.com",
      firstName,
      reportUrl: "https://example.com/report/123",
    });

    expect(html).toContain("Hi &lt;script&gt;alert(1)&lt;/script&gt;, your report is ready");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(text).toContain(`Hi ${firstName},`);
  });

  it("escapes ampersands, quotes, and angle brackets in the HTML body", () => {
    const firstName = `Maya "The &" <Bee>`;
    const { html, text } = reportReadyEmail({
      to: "test@example.com",
      firstName,
      reportUrl: "https://example.com/report/123",
    });

    expect(html).toContain("Hi Maya &quot;The &amp;&quot; &lt;Bee&gt;, your report is ready");
    expect(text).toContain(`Hi ${firstName},`);
  });
});
