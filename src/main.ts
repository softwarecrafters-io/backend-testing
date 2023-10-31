import {createServer} from "./infrastructure/server";

const server = createServer();
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
