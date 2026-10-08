import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices;
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "TabNews <tabnews@email.com.br>",
      to: "contato@curso.dev",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "TabNews <tabnews@email.com.br>",
      to: "contato@curso.dev",
      subject: "Teste de second mail",
      text: "Teste de segundo email.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<tabnews@email.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@curso.dev>");
    expect(lastEmail.subject).toBe("Teste de second mail");
    expect(lastEmail.text).toBe("Teste de segundo email.\n");
  });
});
