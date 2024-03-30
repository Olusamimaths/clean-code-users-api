import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { ConfigService } from '@nestjs/config';
import { IFileStorage, FileResult } from '@/core/abstracts';

@Injectable()
export class FileStorage implements IFileStorage {
  constructor(private readonly configService: ConfigService) {}
  async saveFile(imageUrl: string): Promise<FileResult> {
    const fileStoragePath = this.configService.get<string>('fs.folderName');
    const result = await this.downloadFileAndSave({
      url: imageUrl,
      destination: fileStoragePath,
    });
    return result;
  }

  async downloadFileAndSave(input: {
    url: string;
    destination: string;
  }): Promise<FileResult> {
    const { url, destination } = input;
    const res = await fetch(url);
    if (!fs.existsSync(destination))
      await fs.promises.mkdir(destination, { recursive: true });

    // Create a write stream to save the file
    const fileStream = fs.createWriteStream(
      path.resolve(`./${destination}`, 'tempFile'),
      { flags: 'wx' },
    );

    // Pipe the response body to the file stream
    await finished(Readable.from(res.body as any).pipe(fileStream));

    // Read the file back into a buffer
    const fileBuffer = fs.readFileSync(
      path.resolve(`./${destination}`, 'tempFile'),
    );

    // Create a hash of the file content
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Rename the file with the hashed name
    fs.renameSync(
      path.resolve(`./${destination}`, 'tempFile'),
      path.resolve(`./${destination}`, `${hash}.jpg`),
    );

    // Convert the buffer to a base64 string
    const base64File = fileBuffer.toString('base64');

    return { base64File, hash };
  }
  async getFileBase64(hash: string): Promise<string> {
    const filePath = this._getFilePath(hash);
    const buffer = fs.readFileSync(filePath);
    return buffer?.toString('base64');
  }

  async deleteFile(hash: string): Promise<void> {
    const filePath = this._getFilePath(hash);
    fs.unlinkSync(filePath);
  }

  private _getFilePath(hash: string) {
    const folderName = this.configService.get<string>('fs.folderName');
    const filePath = path.resolve(`./${folderName}`, `${hash}.jpg`);
    return filePath;
  }
}
