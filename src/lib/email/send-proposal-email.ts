import { CATEGORIES } from "@/lib/constants";
import {
  CONTENT_PROPOSAL_TYPE_LABELS,
  type ContentProposalInput,
} from "@/lib/validators/proposal";

type ProposalEmailContext = ContentProposalInput & {
  submittedByUser?: {
    name: string;
    email: string;
  };
};

function getRecipientEmail() {
  return process.env.PROPOSAL_RECIPIENT_EMAIL?.trim();
}

function getFromEmail() {
  return (
    process.env.PROPOSAL_FROM_EMAIL?.trim() ??
    "Web Dev Training <onboarding@resend.dev>"
  );
}

function categoryName(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug)?.name ?? slug;
}

function buildPlainText(proposal: ProposalEmailContext) {
  const lines = [
    "New content proposal for Web Dev Training",
    "",
    `Type: ${CONTENT_PROPOSAL_TYPE_LABELS[proposal.contentType]}`,
    `Category: ${categoryName(proposal.categorySlug)}`,
    `Title: ${proposal.title}`,
    "",
    "Description:",
    proposal.description,
  ];

  if (proposal.details?.trim()) {
    lines.push("", "Additional details:", proposal.details.trim());
  }

  if (proposal.submitterName?.trim() || proposal.submitterEmail?.trim()) {
    lines.push(
      "",
      "Submitted by:",
      proposal.submitterName?.trim() || "(no name provided)",
      proposal.submitterEmail?.trim() || "(no email provided)",
    );
  }

  if (proposal.submittedByUser) {
    lines.push(
      "",
      "Signed-in account:",
      `${proposal.submittedByUser.name} (${proposal.submittedByUser.email})`,
    );
  }

  return lines.join("\n");
}

function buildHtml(proposal: ProposalEmailContext) {
  const escape = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const detailsBlock = proposal.details?.trim()
    ? `<h3>Additional details</h3><pre style="white-space:pre-wrap;font-family:inherit">${escape(proposal.details.trim())}</pre>`
    : "";

  const submitterBlock =
    proposal.submitterName?.trim() || proposal.submitterEmail?.trim()
      ? `<p><strong>Submitted by:</strong> ${escape(proposal.submitterName?.trim() || "Anonymous")}<br /><strong>Contact:</strong> ${escape(proposal.submitterEmail?.trim() || "Not provided")}</p>`
      : "";

  const accountBlock = proposal.submittedByUser
    ? `<p><strong>Signed-in account:</strong> ${escape(proposal.submittedByUser.name)} (${escape(proposal.submittedByUser.email)})</p>`
    : "";

  return `
    <h2>New content proposal</h2>
    <p><strong>Type:</strong> ${CONTENT_PROPOSAL_TYPE_LABELS[proposal.contentType]}</p>
    <p><strong>Category:</strong> ${escape(categoryName(proposal.categorySlug))}</p>
    <p><strong>Title:</strong> ${escape(proposal.title)}</p>
    <h3>Description</h3>
    <pre style="white-space:pre-wrap;font-family:inherit">${escape(proposal.description)}</pre>
    ${detailsBlock}
    ${submitterBlock}
    ${accountBlock}
  `.trim();
}

export function isProposalEmailConfigured() {
  return Boolean(getRecipientEmail() && process.env.RESEND_API_KEY?.trim());
}

export async function sendProposalEmail(proposal: ProposalEmailContext) {
  const recipientEmail = getRecipientEmail();
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!recipientEmail || !apiKey) {
    throw new Error(
      "Proposal email is not configured. Set PROPOSAL_RECIPIENT_EMAIL and RESEND_API_KEY.",
    );
  }

  const typeLabel = CONTENT_PROPOSAL_TYPE_LABELS[proposal.contentType];
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromEmail(),
      to: [recipientEmail],
      reply_to: proposal.submitterEmail?.trim() || undefined,
      subject: `[WDT Proposal] ${typeLabel}: ${proposal.title}`,
      text: buildPlainText(proposal),
      html: buildHtml(proposal),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to send proposal email (${response.status}): ${errorBody}`,
    );
  }
}
