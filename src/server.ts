import { server } from "./http";
import "./socket";

const port = process.env.SERVER_PORT || 8080;

server.listen(port, () => console.log(`Server is running on PORT ${port}`));
