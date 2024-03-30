import { Injectable } from '@nestjs/common';

export interface FileResult {
  base64File: string;
  hash: string;
}

@Injectable()
export abstract class IFileStorage {
  abstract saveFile(imageUrl: string): Promise<FileResult>;

  abstract downloadFileAndSave(input: {
    url: string;
    destination: string;
  }): Promise<FileResult>;

  abstract getFileBase64(hash: string): Promise<string>;

  abstract deleteFile(hash: string): Promise<void>;
}
