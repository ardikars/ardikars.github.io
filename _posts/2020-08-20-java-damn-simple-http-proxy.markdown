---
title: Java Damn Simple HTTP Proxy
date: 2020-08-20 13:41:00 Z
categories:
- java
tags:
- proxy
- http
- networking
layout: post
---

```java
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class HttpProxy {

  private static byte[] CONNECTION_ESTABLISHED =
      "HTTP/1.0 200 Connection established\r\nProxy-Agent: HTTP Proxy/1.0\r\n\r\n".getBytes();

  public static void main(String[] args) throws IOException {
    ExecutorService threadPool = Executors.newCachedThreadPool();
    ServerSocket serverSocket = new ServerSocket(8080);
    while (true) {
      threadPool.submit(new UpstramHandler(serverSocket.accept()));
    }
  }

  static class UpstramHandler implements Runnable {

    private final Socket socket;
    private final ExecutorService executorService;

    UpstramHandler(Socket socket) {
      this.socket = socket;
      this.executorService = Executors.newSingleThreadExecutor();
    }

    @Override
    public void run() {
      byte[] buffer = new byte[2048];
      while (true) {
        try {
          Socket remoteSocket = null;
          int recv = 1;
          while (recv > 0) {
            recv = socket.getInputStream().read(buffer);
            if (recv > 0) {
              if (recv > 8) {
                String s = new String(buffer, 0, 8);
                if (s.contains("CONNECT")) {
                  int endlIndx = 0;
                  for (int i = 8; i < recv - 1; i++) {
                    if (buffer[i] == '\r' && buffer[i + 1] == '\n') {
                      endlIndx = i + 1;
                      break;
                    }
                  }
                  if (endlIndx > 8) {
                    String request = new String(buffer, 0, endlIndx + 1);
                    int connectIndex = request.indexOf("CONNECT");
                    int startIndex = request.indexOf(" ", connectIndex) + 1;
                    int endIndex = request.indexOf(" ", startIndex);
                    String[] hostnameAndPort;
                    if (endIndex < startIndex) {
                      hostnameAndPort = request.substring(startIndex).split(":");
                    } else {
                      hostnameAndPort = request.substring(startIndex, endIndex).split(":");
                    }
                    String hostname = hostnameAndPort[0];
                    int port = Integer.parseInt(hostnameAndPort[1]);
                    remoteSocket = new Socket(hostname, port);
                    socket.getOutputStream().write(CONNECTION_ESTABLISHED);
                    socket.getOutputStream().flush();
                    executorService.submit(new DownstreamHandler(socket, remoteSocket));
                    continue;
                  }
                }
              }
              if (remoteSocket != null) {
                remoteSocket.getOutputStream().write(buffer, 0, recv);
                remoteSocket.getOutputStream().flush();
              }
            }
          }
        } catch (IOException e) {
          System.err.println(e);
        }
      }
    }
  }

  static class DownstreamHandler implements Runnable {

    private final Socket socket;
    private final Socket remoteSocket;

    DownstreamHandler(Socket socket, Socket remoteSocket) {
      this.socket = socket;
      this.remoteSocket = remoteSocket;
    }

    @Override
    public void run() {
      byte[] buffer = new byte[2048];
      int recv = 1;
      while (recv > 0) {
        try {
          recv = remoteSocket.getInputStream().read(buffer);
          if (recv > 0 && remoteSocket != null) {
            socket.getOutputStream().write(buffer, 0, recv);
            socket.getOutputStream().flush();
          }
        } catch (IOException e) {
          System.err.println(e);
        }
      }
    }
  }
}
```
