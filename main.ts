import { runServer } from "./zener/server.ts";

if (import.meta.main) {
    await runServer();
    const ionicCommand = Deno.build.os === "windows"
        ? new Deno.Command("cmd", {
            args: ["/c", "ionic", "serve","--external"],
            cwd: "./zenStream",
            stdout: "inherit",
            stderr: "inherit",
        })
        : new Deno.Command("ionic", {
            args: ["serve"],
            cwd: "./zenStream",
            stdout: "inherit",
            stderr: "inherit",
        });

    const child = ionicCommand.spawn();
    const { code } = await child.status;
    if (code !== 0) {
        console.error("Ionic build failed with code:", code);
    } else {
        console.log("Ionic build completed successfully.");
    }
}