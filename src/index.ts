import express, { Request, Response } from "express";
import compression from "compression";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import statusMap from "./utils";
const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(compression());
app.post("/leads", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { name, email, status } = req.body;
    const lead = await prisma.lead.create({
      data: { name, email, status: statusMap[status] },
    });
    res.status(201).json({ message: "Created Successfully", lead });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/leads", async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany();
    res.status(200).json({ data: leads });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
