import fs from "fs";

export default class Logger {
  private infoStream = fs.createWriteStream("logs/info.log", {
    flags: "a",
    autoClose: true,
  });
  private errorStream = fs.createWriteStream("logs/error.log", {
    flags: "a",
    autoClose: true,
  });
  private debugStream = fs.createWriteStream("logs/debug.log", {
    flags: "a",
    autoClose: true,
  });

  public info(msg: string): void {
    this.infoStream.write(this.msgFunc(msg));
  }

  public debug(msg: string) {
    this.debugStream.write(this.msgFunc(msg));
  }

  public error(msg: string) {
    this.errorStream.write(this.msgFunc(msg));
  }

  private msgFunc(msg: string) {
    return new Date().toISOString() + " : " + msg + "\n";
  }
}
