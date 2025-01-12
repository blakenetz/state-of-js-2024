import http from "node:http";
import fs from "node:fs";
import crypto from "node:crypto";

const port = 3000;
const host = "localhost";
const options: { encoding: BufferEncoding } = { encoding: "utf-8" };

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs.readFileSync("client/index.html", options);
      res.end(html);
      break;

    case "/module":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      const js = fs.readFileSync("data/liveBindings.ts", options);
      res.end(js);
      break;

    case "/data":
      res.writeHead(200, { "Content-Type": "application/json" });
      const json = fs.readFileSync("data/data.json", options);
      res.end(json);
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end('Only GET methods on "/" endpoint is available!');
      break;
  }
});

// Handle upgrade requests
server.on("upgrade", (req, socket, head) => {
  /**
   * WebSocket handshake
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#client_handshake_request
   */
  if (!req.headers["origin"]?.includes(`${host}:${port}`)) {
    console.error(`Bad header: origin`, req.headers["origin"]);
    socket.end("HTTP/1.1 403 Forbidden");
    return;
  }

  if (
    req.headers["upgrade"] !== "websocket" ||
    !req.headers["sec-websocket-key"]
  ) {
    console.error(`Bad header: upgrade`, req.headers["upgrade"]);
    socket.end("HTTP/1.1 400 Bad Request");
    return;
  }

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#server_handshake_response */
  const hash = generateAcceptValue(req.headers["sec-websocket-key"]);

  const responseHeaders = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${hash}`,
  ];

  socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");

  // Handle WebSocket communication
  socket.on("data", (buffer) => {
    console.log("getting data");
    try {
      const message = decodeWebSocketFrame(buffer);
      if (message) {
        // Echo the message back
        const response = encodeWebSocketFrame(message);
        socket.write(response);
      }
    } catch (error) {
      console.error(`error decoding frame`, error);
      socket.end("HTTP/1.1 400 Bad Request");
      return;
    }
  });

  socket.on("end", () => {
    socket.end();
  });
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#server_handshake_response:~:text=Additionally%2C%20the%20server,of%20that%20hash.
 */
function generateAcceptValue(acceptKey: string) {
  return crypto
    .createHash("sha1")
    .update(acceptKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    .digest("base64");
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#exchanging_data_frames
 */
function decodeWebSocketFrame(buffer: Buffer): string | null {
  // first byte contains FIN bit and opcode
  const firstByte = buffer[0];
  // not handling multi-part buffers
  const _isFinalFrame = Boolean((firstByte >>> 7) & 0x1); // last frame in message

  const reserved = [
    Boolean((firstByte >>> 6) & 0x1),
    Boolean((firstByte >>> 5) & 0x1),
    Boolean((firstByte >>> 4) & 0x1),
  ];
  if (reserved.some(Boolean)) {
    throw new Error("WebSocket extensions are not supported");
  }

  // Verify type of frame is text
  const opCode = firstByte & 0xf;
  if (opCode !== 0x1) return null;

  /**
   * second byte contains payload length
   * If ≤ 125: That's the actual length
   * If 126: Next 2 bytes contain the real length
   * If 127: Next 8 bytes contain the real length
   */
  const secondByte = buffer[1];
  let payloadLength = secondByte & 0x7f; // 127
  let currentOffset = 2;
  if (payloadLength > 125) {
    if (payloadLength === 126) {
      payloadLength = buffer.readUInt16BE(currentOffset);
      currentOffset += 2;
    } else {
      payloadLength =
        buffer.readUInt32BE(currentOffset) * Math.pow(2, 32) +
        buffer.readUInt32BE(currentOffset + 4);
      currentOffset += 8;
    }
  }

  // if masked, next 4 bytes are masking key
  const isMasked = Boolean((secondByte >>> 7) & 0x1);
  if (isMasked) {
    const maskingKey = buffer.slice(currentOffset, currentOffset + 4);
    currentOffset += 4;

    const payload = buffer.slice(currentOffset, currentOffset + payloadLength);

    for (let i = 0; i < payload.length; i++) {
      payload[i] ^= maskingKey[i % 4];
    }
    return payload.toString("utf8");
  }

  return null;
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#exchanging_data_frames
 */
function encodeWebSocketFrame(message: string) {
  const sixtyFourBit = 65535;
  const sixteenBit = 125;

  // Convert to binary buffer
  const payload = Buffer.from(message);
  const payloadLength = payload.length;

  // Calculate frame size
  let frameLength = 2; // Minimum frame is 2 bytes (header + length)
  if (payloadLength > sixtyFourBit) {
    frameLength += 8; // Need 8 more bytes for 64-bit length
  } else if (payloadLength > sixteenBit) {
    frameLength += 2; // Need 2 more bytes for 16-bit length
  }

  // Allocate the frame buffer
  const frame = Buffer.alloc(frameLength + payloadLength);

  // Set FIN bit (1) and text opcode (0x1)
  frame[0] = 0x81;

  // Set payload length
  if (payloadLength > sixtyFourBit) {
    frame[1] = 127; // Signal 64-bit length
    frame.writeUInt32BE(0, 2); // High 32 bits
    frame.writeUInt32BE(payloadLength, 6); // Low 32 bits
  } else if (payloadLength > sixteenBit) {
    frame[1] = 126; // Signal 16-bit length
    frame.writeUInt16BE(payloadLength, 2);
  } else {
    frame[1] = payloadLength; // Length fits in 7 bits
  }

  payload.copy(frame, frameLength);
  return frame;
}
