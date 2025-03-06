import { Status } from "@prisma/client";

const statusMap: { [key: string]: Status } = {
  New: "New",
  Engaged: "Engaged",
  "Proposal Sent": "ProposalSent", // ✅ Fixes space issue
  "Closed-Won": "ClosedWon",
  "Closed-Lost": "ClosedLost",
};
export default statusMap;
