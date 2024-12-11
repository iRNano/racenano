// mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock the /races API
  http.get("/api/races", () => {
    // return res(
    //   ctx.status(200),
    //   ctx.json([
    //     { id: 1, name: "Race 1", date: "2024-12-01" },
    //     { id: 2, name: "Race 2", date: "2024-12-10" },
    //   ])
    // );
    return HttpResponse.json([
      { id: 1, name: "Race 1", date: "2024-12-01" },
      { id: 2, name: "Race 2", date: "2024-12-10" },
    ]);
  }),

  //   // Mock the /leaderboard API
  //   http.get("/api/leaderboard", (req, res, ctx) => {
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         { rank: 1, name: "Runner 1", time: "1:20:15" },
  //         { rank: 2, name: "Runner 2", time: "1:22:30" },
  //       ])
  //     );
  //   }),

  //   // Mock the /results API
  //   http.get("/api/results", (req, res, ctx) => {
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         { raceId: 1, name: "Race 1", winner: "Runner 1", time: "1:20:15" },
  //         { raceId: 2, name: "Race 2", winner: "Runner 2", time: "1:22:30" },
  //       ])
  //     );
  //   }),

  //   // Mock the /profile API (for a specific user)
  //   http.get("/api/profile", (req, res, ctx) => {
  //     return res(
  //       ctx.status(200),
  //       ctx.json({ id: 1, name: "John Doe", email: "john@example.com" })
  //     );
  //   }),

  //   // Mock the /register API (POST request to register a user for a race)
  //   http.post("/api/register", (req, res, ctx) => {
  //     return res(
  //       ctx.status(201),
  //       ctx.json({ message: "Registration successful" })
  //     );
  //   }),
];
